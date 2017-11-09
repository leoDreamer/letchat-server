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
