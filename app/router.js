module.exports = app => {
  const prefix = app.config.noPrefix ? "" : "/api/v1";
  app.post(`${prefix}/auth/register`, app.controller.auth.register);
  app.post(`${prefix}/auth/login`, app.controller.auth.login);
  app.get(`${prefix}/auth/logout`, app.controller.auth.logout);
  app.get(`${prefix}/users`, app.controller.user.fetch);
};
