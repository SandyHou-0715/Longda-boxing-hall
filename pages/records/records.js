var mock = require('../../utils/mock');

Page({
  data: {
    groups: [],
    totalCount: 0
  },

  onShow: function () {
    var userInfo = wx.getStorageSync('userInfo');
    if (!userInfo) {
      wx.reLaunch({ url: '/pages/login/login' });
      return;
    }
    this.loadRecords(userInfo);
  },

  loadRecords: function (userInfo) {
    var scheduleKey = 'schedule_' + userInfo.id;
    var schedule = wx.getStorageSync(scheduleKey) || mock.userSchedules[userInfo.id] || [];

    var completed = [];
    for (var i = 0; i < schedule.length; i++) {
      if (schedule[i].status === '已完成') {
        completed.push(schedule[i]);
      }
    }
    completed.sort(function (a, b) { return new Date(b.date) - new Date(a.date); });

    // Group by year-month
    var groupMap = {};
    var groupOrder = [];
    for (var i = 0; i < completed.length; i++) {
      var item = completed[i];
      var parts = item.date.split('-');
      var key = parts[0] + '年' + parseInt(parts[1], 10) + '月';
      if (!groupMap[key]) {
        groupMap[key] = [];
        groupOrder.push(key);
      }
      groupMap[key].push(item);
    }

    var groups = [];
    for (var j = 0; j < groupOrder.length; j++) {
      groups.push({ month: groupOrder[j], items: groupMap[groupOrder[j]] });
    }

    this.setData({ groups: groups, totalCount: completed.length });
  }
});
