// pages/list/list.js
import ajax from "../../utils/requset.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    kindsData:[],
    pageId:0,
    sortId:0,
    nextPage:0
  },
  sortList(e){
    this.setData({
      sortId:e.detail,
      nextPage: 0
    })
    //请求数据
    ajax.get(`https://www.xiongmaoyouxuan.com/api/category/${this.data.pageId}/items?start=0&sort=${e.detail}`)
      .then((resp)=>{
        if(resp.data.code===200){
          this.setData({
            kindsData: resp.data.data.items.list,
            nextPage: resp.data.data.items.nextIndex
          })
        }
      })
      .catch((err) => {
        console.log(err)
      })
  },
  goDetail(e){
    wx.navigateTo({
      url: `/pages/detail/datail?id=${e.currentTarget.dataset.id}`,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      pageId:options.id
    })
    //请求数据
    ajax.get(`https://www.xiongmaoyouxuan.com/api/category/${options.id}/items?start=0`)
      .then((resp)=>{
        if(resp.data.code===200){
          this.setData({
            kindsData: resp.data.data.items.list,
            nextPage: resp.data.data.items.nextIndex
          })
          wx.setNavigationBarTitle({
            title: resp.data.data.categoryName
          })
        }
      })
      .catch((err)=>{
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
    //请求数据
    ajax.get(`https://www.xiongmaoyouxuan.com/api/category/${this.data.pageId}/items?start=${this.data.nextPage}&sort=${this.data.sortId}`)
      .then((resp) => {
        if (resp.data.code === 200) {
          this.setData({
            kindsData: this.data.kindsData.concat(resp.data.data.items.list),
            nextPage: resp.data.data.items.nextIndex
          })
        }
      })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})