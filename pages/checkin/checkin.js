var mock = require('../../utils/mock');

Page({
  data: {
    userInfo: null,
    todayStr: '',
    todayFull: '',
    checkedInToday: false,
    consecutiveCheckIn: 0,
    calendarDays: [],
    calendarYear: 0,
    calendarMonth: 0,
    rewards: [
      { days: 7, points: 50, desc: '连续7天签到奖励50积分' },
      { days: 14, points: 120, desc: '连续14天签到奖励120积分' },
      { days: 30, points: 300, desc: '连续30天签到奖励300积分+私教课1节' }
    ]
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
    var today = new Date();
    var todayStr = today.toISOString().split('T')[0];
    var month = today.getMonth() + 1;
    var todayFull = today.getFullYear() + '年' + month + '月' + today.getDate() + '日';

    var checkinKey = 'checkin_' + userInfo.id;
    var savedRecords = wx.getStorageSync(checkinKey);
    var records;
    if (savedRecords && savedRecords.length > 0) {
      records = savedRecords;
    } else {
      records = mock.checkinRecords[userInfo.id] || [];
      wx.setStorageSync(checkinKey, records);
    }

    var checkedInToday = false;
    for (var i = 0; i < records.length; i++) {
      if (records[i].date === todayStr) {
        checkedInToday = true;
        break;
      }
    }

    // Update checkedInToday on userInfo
    userInfo.checkedInToday = checkedInToday;

    var calendar = this.generateCalendar(today, records);

    this.setData({
      userInfo: userInfo,
      todayStr: todayStr,
      todayFull: todayFull,
      checkedInToday: checkedInToday,
      consecutiveCheckIn: userInfo.consecutiveCheckIn || 0,
      calendarDays: calendar.days,
      calendarYear: today.getFullYear(),
      calendarMonth: month
    });
  },

  generateCalendar: function (today, records) {
    var year = today.getFullYear();
    var month = today.getMonth();
    var firstDay = new Date(year, month, 1).getDay();
    var daysInMonth = new Date(year, month + 1, 0).getDate();
    var todayDate = today.getDate();
    var todayStr = today.toISOString().split('T')[0];

    // Build set of checked-in dates for this month
    var checkinSet = {};
    for (var i = 0; i < records.length; i++) {
      checkinSet[records[i].date] = true;
    }

    var days = [];
    // Empty cells before first day
    for (var i = 0; i < firstDay; i++) {
      days.push({ date: '', empty: true, checked: false, isToday: false });
    }
    for (var d = 1; d <= daysInMonth; d++) {
      var mm = (month + 1) < 10 ? '0' + (month + 1) : '' + (month + 1);
      var dd = d < 10 ? '0' + d : '' + d;
      var dateStr = year + '-' + mm + '-' + dd;
      days.push({
        date: d,
        empty: false,
        checked: !!checkinSet[dateStr],
        isToday: d === todayDate
      });
    }

    return { days: days };
  },

  doCheckin: function () {
    var that = this;
    var userInfo = this.data.userInfo;
    if (!userInfo) return;
    if (this.data.checkedInToday) {
      wx.showToast({ title: '今日已签到', icon: 'none' });
      return;
    }

    var todayStr = this.data.todayStr;
    var checkinKey = 'checkin_' + userInfo.id;
    var records = wx.getStorageSync(checkinKey) || [];

    var newRecord = {
      id: userInfo.id * 100000 + records.length + 1,
      date: todayStr,
      points: 5,
      note: '签到打卡 +5积分'
    };
    records.push(newRecord);
    wx.setStorageSync(checkinKey, records);

    // Update user points and consecutiveCheckIn
    userInfo.points = (userInfo.points || 0) + 5;

    // Check if yesterday was checked in to determine consecutive streak
    var yesterday = new Date(todayStr);
    yesterday.setDate(yesterday.getDate() - 1);
    var yesterdayStr = yesterday.toISOString().split('T')[0];
    var checkedYesterday = false;
    for (var j = 0; j < records.length - 1; j++) {
      if (records[j].date === yesterdayStr) {
        checkedYesterday = true;
        break;
      }
    }
    userInfo.consecutiveCheckIn = checkedYesterday ? (userInfo.consecutiveCheckIn || 0) + 1 : 1;
    userInfo.checkedInToday = true;
    wx.setStorageSync('userInfo', userInfo);

    var today = new Date();
    var calendar = that.generateCalendar(today, records);

    that.setData({
      userInfo: userInfo,
      checkedInToday: true,
      consecutiveCheckIn: userInfo.consecutiveCheckIn,
      calendarDays: calendar.days
    });

    wx.showToast({ title: '签到成功！+5积分', icon: 'success', duration: 2000 });
  }
});
