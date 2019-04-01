//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    scroll_height: 0,
    classifyList: [],
    objs: [],
    currentClass:0,
    objNum:{},
    totlePrice:0,
    badgeList:[]
  },
  onLoad: function() {

    let windowHeight = wx.getSystemInfoSync().windowHeight;
    let windowWidth = wx.getSystemInfoSync().windowWidth;
    this.setData({
      scroll_height: windowHeight * 750 / windowWidth - 110
    });

    let that = this;

    wx.request({
      url: 'https://www.easy-mock.com/mock/5ca0798a3cd80d358df42f48/api/homechanpin',
      method: 'GET',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success(res) {
        
        let allData = res.data.data;
        let temList = [];
        for (let i = 0; i < allData.length; i++)
        {
          temList.push(null);
        }
        console.log(allData);
        that.setData({
          classifyList: allData,
          objs: allData[0].objs,
          badgeList: temList
        });
      }
    });
    
  },
  onTabChange(event) {
    console.log(event.detail);
  },
  onBadgeChange(event) {
    console.log(event.detail);
    this.setData({
      currentClass: event.detail,
      objs: this.data.classifyList[event.detail].objs
    });
  },
  upper(event) {
    console.log(event.detail);
  },
  lower(event) {
    console.log(event.detail);
  },
  scroll(event) {
    console.log(event.detail);
  },
  cellChoose(options) {

    var id = options.currentTarget.id;
    console.log("cellChoose" + id)
  },
  cellBtnChoose(options) {
    console.log(options);
    var id = options.currentTarget.id;
    console.log("cellBtnChoose" + id)
  },
  onStepperChange(event){
    let objsN = this.data.objNum;
    let tNum = objsN[""+this.data.currentClass];
    if (!tNum)
    {
      tNum = {};
    }

    //对比两次的值，来计算总价格的差值
    let lastNum = tNum["" + event.currentTarget.dataset.index];
    if (!lastNum)
    {
      lastNum = 0;
    }
    let dvalue = event.detail - lastNum;

    let temObj = this.data.objs[event.currentTarget.dataset.index];
    let temPrice = this.data.totlePrice + (dvalue * parseFloat(temObj.price) *100);

    tNum[""+event.currentTarget.dataset.index] = event.detail;

    objsN["" + this.data.currentClass] = tNum;

    let temBadgeList = this.data.badgeList;
    let temBadge = temBadgeList[this.data.currentClass];
    temBadge += dvalue;
    if (temBadge == 0)
    {
      temBadge = null;
    }
    temBadgeList[this.data.currentClass] = temBadge;

    this.setData({
      objNum: objsN,
      totlePrice: temPrice,
      badgeList: temBadgeList
    });
  },
  onCommitBtn(event){
    console.log(event);
    if (this.data.totlePrice > 0)
    {
      const that = this;
      let rltList = [];
      let objsN = this.data.objNum;
      Object.keys(objsN).forEach(function (key) {

        Object.keys(objsN[key]).forEach(function (key1) {

          let temobj = { "objID": that.data.classifyList[key].objs[key1].objID, "num": objsN[key][key1], "price": that.data.classifyList[key].objs[key1].price};
          rltList.push(temobj);
        });

      });

      let rltObj = { "list": rltList, "totlePrice": this.data.totlePrice};
      wx.setStorage({
        key: 'rltObj',
        data: JSON.stringify(rltObj)
      })


      wx.navigateTo({
        url: '../commit/commit'
      })
    }
    else{
      wx.showToast({
        title: '请选择商品',
        'icon':'none'
      })
    }
  }
})