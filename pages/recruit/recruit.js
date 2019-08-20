// pages/recruit/recruit.js
const app = getApp()
var ajax = require("../../utils/ajax.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    name: "",
    phone: "",
    type: "",
    company: ""
  },
  getName: function(e) {
    var val = e.detail.value;
    this.setData({
      name: val
    });
  },
  getPhone: function(e) {
    var val = e.detail.value;
    this.setData({
      phone: val
    });
  },
  getType: function(e) {
    var val = e.detail.value;
    this.setData({
      type: val
    });
  },
  getCompany: function(e) {
    var val = e.detail.value;
    this.setData({
      company: val
    });
  },
  submit: function() {
    var that =this;
    var name = this.data.name;
    var phone = this.data.phone;
    var company = this.data.company;
    var type = this.data.type;
    var item = {
      'user_id': app.globalData.userId,
      'true_name': name,
      'mobile': phone,
      'case_content': type,
      'company': company
    }
    if (name == "" || phone == "" || company == "" || type == "") {
      wx.showToast({
        title: '请填写完整数据',
        icon: "none"
      })
    } else {
      wx.showLoading();
      ajax.wxRequest('POST', 'lawyer/apply', item,
        (res) => {
          console.log(res)
          wx.hideLoading();
          if(res.code==0){
            setTimeout(function () {
              wx.showToast({
                title: '提交成功'
              })
            }, 2000)
            that.onLoad();
          }else{
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
          wx.hideLoading();
          setTimeout(function() {
            wx.showToast({
              title: '数据加载失败' + err,
              icon: "none"
            })
          }, 2000)
        })
    }
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