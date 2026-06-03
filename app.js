App({
  onLaunch() {
    wx.cloud.init({ env: '电路分析学习助手' }); // 替换为你的云开发环境ID
  },
  globalData: {
    userInfo: null,
    isDataReady: false
  }
});
