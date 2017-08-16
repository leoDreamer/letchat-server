module.exports = app => {
    class Token extends app.Service {
        async fetchOne (id) {
            const token = await this.ctx.model.Token.find({
                where: { id: id }
            });
            return token;
        }
    }
    return Token;
};
