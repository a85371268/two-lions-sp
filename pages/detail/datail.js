// pages/detail/datail.js
import ajax from "../../utils/requset.js"
const app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    imgUrls: [],
    detailData:{},
    shopData:{},
    imgs:[]
  },
  addCart(e){
    wx.showToast({
      title: '加入成功',
      icon: 'success',
      duration: 1500
    });
    const msg = e.currentTarget.dataset.data
    app.addCart(msg)
  },
  goPay(e){
    wx.setStorageSync("checked", [{
      ...this.data.detailData,
      count:1
    }])
    wx.navigateTo({
      url: `/pages/pay/pay`,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //请求数据
    ajax.get(`https://www.xiongmaoyouxuan.com/api/detail?id=${options.id}`)
      .then((resp)=>{
        if(resp.data.code===200){
          const data = resp.data.data
          this.setData({
            imgUrls: data.detail.photo,
            detailData: data.detail,
            shopData: data.detail.shop,
            imgs: data.detail.descContentList
          })
        }
      })
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
    app.setBadge()
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    app.setBadge()
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