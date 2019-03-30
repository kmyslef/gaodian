//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    scroll_height: 0,
imageURL:'//img.yzcdn.cn/upload_files/2017/07/02/af5b9f44deaeb68000d7e4a711160c53.jpg',
    active: 0,
    active2: 0,
    icon: {
      normal:
        'https://img.yzcdn.cn/public_files/2017/10/13/c547715be149dd3faa817e4a948b40c4.png',
      active:
        'https://img.yzcdn.cn/public_files/2017/10/13/793c77793db8641c4c325b7f25bf130d.png'
    }
  },
  onLoad: function () {
    let windowHeight = wx.getSystemInfoSync().windowHeight;
    let windowWidth = wx.getSystemInfoSync().windowWidth;
    this.setData({
      scroll_height: windowHeight * 750 / windowWidth -  110
    })
  },
  onTabChange(event) {
    console.log(event.detail);
  },
  onBadgeChange(event) {
    console.log(event.detail);
  }, 
  upper(event) {
    console.log(event.detail);
  },
  lower(event) {
    console.log(event.detail);
  },
  scroll(event) {
    console.log(event.detail);
  }, cellChoose(options){
    console.log(options);
    var id = options.currentTarget.dataset.id;
    console.log(id)
  }
})
