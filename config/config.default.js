"use strict";

const path = require("path");
const database = "egg";
const host = "192.168.189.130";
module.exports = appInfo => {
  const config = {};
  config.sessionPrefix = "letchat";

  // should change to your own
  config.keys = appInfo.name + "_1501817502166_7037";
  config.noPrefix = true;

  // add your config here
  config.logger = {
    consoleLevel: "INFO"
  };

  config.sequelize = {
    dialect: "mysql", // db type
    database: database,
    host: host,
    port: "3306",
    username: "root",
    password: "root",
    log: false
  };

  config.redis = {
    client: {
      port: 6379,   // Redis port
      host: host,   // Redis host
      password: "",
      db: 0
    }
  };

  config.view = {
    defaultViewEngine: "nunjucks", // 默认渲染引擎
    defaultExtension: ".html", // 省略后缀名
    mapping: {
      ".html": "nunjucks"
    },
    root: path.join(appInfo.baseDir, "dist/view")
  };

  config.static = {
    prefix: "/",
    gzip: true,
    maxAge: 60 * 60 * 24 * 30,
    dir: path.join(appInfo.baseDir, "dist/static")
  };

  config.webpack = {
    port: 8082,
    appPort: 7001,
    proxy: true,
    proxyMapping: {
      js: "text/javascript; charset=UTF-8",
      css: "text/css; charset=UTF-8",
      json: "application/json; charset=UTF-8",
      html: "text/html; charset=UTF-8"
    },
    webpackConfigList: [require("../build/webpack.dev.js")]
  };

  config.custom = {
    sfHost: "https://segmentfault.com"
  };

  return config;
};
