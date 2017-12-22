module.exports = app => {
  const prefix = app.config.noPrefix ? "" : "/api/v1";

  // api
  app.post(`${prefix}/auth/register`, app.controller.auth.register);
  app.post(`${prefix}/auth/login`, app.controller.auth.login);
  app.post(`${prefix}/auth/logout`, app.controller.auth.logout);

  // publick assets
  app.get("/data/index", app.controller.public.indexData);

  // page
  app.get("/index", app.controller.page.index);
  app.get("/chat", app.controller.page.index);

  // socket
  console.log('1111111', app.io.controller.chat.index)
  app.io.route("chat", require("./io/controller/chat").index);
  // app.io.route("connect", app.io.controller.chat.connect);

  // app.io.of('/chat')
  // app.io.of('/chat').route('chat', app.io.controller.chat.index);
};
