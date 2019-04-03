Page({
  data: {
    scroll_height: 0,
    totlePrice:0,
    objList:[]
  },
  onLoad: function() {

    let windowHeight = wx.getSystemInfoSync().windowHeight;
    let windowWidth = wx.getSystemInfoSync().windowWidth;
    this.setData({
      scroll_height: windowHeight - 60
    });

    const that = this;

    wx.getStorage({
      key: 'rltObj',
      success: function(res) {
        console.log(JSON.stringify(res));
        const tem = res.data;
        const temobj = JSON.parse(tem);
        that.setData({
          totlePrice: temobj.totlePrice,
          objList: temobj.list
        });

      },
    })
    
    
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