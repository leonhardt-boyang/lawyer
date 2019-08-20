// pages/legalAid/legalAid.js
const app = getApp();
var ajax = require("../../utils/ajax.js");
var WxParse = require('../../utils/wxParse/wxParse.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    dataList:""
  },
  // 法律援助
  getHelp:function(){
    var that = this;
    var param = {
      'user_id': app.globalData.userId
    }
    wx.showLoading();
    ajax.wxRequest('POST', 'article/legal_aid', param,
      (res) => {
        console.log(res)
        wx.hideLoading();
        if (res.code == 0) {
          that.setData({
            dataList:res.data.info
          })
          WxParse.wxParse('topic', 'html', res.data.info.content, this);
        } else {
          setTimeout(function () {
            wx.showToast({
              title: res.message,
              icon: "none"
            })
          }, 2000)
        }
      },
      (err) => {
        wx.hideLoading();
        setTimeout(function () {
          wx.showToast({
            title: err,
            icon: "none"
          })
        }, 2000)
      })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getHelp();
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