module.exports = app => {
  const { STRING, INTEGER, DATE, UUID, UUIDV1, BOOLEAN } = app.Sequelize;
  const User = app.model.define("user", {
    login: {
      type: BOOLEAN,
      default: false
    },
    id: {
      type: UUID,
      defaultValue: UUIDV1,
      primaryKey : true,
      unique : true
    },
    role: {
      type: INTEGER,
      default: 0
    },
    name: STRING(30),
    passwd: STRING(32),
    nick_name: STRING(32),
    created_at: DATE,
    updated_at: DATE
  });

  User.prototype.logSignin = async function () {
    await this.update({ last_sign_in_at: new Date() });
  };

  return User;
};
