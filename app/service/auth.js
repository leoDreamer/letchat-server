module.exports = app => {
    class Auth extends app.Service {
        async rigisterUser (user) {
            const query = `insert into user(name, passwd) values(${user.name},${user.passwd})`;
            const dbUser = await this.ctx.db.query(query);
            return dbUser;
        }

        async login (user) {
            const query = `select * from user where name=${user.name} and passwd=${user.passwd}`;
            const dbUser = await this.ctx.db.query(query);
            return dbUser.length > 0 ? true : false;
        }
    }
    return Auth;
};
