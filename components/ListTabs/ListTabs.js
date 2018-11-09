// components/ListTabs/ListTabs.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    msg:[
      {
        id:0,
        text: "默认排序"
      },{
        id:1,
        text: "价格最低"
      },{
        id:2,
        text: "销量最高"
      }
    ],
    currentId:0
  },

  /**
   * 组件的方法列表
   */
  methods: {
    sort(e){
      this.setData({
        currentId: e.currentTarget.dataset.id
      })
      this.triggerEvent("sortList", e.currentTarget.dataset.id)
    }
  }
})
