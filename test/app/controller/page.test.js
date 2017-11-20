const mm = require("egg-mock");
const assert = require("assert");

describe("Page Controller", () => {
    let app;
    before(() => {
      app = mm.app();
      return app.ready();
    });

    afterEach(mm.restore);
    after(() => app.close());

    it("获取页面", async () => {
      const resp = await app.httpRequest()
          .get("/index")
          .expect(200);
      assert.equal(resp.type, "text/html");
    });

});
