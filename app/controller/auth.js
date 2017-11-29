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
    },
    nickName: {
        type: "string",
        required: true,
        max: 24,
        min: 1
    }
};
module.exports = app => {
    class Auth extends app.Controller {
        async register(ctx) { // 注册
            ctx.validate(userRule);

            // 注册用户
            const user = await ctx.model.User.create(ctx.request.body);
            ctx.assert(user, "注册失败");

            ctx.status = 204;
        }

        async login(ctx) { // 登录
            ctx.validate(userRule);

            // 用户校验
            const { name, passwd, nickName } = ctx.request.body;
            const [user] = await ctx.model.User.findOrCreate({
                where: {
                    name: name,
                    passwd: passwd,
                    nick_name: nickName
                }
            });

            // 生成token和session并存储
            const token = await ctx.service.token.genToken(user.id, ctx.request.ip);
            await app.redis.set(`${app.options.sessionPrefix}:${token.id}`, JSON.stringify({
                user: user.id,
                token: token.id
            }));
            ctx.cookies.set("access_token", token.id);

            ctx.body = user;
        }

        async logout(ctx) { // 登出
            await app.redis.del(`${app.options.sessionPrefix}:${ctx.state.auth.token}`);
            ctx.cookies.set("access_token", null);

            ctx.status = 204;
        }
    }
    return Auth;
};
