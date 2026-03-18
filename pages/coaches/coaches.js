var mock = require('../../utils/mock');

Page({
  data: {
    coaches: []
  },

  onLoad: function () {
    var userInfo = wx.getStorageSync('userInfo');
    if (!userInfo) {
      wx.reLaunch({ url: '/pages/login/login' });
      return;
    }
    this.setData({ coaches: mock.coaches || [] });
  },

  goToDetail: function (e) {
    var coachId = e.currentTarget.dataset.id;
    wx.navigateTo({ url: '/pages/coachDetail/coachDetail?coachId=' + coachId });
  }
});
