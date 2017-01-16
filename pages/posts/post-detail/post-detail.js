var postsData = require("../../../data/posts-data.js");
var app = getApp();
Page({
    data: {
        isMusicPlaying: false
    },
    onLoad: function (option) {
        var currentId = this.data.currentPost;
        var postId = option.id;
        this.data.currentPost = postId;
        var postData = postsData.postList[postId];
        this.setData({
            postDetail: postData
        });
        var postsCollect = wx.getStorageSync('posts_collect');
        if (postsCollect) {
            var postCollect = postsCollect[postId];
            this.setData({
                "collected": postCollect
            })
        } else {
            var postsCollect = {};
            postsCollect[postId] = false;
            wx.setStorageSync('posts_collect', postsCollect);
        }
         if(app.globalData.g_isMusicPlaying && app.globalData.g_currentMusicPlaying === this.data.currentPost){
            this.setData({
                isMusicPlaying:true
            });
        }
       this.setMusicMonitor();
    },
    onCollectTap: function (event) {
        var currentid = this.data.currentPost;
        var postsCollect = wx.getStorageSync('posts_collect');
        var currentPost = postsCollect[currentid];
        currentPost = !currentPost;
        postsCollect[currentid] = currentPost;
        //交互反馈
        this.showToast(postsCollect, currentPost);

    },
    onShareTap: function (event) {
        var itemList = [
            "分享给微信好友",
            "分享到朋友圈",
            "分享到新浪微博"
        ];
        this.showActionSheet(itemList);
    },
    showToast: function (postsCollect, currentPost) {
        wx.setStorageSync('posts_collect', postsCollect);
        this.setData({
            "collected": currentPost
        });
        wx.showToast({
            title: currentPost ? "收藏成功" : "取消成功",
            duration: 1000,
            icon: "success"
        });
    },
    //模态对话框
    showModal: function (postsCollect, currentPost) {
        var $this = this;
        wx.showModal({
            title: "收藏",
            content: currentPost ? "收藏该文章？" : "取消收藏该文章？",
            showCancel: true,
            cancelText: '取消',
            confirmText: '确定',
            success: function (res) {
                if (res.confirm) {
                    wx.setStorageSync('posts_collect', postsCollect);
                    $this.setData({
                        "collected": currentPost
                    });
                }
            }
        })

    },
    showActionSheet: function (itemList) {
        wx.showActionSheet({
            itemList: itemList,
            itemColor: '#405f80',
            success: function (res) {
                var index = res.tapIndex;
                var cancel = res.cancel;

            }
        })
    },
    onMusicTap: function (event) {
        var isMusicPlaying = this.data.isMusicPlaying;
        var currentid = this.data.currentPost;
        var postData = postsData.postList[currentid];
        if (isMusicPlaying) {
            wx.pauseBackgroundAudio();
            this.setData({
                isMusicPlaying:false
            });
        } else {
            wx.playBackgroundAudio({
                dataUrl:postData.music.url,
                title: postData.music.title,
                coverImgUrl:postData.music.imgUrl
            });
            this.setData({
                isMusicPlaying:true
            });
        }       

    },
    setMusicMonitor:function(){
        var that = this;
        wx.onBackgroundAudioPlay(function(){
           that.setData({
               isMusicPlaying:true
           });
           app.globalData.g_isMusicPlaying = true;
           app.globalData.g_currentMusicPlaying = that.data.currentPost;
        });
        wx.onBackgroundAudioPause(function(){
           that.setData({
               isMusicPlaying:false
           });
           app.globalData.g_isMusicPlaying = false;
           app.globalData.g_currentMusicPlaying = null;
        });
    }
})