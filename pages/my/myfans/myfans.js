// pages/my/myfans/myfans.js
var app = getApp()
var ajax = require("../../../utils/ajax.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    dataList:[]
  },

  getFans:function(){
    var that = this;
    var item = {
      'user_id': app.globalData.userId
    }
    wx.showLoading();
    ajax.wxRequest('POST', 'lawyer/fans_lists', item,
      (res) => {
        wx.hideLoading();
        console.log(res)
        if (res.code == 0) {
          that.setData({
            dataList: res.data.data
          })
        } else {
          setTimeout(function () {
            wx.showToast({
              title: '数据加载失败',
              icon: "none"
            })
          }, 1500)
        }
      },
      (err) => {
        wx.hideLoading();
        setTimeout(function () {
          wx.showToast({
            title: '数据加载失败',
            icon: "none"
          })
        }, 1500)
      })
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getFans();
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