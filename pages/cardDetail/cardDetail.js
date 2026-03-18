var mock = require('../../utils/mock');

Page({
  data: {
    cardType: '',
    cardId: '',
    card: null,
    typeName: ''
  },

  onLoad: function (options) {
    var cardType = options.type || 'classPack';
    var cardId = options.id || '';
    var cards = mock.memberCards[cardType] || [];
    var card = null;
    for (var i = 0; i < cards.length; i++) {
      if (cards[i].id === cardId) {
        card = cards[i];
        break;
      }
    }
    var typeNames = { classPack: '次卡套餐', monthly: '月卡套餐', yearly: '年卡套餐' };
    // Pre-compute per-class price for class packs to avoid template math
    if (card && cardType === 'classPack' && card.times > 0) {
      card = Object.assign({}, card, { perClassPrice: (card.price / card.times).toFixed(1) });
    }
    this.setData({ cardType: cardType, cardId: cardId, card: card, typeName: typeNames[cardType] || '' });
  },

  buyCard: function () {
    var card = this.data.card;
    if (!card) return;
    wx.showModal({
      title: '确认购买',
      content: '确定购买【' + card.name + '】？（演示模式，不实际扣款）',
      confirmColor: '#ff2d55',
      success: function (res) {
        if (res.confirm) {
          wx.showToast({ title: '购买成功！', icon: 'success', duration: 2000 });
          setTimeout(function () {
            wx.navigateBack();
          }, 2000);
        }
      }
    });
  }
});
