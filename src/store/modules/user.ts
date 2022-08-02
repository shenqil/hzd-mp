import auth from '@/api/auth';

function getStorageInfo(key:string) {
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
  changeUserInfo(state: any, info: any) {
    state.userInfo = info;
  },
  changeLowerRole(state: any, role: any) {
    state.lowerRole = role;
  },
  setTokenInfo(state: any, token: any) {
    state.tokenInfo = token;
    uni.setStorage({
      key: "token_key",
      data: JSON.stringify(token),
    });
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
  async login({ commit }: any,{username,password}:any) {
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
  userInfo(state: any) {
    return state.user;
  },
  isLogin(state: any) {
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
