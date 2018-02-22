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
    app.model.ChatDialogue.belongsTo(app.model.User, { foreignKey: "user" });
    app.model.ChatDialogue.belongsTo(app.model.User, { foreignKey: "target" });
  };

  return Notification;
};
