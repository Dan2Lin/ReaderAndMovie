Page({
   onTap:function(){
        wx.switchTab({
         url: '../posts/post',
         success: function(res){
           // success
           console.log("success");
         },
         fail: function() {
           // fail
           console.log("fail");
         },
         complete: function() {
           // complete
           console.log("complete");
         }
       })
   }

})