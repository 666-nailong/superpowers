App({
  onLaunch() {
    wx.cloud.init({ env: 'cloudbase-d3gdkyzgg6e8355f3' }); // 替换为你的云开发环境ID
  },
  globalData: {
    userInfo: null,
    isDataReady: false
  }
});
