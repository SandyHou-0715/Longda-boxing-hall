// ===== 用户数据 =====
var users = [
  {
    id: 1,
    username: 'zhang_san',
    phone: '13800138001',
    password: '123456',
    name: '张三',
    avatar: '张',
    level: '黑带一段',
    memberLevel: '金牌会员',
    joinDate: '2023-01-15',
    package: {
      name: '季度套餐',
      total: 36,
      used: 22,
      expireDate: '2026-06-30'
    },
    points: 1280
  },
  {
    id: 2,
    username: 'li_si',
    phone: '13800138002',
    password: '123456',
    name: '李四',
    avatar: '李',
    level: '红带',
    memberLevel: '银牌会员',
    joinDate: '2023-06-20',
    package: {
      name: '月度套餐',
      total: 12,
      used: 8,
      expireDate: '2026-04-30'
    },
    points: 640
  },
  {
    id: 3,
    username: 'wang_wu',
    phone: '13800138003',
    password: '123456',
    name: '王五',
    avatar: '王',
    level: '蓝带',
    memberLevel: '金牌会员',
    joinDate: '2024-02-10',
    package: {
      name: '年度套餐',
      total: 120,
      used: 45,
      expireDate: '2026-12-31'
    },
    points: 2560
  },
  {
    id: 4,
    username: 'zhao_liu',
    phone: '13800138004',
    password: '123456',
    name: '赵六',
    avatar: '赵',
    level: '白带',
    memberLevel: '普通会员',
    joinDate: '2024-09-01',
    package: {
      name: '月度套餐',
      total: 12,
      used: 3,
      expireDate: '2026-04-15'
    },
    points: 180
  },
  {
    id: 5,
    username: 'chen_qi',
    phone: '13800138005',
    password: '123456',
    name: '陈七',
    avatar: '陈',
    level: '黑带二段',
    memberLevel: '钻石会员',
    joinDate: '2022-05-05',
    package: {
      name: '年度套餐',
      total: 120,
      used: 98,
      expireDate: '2026-05-31'
    },
    points: 5800
  }
];

// ===== 教练数据 =====
var coaches = [
  { id: 1, name: '金教练', specialty: '基础跆拳道', level: '黑带四段' },
  { id: 2, name: '朴教练', specialty: '竞技跆拳道', level: '黑带三段' },
  { id: 3, name: '李教练', specialty: '品势训练', level: '黑带三段' },
  { id: 4, name: '刘教练', specialty: '青少年班', level: '黑带二段' }
];

// ===== 可预约课程模板 =====
var courseTemplates = [
  {
    id: 101,
    name: '基础跆拳道',
    coachId: 1,
    duration: 60,
    difficulty: '初级',
    maxCapacity: 20,
    location: 'A训练馆',
    description: '适合初学者的基础课程，学习基本动作和礼仪。',
    schedule: [
      { dayOfWeek: 1, time: '09:00' },
      { dayOfWeek: 3, time: '09:00' },
      { dayOfWeek: 5, time: '09:00' }
    ]
  },
  {
    id: 102,
    name: '竞技训练',
    coachId: 2,
    duration: 90,
    difficulty: '高级',
    maxCapacity: 12,
    location: 'B训练馆',
    description: '针对参加比赛的学员，提升技术和体能。',
    schedule: [
      { dayOfWeek: 2, time: '18:30' },
      { dayOfWeek: 4, time: '18:30' },
      { dayOfWeek: 6, time: '10:00' }
    ]
  },
  {
    id: 103,
    name: '品势专项',
    coachId: 3,
    duration: 75,
    difficulty: '中级',
    maxCapacity: 15,
    location: 'A训练馆',
    description: '专注品势套路练习，适合备赛或提升段位。',
    schedule: [
      { dayOfWeek: 1, time: '18:00' },
      { dayOfWeek: 3, time: '18:00' },
      { dayOfWeek: 5, time: '18:00' }
    ]
  },
  {
    id: 104,
    name: '青少年班',
    coachId: 4,
    duration: 60,
    difficulty: '初级',
    maxCapacity: 25,
    location: 'C训练馆',
    description: '专为8-14岁青少年设计，寓教于乐。',
    schedule: [
      { dayOfWeek: 2, time: '16:00' },
      { dayOfWeek: 4, time: '16:00' },
      { dayOfWeek: 6, time: '14:00' }
    ]
  },
  {
    id: 105,
    name: '体能强化',
    coachId: 2,
    duration: 60,
    difficulty: '中级',
    maxCapacity: 18,
    location: 'B训练馆',
    description: '以体能训练为主，增强力量、速度和耐力。',
    schedule: [
      { dayOfWeek: 1, time: '20:00' },
      { dayOfWeek: 3, time: '20:00' },
      { dayOfWeek: 5, time: '20:00' }
    ]
  }
];

