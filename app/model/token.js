module.exports = app => {
    const { STRING, DATE, BIGINT, BOOLEAN } = app.Sequelize;

    const Token = app.model.define("token", {
        id: {
            type: BIGINT(11),
            autoIncrement:true,
            primaryKey : true,
            unique : true
        },
        user: BIGINT(11),
        expire: DATE,
        ip: STRING,
        valid: BOOLEAN
    });

    return Token;
};
