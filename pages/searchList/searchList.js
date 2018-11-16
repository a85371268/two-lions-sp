// pages/searchList/searchList.js
import ajax from "../../utils/requset.js";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    keyWord:"",
    searchData:[],
    isEnd:false,
    nextIndex: 0,
    sortId: 0
  },
  //排序
  sortList(e) {
    this.setData({
      sortId: e.detail,
      nextIndex: 0
    })
    //请求数据http://www.xiongmaoyouxuan.com/api/search_more?word=hhh&start=0&sort=0&sa=
    ajax.get(`https://www.xiongmaoyouxuan.com/api/search?word=${this.data.keyWord}&sort=${e.detail}`)
      .then((resp) => {
        if (resp.data.code === 200) {
          this.setData({
            searchData: resp.data.data.list,
            nextIndex: resp.data.data.nextIndex,
            isEnd: resp.data.data.isEnd
          })
        }
      })
      .catch((err) => {
        console.log(err)
      })
  },
  //加载更多页
  loadMore(){
    if(!this.data.isEnd){
      //请求数据
      ajax.get(`http://www.xiongmaoyouxuan.com/api/search?word=${this.data.keyWord}&start=${this.data.nextIndex}&sort=${this.data.sortId}`)
        .then((resp) => {
          if (resp.data.code === 200) {
            console.log(resp)
            this.setData({
              searchData: this.data.searchData.concat(resp.data.data.list),
              isEnd: resp.data.data.isEnd,
              nextIndex: resp.data.data.nextIndex,
            })
          }
        })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      keyWord: options.keyWord
    })
    wx.setNavigationBarTitle({
      title: `搜索:${options.keyWord}`,
    })
    //请求数据
    ajax.get(`https://www.xiongmaoyouxuan.com/api/search?word=${options.keyWord}`)
      .then((res)=>{
        if(res.data.code===200){
          this.setData({
            searchData: res.data.data.list,
            isEnd: res.data.data.isEnd,
            nextIndex: res.data.data.nextIndex,
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