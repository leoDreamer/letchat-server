module.exports = app => {
    class User extends app.Controller {
        async fetch(ctx) {
            const users = await ctx.service.user.fetch();

            ctx.body = {
                users: users
            };
        }
    }
    return User;
};
