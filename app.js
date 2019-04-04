//app.js
App({
  onLaunch: function () {
    //调用API从本地缓存中获取数据
  },
  getUserInfo:function(cb){
    var that = this
    if(this.globalData.userInfo){
      typeof cb == "function" && cb(this.globalData.userInfo)
    }else{
      //调用登录接口
      wx.login({
        success: function () {
         
        }
      })
    }
  },
  globalData:{
    userInfo:null
  }
})