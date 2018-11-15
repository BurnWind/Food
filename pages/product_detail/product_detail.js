// pages/product_detail/product_detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: 0,
    banner: {
      imgUrls: [
        // '../../images/O1CN0124xLvPHX9fJj0vH_!!1657487457.jpg_430x430q90.jpg',
      ],
      indicatorDots: true,
      autoplay: true,
      interval: 5000,
      duration: 1000,
      circular: true,
      height: 'auto',
    },
    product:{
      title:'无穷盐焗鸡翅鸡翅鸡翅鸡翅鸡翅鸡翅鸡翅鸡翅鸡翅鸡翅',
      price:17.90,
      sales:1672,
      remaining:100,
      product_detail:[
        // '../../images/O1CN0124xLvPHX9fJj0vH_!!1657487457.jpg_430x430q90.jpg',
      ],
      height:'auto'
    },
    shop:{
      avatar:'',
      shopname:'好好吃零食旗舰店',
    },
    currentTab:0,
    record:[
      // {
      //   buyer:'xxx',
      //   time:'11-09 14:25:14',
      //   num:'2'
      // },
    ],
    dialog:{
      show_dialog: false,
      delStatus: 'disabled',
      addStatus: 'normal',
      quantity: 1,
      dtype: 'addCart',
    },
  },
  imgLoad: function (e) {
    var ww = wx.getSystemInfoSync().windowWidth,
      iw = e.detail.width,
      ih = e.detail.height,
      bh = ww / (iw / ih)
    this.setData({
      ['banner.height']: String(bh) + 'px'
    })
  },
  clickTab:function(e){
    this.setData({
      currentTab:e.currentTarget.dataset.current
    })
  },
  detailImgLoad:function(e){
    var ww = wx.getSystemInfoSync().windowWidth,
      iw = e.detail.width,
      ih = e.detail.height,
      nih = ww / (iw / ih)
    this.setData({
      ['product.height']: String(nih) + 'px'
    })
  },
  delCount:function(e){
    var that = this
    var count = that.data.dialog.quantity
    if(count>1){
      count -= 1
      that.data.dialog.quantity = count
    }
    var delStatus = count>1?'normal':'disabled'
    that.data.dialog.delStatus = delStatus
    var addStatus = count<that.data.product.remaining?'normal':'disabled'
    that.data.dialog.addStatus = addStatus
    this.setData({
      dialog:that.data.dialog
    })
  },
  addCount:function(e){
    var that = this
    var count = that.data.dialog.quantity
    if (count < that.data.product.remaining) {
      count += 1
      that.data.dialog.quantity = count
    }
    var delStatus = count > 1 ? 'normal' : 'disable'
    that.data.dialog.delStatus = delStatus
    var addStatus = count < that.data.product.remaining ? 'normal' : 'disable'
    that.data.dialog.addStatus = addStatus
    this.setData({
      dialog: that.data.dialog
    })
  },
  showDialogCart:function(e){
    this.setData({
      ['dialog.show_dialog']:true,
      ['dialog.dtype']: 'addCart',
    })
  },
  showDialogBuy: function (e) {
    this.setData({
      ['dialog.show_dialog']: true,
      ['dialog.dtype']: 'buyNow'
    })
  },
  closeDialog:function(e){
    this.setData({
      ['dialog.show_dialog']: false,
    })
  },
  // 加入购物车
  addCar: function(){
    wx.request({
      url: 'http://127.0.0.1:5000/add_cart',
    })
    wx.showToast({
      title: '加入购物车成功',
      icon: "success",
      duration: 1000
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      this.setData({
        id: options.id
      })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    var that = this
    wx.request({
      url: "http://176.122.11.85:5000/product_detail?id="+that.data.id,
      success: function(res){
        console.log(res)
        that.setData({
          ["banner.imgUrls"]: res.data.imgUrls,
          shop: res.data.shop,
          record: res.data.record,
          product: res.data.product
        })
      }
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
