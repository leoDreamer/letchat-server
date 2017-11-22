module.exports = app => {
  class Page extends app.Controller {
    async index(ctx) {
      const { path } = ctx;
      const pagesMap = {
        "/index": "index",
        "/chat": "chat"
      };

      await ctx.render(pagesMap[path]);
    }
  }

  return Page;
};
