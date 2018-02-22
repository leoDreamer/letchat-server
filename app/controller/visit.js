module.exports = app => {
  class Visit extends app.Controller {
      async newVote(ctx) { // 点赞;
        const token = ctx.state.auth.token;
        const [vote] = await ctx.model.Vote.findOrCreate({ where: { token } });

        ctx.jsonBody = [vote];
      }

      async newMsg(ctx) { // 留言
        const msgRule = {
          msg: {
            type: "string",
            max: 400
          },
          connection: {
            type: "string",
            max: 24,
            required: false
          }
        };
        ctx.validate(msgRule);
        const { msg, connection } = ctx.request.body;

        const token = ctx.state.auth.token;
        const user = ctx.state.auth.user ? ctx.state.auth.user.id : null;
        const insertDate = { token, msg, connection };
        if (user) insertDate.user = user;
        const leaveMsg = await ctx.model.LeaveMsg.create(insertDate);

        ctx.jsonBody = leaveMsg;
      }

      async index(ctx) { // 访客数量及是否点赞
        const token = ctx.state.auth.token;

        const visitTimes = await ctx.model.Visit.count() || 0;
        const voteTimes = await ctx.model.Vote.count() || 0;
        const vote = await ctx.model.Vote.findOne({
          where: { token }
        });

        ctx.jsonBody = {
          visit_times: visitTimes,
          vote_times: voteTimes,
          vote: vote
        };
      }

      async leaveMsg(ctx) {
        const result = await ctx.model.LeaveMsg.findAndCountAll({
          order: [["created_at", "DESC"]]
        });

        ctx.jsonBody = {
          count: result.count,
          msgs: result.rows
        };
      }

      async destroy(ctx) {
        ctx.adminPermission();
        ctx.assert(ctx.query.msgs, 400);
        const msgs = ctx.query.msgs.split(",");

        const count = await ctx.model.LeaveMsg.destroy({ where: { id: { $in: msgs } } });

        ctx.jsonBody = { count };
      }
  }
  return Visit;
};
