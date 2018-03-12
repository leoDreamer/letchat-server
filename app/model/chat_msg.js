module.exports = app => {
  const { STRING, UUID, UUIDV1 } = app.Sequelize;
  const ChatMsg = app.model.define("chat_msg", {
    id: {
      type: UUID,
      defaultValue: UUIDV1,
      primaryKey : true,
      unique : true
    },
    content: STRING(1024)
  });

  ChatMsg.associate = function () {
    ChatMsg.belongsTo(app.model.ChatDialogue, { foreignKey: "chat_id" });
    ChatMsg.belongsTo(app.model.User, { foreignKey: "user_id" });
  };

  return ChatMsg;
};
