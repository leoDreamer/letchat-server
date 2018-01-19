module.exports = app => {
  const { STRING, UUID } = app.Sequelize;
  const VisitDetail = app.model.define("visit", {
    token: {
      type: UUID,
      allowNull: false
    },
    page: STRING(256)
  });

  return VisitDetail;
};
