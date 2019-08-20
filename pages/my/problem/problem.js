// pages/my/problem/problem.js
const app = getApp()
var ajax = require("../../../utils/ajax.js");
var WxParse = require('../../../utils/wxParse/wxParse.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    dataList:[],
    selectedFlag: []
  },
  changeToggle: function(e) {
    var index = e.currentTarget.dataset.index;
    console.log(index)
    if (this.data.selectedFlag[index]) {
      this.data.selectedFlag[index] = false;
    } else {
      this.data.selectedFlag[index] = true;
    }
    this.setData({
      selectedFlag: this.data.selectedFlag
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
    var item = {
      'user_id': app.globalData.userId
    }
    wx.showLoading();
    ajax.wxRequest('POST', 'article/problem', item,
      (res) => {
        wx.hideLoading();
        that.setData({
          dataList: res.data.data
        })
        for (let i = 0; i < res.data.data.length; i++) {
          WxParse.wxParse('topic' + i, 'html', res.data.data[i].content, that);
          if (i === res.data.data.length - 1) {
            WxParse.wxParseTemArray("dataList", 'topic', res.data.data.length, that)
          }
        }
        let dataList = this.data.dataList;
        dataList.map((item, index, arr) => {
          arr[index][0].title = res.data.data[index].title;           //对应的时使用WxParse后的结构
        });
        that.setData({
          dataList: dataList
        })
      },
      (err) => {
        console.log(err)
        wx.hideLoading();
        setTimeout(function(){
          wx.showToast({
            title: '数据加载失败' + err,
            icon: "none"
          })
        },2000)
      })
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