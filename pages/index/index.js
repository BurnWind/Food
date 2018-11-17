//index.js
//获取应用实例
const app = getApp()

Page({
  data:{
    banner:{
      imgUrls: [
      // '../../images/O1CN011j7xYo9NFIcC7lD_!!880734502.jpg',
      ],
      indicatorDots: true,
      autoplay: true,
      interval: 5000,
      duration: 1000,
      circular: true,
      height:'auto',
    },
    product:[
      // {
      //   img_url: '../../images/TB1qup4aGmWBuNjy1XaXXXCbXXa_!!0-item_pic.jpg',
      //   text:'测试商品',
      //   price:'18',
      //   url: '/pages/product_detail/product_detail'
      // }
    ]
  },
  imgLoad: function (e) {
    var ww = wx.getSystemInfoSync().windowWidth,
        iw = e.detail.width,
        ih = e.detail.height,
        bh = ww / (iw / ih)
    this.setData({
      ['banner.height']:String(bh) + 'px'
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    var that = this
    wx.request({
      url: 'http://176.122.11.85:5000/homepage',
      success: function (data) {
        that.setData({
          product: data.data.product,
          ["banner.imgUrls"]: data.data.imgUrls
        })
      }
    })
  }
})

