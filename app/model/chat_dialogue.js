module.exports = app => {
  const { UUID, UUIDV1, DATE } = app.Sequelize;
  const ChatDialogue = app.model.define("chat_dialogue", {
    id: {
      type: UUID,
      defaultValue: UUIDV1,
      primaryKey : true,
      unique : true
    },
    last_update_at: DATE
  });

  ChatDialogue.associate = function () {
    ChatDialogue.belongsTo(app.model.User, { foreignKey: "user_id" });
    ChatDialogue.belongsTo(app.model.User, { foreignKey: "target_id" });
  };

  return ChatDialogue;
};
