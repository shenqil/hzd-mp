const state = {
  userInfo: {
    name: "张三",
  },
  count: 0,
};

const mutations = {
  changeUserInfo(state: any, info: any) {
    state.userInfo = info;
  },
  changeCount(state: any, count: number) {
    state.count = count;
  },
};

const actions = {
  setCount({ state, commit }: any) {
    setTimeout(() => {
      commit("changeCount", state.count + 1);
    }, 1000);
  },
};

const getters = {
  userInfo(state: any) {
    return state.userInfo;
  },
  isLogin(state: any) {
    return !!state.userInfo;
  },
  count(state: any) {
    return state.count;
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
