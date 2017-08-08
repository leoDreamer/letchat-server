"use strict";

const database = "egg";
module.exports = appInfo => {
  const config = {};

  // should change to your own
  config.keys = appInfo.name + "_1501817502166_7037";

  // add your config here
  config.mysql = {
    client: {
      host: "localhost",
      port: "3306",
      user: "root",
      passsword: "",
      database: database
    }
  };

  config.sequelize = {
    dialect: "mysql", // db type
    database: database,
    host: "localhost",
    port: "3306",
    username: "root",
    password: ""
  };

  return config;
};
