// pages/my/myCard/myCard.js
var app = getApp()
var ajax = require("../../../utils/ajax.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    dataList:"",
    goodsDetails: '',
    modelShow: true,
    canvasShow: true,
    newbackpic: "",
    newpicstr: "",
    codeUrl: ""
  },
  getCard:function(){
    var that = this;
    var item = {
      'user_id': app.globalData.userId
    }
    wx.showLoading();
    ajax.wxRequest('POST', 'user/getCard', item,
      (res) => {
        wx.hideLoading();
        console.log(res)
        if (res.code == 0) {
          that.setData({
            dataList: res.data.info
          })
        } else {
          setTimeout(function () {
            wx.showToast({
              title: '数据加载失败',
              icon: "none"
            })
          }, 1500)
        }
      },
      (err) => {
        wx.hideLoading();
        setTimeout(function () {
          wx.showToast({
            title: '数据加载失败',
            icon: "none"
          })
        }, 1500)
      })
  },
  // 去分享
  goShare() {
    this.setData({
      modelShow: false
    })
  },
  // 取消分享
  cancel() {
    this.setData({
      modelShow: true
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getCard();
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
  onShareAppMessage: function (ops) {
    console.log(ops)
    var that = this;
    var id = ops.target.dataset.id;
    var userId = app.globalData.userId;
    console.log(id, userId)
    // if(ops.from==='button'){}
    return {
      title: '龙视律师服务平台',
      path: '/pages/lawyerDetails/lawyerDetails?lawyer_id=' + id + '&user_id=' + userId,
      success: function (res) {
        console.log(res)
        wx.showToast({
          title: '转发成功！',
        })
        that.cancel()
      },
      fail: function (res) {
        // 转发失败
        wx.showToast({
          title: '转发失败',
          icon: "none"
        })
      }
    }
  },
  // 生成海报
  getImage: function (url) {
    return new Promise((resolve, reject) => {
      wx.getImageInfo({
        src: url,
        success: function (res) {
          resolve(res)
        },
        fail: function () {
          reject("")
        }
      })
    })
  },
  getImageAll: function (image_src) {
    let that = this;
    var all = [];
    image_src.map(function (item) {
      all.push(that.getImage(item))
    })
    return Promise.all(all)
  },
  //创建
  sharePyq: function (e) {
    wx.showLoading()
    var that = this;
    that.cancel();
    var item = {
      'user_id': app.globalData.userId,
      'lawyer_id': e.currentTarget.dataset.id
    }
    wx.showLoading();
    ajax.wxRequest('POST', 'share/qrcode', item,
      (res) => {
        var url = res.data.url;
        var qrbg = res.data.qrcode_bg;
        //获取网络图片本地路径
        wx.getImageInfo({
          src: that.data.goodsDetails.pic_list[0],
          success: function (res) {
            that.setData({
              newbackpic: res.path,
              codeUrl: url
            });
            wx.getImageInfo({
              src: url,
              success: function (res) {
                that.setData({
                  newpicstr: res.path
                })
                let bg = that.data.newbackpic;
                let qr = that.data.newpicstr;
                that.getImageAll([bg, qr, qrbg]).then((res) => {
                  console.log(res)
                  wx.getImageInfo({
                    src: qrbg,
                    success: function (res) {

                    }
                  })
                  const ctx = wx.createCanvasContext('shareCanvas')
                  // 底图
                  ctx.drawImage(res[0].path, 0, 0, 315, 330);

                  // 背景
                  ctx.drawImage(res[2].path, 0, 320, 300, 100)
                  // 文字
                  ctx.setTextAlign('center') // 文字居中
                  ctx.setFillStyle('#fff') // 文字颜色
                  ctx.setFontSize(16) // 文字字号
                  ctx.fillText("我在积分商城发现一个宝贝", 110, 350)
                  ctx.fillText("扫码注册即有积分相送哦！", 110, 370)
                  // 小程序码
                  ctx.drawImage(res[1].path, 210, 280, 80, 80)
                  ctx.stroke()
                  ctx.draw()
                  wx.hideLoading()
                  that.setData({
                    canvasShow: false
                  })
                  wx.showModal({
                    title: '提示',
                    content: '图片绘制完成请保存到相册',
                    showCancel: false,
                    confirmText: "点击保存",
                    success: function (res) {
                      that.save()
                    }
                  })
                })
              },
              fail: function (res) {
              }
            });
          },
          fail: function (res) {
          }
        });
        that.setData({

        })

      },
      (err) => {
        console.log(err)
        wx.hideLoading();
        wx.showToast({
          title: '数据加载失败' + err,
          icon: "none"
        })
      })

  },
  //保存
  save: function () {
    var that = this;
    wx.canvasToTempFilePath({ //canvas 生成图片 生成临时路径
      canvasId: 'shareCanvas',
      success: function (res) {
        //console.log(res)
        wx.saveImageToPhotosAlbum({ //下载图片
          filePath: res.tempFilePath,
          success: function () {
            wx.showToast({
              title: "图片已保存到相册",
              icon: "success",
            });
            setTimeout(function () {
              that.setData({
                canvasShow: true
              })

              var item = {
                'user_id': app.globalData.userId,
                'path': that.data.codeUrl
              }
              ajax.wxRequest('POST', 'share/un_qrcode', item,
                (res) => { },
                (err) => { })
            }, 3000)
          },
          fail(err) {
            wx.showToast({
              title: '请打开相册储存权限',
              icon: "none"
            })
          }
        })
      }
    })
  }
})