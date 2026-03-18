var mock = require('../../utils/mock');
var util = require('../../utils/util');

Page({
  data: {
    courseList: [],
    filteredList: [],
    remainingClasses: 0,
    userInfo: null,
    coaches: [],
    selectedCoachId: null
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
    this.setData({ userInfo: userInfo });

    var remaining = userInfo.remainingClasses || 0;

    var scheduleKey = 'schedule_' + userInfo.id;
    var schedule = wx.getStorageSync(scheduleKey) || mock.userSchedules[userInfo.id] || [];

    var bookedIds = {};
    for (var i = 0; i < schedule.length; i++) {
      if (schedule[i].status === '待上课' && schedule[i].bookingId) {
        bookedIds[schedule[i].bookingId] = true;
      }
    }

    var courseList = mock.availableBookings.map(function (item) {
      var seatsLeft = item.maxCapacity - item.currentEnrollment;
      return Object.assign({}, item, {
        dateDisplay: util.formatDate(item.date),
        dayOfWeek: util.getDayOfWeek(item.date),
        difficultyClass: util.getDifficultyClass(item.difficulty),
        seatsLeft: Math.max(0, seatsLeft),
        booked: !!bookedIds[item.id]
      });
    });

    // 构建教练列表（去重）
    var coachMap = {};
    var coaches = [{ id: null, name: '全部', avatar: '全' }];
    for (var i = 0; i < mock.coaches.length; i++) {
      var c = mock.coaches[i];
      if (!coachMap[c.id]) {
        coachMap[c.id] = true;
        coaches.push({ id: c.id, name: c.name, avatar: c.avatar });
      }
    }

    var selectedCoachId = this.data.selectedCoachId;
    var filtered = this.filterByCoach(courseList, selectedCoachId);

    this.setData({
      courseList: courseList,
      filteredList: filtered,
      remainingClasses: remaining,
      coaches: coaches
    });
  },

  filterByCoach: function (list, coachId) {
    if (coachId === null || coachId === undefined) return list;
    var coachName = null;
    for (var i = 0; i < mock.coaches.length; i++) {
      if (mock.coaches[i].id === coachId) {
        coachName = mock.coaches[i].name;
        break;
      }
    }
    if (!coachName) return list;
    return list.filter(function (item) { return item.coach === coachName; });
  },

  selectCoach: function (e) {
    var rawId = e.currentTarget.dataset.id;
    // dataset converts null to 'null' string; normalize to null for "all" selection
    var coachId = (rawId === null || rawId === 'null' || rawId === undefined) ? null : Number(rawId);
    this.setData({ selectedCoachId: coachId });
    var filtered = this.filterByCoach(this.data.courseList, coachId);
    this.setData({ filteredList: filtered });
  },

  bookCourse: function (e) {
    var id = e.currentTarget.dataset.id;
    var that = this;
    var userInfo = this.data.userInfo;

    var course = null;
    for (var i = 0; i < mock.availableBookings.length; i++) {
      if (mock.availableBookings[i].id === id) {
        course = mock.availableBookings[i];
        break;
      }
    }
    if (!course) return;

    if ((userInfo.remainingClasses || 0) <= 0) {
      wx.showToast({ title: '课时不足，请续费', icon: 'none' });
      return;
    }

    wx.showModal({
      title: '确认预约',
      content: '预约 ' + course.courseName + '\n' + course.date + ' ' + course.time + '\n' + course.location,
      confirmColor: '#ff2d55',
      success: function (res) {
        if (res.confirm) {
          userInfo.usedClasses = (userInfo.usedClasses || 0) + 1;
          userInfo.remainingClasses = Math.max(0, (userInfo.remainingClasses || 0) - 1);
          wx.setStorageSync('userInfo', userInfo);

          var scheduleKey = 'schedule_' + userInfo.id;
          var schedule = wx.getStorageSync(scheduleKey) || [];

          var newRecord = {
            id: Date.now(),
            bookingId: course.id,
            courseName: course.courseName,
            coach: course.coach,
            date: course.date,
            time: course.time,
            duration: course.duration,
            location: course.location,
            status: '待上课'
          };

          schedule.push(newRecord);
          wx.setStorageSync(scheduleKey, schedule);

          wx.showToast({ title: '预约成功！', icon: 'success' });
          that.loadData(userInfo);
        }
      }
    });
  },

  cancelBooking: function (e) {
    var id = e.currentTarget.dataset.id;
    var that = this;
    var userInfo = this.data.userInfo;

    wx.showModal({
      title: '取消预约',
      content: '确定要取消这个预约吗？课时将退还。',
      confirmColor: '#ff2d55',
      success: function (res) {
        if (res.confirm) {
          var scheduleKey = 'schedule_' + userInfo.id;
          var schedule = wx.getStorageSync(scheduleKey) || [];

          for (var i = 0; i < schedule.length; i++) {
            if (schedule[i].bookingId === id && schedule[i].status === '待上课') {
              schedule[i].status = '已取消';
              break;
            }
          }

          userInfo.usedClasses = Math.max(0, (userInfo.usedClasses || 0) - 1);
          userInfo.remainingClasses = (userInfo.remainingClasses || 0) + 1;
          wx.setStorageSync('userInfo', userInfo);
          wx.setStorageSync(scheduleKey, schedule);

          wx.showToast({ title: '已取消预约，课时已退还', icon: 'success' });
          that.loadData(userInfo);
        }
      }
    });
  }
});
