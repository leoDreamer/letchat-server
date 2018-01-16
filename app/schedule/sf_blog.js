const cheerio = require("cheerio");
const _ = require("lodash");

module.exports = {
  schedule: {
    interval: "2d",
    type: "worker",
    immediate: false
  },
  async task(ctx) {
    const res = await ctx.curl(`${ctx.app.config.custom.sfHost}/u/leodreamer/articles`);
    const html = Buffer.from(res.data).toString("utf8");
    const $ = cheerio.load(html);
    const aTags = $("a.profile-mine__content--title"); // 链接a标签
    const dateTages = $("span.profile-mine__content--date"); // 发布日期标签
    const posts = [];
    // 提取标题&链接&发布日期
    Object.keys(aTags).forEach((key, index) => {
      if (key.length > 1) { return; };
      const tag = $(aTags[key]);
      posts.push({
        title: tag.text(),
        path: tag.attr("href"),
        publish_date: new Date(new Date().getFullYear() +
          "/" + $(dateTages[index]).text().replace(/年|月|日/g, () => "/"))
      });
    });
    // 获取每篇文章内容
    const postContents = await Promise.all(
      posts.map(p => ctx.curl(ctx.app.config.custom.sfHost + p.path))
    );
    // 提取文章内容&阅读&点赞&收藏
    postContents.forEach(p => {
      const $$ = cheerio.load(Buffer.from(p.data).toString("utf8"));
      const path = p.res.requestUrls[0].replace(ctx.app.config.custom.sfHost, "");
      const content = $$("div.article__content").text();
      const index = _.findIndex(posts, (each) => each.path === path);
      const vote = $$("span#sideLikeNum").text() || 0;
      const save = $$("span#sideBookmarkNum").text() || 0;
      const hits = $$("strong.no-stress").text() || 0;
      posts[index].content = content.toString();
      Object.assign(posts[index], {
        content: content.toString().replace(/[\s*|/\n]/g, ""),
        vote,
        save,
        hits
      });
    });
    ctx.model.SfPost.bulkCreate(posts, {
      updateOnDuplicate: ["vote", "save", "hits"]
    });
  }
};