// ===== 生成未来14天的可预约课程 =====
function generateAvailableBookings() {
  var bookings = [];
  var today = new Date();
  var bookingId = 2001;

  for (var d = 1; d <= 14; d++) {
    var date = new Date(today);
    date.setDate(today.getDate() + d);
    var dayOfWeek = date.getDay();
    var dateStr = date.toISOString().split('T')[0];

    for (var i = 0; i < courseTemplates.length; i++) {
      var template = courseTemplates[i];
      for (var j = 0; j < template.schedule.length; j++) {
        var slot = template.schedule[j];
        if (slot.dayOfWeek === dayOfWeek) {
          var coach = null;
          for (var k = 0; k < coaches.length; k++) {
            if (coaches[k].id === template.coachId) {
              coach = coaches[k];
              break;
            }
          }
          bookings.push({
            id: bookingId++,
            courseId: template.id,
            courseName: template.name,
            coach: coach ? coach.name : '未知',
            date: dateStr,
            time: slot.time,
            duration: template.duration,
            difficulty: template.difficulty,
            location: template.location,
            description: template.description,
            maxCapacity: template.maxCapacity,
            currentEnrollment: Math.floor(Math.random() * Math.floor(template.maxCapacity * 0.7))
          });
        }
      }
    }
  }

  bookings.sort(function (a, b) {
    return new Date(a.date + 'T' + a.time) - new Date(b.date + 'T' + b.time);
  });

  return bookings;
}

var availableBookings = generateAvailableBookings();

// ===== 各用户的课程记录 =====
function generateUserSchedule(userId) {
  var today = new Date();
  var records = [];
  var id = userId * 1000;

  var courseNames = ['基础跆拳道', '竞技训练', '品势专项', '体能强化', '青少年班'];
  var coachNames = ['金教练', '朴教练', '李教练', '刘教练'];
  var locations = ['A训练馆', 'B训练馆', 'C训练馆'];
  var times = ['09:00', '10:30', '14:00', '18:00', '20:00'];
  var durations = [60, 75, 90];

  // 过去30天（已完成）
  for (var i = 30; i >= 1; i--) {
    if (Math.random() > 0.6) {
      var d = new Date(today);
      d.setDate(today.getDate() - i);
      records.push({
        id: id++,
        courseName: courseNames[Math.floor(Math.random() * courseNames.length)],
        coach: coachNames[Math.floor(Math.random() * coachNames.length)],
        date: d.toISOString().split('T')[0],
        time: times[Math.floor(Math.random() * times.length)],
        duration: durations[Math.floor(Math.random() * durations.length)],
        location: locations[Math.floor(Math.random() * locations.length)],
        status: '已完成'
      });
    }
  }

  // 未来14天（待上课）
  for (var i = 1; i <= 14; i++) {
    if (Math.random() > 0.65) {
      var d = new Date(today);
      d.setDate(today.getDate() + i);
      records.push({
        id: id++,
        courseName: courseNames[Math.floor(Math.random() * courseNames.length)],
        coach: coachNames[Math.floor(Math.random() * coachNames.length)],
        date: d.toISOString().split('T')[0],
        time: times[Math.floor(Math.random() * times.length)],
        duration: durations[Math.floor(Math.random() * durations.length)],
        location: locations[Math.floor(Math.random() * locations.length)],
        status: '待上课'
      });
    }
  }

  records.sort(function (a, b) { return new Date(a.date) - new Date(b.date); });
  return records;
}

