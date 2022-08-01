export const showErrorMsg = (res: any, defaultMessage: string) => {
  const { error, message, error_description } = res || {};
  const msg =
    error?.details?.[0]?.message ||
    error?.message ||
    message ||
    error_description;
  uni.showToast({
    title: msg || defaultMessage,
    icon: "none",
    duration: 2000,
  });
};

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

      // // 携带token
      // if (store.getters["user/authorization"]) {
      //   _options.header.authorization = store.getters["user/authorization"];
      // }

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
  errorHandler(res: any) {
    // wx.hideLoading会关闭toast提示，故此给一个延迟
    setTimeout(() => {
      showErrorMsg(res, this.defaultErrorMessage);
    }, 0);
  }
}

const apiServer = new HttpServer(/**服务器基础URL**/)
export default apiServer