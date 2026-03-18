Page({
  data: {
    notifications: true,
    soundEffects: true,
    version: 'v1.0.0'
  },

  onLoad: function () {
    var notifications = wx.getStorageSync('setting_notifications');
    var soundEffects = wx.getStorageSync('setting_soundEffects');
    this.setData({
      notifications: notifications !== false,
      soundEffects: soundEffects !== false
    });
  },

  onNotificationsChange: function (e) {
    var val = e.detail.value;
    this.setData({ notifications: val });
    wx.setStorageSync('setting_notifications', val);
  },

  onSoundEffectsChange: function (e) {
    var val = e.detail.value;
    this.setData({ soundEffects: val });
    wx.setStorageSync('setting_soundEffects', val);
  },

  clearCache: function () {
    wx.showModal({
      title: '清除缓存',
      content: '确定要清除本地缓存数据吗？课程记录和签到数据将被重置。',
      confirmColor: '#e63946',
      success: function (res) {
        if (res.confirm) {
          var userInfo = wx.getStorageSync('userInfo');
          wx.clearStorageSync();
          if (userInfo) {
            wx.setStorageSync('userInfo', userInfo);
          }
          wx.showToast({ title: '缓存已清除', icon: 'success' });
        }
      }
    });
  },

  logout: function () {
    wx.showModal({
      title: '退出登录',
      content: '确定要退出当前账号吗？',
      confirmColor: '#e63946',
      success: function (res) {
        if (res.confirm) {
          wx.removeStorageSync('userInfo');
          wx.reLaunch({ url: '/pages/login/login' });
        }
      }
    });
  }
});
