// pages/user/info/index.js
const app = getApp()
Page({
  data: {
    userInfo: null,
    spinShow: false,
    showCancel:false,
    modalShow:false

  },
  onLoad: function(options) {
    this.loadUserInfo()
  },
  loadUserInfo() {
    let _this = this
    _this.setData({
      spinShow: true
    });
    app.getApi('/api/wx/user/current', null).then(res => {
      if (res.code == 20000) {
        _this.setData({
          userInfo: res.data
        });
      }
      _this.setData({
        spinShow: false
      });
    }).catch(e => {
      _this.setData({
        spinShow: false
      });
      app.message(e, 'error')
    })
  },
  formSubmit: function(e) {
    let _this = this
    wx.showLoading({
      title: '提交中',
      mask: true
    })
    app.formPost('/api/wx/user/update', e.detail.value)
      .then(res => {
        if (res.code == 20000) {
          _this.setData({
            modalShow:true
          })
        } else {
          app.message(res.message, 'error')
        }
        wx.hideLoading()
      }).catch(e => {
        app.message(e, 'error')
        wx.hideLoading()
      })
  },
  forward:function(e){
    wx.reLaunch({
      url: '/pages/my/index/index',
    });
  }
})