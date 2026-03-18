Page({
  data: {
    userInfo: null,
    progressPercent: 0,
    daysLeft: 0
  },

  onShow: function () {
    var userInfo = wx.getStorageSync('userInfo');
    if (!userInfo) {
      wx.reLaunch({ url: '/pages/login/login' });
      return;
    }
    this.loadData(userInfo);
  },

  loadData: function (userInfo) {
    var total = userInfo.totalClasses || 0;
    var used = userInfo.usedClasses || 0;
    var progress = total > 0 ? Math.round((used / total) * 100) : 0;

    var expiry = userInfo.memberExpiry || '';
    var daysLeft = 0;
    if (expiry) {
      var today = new Date();
      today.setHours(0, 0, 0, 0);
      var expiryDate = new Date(expiry);
      expiryDate.setHours(0, 0, 0, 0);
      var diff = expiryDate - today;
      daysLeft = Math.max(0, Math.round(diff / (1000 * 60 * 60 * 24)));
    }

    this.setData({
      userInfo: userInfo,
      progressPercent: progress,
      daysLeft: daysLeft
    });
  }
});
