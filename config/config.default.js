"use strict";

const database = "egg";
const host = "192.168.189.130";
module.exports = appInfo => {
  const config = {};

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
      port: 6379,          // Redis port
      host: host,   // Redis host
      password: "",
      db: 0
    }
  };

  config.sessionRedis = {
    key: "EGG_SESSION",
    maxAge: 24 * 3600 * 1000, // 1 天
    httpOnly: true,
    encrypt: false
  };

  return config;
};
