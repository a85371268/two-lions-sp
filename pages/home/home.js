import ajax from "../../utils/requset.js"
Page({
  data: {
    banners: [],
    grids:[],
    topList:[],
    list:[],
    listTitle:"",
    nextPage:0,
    isEnd:false
  },
  changeSaleNum(sale){
    return (sale%10000).toFixed(1)
  },
  goMall(){
    wx.switchTab({
      url: '/pages/mall/mall',
    })
  },
  goDetail(e) {
    wx.navigateTo({
      url: `/pages/detail/datail?id=${e.currentTarget.dataset.id}`,
    })
  },
  goSearch(e) {
    wx.navigateTo({
      url: `/pages/search/search`,
    })
  },
  /**
  * 生命周期函数--监听页面加载
  */
  onLoad: function (options) {
    ajax.get('https://www.xiongmaoyouxuan.com/api/tab/1?start=0')
      .then((resp)=>{
        if (resp.data.code === 200) {
          console.log(resp.data)
          this.setData({
            banners: resp.data.data.banners,
            grids: resp.data.data.gridsV2,
            topList: resp.data.data.topList,
            list: resp.data.data.items.list,
            nextPage: resp.data.data.items.nextIndex,
            listTitle: resp.data.data.note
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
    ajax.get(`https://www.xiongmaoyouxuan.com/api/tab/1/feeds?start=${this.data.nextPage}`)
      .then((resp)=>{
        if(resp.data.code===200){
          this.setData({
            list:this.data.list.concat(resp.data.data.list),
            nextPage : resp.data.data.nextIndex,
            isEnd: resp.data.data.isEnd,
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