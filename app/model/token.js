module.exports = app => {
    const { STRING, DATE, BOOLEAN, UUID, UUIDV1 } = app.Sequelize;

    const Token = app.model.define("token", {
        id: {
            type: UUID,
            defaultValue: UUIDV1,
            primaryKey : true,
            unique : true
        },
        user: UUID,
        expire: DATE,
        ip: STRING,
        valid: BOOLEAN
    });

    return Token;
};
