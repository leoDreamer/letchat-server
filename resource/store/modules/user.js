import * as types from "../types";

const state = {
  name: "Leo",
  id: undefined,
  role: undefined,
  login: undefined
};

const getters = {};

const mutations = {
  [types.USER_CREATE] (state, user) {
    Object.assign(state, user);
  },
  [types.USER_DELETE] (state) {
    Object.assign(state, { name: "Leo" });
  }
};

const actions = {
  createUser ({ commit }, { name, passwd }) {
    // 后端模板注入User时从全局变量获取
    if (window.global.user) {
      commit(types.USER_CREATE, window.global.user);
      return;
    }

    if (!name && !passwd) return;
    // 登录请求时提交commit
    commit("SHOW_PATCH", { key: "cover", value: true });
    this._vm.axios.post("/auth/login", { passwd, name }).then(resp => {
      if (resp.data.code !== 200) {
        window.$Message.info(resp.data.message);
        return;
      }
      commit(types.USER_CREATE, resp.data.data);
      commit("SHOW_PATCH", { key: "cover", value: false });
      commit("SHOW_PATCH", { key: "loginContent", value: false });
    });
  },
  deleteUser ({ commit }) {
    commit(types.USER_DELETE);
  }
};

export {
  state, getters, actions, mutations
};
