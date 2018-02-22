import * as types from "../types";

const state = {
  visits: 0,
  vote: false,
  vote_times: 0,
  leaveMsgs: []
};

const mutations = {
  [types.VISIT_PATCH_VISITS] (state, num) {
    state.visits = num;
  },
  [types.VISIT_PATCH_VOTETIMES] (state, num) {
    state.vote_times = num;
  },
  [types.VISIT_PATCH_VOTE] (state, vote) {
    state.vote = vote;
  },
  [types.VISIT_PATCH_LEAVEMSGS] (state, msgs) {
    state.leaveMsgs = msgs;
  }

};

const actions = {
  getVisits ({ commit }) {
    this._vm.axios.get("/visits/visit")
      .then(resp => {
        const data = resp.data.data;
        commit(types.VISIT_PATCH_VISITS, data.visit_times);
        commit(types.VISIT_PATCH_VOTETIMES, data.vote_times);
        commit(types.VISIT_PATCH_VOTE, data.vote);
      });
  },
  createVote ({ commit, state }) {
    this._vm.axios.post("/visits/vote")
      .then(() => {
        window.$Message.info("点赞成功, 感谢支持.");
        commit(types.VISIT_PATCH_VOTE, true);
        commit(types.VISIT_PATCH_VOTETIMES, state.vote_times + 1);
      });
  },
  createLeaveMsg ({ commit }, { msg, connection }) {
    const _self = this;
    this._vm.axios.post("/visits/leave_msg", { msg, connection })
      .then(resp => {
        _self.commit(types.INFORMATION_LEAVEMSG, [resp.data.data]);
        window.$Message.info("留言成功, 感谢给予宝贵意见.");
      });
  }
};

const getters = {};

export {
state, mutations, actions, getters
};
