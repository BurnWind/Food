// pages/cart/cart.js
//获取应用实例
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    notallselected: false,
    cart_id: 0,
    edit: "编辑",
    // 判断是编辑还是完成页面
    editbool:"true",
    // 判断全选框是否被选中
    checked: false,
    // 判断购物车是否为空
    flag: true,
    // 合计
    total: 0,
    // 店铺
    store:[
      { 
        name: "好好吃零食店",
        kind_checked: false,
        store_id:3
      },
      {
        name: "好难吃零食店",
        kind_checked: false,
        store_id:5
      }
      ],
    // 商品
    product: [
    // { 
    //   id: 4,
    //   store_id: 3,
    //   url: '../../images/TB1qup4aGmWBuNjy1XaXXXCbXXa_!!0-item_pic.jpg',
    //   text: '测试商品',
    //   price: '10',
    //   remaining: 10,
    //   product_checked: true,
    //   delStatus: 'disabled',
    //   addStatus: 'normal',
    //   quantity: 1,
    // },
    ],
    // 哪几项商品被选择
    selected: []
  },
  // 全选事件
  checkboxChange: function(){
    var that = this
    if(that.data.checked==true){
      that.data.checked = false
      for (let i = 0; i<that.data.product.length; i++) {
        that.data.product[i].product_checked = false
      }
      for (let i = 0; i < that.data.store.length; i++) {
        that.data.store[i].kind_checked = false
        that.data.selected[i] = []
      }
    }else{
      that.data.checked = true
      for (let i = 0; i < that.data.product.length; i++) {
        that.data.product[i].product_checked = true
      }
      that.data.selected = []
      for (let i = 0; i < that.data.store.length; i++) {
        that.data.store[i].kind_checked = true
        var store_id = that.data.store[i].store_id
        that.data.selected[i] = []
        for (let j = 0; j < that.data.product.length; j++) {
          if(that.data.product[j].store_id==store_id){
            that.data.selected[i].push(that.data.product[j].id.toString())
          }
        }
      }
    }
    this.setData({
      checked:that.data.checked,
      store: that.data.store,
      product:that.data.product,
      selected:that.data.selected
    })
    // 计算总价
    this.calculate()
    // 判断是否全不选
    this.disable()
  },
   /**
   *  判断是否都不选，都不选按钮变为disabled
   */
  disable: function(){
    var that = this
    var product = that.data.product
    var notallselected = true
    for(let i = 0;i <product.length; i++){
      if (product[i].product_checked==true){
        notallselected = false
        that.setData({
          notallselected: notallselected
        })
        break
      }
    }
    if (notallselected){
      that.setData({
        notallselected: notallselected
      })
    }
  },
  /**
   *  判断是否全选
   */
  allselect: function () {
    var that = this
    var num = 0
    for (let i = 0; i < that.data.selected.length; i++) {
      num += that.data.selected[i].length
    }
    if (num < that.data.product.length) {
      that.data.checked = false
    } else {
      that.data.checked = true
    }
    this.setData({
      checked: that.data.checked,
    })
  },
  /**
   * 店铺内商品全选事件
   */
  store_checkboxChange: function(e){
    var that = this
    var value = e.detail.value
    var s_id = e.currentTarget.dataset.index
    var product = that.data.product
    var store = that.data.store
    var store_id = store[s_id].store_id
    // 判断是否选中某店的全选按钮
    if(value.length>0){
      store[s_id].kind_checked = true
      that.data.selected[s_id] = []
      for(let i=0; i<product.length; i++){ 
        if(product[i].store_id==store_id){
          product[i].product_checked = true
          that.data.selected[s_id].push(product[i].id.toString())
        }
      }
    }else{
      store[s_id].kind_checked = false
      that.data.selected[s_id] = []
      for (let i = 0; i < product.length; i++) {
        if (product[i].store_id == store_id){
          product[i].product_checked = false
        }
      }
    }
    this.setData({
      product: that.data.product,
      selected: that.data.selected,
      store: that.data.store
    })
    //判断是否全选
    this.allselect() 
    // 计算总价
    this.calculate()
    // 判断是否全不选
    this.disable() 
  },
  /**
   * 多选事件
   */
  product_checkboxChange: function(e){
    var that = this
    var value = e.detail.value
    var s_id = e.currentTarget.dataset.index
    var product = that.data.product
    var store = that.data.store
    var store_id = store[s_id].store_id
    var count = 0
    // 判断购物车某店的商品是否全没选
    if(value.length>0){
      that.data.selected[s_id] = value
      for (let i = 0; i < product.length; i++) {
        if (product[i].store_id == store_id){
          count++
          if (that.contain(value,product[i].id)){
            product[i].product_checked = true
          }else{
            product[i].product_checked = false
          }
        }
      }
      // 判断购物车某店的商品是否全选中
      if(value.length<count){
        store[s_id].kind_checked = false
      }else{
        store[s_id].kind_checked = true
      }
    }else{
      store[s_id].kind_checked = false
      that.data.selected[s_id] = []
      for (let i = 0; i < product.length; i++) {
        if (product[i].store_id == store_id) {
          product[i].product_checked = false
        }
      }
    }
    this.setData({
      product: that.data.product,
      selected: that.data.selected,
      store: that.data.store
    })
    //判断是否全选
    this.allselect() 
    // 计算总价
    this.calculate()
    // 判断是否全不选
    this.disable()
  },
  // 编辑事件
  editpress: function(){
    if(this.data.edit=="编辑"){
      if(this.data.checked===true){
        this.checkboxChange()
      }
      this.setData({
        edit: "完成",
        editbool: false
      })
    }else{
      if (this.data.checked === false) {
        this.checkboxChange()
      }
      this.setData({
        edit: "编辑",
        editbool: true
      })
    }
  },
  // 减少商品数量
  delCount: function (e) {
    var that = this
    var index = e.currentTarget.dataset.index
    var count = that.data.product[index].quantity
    if (count > 1) {
      count -= 1
      that.data.product[index].quantity = count
    }
    var delStatus = count > 1 ? 'normal' : 'disabled'
    that.data.product[index].delStatus = delStatus
    var addStatus = count < that.data.product[index].remaining ? 'normal' : 'disabled'
    that.data.product[index].addStatus = addStatus
    // 计算总价
    this.calculate()
    this.setData({
      product: that.data.product,
      checked: that.data.checked
    })
  },
  // 增加商品数量
  addCount: function (e) {
    var that = this
    var index = e.currentTarget.dataset.index
    var count = that.data.product[index].quantity
    if (count < that.data.product[index].remaining) {
      count += 1
      that.data.product[index].quantity = count
    }
    var delStatus = count > 1 ? 'normal' : 'disable'
    that.data.product[index].delStatus = delStatus
    var addStatus = count < that.data.product[index].remaining ? 'normal' : 'disable'
    that.data.product[index].addStatus = addStatus
    // 计算总价
    this.calculate()
    this.setData({
      product: that.data.product,
      checked: that.data.checked   
    })
  },
  // 删除购物车函数
  deletecart:function(pid){
    var that = this
    wx.request({
      url: 'http://176.122.11.85:5000/delete_cart',
      header: { 'content-type': 'application/x-www-form-urlencoded' },
      data: {
        'pid': JSON.stringify(pid),
        'token': wx.getStorageSync('token')
      },
      method: 'post',
      success: function (data) {
        if (data.statusCode == 403) {
          app.indexlogin()
          setTimeout(function () {
            that.deletecart()
          }, 1000)
        } else {
          wx.showToast({
            title: data.data,
            icon: 'success'
          })
          wx.startPullDownRefresh()
        }
      }
    })
  },
  // 删除购物车商品
  delete: function(){
    var that = this
    var num = 0
    for(let i = 0; i < this.data.selected.length; i++){
      num += that.data.selected[i].length
    }
    if(num==0){
      wx.showToast({
        title: '你还没选择商品哦',
        icon: "none",
        duration: 1000
      })
      return  
    }
    wx.showModal({
      content: "确定要删除这"+num+"种商品吗？",
      confirmColor: "#D3B579",
      success: function(sm){
        if(sm.confirm){
          var pid = []
          for (let i = 0; i < that.data.selected.length; i++) {
            for (let j=0;j<that.data.selected[i].length;j++){
              pid.push(parseInt(that.data.selected[i][j]))
            }
            // that.data.product.splice(i, 1)
          }
          that.deletecart(pid)
          // that.setData({
          //   product: that.data.product
          // })
        } else if (sm.cancel){
          return
        }
      }
    })
  },
  // 合计
  calculate: function(){
    var that = this
    var price = 0
    var product = that.data.product
    for(let i=0; i<that.data.selected.length; i++){
      for (let j = 0; j < that.data.selected[i].length; j++) {
        var pid = that.data.selected[i][j]
        for (let k=0; k<product.length; k++){
          if (product[k].id==pid){
            price += product[k].price * product[k].quantity
          }
        }
      }
    }
    this.setData({
      total: price.toFixed(2)
    })
  },
  // 数组包含函数
  contain: function(arr, value){
    for (let i=0;i<arr.length;i++){
      if(value==arr[i]){
        return true
      }
    }
    return false
  },
  // 结算
  account: function(){
    var that = this
    var products = []
    var data = {}
    var pid = []
    for (let i = 0; i < that.data.selected.length; i++) {
      for (let j = 0; j < that.data.selected[i].length; j++) {
        pid.push(parseInt(that.data.selected[i][j]))
      }
    }
    for(let i = 0 ;i < that.data.product.length; i++){
      if (pid.indexOf(that.data.product[i].id) == -1){
        continue
      }
      data = { "id": that.data.product[i].id, "num": that.data.product[i].quantity}
      products.push(data)
    }
    wx.navigateTo({
      url: '/pages/order_make/order_make?products=' + JSON.stringify(products) + '&flag=' + true,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 检查登录状态
    if (!wx.getStorageSync('token')){
      app.indexlogin()
    }
  },
  getcart: function(){
    var that = this
    wx.request({
      url: 'http://176.122.11.85:5000/get_cart',
      data: { 'token': wx.getStorageSync('token') },
      success: function (data) {
        if(data.statusCode==403){   
          app.indexlogin()      
          setTimeout(function(){
            that.getcart()
          },1000)     
        }else{
          that.setData({
            product: data.data.product,
            store: data.data.store,
            cart_id: data.data.cart_id,
          })
          // 判断购物车是否有商品，然后显示页面
          if (that.data.product.length > 0) {
            console.log(that.data.product)
            that.setData({
              flag: false
            })
            // 默认全选
            that.checkboxChange()
          }else{
            that.setData({
              flag: true
            })  
          }
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  // 从后台获取购物车数据
  // this.getcart()
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.getcart()
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    var that = this
    wx.request({
      url: 'http://176.122.11.85:5000/update_cart',
      header: { 'content-type': 'application/x-www-form-urlencoded' },
      data: {"cart_id":that.data.cart_id,"product":JSON.stringify(that.data.product)},
      method: "post",
    })
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
    this.getcart()
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