//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    spinShow: false
  },
  onLoad: function() {
    this.setData({
      spinShow: true
    });
    this.indexLoad()
  },
  onPullDownRefresh() {
    this.setData({
      spinShow: true
    });
    if (!this.loading) {
      this.indexLoad()
    }
  },
  indexLoad: function() {
    let _this = this

    app.getApi('/api/wx/user/dashboard/swiper', null).then(res => {
      _this.setData({
        spinShow: false
      });
      wx.stopPullDownRefresh()
      if (res.code === 20000) {
        _this.setData({
          // fixedPaper: res.response.fixedPaper,
          swipers: res.data,
          // category: res.data
        });
      }
    }).catch(e => {
      _this.setData({
        spinShow: false
      });
      app.message(e, 'error')
    })

    app.getApi('/api/wx/user/dashboard/index', null).then(res => {
      _this.setData({
        spinShow: false
      });
      wx.stopPullDownRefresh()
      if (res.code === 20000) {
        _this.setData({
            category: res.data
        });
      }
    }).catch(e => {
      _this.setData({
        spinShow: false
      });
      app.message(e, 'error')
    })
  },
  onReachBottom() {
    if (!this.loading && this.data.queryParam.limit < this.data.total) {
      this.setData({
        loadMoreLoad: true,
        loadMoreTip: '正在加载'
      });
      this.setData({
        ['queryParam.pageNo']: this.data.queryParam.pageNo + 1
      });
      this.search(false)
    }
  },
})