//index.js

import Dialog from '../../dist/dialog/dialog';

//获取应用实例
const app = getApp()

Page({
  data: {
    scroll_height: 0,
    classifyList: [],
    objs: [],
    currentClass: 0,
    objNum: {},
    totlePrice: 0,
    badgeList: [],
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    isAuthShow: false,
    isCoverItemShow:false,
    coverItem:{},
    notiy: '欢迎光临',
    loadShow: false,
    errShow: false,  // 网络错误页面
    loginLoading: false, //网络错误页面按钮加载loading
    globurl: app.globalData.urlPath
  },
  onLoad: function() {

    let windowHeight = wx.getSystemInfoSync().windowHeight;
    let windowWidth = wx.getSystemInfoSync().windowWidth;
    this.setData({
      scroll_height: windowHeight - 90
    });

    let that = this;

    wx.getSetting({
      success: function(res) {
        if (res.authSetting['scope.userInfo']) {
          wx.getUserInfo({
            success: function(res) {
              that.afterUserInfo(res.userInfo);
            }
          })
        } else {
          that.setData({
            isAuthShow: true
          });
        }
      }
    })

    const url = `${app.globalData.urlPath}/api/client/objlist`;
    wx.request({
      url: url,
      method: 'GET',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success(res) {

        let allData = res.data.data;
        let temList = [];
        for (let i = 0; i < allData.length; i++) {
          temList.push(null);
        }
        console.log(allData);
        that.setData({
          loginLoading: false,
          errShow: false,
          classifyList: allData,
          objs: allData[0].objs,
          badgeList: temList
        });
      },fail(result){
        console.log(result)
        that.setData({
          errShow:true
        });
      }
    });

  },
  onReady() {
    // Do something when page ready.
  },
  onShow() {
    // Do something when page show.

    if (app.globalData.integral && !app.globalData.orderInfo){
      const notiystr1 = `欢迎${app.globalData.userInfo.nickName}，当前您拥${app.globalData.integral}有积分`;

      let allData = this.data.classifyList;
      let temList = [];
      for (let i = 0; i < allData.length; i++) {
        temList.push(null);
      }

      this.setData({
        badgeList: temList,
        notiy: notiystr1,
        objNum: {},
        totlePrice:0
      });
    }
    
  },
  moreClick() {
    // 点击重试，重新渲染界面
    let windowHeight = wx.getSystemInfoSync().windowHeight;
    let windowWidth = wx.getSystemInfoSync().windowWidth;
    this.setData({
      scroll_height: windowHeight - 90
    });
    
    let that = this;

    that.setData({
      loginLoading: true // 重新点击显示loading
    });
    wx.getSetting({
      success: function (res) {
        if (res.authSetting['scope.userInfo']) {
          wx.getUserInfo({
            success: function (res) {
              that.afterUserInfo(res.userInfo);
            }
          })
        } else {
          that.setData({
            isAuthShow: true
          });
        }
      }
    })

    const url = `${app.globalData.urlPath}/api/client/objlist`;
    wx.request({
      url: url,
      method: 'GET',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success(res) {
        let allData = res.data.data;
        let temList = [];
        for (let i = 0; i < allData.length; i++) {
          temList.push(null);
        }
        console.log(allData);
        that.setData({
          loginLoading: false,
          classifyList: allData,
          objs: allData[0].objs,
          badgeList: temList
        });
        // wx.stopPullDownRefresh(); // 可以停止当前页面的下拉刷新。
      }, fail(result){
        console.log(result)
        that.setData({
          loginLoading: false
        });
      }
    });
  },
  onReachBottom: function () {
    // 当界面的下方距离页面底部距离小于100像素时触发回调
    
  },
  onBadgeChange(event) {
    wx.stopPullDownRefresh();
    console.log(event.currentTarget.dataset.index);
    console.log(this.data.classifyList[event.currentTarget.dataset.index].objs);
    this.setData({
      currentClass: event.currentTarget.dataset.index,
      objs: this.data.classifyList[event.currentTarget.dataset.index].objs
    });
  },
  upper(event) {
    console.log(event.detail);
  },
  lower(event) {
    console.log(event.detail);
  },
  scroll(event) {
    // console.log(event.detail);
  },
  cellChoose(options) {
    wx.stopPullDownRefresh(function(e){
      console.log(e)
    });
    console.log(options.currentTarget.dataset.item)
    var id = options.currentTarget.id;
    console.log("cellChoose" + id)
    this.setData({
      isCoverItemShow: true,
      coverItem: options.currentTarget.dataset.item
    });
  },
  onClose(e){
    console.log(e)
    this.setData({
      isCoverItemShow: false
    });
  },
  cellBtnChoose(options) {
    console.log(options);
    var id = options.currentTarget.id;
    console.log("cellBtnChoose" + id)
  },
  onStepperChange(event) {
    let objsN = this.data.objNum;
    let tNum = objsN["" + this.data.currentClass];
    if (!tNum) {
      tNum = {};
    }

    //对比两次的值，来计算总价格的差值
    let lastNum = tNum["" + event.currentTarget.dataset.index];
    if (!lastNum) {
      lastNum = 0;
    }
    let dvalue = event.detail - lastNum;

    let temObj = this.data.objs[event.currentTarget.dataset.index];
    let temPrice = this.data.totlePrice + (dvalue * parseFloat(temObj.price) * 100);

    tNum["" + event.currentTarget.dataset.index] = event.detail;

    objsN["" + this.data.currentClass] = tNum;

    let temBadgeList = this.data.badgeList;
    let temBadge = temBadgeList[this.data.currentClass];
    temBadge += dvalue;
    if (temBadge == 0) {
      temBadge = null;
    }
    temBadgeList[this.data.currentClass] = temBadge;

    this.setData({
      objNum: objsN,
      totlePrice: temPrice,
      badgeList: temBadgeList
    });
  },
  onCommitBtn(event) {
    console.log(event);
    if (this.data.totlePrice > 0) {
      const that = this;
      let rltList = [];
      let objsN = this.data.objNum;
      Object.keys(objsN).forEach(function(key) {

        Object.keys(objsN[key]).forEach(function(key1) {

          if (objsN[key][key1] > 0){
            let temobj = {
              "objid": that.data.classifyList[key].objs[key1].objid,
              "num": objsN[key][key1],
              "price": that.data.classifyList[key].objs[key1].price,
              "title": that.data.classifyList[key].objs[key1].title
            };
            rltList.push(temobj);
          }
          
        });

      });

      let rltObj = {
        "list": rltList,
        "totlePrice": this.data.totlePrice
      };

      app.globalData.orderInfo = rltObj;


      wx.navigateTo({
        url: '../commit/commit'
      })
    } else {
      wx.showToast({
        title: '请选择商品',
        'icon': 'none'
      })
    }
  },
  bindGetUserInfo: function(e) { //授权绑定
    this.setData({
      isAuthShow: false
    });
    if (e.detail.userInfo) {
      //用户按了允许授权按钮 
      this.afterUserInfo(e.detail.userInfo);

    } else {
      //用户按了拒绝按钮 
      this.setData({
        isAuthShow: true
      });
    }
  },
  afterUserInfo: function(userInfo) {
    const notiystr = `欢迎${userInfo.nickName}`;
    this.setData({
      notiy: notiystr
    });

    const that = this;
    app.globalData.userInfo = userInfo;

    wx.login({
      success: function(res) {
        console.log(JSON.stringify(userInfo));
        if (res.code) {
          const url = `${app.globalData.urlPath}/api/client/login`;
          wx.request({
            url: url,
            method: 'POST',
            header: {
              'content-type': 'application/json'
            },
            data:{
              "code": res.code,
              "gender": userInfo.gender,
              "nick": userInfo.nickName,
              "avatarUrl": userInfo.avatarUrl
            },
            success(res) {
              
              if (res.statusCode == 200){
                console.log("正确" + JSON.stringify(res));
                app.globalData.token = res.data.data.token;
                app.globalData.integral = res.data.data.integral;
                const notiystr1 = `欢迎${userInfo.nickName}，当前您拥${app.globalData.integral}有积分`;
                that.setData({
                  notiy: notiystr1
                });
              }
              else{
                Dialog.alert({
                  title: '获取用户信息失败',
                  message: '获取用户信息失败，请点击确定重新请求'
                }).then(() => {
                  // on close
                  that.afterUserInfo(userInfo);
                });
              }

            },
            fail(e) {
              console.log("错误" + JSON.stringify(e));
              Dialog.alert({
                title: '获取用户信息失败',
                message: '获取用户信息失败，请点击确定重新请求'
              }).then(() => {
                // on close
                that.afterUserInfo(userInfo);
              });

            }
          });
        } else {
          Dialog.alert({
            title: '获取用户信息失败',
            message: '获取用户信息失败，请点击确定重新请求'
          }).then(() => {
            // on close
            that.afterUserInfo(userInfo);
          });
        }

      },
      fail: function() {
        Dialog.alert({
          title: '获取用户信息失败',
          message: '获取用户信息失败，请点击确定重新请求'
        }).then(() => {
          // on close
          that.afterUserInfo(userInfo);
        });
      }
    })
  }
})