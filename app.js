//app.js
import touch from './utils/touch.js'
App({
  cart: wx.getStorageSync('products')||[],
  onLaunch(){
    this.setBadge();
  },
  setBadge(){
     const count = this.cart.reduce((result,item)=>{
       result += item.count
       return result
    },0)
    wx.setTabBarBadge({
      index: 2,
      text: `${count}`
    })
  },
  checkboxChange(id) {
    this.cart= this.cart.map((val) => {
      if (val.id == id) {
        val.isChecked = !val.isChecked
      }
      return val
    })
  },
  checkedAll(isAll) {
    if (isAll === true) {
      const newData = this.cart.map((item) => {
        item.isChecked = true;
        return item
      })
      this.cart = newData;
    } else {
      const newData = this.cart.map((item) => {
        item.isChecked = false;
        return item
      })
      this.cart = newData;
    }
  },
  reduceCount(id) {
    //把这个item的数量减1并同步到storage
    this.cart = this.cart.map((item, index) => {
      if (item.id == id) {
        if (item.count <= 1) {
          wx.showToast({
            title: "商品数量不能再减少了，若想删除商品请向左滑动",
            icon: 'none',
            duration: 2000
          });
        } else {
          item.count -= 1
        }
      }
      return item
    })
    wx.setStorageSync("products", this.cart)
    this.setBadge()
  },
  //删除
  del(id){
    this.cart = this.cart.filter(item=>item.id!==id)
    //同步storage
    wx.setStorageSync("products", this.cart)
  },
  //增加数量
  addCount(id) {
      this.cart= this.cart.map((item, index) => {
        if (item.id == id) {
          item.count += 1
        }
        return item
      })
    wx.setStorageSync("products", this.cart)
    this.setBadge()
  },
  addCart(item){
    const isInCart = this.cart.some(val=>{
      return val.id===item.id
    })
    if(isInCart){
      this.cart = this.cart.map(val=>{
        if(val.id===item.id){
          val.count++;
        }
        return val;
      })
    }else{
      this.cart.push({
        ...item,
        isChecked:false,
        isTouchMove:false,
        count: 1
      })
    }
    this.setBadge();
    wx.setStorageSync('products', this.cart);
  },
  touch: new touch()
})