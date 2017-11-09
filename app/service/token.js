const moment = require("moment");

module.exports = app => {
    class Token extends app.Service {
        fetchOne (id) {
            return this.ctx.model.Token.find({
                where: { id: id }
            });
        }

        genToken (userId, ip) {
            const expire = new Date(moment().add(1, "days"));
            return this.ctx.model.Token.create({ expire, ip, user: userId, valid: true });
        }
    }
    return Token;
};
