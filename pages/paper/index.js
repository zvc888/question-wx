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
    subjectId: null
  },
  onLoad: function(options) {
    let subjectId = options.id
    this.setData({
      subjectId: subjectId
    })
    let _this = this
    this.setData({
      spinShow: true
    });
    app.formPost('/api/wx/student/paper', {
        "subjectId": subjectId
      })
      .then(res => {
        _this.setData({
          spinShow: false
        });
        if (res.code === 20000) {
          _this.setData({
            paperList: res.data

          });
        }
      }).catch(e => {
        _this.setData({
          spinShow: false
        });
        app.message(e, 'error')
      })
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
    app.formPost('/api/wx/student/paper', {
        "subjectId": subjectId
      })
      .then(res => {
        _this.setData({
          spinShow: false
        });
        wx.stopPullDownRefresh()
        if (res.code === 20000) {
          _this.setData({
            paperList: res.data
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