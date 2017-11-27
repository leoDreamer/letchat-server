module.exports = app => {
  const { STRING, UUID, UUIDV1, TEXT, DATE } = app.Sequelize;

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
      },
      content: TEXT,
      tages: STRING(512),
      publish_date: DATE,
      vote: STRING(8),
      save: STRING(8),
      hits: STRING(8)
  });

  return SfPost;
};
