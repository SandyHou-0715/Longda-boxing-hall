var mock = require('../../utils/mock');
var util = require('../../utils/util');

Page({
  data: {
    userInfo: null,
    maskedPhone: '',
    remainingClasses: 0,
    completedCount: 0,
    consecutiveCheckIn: 0
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
    var remaining = userInfo.remainingClasses || 0;
    var consecutiveCheckIn = userInfo.consecutiveCheckIn || 0;

    var phone = userInfo.phone || '';
    var masked = phone.length === 11
      ? phone.substring(0, 3) + '****' + phone.substring(7)
      : phone;

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
      consecutiveCheckIn: consecutiveCheckIn
    });
  },

  goToPoints: function () {
    wx.navigateTo({ url: '/pages/points/points' });
  },

  goToSchedule: function () {
    wx.navigateTo({ url: '/pages/schedule/schedule' });
  },

  goToBooking: function () {
    wx.switchTab({ url: '/pages/booking/booking' });
  },

  goToCheckin: function () {
    wx.switchTab({ url: '/pages/checkin/checkin' });
  },

  goToRecords: function () {
    wx.navigateTo({ url: '/pages/records/records' });
  },

  goToMemberCard: function () {
    wx.navigateTo({ url: '/pages/membercard/membercard' });
  },

  goToCoaches: function () {
    wx.navigateTo({ url: '/pages/coaches/coaches' });
  },

  goToAbout: function () {
    wx.navigateTo({ url: '/pages/about/about' });
  },

  goToSettings: function () {
    wx.navigateTo({ url: '/pages/settings/settings' });
  },

  logout: function () {
    wx.showModal({
      title: '退出登录',
      content: '确定要退出当前账号吗？',
      confirmColor: '#e63946',
      success: function (res) {
        if (res.confirm) {
          wx.removeStorageSync('userInfo');
          wx.reLaunch({ url: '/pages/login/login' });
        }
      }
    });
  }
});

