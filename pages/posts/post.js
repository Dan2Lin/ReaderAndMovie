var postData = require("../../data/posts-data.js");
Page({
  data:{
    //所有的数据绑定都是从该data获得数据，这个动作在onLoad动作之后执行
  },
  toDetailTap:function(event){
    var postId = event.currentTarget.dataset.postid;
    wx.navigateTo({
      url: 'post-detail/post-detail?id='+postId,
      success: function(res){
        // success
      },
      fail: function() {
        // fail
      },
      complete: function() {
        // complete
      }
    })
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数 
    // this.data.postList = postData.postList; 
     this.setData({"postList":postData.postList});
  }
  
})