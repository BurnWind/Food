// pages/classification/classification.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    classify:[
      // {
      //   text:'膨化食品',
      //   index:0,
      // },
    ],
    num:1,
    product: [
      // {
      // img_url: '../../images/TB1qup4aGmWBuNjy1XaXXXCbXXa_!!0-item_pic.jpg',
      // text: '测试商品',
      // price: '18',
      // url: '/pages/product_detail/product_detail'
      // },
    ]
  },
  select:function(e){
    var that = this
    if(e != 1){
      that.setData({
        num: e.target.dataset.index
      })
    }else{
      that.setData({
        num: e
      })
    }
    
    wx.request({
      url: 'http://176.122.11.85:5000/classify/get_products/' + that.data.num,
      success: function(data){
        that.setData({
          product:data.data
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
    var that = this
    wx.request({
      url: 'http://176.122.11.85:5000/classification',
      success: function(data){
        that.setData({
          classify:data.data
        })
      }
    })
    that.select(1)
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