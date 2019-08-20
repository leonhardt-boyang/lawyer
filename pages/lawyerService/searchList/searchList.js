// pages/lawyerService/searchList/searchList.js
const app = getApp()
var ajax = require("../../../utils/ajax.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    keyword:"",
    lawyerList:[]
  },
  getdata:function(){
    var item = {
      'user_id': app.globalData.userId,
      'keyword': this.data.keyword
    }
    wx.showLoading()
    ajax.wxRequest('POST', 'lawyer/lists', item,
      (res) => {
        wx.hideLoading()
        if (res.code == 0) {
          this.setData({
            lawyerList: res.data.data
          })
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
            title: '数据加载失败' + err,
            icon: "none"
          })
        }, 1500)
      })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      keyword:options.keyword
    })
    
  },
  // 律师详情
  lawyerDetails: function (e) {
    var id = e.currentTarget.dataset.id;
    var flow = e.currentTarget.dataset.flow;
    var type = e.currentTarget.dataset.type;
    wx.navigateTo({
      url: '../../lawyerDetails/lawyerDetails?id=' + id + '&flow=' + flow + '&type=' + type,
    })
  },
  // 关注、取消
  focus: function (e) {
    var item = {
      'user_id': app.globalData.userId,
      'lawyer_id': e.currentTarget.dataset.id
    }
    ajax.wxRequest('POST', 'lawyer/follow', item,
      (res) => {
        console.log(res)
        if (res.code == 0) {
          wx.showToast({
            title: res.message,
          })
          this.getdata();
        }

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
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.getdata();
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