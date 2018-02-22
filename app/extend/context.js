const moment = require("moment");
const { VError } = require("verror");

module.exports = {

    // 包装response
    set jsonBody(data) {
        this.assert(data && typeof data === "object");
        this.body = {
            code: 200,
            msg: "success",
            data
        };
    },

    // error包装
    error(expression, message, code, status = 200, originalError) {
        /* istanbul ignore else */
        if (expression) {
          return;
        }

        this.assert(message && typeof message === "string");
        this.assert(code && typeof code === "number");

        this.type = "json";
        const err = Object.assign(new VError({
            name: "custom_server_error",
            cause: originalError
          }, message), {
            code,
            status
          });

        this.throw(err);
      },

    // 生成token
    genToken (userId, ip) {
        const expire = new Date(moment().add(1, "days"));
        return this.model.Token.create({ expire, ip, user: userId, valid: true });
    },

    // 登录权限验证
    authPermission() {
        const ctx = this;
        ctx.assert(ctx.state.auth.user, 403);
    },

    // 管理员权限验证
    adminPermission() {
        const ctx = this;
        ctx.assert(ctx.state.auth.user, 403);
        ctx.assert.equal(ctx.state.auth.user.role, 1, 403);
    }
};
