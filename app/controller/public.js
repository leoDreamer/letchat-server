const fs = require("fs");

module.exports = app => {
  class Public extends app.Controller {
    async indexData(ctx) {
      const path = "app/public/indexData.json";
      const data = fs.readFileSync(path);
      ctx.assert(data, 404);
      const blogs = await ctx.model.SfPost.findAll();

      ctx.jsonBody = Object.assign({}, JSON.parse(data), { blogs });
    }
  }

  return Public;
};
