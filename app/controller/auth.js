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
            const user = await ctx.service.auth.login(ctx.request.body);
            ctx.assert(user, "用户名或密码错误");
            const token = await app.genToken(user.id, ctx.request.ip);
            ctx.session.user = user.id;
            ctx.session.token = token.id;
            ctx.body = ctx.session
            // ctx.status = 204;
        }

        async logout(ctx) {
            ctx.session = null;

            ctx.status = 204;
        }
    }
    return Auth;
};
