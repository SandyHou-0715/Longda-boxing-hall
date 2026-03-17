var mock = require('../../utils/mock');
var util = require('../../utils/util');

Page({
  data: {
    userInfo: null,
    maskedPhone: '',
    remainingClasses: 0,
    completedCount: 0,
    progressPercent: 0
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
    var pkg = userInfo.package;
    var remaining = pkg.total - pkg.used;
    var progress = util.calcProgress(pkg.used, pkg.total);

    // 手机号脱敏
    var phone = userInfo.phone || '';
    var masked = phone.length === 11
      ? phone.substring(0, 3) + '****' + phone.substring(7)
      : phone;

    // 已完成课程数
    var scheduleKey = 'schedule_' + userInfo.id;
    var schedule = wx.getStorageSync(scheduleKey) || mock.userSchedules[userInfo.id] || [];
    var completedCount = 0;
    for (var i = 0; i < schedule.length; i++) {
      if (schedule[i].status === '已完成') completedCount++;
    }

    this.setData({
      userInfo: userInfo,
      maskedPhone: masked,
      remainingClasses: remaining,
      completedCount: completedCount,
      progressPercent: progress
    });
  },

  goToPoints: function () {
    wx.navigateTo({ url: '/pages/points/points' });
  },

  goToSchedule: function () {
    wx.switchTab({ url: '/pages/schedule/schedule' });
  },

  goToBooking: function () {
    wx.switchTab({ url: '/pages/booking/booking' });
  },

  logout: function () {
    var that = this;
    wx.showModal({
      title: '退出登录',
      content: '确定要退出当前账号吗？',
      confirmColor: '#c0392b',
      success: function (res) {
        if (res.confirm) {
          wx.removeStorageSync('userInfo');
          wx.reLaunch({ url: '/pages/login/login' });
        }
      }
    });
  }
});
