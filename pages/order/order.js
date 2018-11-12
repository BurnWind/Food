// pages/order/order.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentTab: 0,
    order:[
      {
        stop:'好好吃零食旗舰店',
        id:'E20181107193206029500017',
        status:'交易关闭',
        products:[
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
        total:0
      },
      {
        stop: '好好吃零食旗舰店',
        id: 'E20181107193206029508974',
        status: '未付款',
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
        total: 0
      }
    ]
  },
  clickTab: function (e) {
    this.setData({
      currentTab: e.currentTarget.dataset.current
    })
  },
  count_price(){
    var that = this
    var order = that.data.order
    for (var i = 0; i < order.length;i++){
      var total = 0
      var products = order[i].products
      for (var j = 0; j < products.length ;j++){
        total += (products[j].price * products[j].num)
      }
      that.data.order[i].total = total.toFixed(2)
    }
    this.setData({
      order: that.data.order
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.count_price()
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