var mock = require('../../utils/mock');

Page({
  data: {
    campuses: [],
    selectedId: null
  },

  onLoad: function () {
    this.setData({ campuses: mock.campuses });
  },

  selectCampus: function (e) {
    var id = e.currentTarget.dataset.id;
    this.setData({ selectedId: id });
  },

  confirmSelect: function () {
    var selectedId = this.data.selectedId;
    if (!selectedId) {
      wx.showToast({ title: '请先选择校区', icon: 'none' });
      return;
    }
    var campus = null;
    for (var i = 0; i < this.data.campuses.length; i++) {
      if (this.data.campuses[i].id === selectedId) {
        campus = this.data.campuses[i];
        break;
      }
    }
    if (!campus) return;
    wx.setStorageSync('currentCampus', campus);
    wx.switchTab({ url: '/pages/index/index' });
  },

  skipSelect: function () {
    var campus = mock.campuses[0];
    wx.setStorageSync('currentCampus', campus);
    wx.switchTab({ url: '/pages/index/index' });
  }
});
