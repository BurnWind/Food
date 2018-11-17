// pages/order_make/order_make.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    options: {},
    receive:{
      // name:'哈哈哈',
      // phone:"13560000000",
      // address:"广东省广州市海珠区 侨光路8号华侨大厦B座7楼"
    },
    order: [
      // {
      //   stop: '好好吃零食旗舰店',
      //   products: [
      //     {
      //       img: '../../images/TB1qup4aGmWBuNjy1XaXXXCbXXa_!!0-item_pic.jpg',
      //       title: '测试商品描述测试商品描述测试商品描述测试商品描述测试商品描述',
      //       price: 18.90,
      //       num: 2,
      //     }
      //   ],
      // }
    ],
    total:0
  },
  chooseAdd:function(){
    var that = this
    wx.chooseAddress({
      success(res) {
        that.data.receive.name = res.userName
        that.data.receive.phone = res.telNumber
        that.data.receive.address = res.provinceName + res.cityName + res.countyName + res.detailInfo
        that.setData({
          receive: that.data.receive
        })
        console.log(Object.keys(that.data.receive).length)
      }
    })
  },
  gettoken: function(){
    var that = this
    var token = wx.getStorageSync('token')
    if (!token) {
      app.indexLogin()
      setTimeout(function(){
        token = that.gettoken()
      },1000)
    }
    return token
  },
  // 提交订单
  commit_order: function(){
    var that = this
    var token = that.gettoken()
    wx.request({
      header: { 'content-type': 'application/x-www-form-urlencoded' },
      url: 'http://176.122.11.85:5000/order/make',
      method: 'post',
      data:{
        'receive': JSON.stringify(that.data.receive),
        'order': JSON.stringify(that.data.order),
        'total': that.data.total,
        'token': token,
        'flag': JSON.stringify(that.data.flag)
      },
      success: function(data){
        if (data.statusCode == 200){
          //调用微信支付接口
          //因权限不够用模态窗模拟
          wx.showModal({
            title: '微信支付',
            content: '￥' + that.data.total,
            success: function(res){
              if(res.confirm){
                console.log('支付成功')
                console.log(data)
                wx.request({
                  url: 'http://176.122.11.85:5000/order/pay',
                  header: { 'content-type': 'application/x-www-form-urlencoded' },
                  data: data.data,
                  method: "post"
                })
              }else if(res.cancel){

              }
            }
          })
        }else if (data.statusCode == 403){
          app.indexLogin()
          setTimeout(function(){
            that.commit_order()
          },1000)
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    var products = options.products
    var flag = options.flag
    if (!flag){
      flag = false
    }else{
      flag = true
    }
    that.setData({
      flag:flag
    })
    var token = that.gettoken()
    wx.request({
      header: { 'content-type': 'application/x-www-form-urlencoded' },
      url: 'http://176.122.11.85:5000/order/get_products',
      data: {
        'products': JSON.stringify(JSON.parse(products)),
        "token": token
      },
      method:'post',
      success: function(data){
        that.setData({
          order : data.data.order,
          receive: data.data.receive,
          options: options
        })
        var order = that.data.order
        var total = 0
        for (var i = 0; i < order.length; i++) {
          var products = order[i].products
          for (var j = 0; j < products.length; j++) {
            total += (products[j].price * products[j].num)
          }
        }
        that.setData({
          total: total.toFixed(2)
        })
      }
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
    this.onLoad(this.data.options)
    wx.stopPullDownRefresh()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})