import * as types from "../types";

const state = {
  loginTip: false,
  loginContent: false,
  cover: false,
  chat: true,
  spin: false
};

const getters = {};

const mutations = {
  [types.SHOW_PATCH] (state, { key, value }) {
    state[key] = value;
  }
};

const actions = {};

export {
  state, getters, actions, mutations
};
