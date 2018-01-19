module.exports = app => {
  const { STRING, UUID } = app.Sequelize;
  const LeaveMsg = app.model.define("leave_msg", {
    token: {
      type: UUID,
      allowNull: false
    },
    user: UUID,
    msg: STRING(1024),
    connection: STRING(256)
  });

  return LeaveMsg;
};
