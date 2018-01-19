module.exports = app => {
  const { UUID } = app.Sequelize;
  const Vote = app.model.define("vote", {
    token: {
      type: UUID,
      allowNull: false,
      unique : true
    }
  });

  return Vote;
};
