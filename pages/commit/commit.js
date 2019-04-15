import Dialog from '../../dist/dialog/dialog';

const app = getApp()
Page({
  data: {
    scroll_height: 0,
    totlePrice: 0,
    objList: [],
    multiArray: [],
    payintegral: 0,
    payMoney:0,
    objectMultiArray: [{
      name: '东软A园',
      list: [{
        id: 0,
        name: 'A1'
      },
      {
        id: 1,
        name: 'A2'
      },
      {
        id: 2,
        name: 'A6'
      }
      ]
    }],
    multiIndex: [0, 0],
    selectVal: "请选择收货地址",
    multiArray1: [],
    objectMultiArray1: [{
        name: '时间',
        list: [{
            name: '上午08:00-08:30'
          },
          {
            name: '中午12:00-13:00'
          },
          {
            name: '下午17:30-18:00'
          }
        ]
      },
      {
        name: '时间1',
        list: [{
            name: '上午08:00-08:30'
          },
          {
            name: '中午12:00-13:00'
          },
          {
            name: '下午17:30-18:00'
          }
        ]
      }
    ],
    multiIndex1: [0, 0],
    selectVal1: "请选择送货时间"
  },
  onLoad: function() {

    let windowHeight = wx.getSystemInfoSync().windowHeight;
    let windowWidth = wx.getSystemInfoSync().windowWidth;
    this.setData({
      scroll_height: windowHeight - 60
    });

    const that = this;

    const temobj = app.globalData.orderInfo;
    const totlePriceNum = temobj.totlePrice / 100.0;
    let jifen = app.globalData.integral / 10;
    let zhifu = 0;
    if (totlePriceNum < jifen){
      //剩余积分大于总价格
      jifen = totlePriceNum;
    }else{
      zhifu = (totlePriceNum - jifen) * 100;
    }

    that.setData({
      totlePrice: temobj.totlePrice,
      objList: temobj.list,
      payintegral: jifen * 10,
      payMoney: zhifu
    });

    const timeList = [{
        name: '上午08:00-08:30'
      },
      {
        name: '中午12:00-13:00'
      },
      {
        name: '下午17:30-18:00'
      }
    ];

    let temObjectMultiArray1 = [];
    for (let i = 0; i < 3; i++){
      let timeObj = {};
      const timeStr = this.getDay(i);
      timeObj.name = timeStr;
      timeObj.list = timeList;
      temObjectMultiArray1.push(timeObj);
    }

    const temSelect = this.madeSelectArray(this.data.objectMultiArray, this.data.multiIndex);
    const temSelect1 = this.madeSelectArray(temObjectMultiArray1, this.data.multiIndex1);
    this.setData({
      objectMultiArray1: temObjectMultiArray1,
      multiArray1: temSelect1,
      multiArray: temSelect
    });


  },
  getSelectList(objs) {
    let temList = [];
    for (let i = 0; i < objs.length; i++) {
      const name = objs[i].name;
      temList.push(name);
    }

    return temList;
  },
  madeSelectArray(objs, indexArray) {
    let temList = [];
    let tem = this.getSelectList(objs);
    temList.push(tem);
    for (let i = 0; i < indexArray.length - 1; i++) {
      const indexVal = indexArray[i];
      let tem = this.getSelectList(objs[indexVal].list);
      temList.push(tem);
    }
    return temList;
  },
  doHandleMonth(month) {
    var m = month;
    if (month.toString().length == 1) {
      m = "0" + month;
    }
    return m;
  },
  getDay(day) {
    var today = new Date();
    var targetday_milliseconds = today.getTime() + 1000 * 60 * 60 * 24 * day;
    today.setTime(targetday_milliseconds); //注意，这行是关键代码
    var tYear = today.getFullYear();
    var tMonth = today.getMonth();
    var tDate = today.getDate();
    tMonth = this.doHandleMonth(tMonth + 1);
    tDate = this.doHandleMonth(tDate);
    return tYear + "-" + tMonth + "-" + tDate;
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
  onCommitBtn(event) {
    if (this.data.selectVal == "请选择收货地址"){
      wx.showToast({
        title: '请选择收货地址',
        'icon': 'none'
      })
      return;
    }
    if (this.data.selectVal1 == "请选择送货时间") {
      wx.showToast({
        title: '请选择送货时间',
        'icon': 'none'
      })
      return;
    }
    const that = this;
    const url = `${app.globalData.urlPath}/api/client/orderadd`;
    wx.showLoading({
      title: '加载中',
    })
    wx.request({
      url: url,
      method: 'POST',
      header: {
        'content-type': 'application/json'
      },
      data: {
        "token": app.globalData.token,
        "totleprice": that.data.totlePrice / 100.0,
        "integral": that.data.payintegral,
        "actual": that.data.payMoney / 100.0,
        "adress": that.data.selectVal,
        "deliverytime": that.data.selectVal1,
        "objs": app.globalData.orderInfo.list
      },
      success(res) {
        wx.hideLoading();
        if (res.statusCode == 200) {
          console.log("正确" + JSON.stringify(res));
          if (res.data.data.res == 1){
            if (res.data.data.iserror == 0){
              app.globalData.integral = res.data.data.integral;
              const mess = "本次获得" + res.data.data.addIntegral+"积分";
                  Dialog.alert({
                    title: '提交成功',
                    message: mess
                  }).then(() => {
                    wx.navigateBack({
                      delta: 1
                    });
                  });
              }else{
                  const mess = "本次获得" + addIntegral + "积分";
                  Dialog.alert({
                    title: '提交成功',
                    message: mess
                  }).then(() => {
                    wx.navigateBack({
                      delta: 1
                    });
                  });
              }

            app.globalData.orderInfo = null;

          }else{
            Dialog.alert({
              title: '错误提示',
              message: res.data.data.message
            }).then(() => {
            });
          }
        }
        else {
          Dialog.alert({
            title: '提交失败',
            message: '提交失败，请点击确定重新请求'
          }).then(() => {
          });
        }

      },
      fail(e) {
        wx.hideLoading();
        Dialog.alert({
          title: '提交失败',
          message: '提交失败，请点击确定重新请求'
        }).then(() => {
          
        });
      }
    });
  },
  bindMultiPickerColumnChange: function(e) {
    var data = {
      multiArray: this.data.multiArray,
      multiIndex: this.data.multiIndex
    };
    data.multiIndex[e.detail.column] = e.detail.value;
    switch (e.detail.column) {
      case 0:
        //当第一项有变动的时候，将其他项制成第一行
        data.multiIndex[1] = 0;
        break;
    }
    data.multiArray = this.madeSelectArray(this.data.objectMultiArray, data.multiIndex);
    this.setData(data);
  },
  bindMultiPickerChange: function(e) {
    const temVal = this.madeSelectArray(this.data.objectMultiArray, e.detail.value);
  
    this.setData({
      multiIndex1: e.detail.value,
      selectVal: temVal[0][e.detail.value[0]] + " " + temVal[1][e.detail.value[1]]
    })
  },
  bindMultiPickerColumnChange1: function(e) {
    var data = {
      multiArray1: this.data.multiArray1,
      multiIndex1: this.data.multiIndex1
    };
    data.multiIndex1[e.detail.column] = e.detail.value;
    switch (e.detail.column) {
      case 0:
        //当第一项有变动的时候，将其他项制成第一行
        data.multiIndex1[1] = 0;
        break;
    }
    data.multiArray1 = this.madeSelectArray(this.data.objectMultiArray1, data.multiIndex1);
    this.setData(data);
  },
  bindMultiPickerChange1: function(e) {
    const temVal = this.madeSelectArray(this.data.objectMultiArray1, e.detail.value);
    let time = "上午";
    if (e.detail.value[1] == 1) {
      time = "中午";
    } else if (e.detail.value[1] == 2) {
      time = "下午";
    }

    this.setData({
      multiIndex1: e.detail.value,
      selectVal1: temVal[0][e.detail.value[0]] + " " + time
    })
  }
})