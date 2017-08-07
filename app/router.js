"use strict";

module.exports = app => {
  app.post("/auth/register", app.controller.auth.register);
  app.post("/auth/login", app.controller.auth.login);
};
