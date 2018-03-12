module.exports = app => {
  class Chat extends app.Controller {
    async fetchDialogues(ctx) {
      const { user_id: userId } = ctx.query;
      const dialogues = await app.model.ChatDialogue.findAll({
        where: {
          type: 0,
          userId
        }
      });

      return dialogues;
    }

    async createDialogue(ctx) {
      const { user_id: userId, target_id: targetId } = ctx.request.body;

      const dialogue = await app.model.ChatDialogue.findOrCreate({
        where: {
          user_id: userId,
          target_id: targetId
        }
      });

      return dialogue;
    }

    async fetchFirends(ctx) {
      const { user_id: userId } = ctx.query;

      const firends = await app.model.ChatFirend.findAll({
        include:[{
          model: app.model.User
        }],
        where: {
          user_id: userId,
          agree: true
        }
      });

      ctx.jsonBody = firends.map(f => ({
        nick_name: f.nick_name,
        name: f.user.name,
        id: f.user.id
      }));
    }

    async createFirend(ctx) {
      const { target_id: targetId, user_id: userId } = ctx.request.body;

      const result = await app.model.ChatFirend.findOrCreate({
        where: {
          user_id: userId,
          target_id: targetId
        }
      });

      ctx.jsonBody = [result[0]];
    }
  }

  return Chat;
};
