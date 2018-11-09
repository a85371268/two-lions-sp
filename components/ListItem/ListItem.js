// components/Home/ListItem.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    item: Object
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    goDetail(e) {
      wx.navigateTo({
        url: `/pages/detail/datail?id=${e.currentTarget.dataset.id}`,
      })
    }
  }
})
