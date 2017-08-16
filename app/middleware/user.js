const AUTHLEVEL = {
    user: 0,
    admin: 1
};

const roleCheck = async (level, ctx, next) => {
    if (ctx.state.user && ctx.state.user.role >= level) { await next(); }
    else { ctx.throw(403, "您没有权限进行该操作"); }
};

module.exports = { AUTHLEVEL, roleCheck };
