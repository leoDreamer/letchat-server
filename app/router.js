module.exports = app => {
  const apiInject = app.middlewares.router.apiInject();
  const { AUTHLEVEL, roleCheck } = app.middlewares.user;
  app.post("/api/auth/register", apiInject, app.controller.auth.register);
  app.post("/api/auth/login", apiInject, app.controller.auth.login);
  app.get("/api/auth/logout",
    apiInject, roleCheck.bind(null, AUTHLEVEL.user), app.controller.auth.logout);
  app.get("/api/users",
    apiInject, roleCheck.bind(null, AUTHLEVEL.admin), app.controller.user.fetch);
};
