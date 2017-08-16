"use strict";

const database = "egg";
const redisHost = "192.168.189.130";
const dbHost = "localhost";
module.exports = appInfo => {
  const config = {};

  // should change to your own
  config.keys = appInfo.name + "_1501817502166_7037";

  // add your config here
  config.logger = {
    consoleLevel: "INFO"
  };

  config.mysql = {
    client: {
      host: dbHost,
      port: "3306",
      user: "root",
      passsword: "",
      database: database
    }
  };

  config.sequelize = {
    dialect: "mysql", // db type
    database: database,
    host: dbHost,
    port: "3306",
    username: "root",
    password: "",
    log: false
  };

  config.redis = {
    client: {
      port: 6379,          // Redis port
      host: redisHost,   // Redis host
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

  config.proxyworker = {
    port: 10086
  };

  return config;
};
