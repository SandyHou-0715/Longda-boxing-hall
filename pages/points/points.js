var mock = require('../../utils/mock');

Page({
  data: {
    userInfo: null,
    historyList: [],
    earnRules: [],
    spendRules: [],
    activeTab: 'history',
    totalEarned: 0,
    totalSpent: 0,
    historyCount: 0
  },

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

  loadData: function () {
    var userInfo = wx.getStorageSync('userInfo');
    if (!userInfo) return;

    var history = mock.pointsHistories[userInfo.id] || [];

    // 统计
    var totalEarned = 0;
    var totalSpent = 0;
    for (var i = 0; i < history.length; i++) {
      if (history[i].type === 'earn') {
        totalEarned += history[i].amount;
      } else {
        totalSpent += history[i].amount;
      }
    }

    // 分类积分规则
    var earnRules = mock.pointsRules.filter(function (r) { return r.points > 0; });
    var spendRules = mock.pointsRules.filter(function (r) { return r.points < 0; });

    this.setData({
      userInfo: userInfo,
      historyList: history,
      earnRules: earnRules,
      spendRules: spendRules,
      totalEarned: totalEarned,
      totalSpent: totalSpent,
      historyCount: history.length
    });
  },

  switchTab: function (e) {
    this.setData({ activeTab: e.currentTarget.dataset.tab });
  }
});
