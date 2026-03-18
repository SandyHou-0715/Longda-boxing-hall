var app = getApp();
var mock = require('../../utils/mock');
var util = require('../../utils/util');

Page({
  data: {
    userInfo: null,
    currentCampus: null,
    todayStr: '',
    remainingClasses: 0,
    consecutiveCheckIn: 0,
    recentSchedule: [],
    banners: [],
    announcements: [],
    currentAnnouncement: '',
    coachPreview: [],
    memberCards: null
  },

  _announcementTimer: null,
  _announcementIndex: 0,

  onLoad: function () {
    this.loadData();
  },

  onShow: function () {
    var userInfo = wx.getStorageSync('userInfo');
    if (!userInfo) {
      wx.reLaunch({ url: '/pages/login/login' });
      return;
    }
    this.loadData();
  },

  onUnload: function () {
    if (this._announcementTimer) {
      clearInterval(this._announcementTimer);
      this._announcementTimer = null;
    }
  },

  onHide: function () {
    if (this._announcementTimer) {
      clearInterval(this._announcementTimer);
      this._announcementTimer = null;
    }
  },

  loadData: function () {
    var userInfo = wx.getStorageSync('userInfo');
    if (!userInfo) return;

    var currentCampus = wx.getStorageSync('currentCampus') || mock.campuses[0];
    var remaining = userInfo.remainingClasses || 0;
    var consecutiveCheckIn = userInfo.consecutiveCheckIn || 0;

    // 获取近期课程
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

    upcoming.sort(function (a, b) { return new Date(a.date) - new Date(b.date); });
    completed.sort(function (a, b) { return new Date(b.date) - new Date(a.date); });

    var recent = upcoming.slice(0, 3).concat(completed.slice(0, 2));
    recent.sort(function (a, b) { return new Date(a.date) - new Date(b.date); });

    for (var i = 0; i < recent.length; i++) {
      recent[i].dateDisplay = util.formatDate(recent[i].date);
      recent[i].dayOfWeek = util.getDayOfWeek(recent[i].date);
      recent[i].statusClass = util.getStatusClass(recent[i].status);
    }

    var now = new Date();
    var todayDisplay = now.getFullYear() + '年' + (now.getMonth() + 1) + '月' + now.getDate() + '日';

    var announcements = mock.announcements || [];
    var that = this;
    this._announcementIndex = 0;

    if (this._announcementTimer) {
      clearInterval(this._announcementTimer);
    }
    this._announcementTimer = setInterval(function () {
      that._announcementIndex = (that._announcementIndex + 1) % announcements.length;
      that.setData({ currentAnnouncement: announcements[that._announcementIndex] });
    }, 3000);

    this.setData({
      userInfo: userInfo,
      currentCampus: currentCampus,
      todayStr: todayDisplay,
      remainingClasses: remaining,
      consecutiveCheckIn: consecutiveCheckIn,
      recentSchedule: recent,
      banners: mock.banners || [],
      announcements: announcements,
      currentAnnouncement: announcements.length > 0 ? announcements[0] : '',
      coachPreview: (mock.coaches || []).slice(0, 5),
      memberCards: mock.memberCards || null
    });
  },

  goToSchedule: function () {
    wx.navigateTo({ url: '/pages/schedule/schedule' });
  },

  goToBooking: function () {
    wx.switchTab({ url: '/pages/booking/booking' });
  },

  goToPoints: function () {
    wx.navigateTo({ url: '/pages/points/points' });
  },

  goToCheckin: function () {
    wx.navigateTo({ url: '/pages/checkin/checkin' });
  },

  goToCoaches: function () {
    wx.navigateTo({ url: '/pages/coaches/coaches' });
  },

  goToRecords: function () {
    wx.navigateTo({ url: '/pages/records/records' });
  },

  goToMemberCard: function () {
    wx.navigateTo({ url: '/pages/membercard/membercard' });
  },

  goToProfile: function () {
    wx.switchTab({ url: '/pages/profile/profile' });
  },

  goToCardDetail: function (e) {
    var type = e.currentTarget.dataset.type;
    var id = e.currentTarget.dataset.id;
    wx.navigateTo({ url: '/pages/cardDetail/cardDetail?type=' + type + '&id=' + id });
  },

  switchCampus: function () {
    wx.navigateTo({ url: '/pages/campus/campus' });
  }
});

