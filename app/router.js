module.exports = app => {
  const prefix = app.config.noPrefix ? "" : "/api/v1";

  // api
  app.post(`${prefix}/auth/register`, app.controller.auth.register);
  app.post(`${prefix}/auth/login`, app.controller.auth.login);
  app.post(`${prefix}/auth/logout`, app.controller.auth.logout);
  app.get(`${prefix}/spider/huibo`, app.controller.spider.huibo);

  // public assets
  app.get("/data/index", app.controller.public.indexData);

  // page
  app.get("/index", app.controller.page.index);
  app.get("/chat", app.controller.page.index);

  // socket
  app.io.route("login", require("./io/controller/chat").login);
  // app.io.route("disconnect", require("./io/controller/chat").logout);
  app.io.route("message", require("./io/controller/chat").message);
};
