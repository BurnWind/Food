// pages/cart/cart.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
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
      },
      {
        name: "好难吃零食店",
        kind_checked: false,
      }
      ],
    // 商品
    product: [
    { 
      id: 0,
      store_id: 0,
      url: '../../images/TB1qup4aGmWBuNjy1XaXXXCbXXa_!!0-item_pic.jpg',
      text: '测试商品',
      price: '10',
      remaining: 10,
      product_checked: true,
      delStatus: 'disabled',
      addStatus: 'normal',
      quantity: 1,
    },
    {
      id: 1,
      store_id: 1,
      url: '../../images/TB2zEQZvcUrBKNjSZPxXXX00pXa_!!880734502.jpg',
      text: '测试商品',
      price: '20',
      remaining: 100,
      product_checked: true,
      delStatus: 'disabled',
      addStatus: 'normal',
      quantity: 2,
    },
    {
      id: 2,
      store_id: 1,
      url: '../../images/TB1qup4aGmWBuNjy1XaXXXCbXXa_!!0-item_pic.jpg',
      text: '测试商品',
      price: '30',
      remaining: 100,
      product_checked: true,
      delStatus: 'disabled',
      addStatus: 'normal',
      quantity: 3,
    },
    {
      id: 3,
      store_id: 0,
      url: '../../images/TB2IQBBkH9YBuNjy0FgXXcxcXXa_!!2371566698.jpg',
      text: '测试商品',
      price: '40',
      remaining: 100,
      product_checked: true,
      delStatus: 'disabled',
      addStatus: 'normal',
      quantity: 4,
    },
    {
      id: 4,
      store_id: 1,
      url: '../../images/TB1qup4aGmWBuNjy1XaXXXCbXXa_!!0-item_pic.jpg',
      text: '测试商品',
      price: '50',
      remaining: 100,
      product_checked: true,
      delStatus: 'disabled',
      addStatus: 'normal',
      quantity: 5,
    },
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
          that.data.selected[i] = []
        for (let j = 0; j < that.data.product.length; j++) {
          if(that.data.product[j].store_id==i){
            that.data.selected[i].push(j.toString())
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
    // 判断是否选中某店的全选按钮
    if(value.length>0){
      store[s_id].kind_checked = true
      that.data.selected[s_id] = []
      for(let i=0; i<product.length; i++){ 
        if(product[i].store_id==s_id){
          product[i].product_checked = true
          that.data.selected[s_id].push(i.toString())
        }
      }
    }else{
      store[s_id].kind_checked = false
      that.data.selected[s_id] = []
      for (let i = 0; i < product.length; i++) {
        if (product[i].store_id == s_id){
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
    var count = 0
    console.log(value)
    console.log(s_id)
    // 判断购物车某店的商品是否全没选
    if(value.length>0){
      that.data.selected[s_id] = value
      for (let i = 0; i < product.length; i++) {
        if (product[i].store_id == s_id){
          count++
          if (value.indexOf(i.toString()) == -1){
            product[i].product_checked = false
          }else{
            product[i].product_checked = true
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
        if (product[i].store_id == s_id) {
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
    // if (that.data.product[index].product_checked == false) {
    //   that.data.product[index].product_checked = true
    //   for (let i = 0; i < that.data.product.length; i++) {
    //     if (that.data.product[i].product_checked == false) {
    //       break
    //     } else {
    //       that.data.checked = true
    //     }
    //   }
    // }
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
    // if(that.data.product[index].product_checked==false){
    //   that.data.product[index].product_checked = true
    //   for (let i = 0; i<that.data.product.length; i++){
    //     if (that.data.product[i].product_checked==false){
    //       break
    //     }else{
    //       that.data.checked = true
    //     }
    //   }
    // }
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
  // 删除购物车商品
  delete: function(){
    var that = this
    var num = this.data.selected.length
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
          // console.log(Page.data.product)
          for (let i = 0; i < that.data.selected.length; i++) {
            that.data.product.splice(i, 1)
          }
          that.setData({
            product: that.data.product
          })
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
        var num = that.data.selected[i][j]
        price += product[num].price*product[num].quantity
      }
    }
    this.setData({
      total: price
    })
  },
  // 结算
  // account: function(){
  // }
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 检查登录状态
    wx.checkSession({
      success() {
        //session_key 未过期，并且在本生命周期一直有效
        
      },
      fail() {
        // session_key 已经失效，需要重新执行登录流程
        //重新登录
        wx.login({
          success: function (res) {
            if (res.code) {
              wx.request({
                url: 'http://127.0.0.1:5000/customer_login',
                data: {
                  code: res.code
                },
                success: function (data) {
                },
              })
            }
          },
        }) 
      }
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    // 从后台获取购物车数据
    // wx.request({
    //   url: 'http://127.0.0.1:5000/get_cart',
    //   success :function(data){
    //     console.log(data)
    //   }
    // })


    // 判断购物车是否有商品，然后显示页面
    if(this.data.product.length>0){
      this.setData({
        flag : false
      })
    }
    // 默认全选
    this.checkboxChange()
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