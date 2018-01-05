module.exports = app => {
  class Spider extends app.Controller {
    get huiboRule () {
      return {
        key: { type: "string", required: true },
        number: { type: "stringNum", required: false }
      };
    }
    async huibo(ctx) {
      ctx.validate(this.huiboRule, ctx.query);
      const { number = 40 } = ctx.query;
      const key = decodeURI(ctx.query.key);
      let timestamp = (new Date()).getTime();
      let jobs = [];
      for (let i = 1; i <= Math.ceil(number / 20); i++) {
        try {
          const pageData = await ctx.service.spider.fetchHuiboPage({ i, word: key, timestamp });
          timestamp = pageData.timestamp;
          jobs = jobs.concat(pageData.jobs);
        } catch (err) {
          console.log(err);
        }
      }

      ctx.body = { jobs };
    }
  }

  return Spider;
};
