const mm = require("egg-mock");
const assert = require("assert");

describe("Auth Controller", () => {
    let app;
    const user = {
        name: "leo",
        passwd: "111111"
    };
    before(() => {
      app = mm.app();
      return app.ready();
    });

    afterEach(mm.restore);
    after(() => app.close());

    it("should assert", () => {
      const pkg = require("../../../package.json");
      assert(app.config.keys.startsWith(pkg.name));
    });

    it("注册成功", () => {
      app.mockCsrf();
      return app.httpRequest()
          .post("/auth/register")
          .send(user)
          .expect(204);
    });

    it("登录成功", () => {
      app.mockCsrf();
      return app.httpRequest()
          .post("/auth/login")
          .send(user)
          .expect(204);
    });

});
