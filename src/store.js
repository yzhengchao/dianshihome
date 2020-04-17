import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        code: '',
        showToast: '',
        freeType:"",
        webView:"",
        shareNum:0,
        userInfo: wx.getStorageSync("userInfo") ? wx.getStorageSync("userInfo"):"",
        userId: wx.getStorageSync("userId") ? wx.getStorageSync("userId"):"",
        auth:wx.getStorageSync("auth") ? wx.getStorageSync("auth"):"",
        appid:wx.getStorageSync("appid") ? wx.getStorageSync("appid"):"",
        openId:wx.getStorageSync("openId") ? wx.getStorageSync("openId"):"",
        unionId:wx.getStorageSync("unionId") ? wx.getStorageSync("unionId"):"",
    },
    mutations: {
        code(state, msg) {
            state.code = msg;
        },
        showToast(state, msg) {
            state.showToast = msg;
        },
        freeType(state, msg) {
            state.freeType = msg;
        },
        userInfo(state, msg) {
            state.userInfo = msg;
        },
        userId(state, msg) {
            state.userId = msg;
        },
        auth(state, msg) {
            state.auth = msg;
        },
        appid(state, msg) {
            state.appid = msg;
        },
        openId(state, msg) {
            state.openId = msg;
        },
        unionId(state, msg) {
            state.unionId = msg;
        },
        webView(state, msg) {
            state.webView = msg;
        },
        shareNum(state, msg) {
            state.shareNum = msg;
        },
    },
    actions: {}
})
