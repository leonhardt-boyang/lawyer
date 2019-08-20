// pages/my/lawOrderDetails/progress/progress.js
var app = getApp()
var ajax = require("../../../utils/ajax.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    order:"",
    dataList:[]
  },
  getProgress:function(){
    var item = {
      'user_id': app.globalData.userId,
      'order_no': this.data.order
    }
    wx.showLoading()
    ajax.wxRequest('POST', 'order_litigation/speed', item,
      (res) => {
        console.log(res)
        wx.hideLoading()
        if (res.code == 0) {
          this.setData({
            dataList: res.data.data
          })
        } else {
          setTimeout(function () {
            wx.showToast({
              title: res.message,
              icon: "none"
            })
          }, 2000)
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
  /**   
     * 预览图片  
     */
  previewImage: function (e) {
    var current = e.target.dataset.src;
    var idx = e.currentTarget.dataset.idx;
    var data = this.data.dataList[idx].enclosure;
    wx.previewImage({
      current: current, // 当前显示图片的http链接  
      urls: data // 需要预览的图片http链接列表  
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
    this.getProgress()
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