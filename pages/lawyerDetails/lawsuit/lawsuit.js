// pages/lawyerDetails/lawsuit/lawsuit.js
const app = getApp()
var ajax = require("../../../utils/ajax.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    array: [],
    name: "",
    phone: "",
    typeName: "",
    content: "",
    index: "",
    lawyer_id: "",
    money: "",
    typeId: ""
  },
  // 去支付
  payfor: function () {
    var name = this.data.name;
    var phone = this.data.phone;
    var content = this.data.content;
    var type = this.data.typeName;
    var lawyer_id = this.data.lawyer_id;
    console.log(name, phone, type, content)
    var item = {
      'user_id': app.globalData.userId,
      'name': name,
      'mobile': phone,
      'content': content,
      'case_id': this.data.typeId,
      'lawyer_id': lawyer_id
    }
    if (name == "" || phone == "" || type == "" || content == "") {
      wx.showToast({
        title: '请填写完整信息',
        icon: "none"
      })
    } else {
      wx.showLoading()
      ajax.wxRequest('POST', 'order_litigation/submit', item,
        (res) => {
          wx.hideLoading()
          console.log(res)
          if(res.code==0){
            setTimeout(function(){
              wx.showToast({
                title: '提交成功',
                icon: "none"
              })
            },1500)
            setTimeout(function () {
              wx.navigateTo({
                url: '../success/success?type=0'
              })
            }, 2000)
          }else{
            setTimeout(function () {
            wx.showToast({
              title: '提交失败' + err,
              icon: "none"
            })
            }, 1500)
          }
        },
        (err) => {
          console.log(err)
          wx.hideLoading()
          setTimeout(function () {
          wx.showToast({
            title: '提交失败' + err,
            icon: "none"
          })
        }, 1500)
        })
      
    }
  },
  // 案件类型选择
  bindPickerChange: function (e) {
    this.setData({
      index: e.detail.value,
      typeName: this.data.array[e.detail.value].case_name,
      typeId: this.data.array[e.detail.value].case_id,
      money: this.data.array[e.detail.value].money,
    })
  },
  // 获取输入框信息
  getName: function (e) {
    var val = e.detail.value;
    this.setData({
      name: val
    });
  },
  getPhone: function (e) {
    var val = e.detail.value;
    this.setData({
      phone: val
    });
  },

  getContent: function (e) {
    var val = e.detail.value;
    this.setData({
      content: val
    });
  },
  // 获取类型列表
  getType: function () {
    var that = this;
    var item = {
      'user_id': app.globalData.userId,
      'lawyer_id': this.data.lawyer_id
    }
    ajax.wxRequest('POST', 'lawyer/case_type', item,
      (res) => {
        console.log(res)
        that.setData({
          array: res.data
        })
      },
      (err) => {
        setTimeout(function () {
          wx.showToast({
            title: '数据加载失败' + err,
            icon: "none"
          })
        }, 2000)
      })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      lawyer_id: options.id
    })
    this.getType();
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