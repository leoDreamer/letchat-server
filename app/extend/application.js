const moment = require("moment");

const genToken = async function (userId, ip) {
    const expire = new Date(moment().add(1, "days"));
    const token = await this.model.Token.create({ expire, ip, user: userId, valid: true });
    return token;
};

module.exports = { genToken };
