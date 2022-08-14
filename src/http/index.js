import store from "../store/index";

function getToken() {
  return store.state.user.tokenInfo.token;
}

export class HttpServer {
  baseUrl = "";
  defaultOptions = {};
  defaultErrorMessage = "服务异常";
  constructor(baseUrl = "", options = {}) {
    this.baseUrl = baseUrl;
    this.defaultOptions = options;
  }
  get(url, params = {}, options = {}, isFromData = false) {
    return new Promise((resolve, reject) => {
      const _options = {
        header: {
          "content-type": !isFromData ? "application/json" : 'application/x-www-form-urlencoded',
        },
        ...this.defaultOptions,
        ...options,
      };

      // 携带token
      if (getToken() && url != "/xphUser/login") {
        _options.header["token"] = getToken();
      }

      uni.request({
        url: `${this.baseUrl}${url}`,
        method: "GET",
        dataType: "json",
        data: {
          ...params,
        },
        ..._options,
        success: (res) => {
          if (res.statusCode != 200) {
            reject(res.statusCode)
            return
          }
          resolve(res.data);
        },
        fail: (res) => {
          reject(res);
        },
      });
    });
  }
  post(url, params = {}, options = {}) {
    return this.get(url, params, {
      method: "POST",
      ...options,
    });
  }

  postFromData(url, params = {}, options = {}) {
    return this.get(url, params, {
      method: "POST",
      ...options,

    }, true);
  }
}

export const apiServer = new HttpServer("http://47.104.191.212:20010");
export const apiServer2 = new HttpServer("http://47.104.191.212:8005");
export const apiServer3 = new HttpServer("http://47.104.191.212:20003");
export default apiServer;
