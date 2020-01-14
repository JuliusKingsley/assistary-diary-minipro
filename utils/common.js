const configs = require("./config.js");

const common = {
  api: configs.api,
  getAppId: () => {
    let appId = common.get(configs.key.appId);
    if (!appId) {
      appId = wx.getAccountInfoSync().miniProgram.appId;
      common.set(configs.key.appId, appId)
    }
    return appId;
  },
  getCode: () => {
    return new Promise(
      (resolve, reject) => {
        wx.login({
          success: res => resolve(res.code)
        });
      }
    );
  },

  request: {
    post: (url, data) => {
      return common.request.base(url, "POST", data);
    },
    get: (url, data) => {
      return common.request.base(url, "GET", data);
    },
    base: (url, method, data) => {
      return new Promise((resolve, reject) => {
        wx.showLoading();
        wx.request({
          url: configs.domain + url,
          method,
          data,
          success: result => {
            resolve(result.data);
          },
          complete: () => {
            wx.hideLoading();
          }
        });
      });
    }
  },

  get: (key) => wx.getStorageSync(key),
  set: (key, data) => wx.setStorageSync(key, data)
}

module.exports = common