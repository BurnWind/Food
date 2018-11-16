//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    userInfo: {},
    hasUserInfo: false,
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    }
  }, 
  onGotUserInfo :function(e){
    if(e.detail.userInfo){
      this.setData({
        userInfo : e.detail.userInfo, 
        hasUserInfo: true
      })
    }
  }
})

