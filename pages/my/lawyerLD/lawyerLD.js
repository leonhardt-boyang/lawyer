// pages/my/lawyerLD/lawyerLD.js
var app = getApp()
var ajax = require("../../../utils/ajax.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    dataList: "",
    order: ""
  },
  //详情
  getData: function(param) {
    var item = {
      'user_id': app.globalData.userId,
      'order_no': param
    }
    wx.showLoading()
    ajax.wxRequest('POST', 'order_litigation/detail', item,
      (res) => {
        console.log(res)
        wx.hideLoading()
        if (res.code == 0) {
          this.setData({
            dataList: res.data.info
          })
        } else {
          setTimeout(function() {
            wx.showToast({
              title: res.message,
              icon: "none"
            })
          }, 2000)
        }

      },
      (err) => {
        console.log(err)
        setTimeout(function() {
          wx.showToast({
            title: '数据加载失败' + err,
            icon: "none"
          })
        }, 2000)
      })
  },
  // 全部诉讼进度
  progress:function(e){
    var order = e.currentTarget.dataset.order;
    wx.navigateTo({
      url: '../progress/progress?order=' + order,
    })
  },

  // 拨打电话
  telphone: function(e) {
    var phone = e.currentTarget.dataset.phone;
    wx.makePhoneCall({
      phoneNumber: phone
    })
  },
  // 受理
  accept: function (e) {
    var that = this;
    var item = {
      'user_id': app.globalData.userId,
      'order_no': e.currentTarget.dataset.order
    }
    wx.showModal({
      content: '确定受理此订单？',
      cancelText: "取消",
      confirmText: "确定",
      success: function (res) {
        if (res.confirm) {
          wx.showLoading();
          ajax.wxRequest('POST', 'order_litigation/accep', item,
            (res) => {
              wx.hideLoading();
              console.log(res)
              if (res.code == 0) {
                setTimeout(function () {
                  wx.showToast({
                    title: "受理成功"
                  })
                }, 1500)
                setTimeout(function () {
                  that.getData(that.data.order);
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
                  title: '受理失败' + err,
                  icon: "none"
                })
              }, 1500)
            })
        } else {

        }
      }
    });
  },
  // 完成
  complete: function(e) {
    var that = this;
    var item = {
      'user_id': app.globalData.userId,
      'order_no': e.currentTarget.dataset.order
    }
    wx.showModal({
      content: '确定完成此订单？',
      cancelText: "取消",
      confirmText: "确定",
      success: function(res) {
        if (res.confirm) {
          wx.showLoading();
          ajax.wxRequest('POST', 'order_litigation/accep_end', item,
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
                  that.getData(that.data.order);
                }, 2000)
              } else {
                setTimeout(function() {
                  wx.showToast({
                    title: res.message,
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
        } else {

        }
      }
    });
  },

  // 设定金额
  setMoney:function(e){
    var order = e.currentTarget.dataset.order;
    wx.navigateTo({
      url: '../setAmount/setAmount?order='+order,
    })
  },

  // 填写记录
  fillRecord:function(e){
    var order = e.currentTarget.dataset.order;
    wx.navigateTo({
      url: '../editProgress/editProgress?order=' + order,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      order: options.order
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
    this.getData(this.data.order)
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
  // onShareAppMessage: function () {

  // }
})