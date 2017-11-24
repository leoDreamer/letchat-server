const cheerio = require("cheerio");

module.exports = {
  schedule: {
    interval: "2d",
    type: "worker",
    immediate: true
  },
  async task(ctx) {
    const host = "https://segmentfault.com";
    const res = await ctx.curl(`${host}/u/leodreamer/articles`);
    const html = Buffer.from(res.data).toString("utf8");
    const $ = cheerio.load(html);
    const aTags = $("a.profile-mine__content--title");
    const posts = [];
    Object.keys(aTags).forEach(key => {
      if (key.length > 1) { return; };
      const tag = $(aTags[key]);
      posts.push({
        title: tag.text(),
        path: host + tag.attr("href")
      });
    });
    ctx.model.SfPost.bulkCreate(posts, {
      ignoreDuplicates: true
    });
  }
};
