const app = getApp();
import ajax from "../../utils/requset.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:[],
    price:0,
    freight:0,
    realPrice:0,
    address: "",
    array: ['不限时送货时间', '工作日送货', '双休日、假日送货'],
    index: 0,
    hasAddress: false,
  },
  select: function (e) {
    this.setData({
      index: e.detail.value,
      freight: e.detail.value*5,
      realPrice: (e.detail.value*5 + parseFloat(this.data.price)).toFixed(2)
    })
  },

  onShow: function () {
    
  },

  pay: function (e) {
    wx.showModal({
      title: '支付提示',
      content: '敢收钱那我怕不是凉了= =',
      showCancel: false,
      success: function (res) {
        if (res.confirm) {
          console.log('用户点击确定')
        }
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //发起授权
    const _that = this
    wx.getSetting({
      success(res) {
        if (!res.authSetting['scope.userLocation']) {
          wx.authorize({
            scope: 'scope.userLocation',
            success() {
              wx.getLocation({
                type: 'wgs84',
                success(res) {
                  const latitude = res.latitude
                  const longitude = res.longitude
                  ajax.get(`https://apis.map.qq.com/ws/geocoder/v1/?location=${latitude},${longitude}&key=WBGBZ-VHN33-IRP3N-3ZMXH-BRPJ6-L6B4J`)
                    .then((res) => {
                      _that.setData({
                        address: res.data.result.address
                      })
                    })
                }
              })
            }
          })
        }else{
          wx.getLocation({
            type: 'wgs84',
            success(res) {
              console.log(res)
              const latitude = res.latitude
              const longitude = res.longitude
              ajax.get(`https://apis.map.qq.com/ws/geocoder/v1/?location=${latitude},${longitude}&key=WBGBZ-VHN33-IRP3N-3ZMXH-BRPJ6-L6B4J`)
                .then((res)=>{
                  _that.setData({
                    address:res.data.result.address
                  })
                })
            }
          })
        }
      }
    })
    //设置显示数据
    this.setData({
      list:wx.getStorageSync("checked")
    })
    const price = this.data.list.reduce((result,item)=>{
      result += item.count*item.price;
      return result;
    },0)
    this.setData({
      price: price.toFixed(2),
      realPrice: price.toFixed(2)
    })
  }
})