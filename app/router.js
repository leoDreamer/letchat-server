module.exports = app => {
  const prefix = app.config.noPrefix ? "" : "/api/v1";

  // api
  app.post(`${prefix}/auth/register`, app.controller.auth.register);
  app.post(`${prefix}/auth/login`, app.controller.auth.login);
  app.get(`${prefix}/auth/logout`, app.controller.auth.logout);

  // page
  app.get("/index", app.controller.page.index);
  app.get("/chat", app.controller.page.index);
};
