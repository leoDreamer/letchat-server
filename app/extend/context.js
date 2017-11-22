const moment = require("moment");

module.exports = {

    // 生成token
    genToken (userId, ip) {
        const expire = new Date(moment().add(1, "days"));
        return this.model.Token.create({ expire, ip, user: userId, valid: true });
    },

    // 登录权限验证
    authPermission() {
        const { ctx } = this;
        ctx.assert(ctx.stats.auth.user, 403);
    },

    // 管理员权限验证
    adminPermission() {
        const { ctx } = this;
        ctx.assert(ctx.stats.auth.user, 403);
        ctx.assert.equal(ctx.stats.auth.user.role, 1, 403);
    }
};
