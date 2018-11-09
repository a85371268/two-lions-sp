export default {
  get:(url,data)=>{
    wx.showLoading({
      title: '努力加载中…',
    })
    return new Promise((resolve,reject)=>{
      wx.request({
        url,
        data: data||{},
        success:(resp)=>{
          resolve(resp)
        },
        fail:(resp)=>{
          reject(resp)
        },
        complete:()=>{
          wx.hideLoading()
        }
      })
    })
  }
}