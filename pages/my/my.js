// pages/my/my.js
var app = getApp()
var ajax = require("../../utils/ajax.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    dataList:"",
  },
  // 我的关注
  myFocus:function(e){
    var lawyer = e.currentTarget.dataset.lawyer
    if (lawyer==true){
      wx.navigateTo({
        url: './myfans/myfans',
      })
    }else{
    wx.navigateTo({
      url: './myFocus/myFocus',
    })
    }
  },
  // 我的诉讼
  myLawsuit: function (e) {
    var lawyer = e.currentTarget.dataset.lawyer
    if (lawyer==true){
      wx.navigateTo({
        url: './lawyerLawsuit/lawyerLawsuit',
      })
    }else{
      wx.navigateTo({
        url: './lawsuit/lawsuit',
      })
    }
  },
  // 我的咨询
  myConsult: function (e) {
    var lawyer = e.currentTarget.dataset.lawyer
    if (lawyer == true) {
      wx.navigateTo({
        url: './lawyerConsult/lawyerConsult',
      })
    } else {
      wx.navigateTo({
        url: './consult/consult',
      })
    }
  },
  //我的问题
  myProblem: function () {
    wx.navigateTo({
      url: './problem/problem',
    })
  },
  // 我的名片
  myCard:function(){
    wx.navigateTo({
      url: './myCard/myCard',
    })
  },
  // 我的粉丝
  myfans: function () {
    wx.navigateTo({
      url: './myfans/myfans',
    })
  },
  // 获取个人信息
  getUserinfor:function(){
    var item = {
      'user_id': app.globalData.userId
    }
    ajax.wxRequest('POST', 'user/info', item,
      (res) => {
        console.log(res)
        this.setData({
          dataList: res.data
        })

      },
      (err) => {
        console.log(err)
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
    this.getUserinfor();
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