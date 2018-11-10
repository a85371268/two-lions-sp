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
    imgs:[],
    browseData:{},
    oldPrice: 0
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
    const that = this;
    //请求数据
    ajax.get(`https://www.xiongmaoyouxuan.com/api/detail?id=${options.id}`)
      .then((resp)=>{
        if(resp.data.code===200){
          const data = resp.data.data
          this.setData({
            imgUrls: data.detail.photo,
            detailData: data.detail,
            shopData: data.detail.shop,
            imgs: data.detail.descContentList,
            oldPrice: (data.detail.price + 23).toFixed(2),
            browseData:{
              id: data.detail.id,
              image: data.detail.image,
              price: data.detail.price,
              title: data.detail.title,
              saleNum: data.detail.saleNum
            }
          })
          //同步需要的信息到storage
          wx.getStorage({
            key: 'browse',
            success(res) {
              //有其他历史
              const arr = res.data;
              const newArr = arr.filter(item => {
                return item.id !== that.data.detailData.id
              })
              newArr.unshift(that.data.browseData)
              wx.setStorageSync('browse', newArr)
            },
            fail(err) {
              //无历史则创建一个
              const arr = [{
                id: data.detail.id,
                image: data.detail.image,
                price: data.detail.price,
                title: data.detail.title,
                saleNum: data.detail.saleNum
              }]
              wx.setStorageSync('browse', arr)
            }
          })
        }
      })
      .catch((err)=>[
        console.log(err)
      ])
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