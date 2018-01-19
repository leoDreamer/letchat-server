module.exports = app => {
  class Page extends app.Controller {
    async index(ctx) {
      const { path } = ctx;
      const token = ctx.state.auth.token;
      const pagesMap = {
        "/index": "index",
        "/chat": "chat",
        "/spider": "spider"
      };

      await ctx.model.Visit.create({
        token, page: path
      });
      await ctx.render(pagesMap[path], { global: JSON.stringify({ user: ctx.state.auth.user }) });
    }
  }

  return Page;
};
