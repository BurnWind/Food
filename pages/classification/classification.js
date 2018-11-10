
// pages/classification/classification.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    classify:[
      {
        text:'膨化食品',
        index:0,
      },
      {
        text: '膨化食品',
        index: 1,
      },
      {
        text: '膨化食品',
        index: 2,
      },
      {
        text: '膨化食品',
        index: 3,
      },
      {
        text: '膨化食品',
        index: 4,
      },
      {
        text: '膨化食品',
        index: 5,
      }
    ],
    num:0,
    product: [{
      img_url: '../../images/TB1qup4aGmWBuNjy1XaXXXCbXXa_!!0-item_pic.jpg',
      text: '测试商品',
      price: '18',
      url: '/pages/product_detail/product_detail'
    },
    {
      img_url: '../../images/TB2zEQZvcUrBKNjSZPxXXX00pXa_!!880734502.jpg',
      text: '测试商品',
      price: '18',
      url: '/pages/product_detail/product_detail'
    },
    {
      img_url: '../../images/TB1qup4aGmWBuNjy1XaXXXCbXXa_!!0-item_pic.jpg',
      text: '测试商品',
      price: '18',
      url: '/pages/product_detail/product_detail'
    },
    {
      img_url: '../../images/TB2IQBBkH9YBuNjy0FgXXcxcXXa_!!2371566698.jpg',
      text: '测试商品',
      price: '18',
      url: '/pages/product_detail/product_detail'
    },
    {
      img_url: '../../images/TB1qup4aGmWBuNjy1XaXXXCbXXa_!!0-item_pic.jpg',
      text: '测试商品',
      price: '18',
      url: '/pages/product_detail/product_detail'
    },
    ]
  },
  select:function(e){
    this.setData({
      num:e.target.dataset.index
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