// pages/my/setAmount/setAmount.js
var app = getApp()
var ajax = require("../../../utils/ajax.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    order:"",
    money:""
  },
  money:function(e){
    console.log(e)
    this.setData({
      money: e.detail.value
    })
  },
  submit:function(){
    var that = this;
    var item = {
      'user_id': app.globalData.userId,
      'order_no': that.data.order,
      'money':that.data.money
    }
    wx.showModal({
      content: '确定设定此金额？',
      cancelText: "取消",
      confirmText: "确定",
      success: function (res) {
        if (res.confirm) {
          wx.showLoading();
          ajax.wxRequest('POST', 'order_litigation/edit_order', item,
            (res) => {
              wx.hideLoading();
              console.log(res)
              if (res.code == 0) {
                setTimeout(function () {
                  wx.showToast({
                    title: "设置成功"
                  })
                }, 1500)
                setTimeout(function () {
                  wx.navigateBack();
                }, 2000)
              } else {
                setTimeout(function () {
                  wx.showToast({
                    title: res.message,
                    icon: "none"
                  })
                }, 1500)
              }

            },
            (err) => {
              wx.hideLoading();
              setTimeout(function () {
                wx.showToast({
                  title: '设置失败' + err,
                  icon: "none"
                })
              }, 1500)
            })
        } else {

        }
      }
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      order:options.order
    })
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