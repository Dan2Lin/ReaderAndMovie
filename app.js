App({
    globalData: {
        g_isMusicPlaying: false,
        g_currentMusicPlaying:null
    },
    onLaunch: function () {
        console.log("onLaunch");
    },
    onShow: function () {
        console.log("onShow");
    },
    onHide: function () {
        console.log("onHide");
    },
    onError: function (msg) {
        console.log("onError");
    }
})