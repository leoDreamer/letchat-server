module.exports = app => {
  const { UUID, UUIDV1, STRING } = app.Sequelize;
  const ChatFirend = app.model.define("chat_firend", {
    id: {
      type: UUID,
      defaultValue: UUIDV1,
      primaryKey : true,
      unique : true
    },
    nick_name: STRING(64)
  });

  ChatFirend.associate = function () {
    app.model.ChatDialogue.belongsTo(app.model.User, { foreignKey: "user" });
    app.model.ChatDialogue.belongsTo(app.model.User, { foreignKey: "target" });
  };

  return ChatFirend;
};
