var mock = require('../../utils/mock');

Page({
  data: {
    searchKeyword: '',
    selectedCategory: '全部',
    categories: [],
    allProducts: [],
    filteredProducts: [],
    cartCount: 0
  },

  onLoad: function () {
    this.setData({
      categories: mock.shopCategories,
      allProducts: mock.shopProducts,
      filteredProducts: mock.shopProducts
    });
    this.updateCartCount();
  },

  onShow: function () {
    var userInfo = wx.getStorageSync('userInfo');
    if (!userInfo) {
      wx.reLaunch({ url: '/pages/login/login' });
      return;
    }
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

  onSearchInput: function (e) {
    this.setData({ searchKeyword: e.detail.value });
    this.filterProducts();
  },

  onCategorySelect: function (e) {
    var cat = e.currentTarget.dataset.category;
    this.setData({ selectedCategory: cat });
    this.filterProducts();
  },

  filterProducts: function () {
    var keyword = this.data.searchKeyword.trim().toLowerCase();
    var category = this.data.selectedCategory;
    var all = this.data.allProducts;
    var result = all.filter(function (p) {
      var matchCat = category === '全部' || p.category === category;
      var matchKey = !keyword || p.name.toLowerCase().indexOf(keyword) !== -1;
      return matchCat && matchKey;
    });
    this.setData({ filteredProducts: result });
  },

  addToCart: function (e) {
    var id = e.currentTarget.dataset.id;
    var product = null;
    for (var pi = 0; pi < this.data.allProducts.length; pi++) {
      if (this.data.allProducts[pi].id === id) {
        product = this.data.allProducts[pi];
        break;
      }
    }
    if (!product) return;

    var cart = wx.getStorageSync('cart') || [];
    var found = false;
    for (var ci = 0; ci < cart.length; ci++) {
      if (cart[ci].id === id) {
        cart[ci].quantity += 1;
        found = true;
        break;
      }
    }
    if (!found) {
      cart.push({ id: product.id, name: product.name, price: product.price, cover: product.cover, coverColor: product.coverColor, quantity: 1 });
    }
    wx.setStorageSync('cart', cart);
    this.updateCartCount();
    wx.showToast({ title: '已加入购物车', icon: 'success', duration: 1000 });
  },

  goToDetail: function (e) {
    var id = e.currentTarget.dataset.id;
    wx.navigateTo({ url: '/pages/shopDetail/shopDetail?id=' + id });
  },

  goToCart: function () {
    wx.navigateTo({ url: '/pages/cart/cart' });
  }
});
