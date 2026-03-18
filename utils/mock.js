// ===== 用户数据 =====
var users = [
  {
    id: 1,
    username: 'zhang_san',
    phone: '13800138001',
    password: '123456',
    name: '张三',
    avatar: '张',
    belt: '黄带',
    memberLevel: '黄带会员',
    memberType: '季卡',
    memberExpiry: '2026-06-30',
    joinDate: '2023-01-15',
    totalClasses: 48,
    usedClasses: 20,
    remainingClasses: 28,
    consecutiveCheckIn: 5,
    checkedInToday: false,
    points: 1580
  },
  {
    id: 2,
    username: 'li_si',
    phone: '13800138002',
    password: '123456',
    name: '李四',
    avatar: '李',
    belt: '橙带',
    memberLevel: '橙带会员',
    memberType: '月卡',
    memberExpiry: '2026-04-30',
    joinDate: '2023-06-20',
    totalClasses: 12,
    usedClasses: 8,
    remainingClasses: 4,
    consecutiveCheckIn: 2,
    checkedInToday: false,
    points: 640
  },
  {
    id: 3,
    username: 'wang_wu',
    phone: '13800138003',
    password: '123456',
    name: '王五',
    avatar: '王',
    belt: '绿带',
    memberLevel: '绿带会员',
    memberType: '年卡',
    memberExpiry: '2026-12-31',
    joinDate: '2024-02-10',
    totalClasses: 120,
    usedClasses: 45,
    remainingClasses: 75,
    consecutiveCheckIn: 12,
    checkedInToday: false,
    points: 2560
  },
  {
    id: 4,
    username: 'zhao_liu',
    phone: '13800138004',
    password: '123456',
    name: '赵六',
    avatar: '赵',
    belt: '白带',
    memberLevel: '白带会员',
    memberType: '次卡(10次)',
    memberExpiry: '2026-04-15',
    joinDate: '2024-09-01',
    totalClasses: 10,
    usedClasses: 3,
    remainingClasses: 7,
    consecutiveCheckIn: 0,
    checkedInToday: false,
    points: 180
  },
  {
    id: 5,
    username: 'chen_qi',
    phone: '13800138005',
    password: '123456',
    name: '陈七',
    avatar: '陈',
    belt: '黑带',
    memberLevel: '黑带会员',
    memberType: '年卡',
    memberExpiry: '2026-05-31',
    joinDate: '2022-05-05',
    totalClasses: 120,
    usedClasses: 98,
    remainingClasses: 22,
    consecutiveCheckIn: 21,
    checkedInToday: false,
    points: 5800
  }
];

// ===== 教练数据 =====
var coaches = [
  {
    id: 1,
    name: '陈志远',
    specialty: '自由搏击',
    avatar: '陈',
    years: 12,
    level: '国家级裁判',
    students: 268,
    rating: 4.9,
    bio: '前职业搏击运动员，参加过多项国内外搏击赛事，拥有丰富的实战和教学经验。',
    honors: ['全国搏击锦标赛冠军', '亚洲搏击公开赛银牌', '10年教学经验'],
    courses: ['自由搏击基础', '实战对练', '体能强化']
  },
  {
    id: 2,
    name: '李明浩',
    specialty: '拳击',
    avatar: '李',
    years: 8,
    level: '国家一级运动员',
    students: 195,
    rating: 4.8,
    bio: '专业拳击教练，擅长体能训练和技术动作的精确指导，多次带领学员参加省市比赛。',
    honors: ['省级拳击冠军', '最受学员喜爱教练奖'],
    courses: ['拳击入门', '拳击提高班', '竞技拳击']
  },
  {
    id: 3,
    name: '王芳',
    specialty: '跆拳道',
    avatar: '王',
    years: 10,
    level: '黑带四段',
    students: 312,
    rating: 4.9,
    bio: '跆拳道黑带四段，专注基础教学和品势训练，深受学员和家长好评。',
    honors: ['全国跆拳道品势冠军', '优秀教练员称号'],
    courses: ['跆拳道基础', '品势训练', '儿童跆拳道']
  },
  {
    id: 4,
    name: '张磊',
    specialty: '散打',
    avatar: '张',
    years: 6,
    level: '国家二级运动员',
    students: 145,
    rating: 4.7,
    bio: '散打运动员出身，擅长腿法和摔法的教学，风格实战派，课程紧凑高效。',
    honors: ['市散打锦标赛亚军', '年度最佳新锐教练'],
    courses: ['散打基础', '腿法专项', '综合格斗']
  },
  {
    id: 5,
    name: '刘晓燕',
    specialty: '体能训练',
    avatar: '刘',
    years: 5,
    level: '国家体能认证教练',
    students: 223,
    rating: 4.8,
    bio: '专业体能训练师，帮助学员全面提升身体素质，制定个性化训练方案。',
    honors: ['NSCA认证体能教练', '运动营养师资格证'],
    courses: ['基础体能', '核心训练', '爆发力训练']
  }
];

