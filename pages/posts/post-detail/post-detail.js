var postsData = require("../../../data/posts-data.js");
Page({
    data: {},
    onLoad: function (option) {
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

    }
})