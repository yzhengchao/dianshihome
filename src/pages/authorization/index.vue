<template>
    <div class="home"  >
        <div class="title" v-if="userName">
<!--            欢迎登录：<span class="name">{{userName}}</span>-->
        </div>
        <div class="ceng" v-if="isCeng" @touchmove.stop.prevent="touchmovehandle">
            <button @getuserinfo="getVxUserInfo" open-type="getUserInfo" v-if="!userName" class="btn">点击微信授权</button>
        </div>
    </div>
</template>

<script>
    import {getAuth} from "@/utils/api"
    export default{
        data(){
            return{
                userName:"",
                isCeng:true,
                ticket:"",
                needCode:"",
                userinfo:{},  //存放用户信息，保存在自己的数据库中
            }
        },
        //判断是否存在auth
        created(){

        },
        mounted(){
            wx.showLoading({
                title: "加载中"
            });
            wx.redirectTo({
                url:"../index/main"
            })
            // this.isLogin()
            // if(!!wx.getStorageSync("auth")){
            //     wx.redirectTo({
            //         url:"../index/main"
            //     })
            // }else{
            //     this.isLogin()
            // }
        },
        methods:{
            getVxUserInfo(e){
                if(e.target.userInfo){
                    this.userName=e.target.userInfo.nickName;
                    this.isCeng=false;
                    this.isLogin()
                }else{
                    this.userName="";
                    this.isCeng=true;
                }
            },
            isLogin(){
                var _this=this;
                // 主要是为了获取code
                wx.login({
                    success (res) {
                        if (res.code) {
                            // 封装的缓存方法
                            _this.needCode = res.code
                            let parmas ={
                                code:res.code,
                            }
                            getAuth(parmas,1).then(res=>{  //获取用户auth
                                if(res.errCode == 0){
                                    if(!!res.data.isNext){
                                        _this.ticket = res.data.ticket
                                        _this.getSetting()
                                    }else{
                                        _this.$store.commit("userId",res.data.userId)
                                        _this.$store.commit("auth",res.data.authorization)
                                        wx.setStorageSync("auth",res.data.authorization)
                                        wx.setStorageSync("userId",res.data.userId)
                                        wx.setStorageSync("openId",res.data.openId)
                                        wx.setStorageSync("unionId",res.data.unionId)
                                        wx.redirectTo({
                                            url:"../index/main"
                                        })
                                        return
                                    }
                                }else if(res.errCode == 10){
                                    wx.redirectTo({
                                        url:"../notLogin/main"
                                    })
                                }else{
                                    _this.getSetting()
                                }
                            })
                        } else {
                            console.log('登录失败！' + res.errMsg)
                        }

                    }
                })

            },
            getSetting(){
                let _this =this
                wx.getSetting({
                    success(res) {
                        if (!res.authSetting['scope.userInfo']) {//未授权getUserInfo
                            wx.authorize({
                                scope: 'scope.getUserInfo',
                                success(res) {
                                    // 用户已经同意小程序使用用户信息，后续调用 wx.userInfo 接口不会弹窗询问
                                    _this.getOpenId(res)
                                },
                                fail(err){
                                    console.log(err)
                                }
                            })
                        }else{//已授权
                            wx.getUserInfo({
                                success(res) {
                                    _this.getOpenId(res)
                                },
                                fail(err) {
                                    console.log(err)
                                }
                            })
                        }
                    }
                })
            },
            touchmovehandle(){ //解决vue蒙层滑动穿透问题
            },
            getOpenId(res){  //获取用户的openid  unionid
                let _this=this;
                let parmas ={
                    "code": _this.needCode,         // 微信授权code, 当type=1时必传,
                    "ticket": _this.ticket,       // 当type=2时必传
                    "rawData": res.rawData,      // 当type=2时必传
                    "encryptedData": res.encryptedData,// 当type=2时必传
                    "signature": res.signature,    // 当type=2时必传
                    "iv": res.iv            // 当type=2时必传
                }
                getAuth(parmas,2).then(res=>{  //获取用户auth
                    if(res.errCode == 0){
                        _this.$store.commit("userId",res.data.userId)
                        _this.$store.commit("auth",res.data.authorization)
                        wx.setStorageSync("auth",res.data.authorization)
                        wx.setStorageSync("userId",res.data.userId)
                        wx.setStorageSync("openId",res.data.openId)
                        wx.setStorageSync("unionId",res.data.unionId)
                        wx.redirectTo({
                            url:"../index/main"
                        })
                    }else if(res.errCode == 10){
                        wx.redirectTo({
                            url:"../notLogin/main"
                        })
                    }
                })
            }
        }
    }
</script>

<style scoped lang="stylus">
    .home{
        padding-bottom: 140rpx;
    }
    .btn{
        background:#CCCCCC;
        color: black;
        width: 60%;
    }

    .title{
        text-align: right;
        font-size: 15rpx;
        padding-right: 30rpx;
        padding-top: 30rpx;
    }
    .name{
        color: royalblue;
    }
    .ceng{
        position: fixed;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background: rgba(0,0,0,0.8);
        z-index: 20;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
    }

</style>
