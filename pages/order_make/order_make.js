// pages/order_make/order_make.js
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
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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