var mock = require('../../utils/mock');
var util = require('../../utils/util');

Page({
  data: {
    allList: [],
    filteredList: [],
    activeFilter: 'all',
    totalCount: 0,
    pendingCount: 0,
    completedCount: 0,
    cancelledCount: 0
  },

  onShow: function () {
    var userInfo = wx.getStorageSync('userInfo');
    if (!userInfo) {
      wx.reLaunch({ url: '/pages/login/login' });
      return;
    }
    this.loadSchedule(userInfo);
  },

  loadSchedule: function (userInfo) {
    var scheduleKey = 'schedule_' + userInfo.id;
    var schedule = wx.getStorageSync(scheduleKey) || mock.userSchedules[userInfo.id] || [];

    // 计算各状态数量
    var pending = 0, completed = 0, cancelled = 0;
    for (var i = 0; i < schedule.length; i++) {
      var s = schedule[i].status;
      if (s === '待上课') pending++;
      else if (s === '已完成') completed++;
      else if (s === '已取消') cancelled++;
    }

    // 为每条记录添加显示字段
    var enriched = schedule.map(function (item) {
      return Object.assign({}, item, {
        dateDisplay: util.formatDate(item.date),
        dayOfWeek: util.getDayOfWeek(item.date),
        statusClass: util.getStatusClass(item.status)
      });
    });

    // 按日期排序（最新在前）
    enriched.sort(function (a, b) { return new Date(b.date) - new Date(a.date); });

    this.setData({
      allList: enriched,
      totalCount: schedule.length,
      pendingCount: pending,
      completedCount: completed,
      cancelledCount: cancelled
    });

    this.applyFilter(this.data.activeFilter, enriched);
  },

  setFilter: function (e) {
    var filter = e.currentTarget.dataset.filter;
    this.setData({ activeFilter: filter });
    this.applyFilter(filter, this.data.allList);
  },

  applyFilter: function (filter, list) {
    var filtered;
    if (filter === 'all') {
      filtered = list;
    } else {
      filtered = list.filter(function (item) {
        return item.status === filter;
      });
    }
    this.setData({ filteredList: filtered });
  },

  cancelCourse: function (e) {
    var id = e.currentTarget.dataset.id;
    var that = this;

    wx.showModal({
      title: '确认取消',
      content: '确定要取消这节课程吗？取消后将退还课时。',
      confirmColor: '#c0392b',
      success: function (res) {
        if (res.confirm) {
          var userInfo = wx.getStorageSync('userInfo');
          var scheduleKey = 'schedule_' + userInfo.id;
          var schedule = wx.getStorageSync(scheduleKey) || [];

          // 标记为已取消并退还课时
          var found = false;
          for (var i = 0; i < schedule.length; i++) {
            if (schedule[i].id === id) {
              schedule[i].status = '已取消';
              found = true;
              break;
            }
          }

          if (found) {
            // 退还课时
            userInfo.usedClasses = Math.max(0, (userInfo.usedClasses || 0) - 1);
            userInfo.remainingClasses = (userInfo.remainingClasses || 0) + 1;
            wx.setStorageSync('userInfo', userInfo);
            wx.setStorageSync(scheduleKey, schedule);

            wx.showToast({ title: '已取消，课时已退还', icon: 'success' });
            that.loadSchedule(userInfo);
          }
        }
      }
    });
  },

  goToBooking: function () {
    wx.switchTab({ url: '/pages/booking/booking' });
  }
});
