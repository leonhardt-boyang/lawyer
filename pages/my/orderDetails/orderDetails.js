// pages/my/orderDetails/orderDetails.js
var app = getApp()
var ajax = require("../../../utils/ajax.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    dataList:"",
    order:""
  },
  //详情
  getData: function (param) {
    var item = {
      'user_id': app.globalData.userId,
      'order_no':param
    }
    wx.showLoading()
    ajax.wxRequest('POST', 'order_consultation/detail', item,
      (res) => {
        console.log(res)
        wx.hideLoading()
        if(res.code==0){
          this.setData({
            dataList: res.data.info
          })
        }else{
          setTimeout(function(){
            wx.showToast({
              title: res.message,
              icon: "none"
            })
          },2000)
        }

      },
      (err) => {
        console.log(err)
        setTimeout(function () {
        wx.showToast({
          title: '数据加载失败' + err,
          icon: "none"
        })
        }, 2000)
      })
  },
  // 评价 
  evaluate:function(e){
    var order = e.currentTarget.dataset.order;
    wx.navigateTo({
      url: '../evaluate/evaluate?order='+order,
    })
  },
  // 申请退款
  refund:function(e){
    var order = e.currentTarget.dataset.order;
    var money = e.currentTarget.dataset.money;
    wx.navigateTo({
      url: '../refund/refund?order='+order+'&money='+money+'&roleType=0',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      order: options.order
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
    this.getData(this.data.order)
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