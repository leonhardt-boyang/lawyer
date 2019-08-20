// pages/my/refund/refund.js
var app = getApp()
var ajax = require("../../../utils/ajax.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    order: "",
    money: "",
    roleType: ""
  },
  apply: function() {
    var that = this;
    var item = {
      'user_id': app.globalData.userId,
      'order_no': this.data.order
    }
    wx.showLoading();
    if (this.data.roleType == 0) {
      ajax.wxRequest('POST', 'order_consultation/apply_refund', item,
        (res) => {
          wx.hideLoading();
          console.log(res)
          if (res.code == 0) {
            setTimeout(function() {
              wx.showToast({
                title: "提交成功"
              })
            }, 1500)
            setTimeout(function() {
              wx.navigateBack()
            }, 2000)
          } else {
            setTimeout(function() {
              wx.showToast({
                title: '提交失败' + err,
                icon: "none"
              })
            }, 1500)
          }

        },
        (err) => {
          wx.hideLoading();
          setTimeout(function() {
            wx.showToast({
              title: '提交失败' + err,
              icon: "none"
            })
          }, 1500)
        })
    } else if (this.data.roleType == 1) {
      ajax.wxRequest('POST', 'order_litigation/apply_refund', item,
        (res) => {
          wx.hideLoading();
          console.log(res)
          if (res.code == 0) {
            setTimeout(function() {
              wx.showToast({
                title: "提交成功"
              })
            }, 1500)
            setTimeout(function() {
              wx.navigateBack()
            }, 2000)
          } else {
            setTimeout(function() {
              wx.showToast({
                title: '提交失败' + err,
                icon: "none"
              })
            }, 1500)
          }

        },
        (err) => {
          wx.hideLoading();
          setTimeout(function() {
            wx.showToast({
              title: '提交失败' + err,
              icon: "none"
            })
          }, 1500)
        })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      order: options.order,
      money: options.money,
      roleType: options.roleType
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