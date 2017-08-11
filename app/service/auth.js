module.exports = app => {
    class Auth extends app.Service {
        async register (user) {
            const dbUser = await this.ctx.model.User.create(user);
            return dbUser;
        }

        async login (user) {
            const dbUser = await this.ctx.model.User.findOne({
                where: {
                    name: user.name,
                    passwd: user.passwd
                }
            });
            return dbUser;
        }
    }
    return Auth;
};
