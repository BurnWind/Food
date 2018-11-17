// pages/order/order.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentTab: 0,
    orders: [
      // {
      //   receive: {
      //     name: '哈哈哈',
      //     phone: "13560000000",
      //     address: "广东省广州市海珠区 侨光路8号华侨大厦B座7楼"
      //   },
      //   order: [
      //     {
      //       stop: '好好吃零食旗舰店',
      //       products: [
      //         {
      //           img: '../../images/TB1qup4aGmWBuNjy1XaXXXCbXXa_!!0-item_pic.jpg',
      //           title: '测试商品描述测试商品描述测试商品描述测试商品描述测试商品描述',
      //           price: 18.90,
      //           num: 2,
      //           url:  '/pages/product_detail/product_detail'
      //         },
      //       ],
      //     },
      //   ],
      //   total: 0,
      //   status: '待付款',
      //   order_time: '2018-07-09 14:16:24'
      // }
    ]
  },
  clickTab: function (e) {
    this.setData({
      currentTab: e.currentTarget.dataset.current
    })
  },
  count_price(){
    var that = this
    var orders = that.data.orders
    for (var i = 0; i < orders.length; i++) {
      var total = 0
      var order = orders[i].order
      for (var j=0; j<order.length;j++){
        var products = order[j].products
        for (var k = 0; k < products.length; k++) {
          total += (products[k].price * products[k].num)
        }
      }
      that.data.orders[i].total = total.toFixed(2)
    }
    this.setData({
      orders: that.data.orders
    })
  },
  // 获取订单信息
  get_order: function(){
    var that = this
    var token = wx.getStorageSync('token')
    wx.request({
      url: 'http://176.122.11.85:5000/order/show',
      method: 'get',
      data: {
        'token': token
      },
      success: function (data) {
        if (data.statusCode == 403) {
          app.indexlogin()
          setTimeout(function () {
            that.get_order()
          }, 2000)
        } else {
          that.setData({
            orders: data.data
          })
          that.count_price()
        }
      }
    })
  },
  // 取消订单
  cancel_order: function(){

  },
  // 确认付款
  pay_order: function(){

  },
  // 确认收货
  commit_order: function(){

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.get_order()
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
    this.count_price()
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
    this.get_order()
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