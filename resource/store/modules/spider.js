import * as types from "../types";

const state = {
  originMap: {},
  jobs: [],
  addrList: []
};

const mutations = {
  [types.SPIDER_CREATE_ORIGINMAP] (state, map) {
    state.originMap = map;
  },
  [types.SPIDER_PATCH_JOBS] (state, jobs) {
    state.jobs = jobs;
  },
  [types.SPIDER_PATCH_ADDRLIST] (state, addrList) {
    state.addrList = addrList;
  }
};

const actions = {
  createIntDate ({ commit }) {
    this._vm.axios.get("/data/index").then(resp => {
      const data = resp.data.data.spider;
      commit(types.SPIDER_CREATE_ORIGINMAP, data.originMap );
      commit(types.SPIDER_PATCH_ADDRLIST, data.addrList );
    });
  },
  patchJobs ({ commit }, { key, number }) {
    commit("SHOW_PATCH", {
        key: "spin",
        value: true
    });
    this._vm.axios.get(`/spider/huibo?key=${key}&number=${number}`)
      .then(resp => {
          if (!resp) return;
          if ( resp.data.jobs.length === 0) window.$Message.info("暂未找到条件相关职位");
          commit(types.SPIDER_PATCH_JOBS, resp.data.jobs);
          commit("SHOW_PATCH", {
              key: "spin",
              value: false
          });
      });
  }
};

const getters = {};

export {
state, mutations, actions, getters
};
