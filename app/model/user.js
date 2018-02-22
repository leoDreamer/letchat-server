module.exports = app => {
  const { STRING, INTEGER, UUID, UUIDV1 } = app.Sequelize;
  const User = app.model.define("user", {
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
    passwd: STRING(32),
    name: {
      type: STRING(32),
      allowNull: false,
      unique: true
    },
    number: {
      type: INTEGER(32),
      autoIncrement: true,
      unique: true
    },
    avator: UUID
  }, {
    initialAutoIncrement: "1000"
  });

  return User;
};
