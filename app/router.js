"use strict";

module.exports = app => {
  app.get("/", "home.index");
  app.post("auth/login", "auth.login");
};
