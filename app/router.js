module.exports = app => {
  const prefix = app.config.noPrefix ? "" : "/api/v1";

  // api
  app.post(`${prefix}/auth/register`, app.controller.auth.register);
  app.post(`${prefix}/auth/login`, app.controller.auth.login);
  app.post(`${prefix}/auth/logout`, app.controller.auth.logout);
  app.get(`${prefix}/spider/huibo`, app.controller.spider.huibo);
  app.post(`${prefix}/visits/leave_msg`, app.controller.visit.newMsg);
  app.post(`${prefix}/visits/vote`, app.controller.visit.newVote);
  app.get(`${prefix}/visits/visit`, app.controller.visit.index);

  // api-chat
  app.get(`${prefix}/chat/fetch_dialogue`, app.controller.chat.fetchDialogues);
  app.post(`${prefix}/chat/create_dialogue`, app.controller.chat.createDialogue);
  app.get(`${prefix}/chat/fetch_firends`, app.controller.chat.fetchFirends);
  app.post(`${prefix}/chat/create_firend`, app.controller.chat.createFirend);


  // public assets
  app.get("/data/index", app.controller.public.indexData);

  // page
  app.get("/index", app.controller.page.index);
  app.get("/chat", app.controller.page.index);
  app.get("/spider", app.controller.page.index);

  // wechat
  app.get("/wechat/verify", app.controller.wechat.verify);

  // socket
  app.io.route("login", require("./io/controller/chat").login);
  // app.io.route("disconnect", require("./io/controller/chat").logout);
  app.io.route("message", require("./io/controller/chat").message);
};
