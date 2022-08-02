import store from '../store/index'

function getToken() {
  return (store.state as any).user.tokenInfo.token as string
}

export class HttpServer {
  baseUrl = "";
  defaultOptions = {};
  defaultErrorMessage = "服务异常";
  constructor(baseUrl = "", options = {}) {
    this.baseUrl = baseUrl;
    this.defaultOptions = options;
  }
  get(url: string, params = {}, options = {}) {
    return new Promise((resolve, reject) => {
      const _options = {
        header: {
          "content-type": "application/json",
        },
        ...this.defaultOptions,
        ...options,
      };

      // 携带token
      if (getToken() && url != '/xphUser/login') {
        (_options.header as any)['token'] = getToken();
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
          resolve(res.data);
        },
        fail: (res) => {
          reject(res);
        },
      });
    });
  }
  post(url: string, params = {}, options = {}) {
    return this.get(url, params, {
      method: "POST",
      ...options,
    });
  }
}

export const apiServer = new HttpServer("http://47.104.191.212:20010");
export const apiServer2 = new HttpServer("http://47.104.191.212:8005");
export default apiServer;
