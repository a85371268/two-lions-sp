// pages/cart/cart.js
const app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cartData:[],
    total:0,
    isAllChecked:false,
    checked:[]
  },
  goDetail(e) {
    wx.navigateTo({
      url: `/pages/detail/datail?id=${e.currentTarget.dataset.id}`,
    })
  },
  checkedAll(e){
    this.setData({
      isAllChecked: e.currentTarget.dataset.isc
    })
    if (e.currentTarget.dataset.isc===true){
      const newData = this.data.cartData.map((item)=>{
        item.isChecked = true
        return item
      })
      this.setData({
        cartData:newData
      })
    }else{
      const newData = this.data.cartData.map((item) => {
        item.isChecked = false
        return item
      })
      this.setData({
        cartData: newData
      })
    }
    this.getsumTotal()
  },
  checkboxChange(e){
    const id = e.currentTarget.dataset.id
    app.checkboxChange(id)
    this.setData({
      cartData: app.cart
    })
    //如果数组中的isChecked都是true则让全选选上
    const isAll = this.data.cartData.every((item)=>{
      return item.isChecked===true
    })
    if(isAll){
      this.setData({
        isAllChecked:true
      })
    }else{
      this.setData({
        isAllChecked: false
      })
    }
    this.getsumTotal()
  },
  //减少数量
  reduceCount(e){
    app.reduceCount(e.currentTarget.dataset.id)
    this.setData({
      cartData:app.cart
    })
    app.setBadge()
    this.getsumTotal()
  },
  //增加数量
  addCount(e){
    app.addCount(e.currentTarget.dataset.id)
    this.setData({
      cartData: app.cart
    })
    this.getsumTotal()
    app.setBadge()
  },
  //合计
  getsumTotal(){
    var sum = this.data.cartData.reduce((result,item)=>{
      if (item.isChecked) {
        result += item.count * item.price
      }
      return result;
    },0)
    //更新数据
    this.setData({
      total: sum.toFixed(2)
    })
  },

  //手指触摸动作开始 记录起点X坐标
  touchstart: function (e) {
    //开始触摸时 重置所有删除
    let data = app.touch._touchstart(e, this.data.cartData)
    this.setData({
      cartData: data
    })
  },
  //结算事件
  goPay(){
    if(this.data.cartData.some(item=>item.isChecked===true)){
      wx.navigateTo({
        url: `/pages/pay/pay`,
      })
    }
  },
  //滑动事件处理
  touchmove: function (e) {
    let data = app.touch._touchmove(e, this.data.cartData)
    this.setData({
      cartData: data
    })
  },
  //删除事件
  del(e){
    wx.showModal({
      title: '提示',
      content: '确认要删除这件商品么？',
      success: (res) => {
        if (res.confirm) {
          app.del(e.currentTarget.dataset.id)
          this.setData({
            cartData: app.cart
          })
          const isAll = this.data.cartData.every((item) => {
            return item.isChecked === true
          })
          if (isAll) {
            this.setData({
              isAllChecked: true
            })
          } else {
            this.setData({
              isAllChecked: false
            })
          }
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
    //如果数组中的isChecked都是true则让全选选上
    const isAll = this.data.cartData.every((item) => {
      return item.isChecked === true
    })
    if (isAll) {
      this.setData({
        isAllChecked: true
      })
    } else {
      this.setData({
        isAllChecked: false
      })
    }
    app.setBadge()
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
    this.setData({
      cartData: app.cart
    })
    this.getsumTotal()
    app.setBadge()
    //如果数组中的isChecked都是true则让全选选上
    const isAll = this.data.cartData.every((item) => {
      return item.isChecked === true
    })
    if (isAll) {
      this.setData({
        isAllChecked: true
      })
    } else {
      this.setData({
        isAllChecked: false
      })
    }
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    wx.setStorageSync("checked", this.data.cartData.filter(item => item.isChecked === true))
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