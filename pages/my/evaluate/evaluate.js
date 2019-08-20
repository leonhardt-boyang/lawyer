// pages/my/evaluate/evaluate.js
var app = getApp()
var ajax = require("../../../utils/ajax.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    ico_index1: '1',
    ico_index2: '2',
    ico_index3: '2',
    index1: '1',
    index2: '2',
    index3: '2',
    face_type: '1',
    type: "1",
    order: "",
    roleType: ""
  },
  change_color: function(e) {
    var id = e.currentTarget.dataset.id;
    console.log(id);
    if (id == 1) {
      this.setData({
        ico_index1: '1',
        ico_index2: '2',
        ico_index3: '2',
        face_type: '1'
      })

    }
    if (id == 2) {
      this.setData({
        ico_index1: '2',
        ico_index2: '1',
        ico_index3: '2',
        face_type: '2'
      })


    }
    if (id == 3) {
      this.setData({
        ico_index1: '2',
        ico_index2: '2',
        ico_index3: '1',
        face_type: '3'
      })
    }
  },
  change: function(e) {
    var id = e.currentTarget.dataset.id;
    console.log(id);
    if (id == 1) {
      this.setData({
        index1: '1',
        index2: '2',
        index3: '2',
        type: '1'
      })

    }
    if (id == 2) {
      this.setData({
        index1: '2',
        index2: '1',
        index3: '2',
        type: '2'
      })


    }
    if (id == 3) {
      this.setData({
        index1: '2',
        index2: '2',
        index3: '1',
        type: '3'
      })
    }
  },
  submit: function() {
    var item = {
      'user_id': app.globalData.userId,
      'order_no': this.data.order,
      'reply_efficiency': this.data.face_type,
      'satisfied': this.data.type
    }
    if (this.data.roleType == 0) {
      ajax.wxRequest('POST', 'order_consultation/add_comment', item,
        (res) => {
          console.log(res)
          if (res.code == 0) {
            wx.showToast({
              title: '提交成功',
            })
            setTimeout(function() {
              wx.navigateBack()
            }, 1500)
          }

        },
        (err) => {
          console.log(err)
          wx.showToast({
            title: '数据加载失败' + err,
            icon: "none"
          })
        })
    } else if (this.data.roleType == 1) {
      ajax.wxRequest('POST', '/order_litigation/add_comment', item,
        (res) => {
          console.log(res)
          if (res.code == 0) {
            wx.showToast({
              title: '提交成功',
            })
            setTimeout(function() {
              wx.navigateBack()
            }, 1500)
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
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      order: options.order,
      roleType: options.type
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