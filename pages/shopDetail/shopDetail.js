var mock = require('../../utils/mock');

Page({
  data: {
    product: null,
    quantity: 1,
    cartCount: 0
  },

  onLoad: function (options) {
    var id = parseInt(options.id);
    var product = null;
    for (var i = 0; i < mock.shopProducts.length; i++) {
      if (mock.shopProducts[i].id === id) {
        product = mock.shopProducts[i];
        break;
      }
    }
    this.setData({ product: product });
    this.updateCartCount();
  },

  onShow: function () {
    this.updateCartCount();
  },

  updateCartCount: function () {
    var cart = wx.getStorageSync('cart') || [];
    var count = 0;
    for (var i = 0; i < cart.length; i++) {
      count += cart[i].quantity;
    }
    this.setData({ cartCount: count });
  },

  changeQuantity: function (e) {
    var delta = e.currentTarget.dataset.delta;
    var q = this.data.quantity + delta;
    if (q < 1) q = 1;
    if (q > 99) q = 99;
    this.setData({ quantity: q });
  },

  addToCart: function () {
    var product = this.data.product;
    if (!product) return;
    var cart = wx.getStorageSync('cart') || [];
    var found = false;
    for (var i = 0; i < cart.length; i++) {
      if (cart[i].id === product.id) {
        cart[i].quantity += this.data.quantity;
        found = true;
        break;
      }
    }
    if (!found) {
      cart.push({
        id: product.id,
        name: product.name,
        price: product.price,
        cover: product.cover,
        coverColor: product.coverColor,
        quantity: this.data.quantity
      });
    }
    wx.setStorageSync('cart', cart);
    this.updateCartCount();
    wx.showToast({ title: '已加入购物车', icon: 'success' });
  },

  buyNow: function () {
    this.addToCart();
    wx.navigateTo({ url: '/pages/cart/cart' });
  },

  goToCart: function () {
    wx.navigateTo({ url: '/pages/cart/cart' });
  }
});
