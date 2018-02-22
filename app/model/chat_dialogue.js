module.exports = app => {
  const { UUID, UUIDV1 } = app.Sequelize;
  const ChatDialogue = app.model.define("chat_dialogue", {
    id: {
      type: UUID,
      defaultValue: UUIDV1,
      primaryKey : true,
      unique : true
    },
    user: UUID
  });

  ChatDialogue.associate = function () {
    app.model.ChatDialogue.belongsTo(app.model.User, { foreignKey: "user" });
  };

  return ChatDialogue;
};
