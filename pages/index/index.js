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
    totlePrice:0
  },
  onLoad: function() {

    let windowHeight = wx.getSystemInfoSync().windowHeight;
    let windowWidth = wx.getSystemInfoSync().windowWidth;
    this.setData({
      scroll_height: windowHeight * 750 / windowWidth - 110
    });

    let allData = [{
        "classifyID": "0",
        "classifyName": "产品1",
        "objs": [{
          "objID": "0",
          "title": "2018秋季",
          "desc": "描述信息",
          "price": "3.00",
          "thumbUrl": "//img.yzcdn.cn/upload_files/2017/07/02/af5b9f44deaeb68000d7e4a711160c53.jpg",
          "tags": [{
              "name": "标签"
            },
            {
              "name": "标签2"
            }
          ]
        }, {
            "objID": "5",
            "title": "2018秋季",
            "desc": "描述信息",
            "price": "3.00",
            "thumbUrl": "//img.yzcdn.cn/upload_files/2017/07/02/af5b9f44deaeb68000d7e4a711160c53.jpg",
            "tags": [{
              "name": "标签"
            },
            {
              "name": "标签2"
            }
            ]
          }, {
            "objID": "5",
            "title": "2018秋季",
            "desc": "描述信息",
            "price": "3.00",
            "thumbUrl": "//img.yzcdn.cn/upload_files/2017/07/02/af5b9f44deaeb68000d7e4a711160c53.jpg",
            "tags": [{
              "name": "标签"
            },
            {
              "name": "标签2"
            }
            ]
          }, {
            "objID": "5",
            "title": "2018秋季",
            "desc": "描述信息",
            "price": "3.00",
            "thumbUrl": "//img.yzcdn.cn/upload_files/2017/07/02/af5b9f44deaeb68000d7e4a711160c53.jpg",
            "tags": [{
              "name": "标签"
            },
            {
              "name": "标签2"
            }
            ]
          }, {
            "objID": "5",
            "title": "2018秋季",
            "desc": "描述信息",
            "price": "3.00",
            "thumbUrl": "//img.yzcdn.cn/upload_files/2017/07/02/af5b9f44deaeb68000d7e4a711160c53.jpg",
            "tags": [{
              "name": "标签"
            },
            {
              "name": "标签2"
            }
            ]
          }, {
            "objID": "5",
            "title": "2018秋季",
            "desc": "描述信息",
            "price": "3.00",
            "thumbUrl": "//img.yzcdn.cn/upload_files/2017/07/02/af5b9f44deaeb68000d7e4a711160c53.jpg",
            "tags": [{
              "name": "标签"
            },
            {
              "name": "标签2"
            }
            ]
          }, {
            "objID": "5",
            "title": "2018秋季",
            "desc": "描述信息",
            "price": "3.00",
            "thumbUrl": "//img.yzcdn.cn/upload_files/2017/07/02/af5b9f44deaeb68000d7e4a711160c53.jpg",
            "tags": [{
              "name": "标签"
            },
            {
              "name": "标签2"
            }
            ]
          }, {
            "objID": "5",
            "title": "2018秋季",
            "desc": "描述信息",
            "price": "3.00",
            "thumbUrl": "//img.yzcdn.cn/upload_files/2017/07/02/af5b9f44deaeb68000d7e4a711160c53.jpg",
            "tags": [{
              "name": "标签"
            },
            {
              "name": "标签2"
            }
            ]
          }, {
            "objID": "6",
            "title": "2018秋季",
            "desc": "描述信息",
            "price": "3.00",
            "thumbUrl": "//img.yzcdn.cn/upload_files/2017/07/02/af5b9f44deaeb68000d7e4a711160c53.jpg",
            "tags": [{
              "name": "标签"
            },
            {
              "name": "标签2"
            }
            ]
          }]
      },
      {
        "classifyID": "1",
        "classifyName": "产品2",
        "objs": [{
          "objID": "1",
          "title": "2018秋季",
          "desc": "描述信息",
          "price": "3.00",
          "thumbUrl": "//img.yzcdn.cn/upload_files/2017/07/02/af5b9f44deaeb68000d7e4a711160c53.jpg",
          "tags": [{
              "name": "标签"
            },
            {
              "name": "标签2"
            }
          ]
        }]
      },
      {
        "classifyID": "2",
        "classifyName": "产品1",
        "objs": [{
          "objID": "2",
          "title": "2018秋季",
          "desc": "描述信息",
          "price": "3.00",
          "thumbUrl": "//img.yzcdn.cn/upload_files/2017/07/02/af5b9f44deaeb68000d7e4a711160c53.jpg",
          "tags": [{
              "name": "标签"
            },
            {
              "name": "标签2"
            }
          ]
        }]
      }
    ];
    this.setData({
      classifyList: allData,
      objs: allData[0].objs
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
    let tNum= objsN[""+this.data.currentClass];
    if (!tNum)
    {
      tNum = {};
    }
    tNum[""+event.currentTarget.dataset.index] = event.detail;

    objsN["" + this.data.currentClass] = tNum;

    

    this.setData({
      objNum: objsN
    });
  },
  onCommitBtn(event){
    console.log(event);
  }
})