function tokenValidate(token, ip) {
    if (!token) {
        return "token不存在";
    }
    if (!token.valid) { return "无效token"; }
    if (token.ip && token.ip !== ip.toString()) { return "IP已更换，请重新获取token"; }
    if (token.expire < Date.now()) { return "token已过期，请重新获取"; }
    return;
}

const apiInject = () => {
    return async (ctx, next) => {
        ctx.state.wrap = true;
        if (!ctx.session.token && ctx.headers["access-token"]) {
            const token = await ctx.service.token.fetchOne(ctx.headers["access-token"]);
            const msg = tokenValidate(token, ctx.request.ip);
            ctx.assert(!msg, msg, 403);
            ctx.session.token = token.id;
            ctx.session.user = token.user;
        }

        if (ctx.session.token) {
            const user = await ctx.service.user.fetchOne(ctx.session.user);
            ctx.state.user = user ? JSON.parse(JSON.stringify(user)) : null;
        }

        await next();
    };
};

module.exports = { apiInject };
