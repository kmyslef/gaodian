Page({
  data: {
    scroll_height: 0
  },
  onLoad: function() {

    let windowHeight = wx.getSystemInfoSync().windowHeight;
    let windowWidth = wx.getSystemInfoSync().windowWidth;
    this.setData({
      scroll_height: windowHeight - 60
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
  onCommitBtn(event){
    
  }
})