// ===== 可预约课程模板 =====
var courseTemplates = [
  {
    id: 101,
    name: '自由搏击基础',
    coachId: 1,
    duration: 90,
    difficulty: '初级',
    maxCapacity: 15,
    location: 'A搏击馆',
    description: '学习基本站架、步伐和基础打击组合，适合零基础学员。',
    schedule: [
      { dayOfWeek: 1, time: '09:00' },
      { dayOfWeek: 3, time: '09:00' },
      { dayOfWeek: 5, time: '09:00' }
    ]
  },
  {
    id: 102,
    name: '实战对练',
    coachId: 1,
    duration: 90,
    difficulty: '高级',
    maxCapacity: 10,
    location: 'A搏击馆',
    description: '有一定基础的学员进行实战对练，提升实战技能。',
    schedule: [
      { dayOfWeek: 2, time: '18:30' },
      { dayOfWeek: 4, time: '18:30' },
      { dayOfWeek: 6, time: '10:00' }
    ]
  },
  {
    id: 103,
    name: '拳击入门',
    coachId: 2,
    duration: 60,
    difficulty: '初级',
    maxCapacity: 20,
    location: 'B拳击馆',
    description: '专业拳击入门课程，学习基本步伐、防御和进攻技术。',
    schedule: [
      { dayOfWeek: 1, time: '18:00' },
      { dayOfWeek: 3, time: '18:00' },
      { dayOfWeek: 5, time: '18:00' }
    ]
  },
  {
    id: 104,
    name: '跆拳道基础班',
    coachId: 3,
    duration: 60,
    difficulty: '初级',
    maxCapacity: 25,
    location: 'C训练馆',
    description: '跆拳道基础入门，适合8岁以上所有年龄段学员。',
    schedule: [
      { dayOfWeek: 2, time: '16:00' },
      { dayOfWeek: 4, time: '16:00' },
      { dayOfWeek: 6, time: '14:00' }
    ]
  },
  {
    id: 105,
    name: '体能强化训练',
    coachId: 5,
    duration: 60,
    difficulty: '中级',
    maxCapacity: 20,
    location: 'D综合馆',
    description: '专项体能训练，增强力量、速度、耐力和柔韧性。',
    schedule: [
      { dayOfWeek: 1, time: '20:00' },
      { dayOfWeek: 3, time: '20:00' },
      { dayOfWeek: 5, time: '20:00' }
    ]
  },
  {
    id: 106,
    name: '散打基础',
    coachId: 4,
    duration: 75,
    difficulty: '初级',
    maxCapacity: 15,
    location: 'A搏击馆',
    description: '散打基础技术学习，包括基本拳腿技术和防御技巧。',
    schedule: [
      { dayOfWeek: 2, time: '09:00' },
      { dayOfWeek: 4, time: '09:00' },
      { dayOfWeek: 6, time: '09:00' }
    ]
  },
  {
    id: 107,
    name: '儿童跆拳道',
    coachId: 3,
    duration: 60,
    difficulty: '初级',
    maxCapacity: 20,
    location: 'C训练馆',
    description: '专为5-12岁儿童设计，寓教于乐，培养礼仪和毅力。',
    schedule: [
      { dayOfWeek: 3, time: '15:30' },
      { dayOfWeek: 6, time: '10:00' }
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

  var courseNames = ['自由搏击基础', '实战对练', '拳击入门', '体能强化训练', '散打基础', '跆拳道基础班'];
  var coachNames = ['陈志远', '李明浩', '王芳', '张磊', '刘晓燕'];
  var locations = ['A搏击馆', 'B拳击馆', 'C训练馆', 'D综合馆'];
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

  var earnReasons = ['完成搏击课程', '连续签到奖励', '邀请好友入馆', '参加馆内比赛', '节日赠送积分'];
  var spendReasons = ['兑换护具', '兑换拳击手套', '兑换课程优惠券', '积分抵现'];
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
  { id: 1, event: '每日签到', points: 5, description: '每天到馆签到可获得 5 积分' },
  { id: 2, event: '完成一节课', points: 10, description: '每次按时出席并完成课程可获得 10 积分' },
  { id: 3, event: '连续签到 7 天', points: 50, description: '连续签到满 7 天额外奖励 50 积分' },
  { id: 4, event: '连续签到 30 天', points: 300, description: '连续签到满 30 天额外奖励 300 积分并赠送私教课一节' },
  { id: 5, event: '邀请好友', points: 100, description: '成功邀请一位新会员注册，获得 100 积分' },
  { id: 6, event: '参加馆内比赛', points: 200, description: '参与道馆组织的搏击赛事可获得 200 积分' },
  { id: 7, event: '节日福利', points: 50, description: '重要节假日系统自动发放 50 积分' },
  { id: 8, event: '兑换护具', points: -200, description: '消耗 200 积分兑换一套训练护具' },
  { id: 9, event: '兑换拳击手套', points: -500, description: '消耗 500 积分兑换一副专业拳击手套' },
  { id: 10, event: '课程折扣券', points: -300, description: '消耗 300 积分兑换一张课程九折优惠券' }
];

// ===== 横幅数据 =====
var banners = [
  { id: 1, title: '暑期特训营', subtitle: '7月-8月 专业训练 全面提升', color: '#e63946' },
  { id: 2, title: '新会员优惠', subtitle: '首月9折 | 首年8折', color: '#1a1a2e' },
  { id: 3, title: '搏击公开赛', subtitle: '2026年6月 会员专属参赛资格', color: '#f4a261' },
  { id: 4, title: '教练公开课', subtitle: '每周六 陈志远教练免费体验课', color: '#2d6a4f' }
];

// ===== 公告数据 =====
var announcements = [
  '通知：2026年5月1日劳动节馆内正常营业',
  '活动：连续签到30天赠送一节私教课',
  '喜报：我馆学员在省搏击锦标赛获得3金2银',
  '提醒：请提前15分钟到馆准备，不得迟到'
];

// ===== 签到记录 =====
function generateCheckinRecords(userId, consecutiveDays) {
  var records = [];
  var today = new Date();
  var id = userId * 100000;
  var pointsPerCheckin = 5;

  for (var i = 29; i >= 0; i--) {
    var d = new Date(today);
    d.setDate(today.getDate() - i);
    var dateStr = d.toISOString().split('T')[0];
    var shouldCheckin = i < consecutiveDays || Math.random() > 0.4;
    if (shouldCheckin) {
      records.push({
        id: id++,
        date: dateStr,
        points: pointsPerCheckin,
        note: '签到打卡 +' + pointsPerCheckin + '积分'
      });
    }
  }
  return records;
}

var checkinRecords = {
  1: generateCheckinRecords(1, 5),
  2: generateCheckinRecords(2, 2),
  3: generateCheckinRecords(3, 12),
  4: generateCheckinRecords(4, 0),
  5: generateCheckinRecords(5, 21)
};

// ===== 校区数据 =====
var campuses = [
  {
    id: 1,
    name: '龙达搏击（朝阳店）',
    address: '北京市朝阳区三里屯路19号B1层',
    hours: '09:00 - 22:00',
    phone: '010-88889999',
    cover: '🏟',
    coverColor: '#ff2d55',
    tags: ['旗舰店', '最大场馆'],
    area: 1200
  },
  {
    id: 2,
    name: '龙达搏击（海淀店）',
    address: '北京市海淀区中关村南大街5号',
    hours: '08:00 - 21:30',
    phone: '010-66667777',
    cover: '🥊',
    coverColor: '#007aff',
    tags: ['高校周边', '专业训练'],
    area: 800
  },
  {
    id: 3,
    name: '龙达搏击（丰台店）',
    address: '北京市丰台区南三环西路60号',
    hours: '09:00 - 21:00',
    phone: '010-55556666',
    cover: '🥋',
    coverColor: '#5856d6',
    tags: ['新店优惠', '停车方便'],
    area: 900
  },
  {
    id: 4,
    name: '龙达搏击（通州店）',
    address: '北京市通州区运河东大街与新华大街交叉口',
    hours: '09:00 - 21:30',
    phone: '010-44445555',
    cover: '🏋',
    coverColor: '#30d158',
    tags: ['副中心', '家庭友好'],
    area: 1000
  }
];

// ===== 会员卡套餐数据 =====
var memberCards = {
  classPack: [
    {
      id: 'c10',
      name: '10次卡',
      price: 599,
      times: 10,
      validity: '6个月内有效',
      tag: '入门推荐',
      tagColor: '#30d158',
      desc: '适合初学者体验，随时约课无时间限制',
      highlight: '赠2次体验课'
    },
    {
      id: 'c20',
      name: '20次卡',
      price: 999,
      times: 20,
      validity: '12个月内有效',
      tag: '热门',
      tagColor: '#ff2d55',
      desc: '性价比之选，每次仅需49.95元',
      highlight: '赠精美护具一套'
    },
    {
      id: 'c30',
      name: '30次卡',
      price: 1399,
      times: 30,
      validity: '12个月内有效',
      tag: '超值',
      tagColor: '#ffd60a',
      desc: '长期学员优选，每次仅需46.6元',
      highlight: '赠拳击手套+护具'
    },
    {
      id: 'c50',
      name: '50次卡',
      price: 1999,
      times: 50,
      validity: '18个月内有效',
      tag: '最划算',
      tagColor: '#ff9f0a',
      desc: '重度训练者专属，每次仅需40元',
      highlight: '赠全套装备+私教2节'
    }
  ],
  monthly: [
    {
      id: 'm1',
      name: '月卡（基础）',
      price: 399,
      unit: '/月',
      includes: ['不限次数团课', '基础搏击课程', '体能训练'],
      suitable: '初学者 · 健身爱好者',
      tag: '入门',
      tagColor: '#30d158',
      highlight: '首月立减50元'
    },
    {
      id: 'm2',
      name: '月卡（进阶）',
      price: 599,
      unit: '/月',
      includes: ['不限次数团课', '所有课程', '每月1节私教', '体测评估'],
      suitable: '进阶学员 · 系统提升',
      tag: '推荐',
      tagColor: '#ff2d55',
      highlight: '含私教课1节'
    },
    {
      id: 'm3',
      name: '月卡（无限）',
      price: 799,
      unit: '/月',
      includes: ['不限次数全课程', '每月3节私教', '专属训练计划', '优先预约权'],
      suitable: '高阶学员 · 竞技备战',
      tag: '旗舰',
      tagColor: '#007aff',
      highlight: '含私教课3节'
    }
  ],
  yearly: [
    {
      id: 'y1',
      name: '年卡（标准）',
      price: 3999,
      unit: '/年',
      includes: ['不限次数团课', '基础搏击课程', '体能训练', '全年无限预约'],
      benefits: ['赠精美护具一套', '生日双倍积分', '年度颁奖典礼'],
      tag: '年付优惠',
      tagColor: '#30d158',
      monthlyAvg: '333元/月'
    },
    {
      id: 'y2',
      name: '年卡（尊享）',
      price: 5999,
      unit: '/年',
      includes: ['不限次数全课程', '每月2节私教课', '专属课程计划', '优先约课'],
      benefits: ['赠全套专业装备', '生日私教课1节', '年度VIP聚会', '专属更衣柜'],
      tag: '热门',
      tagColor: '#ff2d55',
      monthlyAvg: '500元/月'
    },
    {
      id: 'y3',
      name: '年卡（至尊）',
      price: 8999,
      unit: '/年',
      includes: ['不限次数全课程', '每月5节私教课', '私人训练计划', '优先约课+场地'],
      benefits: ['赠顶级专业装备', '专属储物柜', '每季度体测报告', '参赛资格+名额', '年度VIP晚宴'],
      tag: '至尊',
      tagColor: '#ffd60a',
      monthlyAvg: '750元/月'
    }
  ]
};

// ===== 商城商品数据 =====
var shopProducts = [
  {
    id: 1,
    name: '专业拳击手套',
    price: 199,
    originalPrice: 259,
    category: '拳套',
    sales: 328,
    rating: 4.8,
    cover: '🥊',
    coverColor: '#ff2d55',
    desc: '牛皮材质，内衬加厚，适合训练和比赛',
    stock: 50,
    images: ['🥊']
  },
  {
    id: 2,
    name: '跆拳道道服',
    price: 299,
    originalPrice: 399,
    category: '道服',
    sales: 215,
    rating: 4.7,
    cover: '🥋',
    coverColor: '#007aff',
    desc: '轻薄透气面料，适合日常训练和比赛',
    stock: 30,
    images: ['🥋']
  },
  {
    id: 3,
    name: '头盔护具',
    price: 159,
    originalPrice: 199,
    category: '护具',
    sales: 180,
    rating: 4.6,
    cover: '⛑',
    coverColor: '#5856d6',
    desc: '全包裹设计，多重缓冲保护，调节可拆卸',
    stock: 40,
    images: ['⛑']
  },
  {
    id: 4,
    name: '护胫',
    price: 89,
    originalPrice: 119,
    category: '护具',
    sales: 420,
    rating: 4.9,
    cover: '🦵',
    coverColor: '#30d158',
    desc: '高弹力材质，双面保护，轻便舒适',
    stock: 100,
    images: ['🦵']
  },
  {
    id: 5,
    name: '沙袋手套',
    price: 129,
    originalPrice: 169,
    category: '拳套',
    sales: 256,
    rating: 4.7,
    cover: '🧤',
    coverColor: '#ff9f0a',
    desc: '加厚填充，适合重沙袋训练',
    stock: 60,
    images: ['🧤']
  },
  {
    id: 6,
    name: '跳绳（专业版）',
    price: 39,
    originalPrice: 59,
    category: '训练器材',
    sales: 680,
    rating: 4.8,
    cover: '🪢',
    coverColor: '#ffd60a',
    desc: '钢丝绳，带滚轴轴承，速度快不打结',
    stock: 200,
    images: ['🪢']
  },
  {
    id: 7,
    name: '拳击绷带',
    price: 29,
    originalPrice: 39,
    category: '配件',
    sales: 890,
    rating: 4.9,
    cover: '🩹',
    coverColor: '#ff2d55',
    desc: '弹力绑带，保护手腕和拳节，4.5米长',
    stock: 300,
    images: ['🩹']
  },
  {
    id: 8,
    name: '护齿套',
    price: 49,
    originalPrice: 69,
    category: '护具',
    sales: 145,
    rating: 4.5,
    cover: '😁',
    coverColor: '#5856d6',
    desc: '热塑成型，贴合牙齿，减少冲击伤害',
    stock: 80,
    images: ['😁']
  },
  {
    id: 9,
    name: '训练打靶',
    price: 169,
    originalPrice: 229,
    category: '训练器材',
    sales: 96,
    rating: 4.7,
    cover: '🎯',
    coverColor: '#007aff',
    desc: '双层海绵填充，手持靶，适合踢拳训练',
    stock: 25,
    images: ['🎯']
  },
  {
    id: 10,
    name: '搏击短裤',
    price: 119,
    originalPrice: 159,
    category: '道服',
    sales: 312,
    rating: 4.8,
    cover: '🩳',
    coverColor: '#ff9f0a',
    desc: '速干弹力材质，侧开叉设计，运动自如',
    stock: 70,
    images: ['🩳']
  },
  {
    id: 11,
    name: '运动水壶',
    price: 59,
    originalPrice: 79,
    category: '配件',
    sales: 540,
    rating: 4.6,
    cover: '🧴',
    coverColor: '#30d158',
    desc: '800ml大容量，防漏设计，带刻度线',
    stock: 150,
    images: ['🧴']
  },
  {
    id: 12,
    name: '训练T恤',
    price: 89,
    originalPrice: 129,
    category: '道服',
    sales: 445,
    rating: 4.7,
    cover: '👕',
    coverColor: '#5856d6',
    desc: '速干透气面料，龙达搏击馆定制款',
    stock: 90,
    images: ['👕']
  },
  {
    id: 13,
    name: '护手掌',
    price: 69,
    originalPrice: 89,
    category: '护具',
    sales: 230,
    rating: 4.6,
    cover: '🤜',
    coverColor: '#ffd60a',
    desc: '开指设计，适合MMA和散打训练',
    stock: 55,
    images: ['🤜']
  },
  {
    id: 14,
    name: '俯卧撑支架',
    price: 79,
    originalPrice: 109,
    category: '训练器材',
    sales: 187,
    rating: 4.8,
    cover: '💪',
    coverColor: '#ff2d55',
    desc: '防滑旋转设计，增加训练幅度，保护腕部',
    stock: 40,
    images: ['💪']
  },
  {
    id: 15,
    name: '搏击护腰',
    price: 139,
    originalPrice: 179,
    category: '护具',
    sales: 88,
    rating: 4.5,
    cover: '🛡',
    coverColor: '#007aff',
    desc: '宽版硬质护腰，提供核心稳定保护',
    stock: 35,
    images: ['🛡']
  }
];

var shopCategories = ['全部', '拳套', '护具', '道服', '训练器材', '配件'];

module.exports = {
  users: users,
  coaches: coaches,
  courseTemplates: courseTemplates,
  availableBookings: availableBookings,
  userSchedules: userSchedules,
  pointsHistories: pointsHistories,
  pointsRules: pointsRules,
  banners: banners,
  announcements: announcements,
  checkinRecords: checkinRecords,
  campuses: campuses,
  memberCards: memberCards,
  shopProducts: shopProducts,
  shopCategories: shopCategories
};
