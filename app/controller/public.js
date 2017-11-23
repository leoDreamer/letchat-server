const fs = require("fs");

module.exports = app => {
  class Public extends app.Controller {
    async indexData(ctx) {
      const path = "app/public/indexData.json";
      const data = fs.readFileSync(path);
      ctx.assert(data, 404);

      ctx.jsonBody = JSON.parse(data);
    }
  }

  return Public;
};
