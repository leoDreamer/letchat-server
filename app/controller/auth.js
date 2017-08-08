"use strict";

const userRule = {
    name: {
        type: "string",
        required: true,
        max: 24,
        min: 3
    },
    passwd: {
        type: "string",
        required: true,
        max: 24,
        min: 6
    }
};
module.exports = app => {
    class Auth extends app.Controller {
        async register(ctx) {
            ctx.validate(userRule);
            const user = await ctx.service.auth.register(ctx.request.body);
            ctx.assert(user, "注册失败");

            ctx.status = 204;
        }
        async login(ctx) {
            ctx.validate(userRule);
            const login = await ctx.service.auth.login(ctx.request.body);
            ctx.assert(login, "用户名或密码错误");

            ctx.status = 204;
        }
    }
    return Auth;
};
