var mock = require('../../utils/mock');
var util = require('../../utils/util');

Page({
  data: {
    courseList: [],
    remainingClasses: 0,
    userInfo: null
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

    // 获取用户已预约的课程ID列表（从课程表中找出"待上课"状态的预约课程）
    var scheduleKey = 'schedule_' + userInfo.id;
    var schedule = wx.getStorageSync(scheduleKey) || mock.userSchedules[userInfo.id] || [];

    // 收集已预约的课程（通过bookingId标记）
    var bookedIds = {};
    for (var i = 0; i < schedule.length; i++) {
      if (schedule[i].status === '待上课' && schedule[i].bookingId) {
        bookedIds[schedule[i].bookingId] = true;
      }
    }

    // 处理可预约课程列表
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

    this.setData({
      courseList: courseList,
      remainingClasses: remaining
    });
  },

  bookCourse: function (e) {
    var id = e.currentTarget.dataset.id;
    var that = this;
    var userInfo = this.data.userInfo;

    // 找到要预约的课程
    var course = null;
    for (var i = 0; i < mock.availableBookings.length; i++) {
      if (mock.availableBookings[i].id === id) {
        course = mock.availableBookings[i];
        break;
      }
    }
    if (!course) return;

    // 检查课时
    if ((userInfo.remainingClasses || 0) <= 0) {
      wx.showToast({ title: '课时不足，请续费', icon: 'none' });
      return;
    }

    wx.showModal({
      title: '确认预约',
      content: '预约 ' + course.courseName + '\n' + course.date + ' ' + course.time + '\n' + course.location,
      confirmColor: '#c0392b',
      success: function (res) {
        if (res.confirm) {
          // 扣减课时
          userInfo.usedClasses = (userInfo.usedClasses || 0) + 1;
          userInfo.remainingClasses = Math.max(0, (userInfo.remainingClasses || 0) - 1);
          wx.setStorageSync('userInfo', userInfo);

          // 添加到课程表
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
      confirmColor: '#c0392b',
      success: function (res) {
        if (res.confirm) {
          // 从课程表中移除
          var scheduleKey = 'schedule_' + userInfo.id;
          var schedule = wx.getStorageSync(scheduleKey) || [];

          for (var i = 0; i < schedule.length; i++) {
            if (schedule[i].bookingId === id && schedule[i].status === '待上课') {
              schedule[i].status = '已取消';
              break;
            }
          }

          // 退还课时
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
