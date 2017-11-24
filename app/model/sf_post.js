module.exports = app => {
  const { STRING, UUID, UUIDV1 } = app.Sequelize;

  const SfPost = app.model.define("sf_post", {
      id: {
        type: UUID,
        defaultValue: UUIDV1,
        primaryKey : true,
        unique : true
      },
      title: STRING(128),
      path: {
        type: STRING(128),
        primaryKey: true,
        unique: true
      }
  });

  return SfPost;
};
