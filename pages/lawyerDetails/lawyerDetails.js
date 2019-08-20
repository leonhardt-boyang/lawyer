// pages/lawyerDetails/lawyerDetails.js
const app = getApp()
var ajax = require("../../utils/ajax.js");
var WxParse = require('../../utils/wxParse/wxParse.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    dataList: "",
    flow:"",
    type:"",
    lawyer_id:"",
    focusNum:""
  },
  consult: function(e) {
    if (app.globalData.userId == 'undefined' || app.globalData.userId == ''){
      wx.showModal({
        content: '您的账号未授权，需您授权！',
        cancelText: "取消",
        confirmText: "确定",
        success: function (res) {
          if (res.confirm) {
            wx.redirectTo({
              url: '../index/index'
            })
          } else {
            wx.showToast({
              title: '取消授权！',
              icon:"none"
            })
          }
        }
      });
    }else{
      var id = e.currentTarget.dataset.id;
      wx.navigateTo({
        url: './consult/consult?id='+id,
      })
    }
  },
  lawsuit: function(e) {
    if (app.globalData.userId == 'undefined' || app.globalData.userId == '') {
      wx.showModal({
        content: '您的账号未授权，需您授权！',
        cancelText: "取消",
        confirmText: "确定",
        success: function (res) {
          if (res.confirm) {
            wx.redirectTo({
              url: '../index/index'
            })
          } else {
            wx.showToast({
              title: '取消授权！',
              icon: "none"
            })
          }
        }
      });
    } else {
    var id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: './lawsuit/lawsuit?id='+id,
    })
    }
  },
  // 关注、取消
  focus: function (e) {
    var that =this;
    if (app.globalData.userId == 'undefined' || app.globalData.userId == '') {
      wx.showModal({
        content: '您的账号未授权，需您授权！',
        cancelText: "取消",
        confirmText: "确定",
        success: function (res) {
          if (res.confirm) {
            wx.redirectTo({
              url: '../index/index'
            })
          } else {
            wx.showToast({
              title: '取消授权！',
              icon: "none"
            })
          }
        }
      });
    } else {
    var item = {
      'user_id': app.globalData.userId,
      'lawyer_id': e.currentTarget.dataset.id
    }
    ajax.wxRequest('POST', 'lawyer/follow', item,
      (res) => {
        console.log(res)
        if (res.code == 0) {
          wx.showToast({
            title: res.message
          })
          if (res.message=="已关注"){
            this.setData({
              flow:"true",
              focusNum: that.data.focusNum + 1
            })
          } else if (res.message == "已取消"){
            this.setData({
              flow: "false",
              focusNum: that.data.focusNum-1
            })
          }
        }

      },
      (err) => {
        console.log(err)
        wx.showToast({
          title: '数据加载失败' + err,
          icon: "none"
        })
      })
    }
  },
  goHome:function(){
    wx.reLaunch({
      url: '../../home/home',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      flow: options.flow,
      type:options.type,
      lawyer_id: options.id
    })
    var that = this;
    var item = {
      'user_id': app.globalData.userId,
      'lawyer_id': this.data.lawyer_id
    }
    wx.showLoading();
    ajax.wxRequest('POST', 'lawyer/info', item,
      (res) => {
        wx.hideLoading();
        console.log(res)
        that.setData({
          dataList:res.data.info,
          focusNum: res.data.info.follow
        })
        WxParse.wxParse('topic', 'html', res.data.info.introduce, this);
      },
      (err) => {
        console.log(err)
        wx.hideLoading();
        setTimeout(function(){
          wx.showToast({
            title: '数据加载失败' + err,
            icon: "none"
          })
        },2000)
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
  onShow: function(options) {

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