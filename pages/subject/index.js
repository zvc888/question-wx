//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    spinShow: false,
    paper: [],
    fixedPaper: [],
    pushPaper: [],
    timeLimitPaper: [],
    taskList: [],
    categoryId: null
  },
  onLoad: function(options) {
    let categoryId = options.id
    this.setData({categoryId : categoryId})
    let _this = this
    this.setData({
      spinShow: true
    });
    app.formPost('/api/wx/student/subject', {
        "categoryId": categoryId
      })
      .then(res => {
        _this.setData({
          spinShow: false
        });
        if (res.code === 20000) {
          _this.setData({
            subjectList: res.data

          });
        }
      }).catch(e => {
        _this.setData({
          spinShow: false
        });
        app.message(e, 'error')
      })
    // this.indexLoad()
  },
  onPullDownRefresh() {
    this.setData({
      spinShow: true
    });
    if (!this.loading) {
      this.indexLoad()
    }
  },
  indexLoad: function () {
    let _this = this
    app.formPost('/api/wx/student/subject', {
      "categoryId": this.categoryId
    }).then(res => {
      _this.setData({
        spinShow: false
      });
      wx.stopPullDownRefresh()
      if (res.code === 20000) {
        _this.setData({
          // fixedPaper: res.response.fixedPaper,
          // swipers: ['1.png', '2.png', '3.png', '4.png'],
          // timeLimitPaper: res.response.timeLimitPaper,
          // pushPaper: res.response.pushPaper
          category: res.data
        });
      }
    }).catch(e => {
      _this.setData({
        spinShow: false
      });
      app.message(e, 'error')
    })
    
  }
})