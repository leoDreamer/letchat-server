module.exports = app => {
    class User extends app.Service {
        async fetch () {
            const users = await app.model.User.find({});
            return users;
        }

        async fetchOne (id) {
            const user = await app.model.User.find({
                where: { id: id }
            });

            return user;
        }
    }
    return User;
};
