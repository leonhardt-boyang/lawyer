// pages/lawyerDetails/payfor/payfor.js
const app = getApp()
var ajax = require("../../../utils/ajax.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    name: "",
    phone: "",
    type: "",
    content: "",
    typeId: "",
    money: "",
    lawyer_id: ""
  },
  // 取消
  cancel: function() {
    wx.navigateBack()
  },
  // 支付
  payfor: function() {
    var that = this;
    var item = {
      'user_id': app.globalData.userId,
      'lawyer_id': this.data.lawyer_id,
      'name': this.data.name,
      'mobile': this.data.phone,
      'case_id': this.data.typeId,
      'content': this.data.content
    }
    wx.showLoading();
    ajax.wxRequest('POST', 'order_consultation/submit', item,
      (res) => {
        console.log(res)
        if (res.code == 0) {
          var param = {
            'user_id': app.globalData.userId,
            'order_no': res.data.id
          }
          ajax.wxRequest('POST', 'order_consultation/pay_data', param,
            (res) => {
              wx.hideLoading();
              if (res.code == 0) {
                setTimeout(function() {
                  wx.showToast({
                    title: '提交成功',
                  })
                  wx.redirectTo({
                    url: '../success/success',
                  })
                }, 2000)
              }else{
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
              setTimeout(function() {
                wx.showToast({
                  title: err,
                  icon: "none"
                })
              }, 2000)
            })
        } else {
          wx.hideLoading();
          setTimeout(function() {
            wx.showToast({
              title: res.message,
              icon: "none"
            })
          }, 2000)
        }
      },
      (err) => {
        wx.hideLoading();
        setTimeout(function() {
          wx.showToast({
            title: '数据加载失败' + err,
            icon: "none"
          })
        }, 2000)
      })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var item = JSON.parse(options.item);
    this.setData({
      name: item.name,
      phone: item.phone,
      type: item.type,
      content: item.content,
      money: item.money,
      typeId: item.typeId,
      lawyer_id: item.lawyer_id
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