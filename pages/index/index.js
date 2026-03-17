var app = getApp();
var mock = require('../../utils/mock');
var util = require('../../utils/util');

Page({
  data: {
    userInfo: null,
    todayStr: '',
    remainingClasses: 0,
    progressPercent: 0,
    recentSchedule: [],
    upcomingCount: 0
  },

  onLoad: function () {
    this.loadData();
  },

  onShow: function () {
    // 检查登录状态
    var userInfo = wx.getStorageSync('userInfo');
    if (!userInfo) {
      wx.reLaunch({ url: '/pages/login/login' });
      return;
    }
    // 每次显示时刷新数据（预约后回来需要更新）
    this.loadData();
  },

  loadData: function () {
    var userInfo = wx.getStorageSync('userInfo');
    if (!userInfo) return;

    var pkg = userInfo.package;
    var remaining = pkg.total - pkg.used;
    var progress = util.calcProgress(pkg.used, pkg.total);

    // 获取近期课程（未来5节待上课 + 最近已完成2节）
    var scheduleKey = 'schedule_' + userInfo.id;
    var schedule = wx.getStorageSync(scheduleKey) || mock.userSchedules[userInfo.id] || [];

    var today = util.getTodayStr();
    var upcoming = [];
    var completed = [];

    for (var i = 0; i < schedule.length; i++) {
      var item = schedule[i];
      if (item.status === '待上课' && item.date >= today) {
        upcoming.push(item);
      } else if (item.status === '已完成') {
        completed.push(item);
      }
    }

    // Sort upcoming ascending, completed descending
    upcoming.sort(function (a, b) { return new Date(a.date) - new Date(b.date); });
    completed.sort(function (a, b) { return new Date(b.date) - new Date(a.date); });

    var recent = upcoming.slice(0, 3).concat(completed.slice(0, 2));
    recent.sort(function (a, b) { return new Date(a.date) - new Date(b.date); });

    // Enrich with display fields
    for (var i = 0; i < recent.length; i++) {
      recent[i].dateDisplay = util.formatDate(recent[i].date);
      recent[i].dayOfWeek = util.getDayOfWeek(recent[i].date);
      recent[i].statusClass = util.getStatusClass(recent[i].status);
    }

    // Format today's date
    var now = new Date();
    var todayDisplay = now.getFullYear() + '年' + (now.getMonth() + 1) + '月' + now.getDate() + '日';

    this.setData({
      userInfo: userInfo,
      todayStr: todayDisplay,
      remainingClasses: remaining,
      progressPercent: progress,
      recentSchedule: recent,
      upcomingCount: upcoming.length
    });
  },

  goToSchedule: function () {
    wx.switchTab({ url: '/pages/schedule/schedule' });
  },

  goToBooking: function () {
    wx.switchTab({ url: '/pages/booking/booking' });
  },

  goToPoints: function () {
    wx.navigateTo({ url: '/pages/points/points' });
  },

  goToProfile: function () {
    wx.switchTab({ url: '/pages/profile/profile' });
  }
});
