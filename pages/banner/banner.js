// pages/banner/banner.js
const app = getApp();
var ajax = require("../../utils/ajax.js");
var WxParse = require('../../utils/wxParse/wxParse.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    msgList:""
  },
  // 获取banner信息
  getNotice: function (param) {
    var item = {
      'user_id': app.globalData.userId,
      'id':param
    }
    ajax.wxRequest('POST', 'article/detail', item,
      (res) => {
        if (res.code == 0) {
          this.setData({
            msgList: res.data
          })
          WxParse.wxParse('topic', 'html', res.data.content, this);
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
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getNotice(options.id)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  // onShareAppMessage: function () {

  // }
})