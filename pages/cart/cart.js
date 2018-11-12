// pages/cart/cart.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    edit: "编辑",
    editbool:"true",
    checked: true,
    flag: true,
    product: [
    {
      url: '../../images/TB1qup4aGmWBuNjy1XaXXXCbXXa_!!0-item_pic.jpg',
      text: '测试商品',
      price: '18',
      product_checked: true,
    },
    {
      url: '../../images/TB2zEQZvcUrBKNjSZPxXXX00pXa_!!880734502.jpg',
      text: '测试商品',
      price: '18',
      product_checked: true,
    },
    {
      url: '../../images/TB1qup4aGmWBuNjy1XaXXXCbXXa_!!0-item_pic.jpg',
      text: '测试商品',
      price: '18',
      product_checked: true,
    },
    {
      url: '../../images/TB2IQBBkH9YBuNjy0FgXXcxcXXa_!!2371566698.jpg',
      text: '测试商品',
      price: '18',
      product_checked: true,
    },
    {
      url: '../../images/TB1qup4aGmWBuNjy1XaXXXCbXXa_!!0-item_pic.jpg',
      text: '测试商品',
      price: '18',
      product_checked: true,
    },
    ]
  },
  // 全选事件
  checkboxChange: function(){
    var that = this
    if(that.data.checked==true){
      that.data.checked = false
      for (let i = 0; i<that.data.product.length; i++) {
        that.data.product[i].product_checked = false
      }
    }else{
      that.data.checked = true
      for (let i = 0; i < that.data.product.length; i++) {
        that.data.product[i].product_checked = true
      }
    }
    this.setData({
      checked:that.data.checked,
      product:that.data.product
    })
  },
  //多选事件
  product_checkboxChange: function(e){
    var that = this
    var value = e.detail.value 
  //改变双选框中的checked的值
    for(let i = 0; i<that.data.product.length; i++){
      if(value.indexOf(i.toString())==-1){
        that.data.product[i].product_checked = false
      }else{
        that.data.product[i].product_checked = true
      }
    }
  //判断是否全选
    if(that.data.product.length>value.length){
      that.data.checked = false
    }else{
      that.data.checked = true
    }
    this.setData({
      checked: that.data.checked,
      product: that.data.product
    })
  },
  // 编辑事件
  editpress: function(){
    if(this.data.edit=="编辑"){
      this.setData({
        edit: "完成",
        editbool: false
      })
    }else{
      this.setData({
        edit: "编辑",
        editbool: true
      })
    }
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
    if(this.data.product.length>0){
      this.setData({
        flag : false
      })
    }
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