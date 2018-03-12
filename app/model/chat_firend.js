module.exports = app => {
  const { UUID, UUIDV1, STRING, BOOLEAN } = app.Sequelize;
  const ChatFirend = app.model.define("chat_firend", {
    id: {
      type: UUID,
      defaultValue: UUIDV1,
      primaryKey : true,
      unique : true
    },
    nick_name: STRING(64),
    agree: {
      type: BOOLEAN,
      defaultValue: true
    }
  });

  ChatFirend.associate = function () {
    ChatFirend.belongsTo(app.model.User, { foreignKey: "user_id" });
    ChatFirend.belongsTo(app.model.User, { foreignKey: "target_id" });
  };

  return ChatFirend;
};
