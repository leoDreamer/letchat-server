module.exports = app => {
  const { UUID, UUIDV1, ENUM, STRING } = app.Sequelize;
  const Notification = app.model.define("notification", {
    id: {
      type: UUID,
      defaultValue: UUIDV1,
      primaryKey : true,
      unique : true
    },
    type: ENUM("SYSTEM", "ADDFIREND"),
    content: STRING(128)
  });

  Notification.associate = function () {
    Notification.belongsTo(app.model.User, { foreignKey: "user_id" });
    Notification.belongsTo(app.model.User, { foreignKey: "target_id" });
  };

  return Notification;
};
