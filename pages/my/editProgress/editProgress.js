// pages/my/editProgress/editProgress.js
// pages/my/lawOrderDetails/progress/progress.js
var app = getApp()
var ajax = require("../../../utils/ajax.js");
var i, success, fail;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    order: "",//订单编号
    dataList: [],//获取的数据
    pics: [],//本地上传图片的数组
    selectedFlag: [],//展开收缩的判断数组
    dataIndex:"",//添加图片数组的位置
    itemimages:[],//添加图片的数组
    isSave:true,//判断编辑后是否保存
    content:""//编辑内容
  },
  getProgress: function() {
    var that = this;
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
          for (var i = 0; i < res.data.data.length;i++){
            that.setData({
              selectedFlag:that.data.selectedFlag.concat(false)
            })
          }
        } else {
          setTimeout(function() {
            wx.showToast({
              title: res.message,
              icon: "none"
            })
          }, 2000)
        }

      },
      (err) => {
        console.log(err)
        setTimeout(function() {
          wx.showToast({
            title: '数据加载失败' + err,
            icon: "none"
          })
        }, 2000)
      })
  },
  //这里是选取图片的方法
  choose: function(e) {
    var that = this;
    wx.chooseImage({
      count: 9, // 最多可以选择的图片张数，默认9
      sizeType: ['original'], // original 原图，compressed 压缩图，默认二者都有
      sourceType: ['album'], // album 从相册选图，camera 使用相机，默认二者都有
      success: function(res) {
        console.log(res)
        that.setData({
          pics: res.tempFilePaths
        });
        that.uploadimg(that.data.pics)
      },
      fail: function() {
        // fail
      },
      complete: function() {
        // complete
      }
    })
  },
  //这里触发图片上传的方法
  uploadimg: function(data) { 
    //多张图片上传
    wx.showLoading({
      title: '上传中...',
    })
    var that = this
    i = data.i ? data.i : 0,
    success = data.success ? data.success : 0,
    fail = data.fail ? data.fail : 0;
    console.log(data)
    wx.uploadFile({
      url: ajax.serverPath+'upload/file',
      filePath: data[i],
      name: 'image',
      formData: {
        'user_id': app.globalData.userId
      },
      success: (resp) => {
        var data = JSON.parse(resp.data)
        var dataList  = that.data.dataList;
        var newList = 'dataList['+that.data.dataIndex+'].enclosure';
        this.setData({
          itemimages: that.data.itemimages.concat(data.data.list[0].url),
          [newList]: that.data.itemimages,
          dataList: that.data.dataList
        })
        success++;
      },
      fail: (res) => {
        fail++;
        wx.hideLoading()
      },
      complete: () => {
        i++;
        if (i == data.length) { //当图片传完时，停止调用   
          wx.hideLoading()
          console.log(that.data.dataList)
          var dataList = that.data.dataList;
          var newList = 'dataList[' + that.data.dataIndex + '].enclosure';
          this.setData({
            [newList]: that.data.itemimages
          })
        } else { //若图片还没有传完，则继续调用函数
          data.i = i;
          data.success = success;
          data.fail = fail;
          that.uploadimg(that.data.pics);

        }
      }
    });
  },
  // 展开，收缩
  changeToggle: function (e) {
    var that =this;
    var index = e.currentTarget.dataset.index;
    var type = e.currentTarget.dataset.type;
    var id = e.currentTarget.dataset.id;
    if (type==0){//编辑
      this.setData({
        dataIndex: index
      })
      if(that.data.isSave==true){
        that.setData({
          isSave:false
        })
        if (this.data.selectedFlag[index]) {
          this.data.selectedFlag[index] = false;
        } else {
          this.data.selectedFlag[index] = true;
        }
        this.setData({
          selectedFlag: this.data.selectedFlag
        })
      }else{
        wx.showToast({
          title: '请保存数据',
          icon:"none"
        })
      }
    } else if (type==1){//保存
      that.setData({
        isSave: true
      })
      var item = {
        'user_id': app.globalData.userId,
        'order_no': this.data.order,
        'process_id':id,
        'enclosure': JSON.stringify(that.data.dataList[that.data.dataIndex].enclosure),
        'content': that.data.dataList[that.data.dataIndex].content
      }
      console.log(item)
      wx.showLoading()
      ajax.wxRequest('POST', 'order_litigation/speed_submit', item,
        (res) => {
          console.log(res)
          wx.hideLoading()
          if (res.code == 0) {
            setTimeout(function () {
              wx.showToast({
                title: "保存成功"
              })
            }, 2000)
            if (this.data.selectedFlag[index]) {
              this.data.selectedFlag[index] = false;
            } else {
              this.data.selectedFlag[index] = true;
            }
            this.setData({
              selectedFlag: this.data.selectedFlag
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
              title: '提交失败' + err,
              icon: "none"
            })
          }, 2000)
        })
    }
  },
// 诉讼记录赋值
  editText: function (e) {
    console.log(e)
    var content = e.detail.value;
    var that = this;
    var index = e.target.dataset.index;
    var val = that.data.dataList[index];
    val.content = content;
    that.setData({
      content: content,
      dataList: that.data.dataList
    });
  },
  // 删除图片
  delImg:function(e){
    var that =this;
    var index = e.currentTarget.dataset.index;
    var dataList = that.data.dataList;
    var newList = 'dataList[' + that.data.dataIndex + '].enclosure';
    var dataindex = that.data.dataIndex;
    var newList2 = that.data.dataList[dataindex].enclosure
    wx.showModal({
      content: '确定删除此图片？',
      cancelText: "取消",
      confirmText: "确定",
      success: function (res) {
        if (res.confirm) {
          var array = [];
          console.log(index)
          for (var i = 0; i < newList2.length; i++) {
            if(i!=index){
              array.push(newList2[i]);
            }
          }
          console.log(array)
          that.setData({
            [newList]: array,
            dataList: that.data.dataList
          })
        } else {

        }
      }
    });

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      order: options.order
    })
    this.getProgress()
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
  // onShareAppMessage: function () {

  // }
})