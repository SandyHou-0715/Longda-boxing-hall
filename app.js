App({
  onLaunch: function () {
    var userInfo = wx.getStorageSync('userInfo');
    this.globalData.userInfo = userInfo || null;
  },

  globalData: {
    userInfo: null
  }
});
