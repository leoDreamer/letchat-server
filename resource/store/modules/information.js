import * as types from "../types";

const state = {
  projects: [],
  blogs: [],
  introduce: {
    skills: [],
    experiences: []
  }
};

const getters = {};

const mutations = {
  [types.INFORMATION_CREATE] (state, information) {
    state.introduce.skills.push(...information.skills);
    state.introduce.experiences.push(...information.experiences);
    state.projects.push(...information.projects);
    state.blogs.push(...information.blogs);
  }
};

const actions = {
  createInformation ({ commit }) {
    this._vm.axios.get("/data/index").then(resp => {
        const data = resp.data.data.introduce;
        commit(types.INFORMATION_CREATE, {
            skills: data.skills,
            experiences: data.experiences,
            projects: data.projects,
            blogs: resp.data.data.blogs
        });
    });
  }
};

export {
  state, getters, actions, mutations
};
