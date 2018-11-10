// pages/search/search.js
import ajax from "../../utils/requset.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    inputVal: "",
    searchList:[],
    hotList:[]
  },
  clearInput: function () {
    this.setData({
      inputVal: ""
    });
  },
  inputTyping: function (e) {
    this.setData({
      inputVal: e.detail.value
    });
  },
  //关键字搜索
  searchWord(e){
    const that = this;
    if (this.data.inputVal !== "" || e.currentTarget.dataset.text){
      if (e.currentTarget.dataset.text){
        that.setData({
          inputVal: e.currentTarget.dataset.text
        })
      }
      //存储搜索历史
      wx.getStorage({
        key: 'searched',
        success(res) {
          //有其他历史
          const arr = res.data;
          const newArr = arr.filter(item => {
            return item !== that.data.inputVal
          })
          newArr.unshift(that.data.inputVal)
          wx.setStorageSync('searched', newArr)
        },
        fail(err) {
          //无历史则创建一个
          const arr = [that.data.inputVal]
          wx.setStorageSync('searched', arr)
        }
      })
    }
    //跳转搜索界面
    wx.navigateTo({
      url: `/pages/searchList/searchList?keyWord=${this.data.inputVal}`,
    })
  },
  //删除历史纪录
  delSearched(){
    if(wx.getStorageSync("searched")){
      wx.removeStorageSync("searched")
      this.setData({
        searchList:[]
      })
    }else{
      wx.showToast({
        title: "您暂时还没有搜索记录",
        icon: 'none',
        duration: 2000
      });
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

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    if (wx.getStorageSync('searched')){
      this.setData({
        searchList: wx.getStorageSync('searched')
      })
    }
    //请求热门搜索接口
    ajax.get(`https://www.xiongmaoyouxuan.com/api/hotWords`)
      .then((res) => {
        if (res.data.code === 200) {
          this.setData({
            hotList: res.data.data
          })
        }
      })
      .catch((err) => {
        console.log(err)
      })
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