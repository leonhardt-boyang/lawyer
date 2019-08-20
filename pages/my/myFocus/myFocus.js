// pages/my/myFocus/myFocus.js
const app = getApp()
var ajax = require("../../../utils/ajax.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    dataList:[]
  },
  // 我的关注
  getFocus: function() {
    var that = this;
    var item = {
      'user_id': app.globalData.userId
    }
    wx.showLoading();
    ajax.wxRequest('POST', 'lawyer/follow_lists', item,
      (res) => {
        wx.hideLoading();
        console.log(res)
        that.setData({
          dataList:res.data.data
        })

      },
      (err) => {
        console.log(err)
        wx.hideLoading();
        setTimeout(function() {
          wx.showToast({
            title: '数据加载失败' + err,
            icon: "none"
          })
        }, 2000)
      })
  },
  // 取消关注
  unfollow: function(e) {
    var that = this;
    wx.showModal({
      content: '确定取消关注？',
      cancelText: "取消",
      confirmText: "确定",
      success: function(res) {
        if (res.confirm) {
          // 关注、取消
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
                  setTimeout(function(){
                    that.getFocus();
                  },2000)
                }
              },
              (err) => {
                console.log(err)
                wx.showToast({
                  title: '数据加载失败' + err,
                  icon: "none"
                })
              })
        } else {

        }
      }
    });
  },
  // 律师详情
  lawyerDetails: function (e) {
    var id = e.currentTarget.dataset.id;
    var flow = true;
    var type = e.currentTarget.dataset.type;
    wx.navigateTo({
      url: '../../lawyerDetails/lawyerDetails?id=' + id + '&flow=' + flow + '&type=' + type,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    
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
    this.getFocus();
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