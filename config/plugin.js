"use strict";

// had enabled by egg
// exports.static = true;

exports.mysql = {
    enable: true,
    package: "egg-mysql"
};

exports.validate = {
    enable: true,
    package: "egg-validate"
};

exports.sequelize = {
    enable: true,
    package: "egg-sequelize"
};
