const stores = {
  state: {
    user: window.global.user || {} // eslint-disable-line
  },
  mutations: {
    setUser (state, user) {
      this._vm.$set(state, "user", user);
    }
  },
  actions: {}
};

export {
  stores
};
