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

export const apiServer = new HttpServer("https://jxdd.hzdny.cn:44300/base");
export const apiServer2 = new HttpServer("https://jxdd.hzdny.cn:44300/xph");
export const apiServer3 = new HttpServer("https://jxdd.hzdny.cn:44300/datacenter");
export const apiServer4 = new HttpServer("https://jxdd.hzdny.cn:44300/plant");
export const apiServer5 = new HttpServer("https://jxdd.hzdny.cn:44300/xph");
export const apiServer6 = new HttpServer("https://open.ys7.com/api/lapp");
export const apiServer7 = new HttpServer("http://47.105.215.208:8005");


export default apiServer;