var userSchedules = {
  1: generateUserSchedule(1),
  2: generateUserSchedule(2),
  3: generateUserSchedule(3),
  4: generateUserSchedule(4),
  5: generateUserSchedule(5)
};

// ===== 积分记录 =====
function generatePointsHistory(userId) {
  var user = null;
  for (var i = 0; i < users.length; i++) {
    if (users[i].id === userId) { user = users[i]; break; }
  }
  if (!user) return [];

  var history = [];
  var id = userId * 10000;
  var today = new Date();
  var runningTotal = 0;

  var earnReasons = ['完成课程', '连续签到', '邀请好友', '参加比赛', '节日赠送'];
  var spendReasons = ['兑换护具', '兑换道服', '兑换课程优惠券', '积分抵现'];
  var earnAmounts = [10, 20, 30, 50, 100];
  var spendAmounts = [50, 100, 200];

  for (var i = 60; i >= 0; i--) {
    var d = new Date(today);
    d.setDate(today.getDate() - i);
    var dateStr = d.toISOString().split('T')[0];

    if (Math.random() > 0.6) {
      var amount = earnAmounts[Math.floor(Math.random() * earnAmounts.length)];
      runningTotal += amount;
      history.push({
        id: id++,
        date: dateStr,
        type: 'earn',
        amount: amount,
        reason: earnReasons[Math.floor(Math.random() * earnReasons.length)],
        balance: runningTotal
      });
    }

    if (Math.random() > 0.9 && runningTotal > 100) {
      var amount = spendAmounts[Math.floor(Math.random() * spendAmounts.length)];
      runningTotal = Math.max(0, runningTotal - amount);
      history.push({
        id: id++,
        date: dateStr,
        type: 'spend',
        amount: amount,
        reason: spendReasons[Math.floor(Math.random() * spendReasons.length)],
        balance: runningTotal
      });
    }
  }

  // 调整到与用户积分一致
  var diff = user.points - runningTotal;
  if (diff !== 0) {
    history.push({
      id: id++,
      date: today.toISOString().split('T')[0],
      type: diff > 0 ? 'earn' : 'spend',
      amount: Math.abs(diff),
      reason: diff > 0 ? '系统调整' : '积分抵扣',
      balance: user.points
    });
  }

  history.sort(function (a, b) { return new Date(b.date) - new Date(a.date); });
  return history;
}

var pointsHistories = {
  1: generatePointsHistory(1),
  2: generatePointsHistory(2),
  3: generatePointsHistory(3),
  4: generatePointsHistory(4),
  5: generatePointsHistory(5)
};

// ===== 积分规则 =====
var pointsRules = [
  { id: 1, event: '完成一节课', points: 10, description: '每次按时出席并完成课程可获得 10 积分' },
  { id: 2, event: '连续签到 7 天', points: 50, description: '连续签到满 7 天额外奖励 50 积分' },
  { id: 3, event: '邀请好友', points: 100, description: '成功邀请一位新会员注册，获得 100 积分' },
  { id: 4, event: '参加馆内比赛', points: 200, description: '参与道馆组织的比赛可获得 200 积分' },
  { id: 5, event: '节日福利', points: 50, description: '重要节假日系统自动发放 50 积分' },
  { id: 6, event: '兑换护具', points: -200, description: '消耗 200 积分兑换一套训练护具' },
  { id: 7, event: '兑换道服', points: -500, description: '消耗 500 积分兑换一件道服' },
  { id: 8, event: '课程折扣券', points: -300, description: '消耗 300 积分兑换一张课程九折优惠券' }
];

module.exports = {
  users: users,
  coaches: coaches,
  courseTemplates: courseTemplates,
  availableBookings: availableBookings,
  userSchedules: userSchedules,
  pointsHistories: pointsHistories,
  pointsRules: pointsRules
};
