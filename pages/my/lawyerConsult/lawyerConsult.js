// pages/my/lawyerConsult/lawyerConsult.js
var app = getApp()
var ajax = require("../../../utils/ajax.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    dataList: []
  },
  // 获取咨询列表
  getConsult: function () {
    var that = this;
    var item = {
      'user_id': app.globalData.userId
    }
    wx.showLoading();
    ajax.wxRequest('POST', 'order_consultation/lists', item,
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
              title: '数据加载失败' + err,
              icon: "none"
            })
          }, 1500)
        }

      },
      (err) => {
        wx.hideLoading();
        setTimeout(function () {
          wx.showToast({
            title: '数据加载失败' + err,
            icon: "none"
          })
        }, 1500)
      })
  },
  // 订单详情
  orderDetails: function (e) {
    var order = e.currentTarget.dataset.order;
    wx.navigateTo({
      url: '../lawyerCD/lawyerCD?order=' + order,
    })
  },
  // 评价
  evaluate: function (e) {
    var order = e.currentTarget.dataset.order;
    wx.navigateTo({
      url: '../evaluate/evaluate?order=' + order + '&type=0',
    })
  },
  // 申请退款
  refund: function (e) {
    var order = e.currentTarget.dataset.order;
    var money = e.currentTarget.dataset.money;
    wx.navigateTo({
      url: '../refund/refund?order=' + order + '&money=' + money + '&roleType=0',
    })
  },
  // 拨打电话
  telphone: function (e) {
    var phone = e.currentTarget.dataset.phone;
    wx.makePhoneCall({
      phoneNumber: phone
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
    this.getConsult();
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
