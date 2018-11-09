// pages/mall/mall.js
import ajax from "../../utils/requset.js"
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    navList:[],
    kindsList:[],
    kindsTitle:"女装",
    currentId:2
  },
  changeKinds(e){
    this.setData({
      kindsTitle:e.target.dataset.title,
      currentId: e.target.dataset.id
    })
    ajax.get(`https://www.xiongmaoyouxuan.com/api/tab/${e.target.dataset.id}`)
      .then((resp)=>{
        if(resp.data.code===200){
          this.setData({
            kindsList:resp.data.data.categories
          })
        }
      })
      .catch((err) => {
        console.log(err)
      })
  },
  showKinds(e){
    const id = e.currentTarget.dataset.id.split("=")[1]
    wx.navigateTo({
      url: `/pages/list/list?id=${id}`,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    ajax.get("https://www.xiongmaoyouxuan.com/api/tabs")
      .then((resp)=>{
        if(resp.data.code===200){
          const newList = resp.data.data.list.filter(item => item.name !== "今日推荐")
          this.setData({
            navList: newList
          })
        }
      })
      .catch((err)=>{
        console.log(err)
      })
    ajax.get(`https://www.xiongmaoyouxuan.com/api/tab/2`)
      .then((resp) => {
        if (resp.data.code === 200) {
          this.setData({
            kindsList: resp.data.data.categories
          })
        }
      })
      .catch((err) => {
        console.log(err)
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
    app.setBadge()
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