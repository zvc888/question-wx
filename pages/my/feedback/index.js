const app = getApp()
Page({
  data: {
    feedback:null,
    modalShow: false,
    showCancel:false
  },
  onLoad: function(options) {
  },
  formSubmit: function (e) {
    let _this = this
    wx.showLoading({
      title: '提交中',
      mask: true
    })
    app.formPost('/api/wx/feedback/save', e.detail.value)
      .then(res => {
        if (res.code == 20000) {
          _this.setData({
            modalShow: true
          });
          
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