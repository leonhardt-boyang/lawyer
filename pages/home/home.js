// pages/home/home.js
var app = getApp()
var ajax = require("../../utils/ajax.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    justiceList: [], //金牌律师
    eliteList: [], //精英律师
    playShow: "block",
    msgList: "", //公告
    imgUrls: [], //banner
    platformSrc: "https://video.pearvideo.com/mp4/adshort/20190805/cont-1586526-14223259_adpkg-ad_hd.mp4" //视频
  },
  // 获取banner
  getBanner: function() {
    var item = {
      'user_id': app.globalData.userId
    }
    ajax.wxRequest('POST', 'app/banner', item,
      (res) => {
        if (res.code == 0) {
          this.setData({
            imgUrls: res.data.list
          })
        } else {
          wx.showToast({
            title: res.message,
            icon: "none"
          })
        }

      },
      (err) => {
        wx.showToast({
          title: '数据加载失败' + err,
          icon: "none"
        })
      })
  },
  // 查看banner推荐
  banner: function(e) {
    var id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../banner/banner?id='+id,
    })
  },
  // 查看公告
  viewNotice: function(e) {
    var title = e.currentTarget.dataset.title;
    var time = e.currentTarget.dataset.time;
    var con = JSON.stringify(e.currentTarget.dataset.content);
    var content = encodeURIComponent(con)
    console.log(content)
    wx.navigateTo({
      url: '../notice/notice?title=' + title + '&content=' + content + '&time=' + time,
    })
  },
  //点击播放
  bindplay: function(e) {
    var videoCtx = wx.createVideoContext('video');
    if (this.data.playShow == "block") {
      videoCtx.play();
      this.setData({
        playShow: "none"
      })
    } else {
      videoCtx.pause();
      this.setData({
        playShow: "block"
      })
    }
  },
  bindend: function() {
    this.setData({
      playShow: "block"
    })
  },
  // 律师详情
  lawyerDetails: function(e) {
    var id = e.currentTarget.dataset.id;
    var flow = e.currentTarget.dataset.flow;
    var type = e.currentTarget.dataset.type;
    wx.navigateTo({
      url: '../lawyerDetails/lawyerDetails?id=' + id + '&flow=' + flow + '&type=' + type,
    })
  },
  // 获取公告
  getNotice: function() {
    var item = {
      'user_id': app.globalData.userId
    }
    ajax.wxRequest('POST', 'article/notice', item,
      (res) => {
        if (res.code == 0) {
          this.setData({
            msgList: res.data.data
          })

        } else {
          wx.showToast({
            title: res.message,
            icon: "none"
          })
        }

      },
      (err) => {
        wx.showToast({
          title: '数据加载失败' + err,
          icon: "none"
        })
      })
  },
  // 获取平台介绍视频
  getDescript: function() {
    var item = {
      'user_id': app.globalData.userId
    }
    ajax.wxRequest('POST', 'article/platform_info', item,
      (res) => {
        if (res.code == 0) {
          this.setData({
            platformSrc: res.data.video_url
          })
        } else {
          wx.showToast({
            title: res.message,
            icon: "none"
          })
        }

      },
      (err) => {
        wx.showToast({
          title: '数据加载失败' + err,
          icon: "none"
        })
      })
  },
  // 获取律师列表
  getLaywer: function() {
    var item = {
      'user_id': app.globalData.userId
    }
    ajax.wxRequest('POST', 'lawyer/lists', item,
      (res) => {
        console.log(res)
        if (res.code == 0) {
          this.setData({
            justiceList: [],
            eliteList: []
          })
          var lawyerList = res.data.data;
          for (var i = 0; i < lawyerList.length; i++) {
            if (lawyerList[i].type_id == 2) {
              this.data.justiceList.push(lawyerList[i])
            } else if (lawyerList[i].type_id == 4) {
              this.data.eliteList.push(lawyerList[i])
            }
          }
          this.setData({
            justiceList: this.data.justiceList,
            eliteList: this.data.eliteList
          })
        } else {
          wx.showToast({
            title: res.message,
            icon: "none"
          })
        }
      },
      (err) => {
        console.log(err)
        wx.showToast({
          title: '数据加载失败' + err,
          icon: "none"
        })
      })
  },
  // 关注、取消
  focus: function(e) {
    var item = {
      'user_id': app.globalData.userId,
      'lawyer_id': e.currentTarget.dataset.id
    }
    ajax.wxRequest('POST', 'lawyer/follow', item,
      (res) => {
        if (res.code == 0) {
          wx.showToast({
            title: res.message,
          })
          this.getLaywer();
        }else{
          wx.showToast({
            title: res.message,
            icon:"none"
          })
        }

      },
      (err) => {
        wx.showToast({
          title: '数据加载失败' + err,
          icon: "none"
        })
      })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.getNotice();
    this.getDescript();
    this.getBanner();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    this.getLaywer();
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  // onShareAppMessage: function() {

  // }
})