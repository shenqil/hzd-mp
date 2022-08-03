import auth from '@/api/auth';

function getStorageInfo(key) {
  const t = uni.getStorageSync(key)
  try {
      if(t) {
          const info = JSON.parse(t)
          return info
      }
  } catch (error) {
      console.error(error)
  }

  return {}
}

const state = {
  tokenInfo: getStorageInfo('token_key'),
  user: getStorageInfo('user_key'),
  lowerRole: getStorageInfo('role_key')
};

const mutations = {
  changeUserInfo(state, info) {
    state.userInfo = info;
    uni.setStorage({
      key: "user_key",
      data: JSON.stringify(token),
    });
  },
  changeLowerRole(state, role) {
    state.lowerRole = role;
    uni.setStorage({
      key: "role_key",
      data: JSON.stringify(role),
    });
  },
  setTokenInfo(state, token) {
    state.tokenInfo = token;
    uni.setStorage({
      key: "token_key",
      data: JSON.stringify(token),
    });
  },
};

const actions = {
  async login({ commit },{username,password}) {
    const res = await auth.login({
      username,
      password
    })
    
    if(!res.token) {
      throw res.message
    }

    commit("setTokenInfo", {
      token: res.token,
      expiration: res.expiration,
      userId: res.userId
    })

    commit("changeUserInfo", res.user)
    commit("changeLowerRole", res.lowerRole)
  } 
};

const getters = {
  userInfo(state) {
    return state.user;
  },
  isLogin(state) {
    return !!state.tokenInfo.token;
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
