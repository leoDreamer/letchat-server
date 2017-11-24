module.exports = app => {
  const { STRING, INTEGER, DATE, UUID, UUIDV1 } = app.Sequelize;
  const User = app.model.define("user", {
    login: STRING,
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
    age: INTEGER,
    last_sign_in_at: DATE,
    created_at: DATE,
    updated_at: DATE
  });

  User.prototype.logSignin = async function () {
    await this.update({ last_sign_in_at: new Date() });
  };

  return User;
};
