var mock = require('../../utils/mock');

Page({
  data: {
    coach: null
  },

  onLoad: function (options) {
    var coachId = parseInt(options.coachId, 10);
    var coaches = mock.coaches || [];
    var coach = null;
    for (var i = 0; i < coaches.length; i++) {
      if (coaches[i].id === coachId) {
        coach = coaches[i];
        break;
      }
    }
    if (coach) {
      this.setData({ coach: coach });
    }
  }
});
