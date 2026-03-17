var mock = require('../../utils/mock');

Page({
  data: {
    phone: '',
    password: '',
    loading: false
  },

  onLoad: function () {
    // 已登录则直接跳转首页
    var userInfo = wx.getStorageSync('userInfo');
    if (userInfo) {
      wx.switchTab({ url: '/pages/index/index' });
    }
  },

  onPhoneInput: function (e) {
    this.setData({ phone: e.detail.value });
  },

  onPasswordInput: function (e) {
    this.setData({ password: e.detail.value });
  },

  onLogin: function () {
    var phone = this.data.phone.trim();
    var password = this.data.password.trim();

    if (!phone) {
      wx.showToast({ title: '请输入手机号', icon: 'none' });
      return;
    }
    if (phone.length !== 11) {
      wx.showToast({ title: '手机号格式不正确', icon: 'none' });
      return;
    }
    if (!password) {
      wx.showToast({ title: '请输入密码', icon: 'none' });
      return;
    }

    this.setData({ loading: true });

    var that = this;

    // 模拟网络请求延迟
    setTimeout(function () {
      var user = null;
      for (var i = 0; i < mock.users.length; i++) {
        if (mock.users[i].phone === phone && mock.users[i].password === password) {
          user = mock.users[i];
          break;
        }
      }

      that.setData({ loading: false });

      if (user) {
        // 保存用户信息到本地存储
        wx.setStorageSync('userInfo', user);

        // 初始化该用户的课程记录（如果尚未初始化）
        var scheduleKey = 'schedule_' + user.id;
        if (!wx.getStorageSync(scheduleKey)) {
          wx.setStorageSync(scheduleKey, mock.userSchedules[user.id] || []);
        }

        wx.showToast({ title: '登录成功', icon: 'success', duration: 1000 });

        setTimeout(function () {
          wx.switchTab({ url: '/pages/index/index' });
        }, 1000);
      } else {
        wx.showToast({ title: '手机号或密码错误', icon: 'none', duration: 2000 });
      }
    }, 600);
  }
});
