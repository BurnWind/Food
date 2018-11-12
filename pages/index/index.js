//index.js
//获取应用实例
const app = getApp()

Page({
  data:{
    banner:{
      imgUrls: [
        '../../images/O1CN011j7xYo9NFIcC7lD_!!880734502.jpg',
        '../../images/TB2zaS7pBjTBKNjSZFwXXcG4XXa_!!902551724-0-fans.jpg',
        '../../images/O1CN011j7xYuIeHQpqFWo_!!880734502.jpg',
      ],
      indicatorDots: true,
      autoplay: true,
      interval: 5000,
      duration: 1000,
      circular: true,
      height:'auto',
    },
    product:[{
        img_url: '../../images/TB1qup4aGmWBuNjy1XaXXXCbXXa_!!0-item_pic.jpg',
        text:'测试商品',
        price:'18',
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
  imgLoad: function (e) {
    var ww = wx.getSystemInfoSync().windowWidth,
        iw = e.detail.width,
        ih = e.detail.height,
        bh = ww / (iw / ih)
    this.setData({
      ['banner.height']:String(bh) + 'px'
    })
  },
})








// Page({
//   data: {
//     motto: 'Hello World',
//     userInfo: {},
//     hasUserInfo: false,
//     canIUse: wx.canIUse('button.open-type.getUserInfo')
//   },
//   //事件处理函数
//   bindViewTap: function() {
//     wx.navigateTo({
//       url: '../logs/logs'
//     })
//   },
//   onLoad: function () {
//     if (app.globalData.userInfo) {
//       this.setData({
//         userInfo: app.globalData.userInfo,
//         hasUserInfo: true
//       })
//     } else if (this.data.canIUse){
//       // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
//       // 所以此处加入 callback 以防止这种情况
//       app.userInfoReadyCallback = res => {
//         this.setData({
//           userInfo: res.userInfo,
//           hasUserInfo: true
//         })
//       }
//     } else {
//       // 在没有 open-type=getUserInfo 版本的兼容处理
//       wx.getUserInfo({
//         success: res => {
//           app.globalData.userInfo = res.userInfo
//           this.setData({
//             userInfo: res.userInfo,
//             hasUserInfo: true
//           })
//         }
//       })
//     }
//   },
//   getUserInfo: function(e) {
//     console.log(e)
//     app.globalData.userInfo = e.detail.userInfo
//     this.setData({
//       userInfo: e.detail.userInfo,
//       hasUserInfo: true
//     })
//   }
// })
