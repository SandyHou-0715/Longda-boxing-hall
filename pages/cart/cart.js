Page({
  data: {
    cartItems: [],
    total: 0
  },

  onShow: function () {
    this.loadCart();
  },

  loadCart: function () {
    var cart = wx.getStorageSync('cart') || [];
    var total = 0;
    for (var i = 0; i < cart.length; i++) {
      total += cart[i].price * cart[i].quantity;
    }
    this.setData({ cartItems: cart, total: total });
  },

  changeQuantity: function (e) {
    var id = e.currentTarget.dataset.id;
    var delta = e.currentTarget.dataset.delta;
    var cart = wx.getStorageSync('cart') || [];
    for (var i = 0; i < cart.length; i++) {
      if (cart[i].id === id) {
        cart[i].quantity += delta;
        if (cart[i].quantity <= 0) {
          cart.splice(i, 1);
        }
        break;
      }
    }
    wx.setStorageSync('cart', cart);
    this.loadCart();
  },

  removeItem: function (e) {
    var id = e.currentTarget.dataset.id;
    var that = this;
    wx.showModal({
      title: '删除商品',
      content: '确定要从购物车中删除该商品吗？',
      confirmColor: '#ff2d55',
      success: function (res) {
        if (res.confirm) {
          var cart = wx.getStorageSync('cart') || [];
          cart = cart.filter(function (item) { return item.id !== id; });
          wx.setStorageSync('cart', cart);
          that.loadCart();
        }
      }
    });
  },

  clearCart: function () {
    var that = this;
    if (this.data.cartItems.length === 0) return;
    wx.showModal({
      title: '清空购物车',
      content: '确定要清空购物车吗？',
      confirmColor: '#ff2d55',
      success: function (res) {
        if (res.confirm) {
          wx.setStorageSync('cart', []);
          that.loadCart();
        }
      }
    });
  },

  checkout: function () {
    if (this.data.cartItems.length === 0) {
      wx.showToast({ title: '购物车是空的', icon: 'none' });
      return;
    }
    wx.showModal({
      title: '确认下单',
      content: '合计 ¥' + this.data.total + '，确定提交订单？（演示模式）',
      confirmColor: '#ff2d55',
      success: function (res) {
        if (res.confirm) {
          wx.setStorageSync('cart', []);
          wx.showToast({ title: '下单成功！', icon: 'success', duration: 2000 });
          setTimeout(function () {
            wx.navigateBack();
          }, 2000);
        }
      }
    });
  }
});
