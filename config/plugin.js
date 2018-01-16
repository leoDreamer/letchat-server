"use strict";

// had enabled by egg
// exports.static = true;

exports.validate = {
    enable: true,
    package: "egg-validate"
};

exports.sequelize = {
    enable: true,
    package: "egg-sequelize"
};

exports.redis = {
  enable: true,
  package: "egg-redis"
};

exports.nunjucks = {
    enable: true,
    package: "egg-view-nunjucks"
};

exports.webpack = {
    enable: false,
    package: "egg-webpack"
};

exports.io = {
    enable: true,
    package: "egg-socket.io"
};

exports.validate = {
    enable: true,
    package: "egg-validate"
  };
