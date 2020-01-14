// pages/api/api.js
const common = require("../../utils/common.js");

Page({
  test: async() => {
    const url = common.api.test;
    const message = await common.request.post(url, {});
    wx.showToast({
      icon:"none",
      title: message,
    });
  },

  login: async() => {
    const url = common.api.login;
    const appId = common.getAppId();
    const code = await common.getCode();

    const userInfo = await common.request.post(url, {
      appId,
      code
    });

    common.set(common.key.login, userInfo);
  }
})