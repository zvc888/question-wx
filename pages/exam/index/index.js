// pages/exam/index/index.js
let app = getApp()
Page({
  data: {
    spinShow: false,
    loadMoreLoad: false,
    loadMoreTip: '暂无数据',
    searchName:'',
    queryParam: {
      paperType: 1,
      pageNo: 1,
      
      limit: app.globalData.limit
    },
    tableData: [],
    total: 1
  },
  onLoad: function(options) {
    this.setData({
      spinShow: true,
    });
    this.search(true)
  },
  inputBind: function (event) {
    this.setData({
      searchName: event.detail.value
    })
    console.log('bindInput' + this.data.searchName)

  },
  search1:function(){
    if (this.searchName){
      this.data.queryParam.name = this.searchName
      this.search(true)
    }
  },
  onPullDownRefresh() {
    this.setData({
      spinShow: true
    });
    if (!this.loading) {
      this.setData({
        ['queryParam.limit']: 1
      });
      this.search(true)
    }
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
  search: function(override) {
    let _this = this
    app.getApi('/api/wx/category/list', this.data.queryParam).then(res => {
      _this.setData({
        spinShow: false
      });
      wx.stopPullDownRefresh()
      if (res.code === 20000) {
        const re = res.data
        _this.setData({
          ['queryParam.pageNum']: re.pageNum,
          tableData: override ? re.records : this.data.tableData.concat(re.records),
          total: re.pages
        });
        if (re.pageNum >= re.pages) {
          this.setData({
            loadMoreLoad: false,
            loadMoreTip: '暂无数据'
          });
        }
      }
    }).catch(e => {
      _this.setData({
        spinShow: false
      });
      app.message(e, 'error')
    })
  }
})