// pages/order_make/order_make.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    receive:{
      name:'哈哈哈',
      phone:"13560000000",
      address:"广东省广州市海珠区 侨光路8号华侨大厦B座7楼"
    },
    order: [
      {
        stop: '好好吃零食旗舰店',
        products: [
          {
            img: '../../images/TB1qup4aGmWBuNjy1XaXXXCbXXa_!!0-item_pic.jpg',
            title: '测试商品描述测试商品描述测试商品描述测试商品描述测试商品描述',
            price: 18.90,
            num: 2,
          },
          {
            img: '../../images/TB2zEQZvcUrBKNjSZPxXXX00pXa_!!880734502.jpg',
            title: '测试商品描述测试商品描述测试商品描述测试商品描述测试商品描述',
            price: 18.90,
            num: 2,
          },
          {
            img: '../../images/TB2IQBBkH9YBuNjy0FgXXcxcXXa_!!2371566698.jpg',
            title: '测试商品描述测试商品描述测试商品描述测试商品描述测试商品描述',
            price: 18.90,
            num: 2,
          }
        ],
      },
      {
        stop: '好好吃零食旗舰店',
        products: [
          {
            img: '../../images/TB1qup4aGmWBuNjy1XaXXXCbXXa_!!0-item_pic.jpg',
            title: '测试商品描述测试商品描述测试商品描述测试商品描述测试商品描述',
            price: 18.90,
            num: 2,
          },
          {
            img: '../../images/TB2zEQZvcUrBKNjSZPxXXX00pXa_!!880734502.jpg',
            title: '测试商品描述测试商品描述测试商品描述测试商品描述测试商品描述',
            price: 14.90,
            num: 2,
          },
          {
            img: '../../images/TB2IQBBkH9YBuNjy0FgXXcxcXXa_!!2371566698.jpg',
            title: '测试商品描述测试商品描述测试商品描述测试商品描述测试商品描述',
            price: 18.90,
            num: 3,
          }
        ],
      }
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
      url: 'http://127.0.0.1:5000/order/make',
      method: 'post',
      data:{
        'receive': JSON.stringify(that.data.receive),
        'order': JSON.stringify(that.data.order),
        'total': that.data.total,
        'token': token
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
                wx.request({
                  url: 'order/pay',
                  data: data.data,
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
    wx.request({
      header: { 'content-type': 'application/x-www-form-urlencoded' },
      url: 'http://127.0.0.1:5000/order/get_products',
      data:{
        'products':JSON.stringify(products)
      },
      method:'post',
      success: function(data){
        console.log(data)
        // that.setData({
        //   order : data.data.order
        // })
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    var that = this,
        order = that.data.order,
        total = that.data.total;
    for(var i=0;i<order.length;i++){
      var products = order[i].products
      for(var j=0;j<products.length;j++){
        total += (products[j].price * products[j].num)
      }
    }
    this.setData({
      total:total
    })
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
  onShareAppMessage: function () {

  }
})