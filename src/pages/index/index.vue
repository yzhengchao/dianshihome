<template>
    <view class="index_page">
        <div class="top_background"></div>
        <div class="user_box">
            <div class="user_box_headerImg" @click="clickHeader"><img :src="headImgUrl"></div>
            <div class="user_box_info" v-if="!!userId">
                <div class="user_box_info_name">{{nickname}}</div>
                <div class="user_box_info_day" v-if="!equityFree">你已登录电视家{{userInfo.loginDays}}天</div>
                <div class="user_box_info_day" v-if="equityFree">{{myAdEquityTime}} 到期</div>
            </div>
            <div v-if="!userId" class="user_box_info" @click="needLogin = true">
                <div class="user_box_info_name">未登录</div>
                <div class="user_box_info_day">登录后体验更好的服务</div>
            </div>
        </div>
        <div class="income_box">
            <div class="income_box_coin">
                <div>{{userCoin}}</div>
                <div>我的金币</div>
            </div>
            <div class="income_box_line"></div>
            <div class="income_box_cash">
                <div>{{userCash}}</div>
                <div>现金收益(元)</div>
            </div>
        </div>
        <div class="Sign_in_box">
            <div class="Sign_in_tomorrow">明日签到可领<span>{{signTomorrow}}</span> <span class="problem"
                                                                                    @click="openRuler(showToastRuler)">?</span>
            </div>
            <!--          <div class="Sign_in_switch"><span v-if="switchResult">签到已开启</span><span v-else-if="!switchResult">签到已关闭</span><SwitchV propsChecked="true"  @switchChange="switchChange"></SwitchV></div>-->
            <!--          <div class="Sign_in_switch">签到已开启<switch @click="changeType()" :aria-checked="checked"></switch></div>-->
        </div>
        <!--      签到-->
        <div class="sign_date">
            <scroll-view class='scroll-view-list' scroll-x="true" @scroll="scrollView" :scroll-left="scrollLeft">
                <div class="scroll-view-item" v-for="(item ,index) in signResult" :key="index">
                    <div class="scroll-item">
                        <div class="box_top" v-if="item.isSign == 2"
                             :class="{notBorder:item.rewardsNeed.rewardsType == 4 || item.rewardsNeed.rewardsType == 3 || item.rewardsNeed.rewardsType == 1}">
                            <div class="sign_num" :class="{opacityClass: item.rewardsNeed.rewardsType == 1}">
                                {{item.rewardsNeed.count}}
                            </div>
                            <div class="sign_type" :class="{opacityClass: item.rewardsNeed.rewardsType == 1}"><img
                                :src="item.rewardsNeed.imgNew" alt=""></div>
                            <div class="sign_img sign_img_four" v-if="item.rewardsNeed.rewardsType == 4"><img
                                :src="item.rewardsNeed.imgNew" alt=""></div>
                            <!--                          <div class="sign_img sign_img_one" v-if="item.rewardsNeed.rewardsType == 1"><img :src="item.rewardsNeed.imgNew" alt=""></div>-->
                            <div class="sign_img sign_img_four" v-if="item.rewardsNeed.rewardsType == 3"><img
                                :src="item.rewardsNeed.imgNew" alt=""></div>
                            <div class="sign_img sign_img_four" v-if="item.rewardsNeed.rewardsType == 1"><img
                                :src="item.rewardsNeed.imgNew" alt=""></div>
                        </div>
                        <div class="box_top" v-if="item.isSign == 1">
                            <div class="sign_num" style="opacity:0;">{{item.rewardsNeed.count}}</div>
                            <div class="sign_type" style="opacity:0;"><img :src="item.rewardsNeed.imgNew" alt=""></div>
                            <div class="sign_img"><img src="http://cdn.dianshihome.com/images/signin.png" alt=""></div>
                        </div>
                        <div class="box_bottom" v-if="item.isSign == 2">{{item.day}}天</div>
                        <div class="box_bottom" v-if="item.isSign == 1"><img
                            src="http://cdn.dianshihome.com/wechat/ic_sign_overimg.png" alt=""></div>
                    </div>

                </div>
            </scroll-view>
        </div>
        <!--      banner-->
        <div class='banner_box'>
            <swiper @change="swiperChange"
                    :indicator-dots='false'
                    indicator-color='#d8d8d8'
                    indicator-active-color='#ffad36'
                    :autoplay='true'
                    :interval='3000'
                    :duration='500'
                    :circular='true'
                    class="swiper"
            >
                <swiper-item v-for='(img,index) in topSwipers' :key='index'>
                    <img
                        class='slide-image'
                        mode='aspectFit'
                        :src="img.outterImage"
                        @click="freeReceive(index)"
                    />
                </swiper-item>

            </swiper>
            <div class="dots" v-if="topSwipers.length>1">
                <div :class="{'activeLine': currentindex == index}" v-for='(img,index) in topSwipers'
                     :key='index'></div>
            </div>
        </div>
        <div class="acitve_box">
            <div class="active_title">活动专区</div>
            <div class="active_info">
                <div class="active_left" @click="luckDraw()">
                    <div class="active_left_introduce">
                        <div>免费抽奖</div>
                        <div>中奖率100%</div>
                    </div>
                </div>
                <div class="active_right" @click="openView(2)">
                    <div class="active_left_introduce">
                        <div>品质好物</div>
                        <div>尽在优选商城</div>
                    </div>
                </div>
            </div>
        </div>
        <div class="product_index" @click="openView(1)"><img src="http://cdn.dianshihome.com/wechat/product_index.png"
                                                             alt=""></div>
        <div class="more_content">更多内容敬请期待</div>
        <!--      <div @click="changeToast">打开弹窗</div>-->
        <receiveToast v-if="showToast" :getPrice="getPrice" :priceBox="priceBox"></receiveToast>
        <toastRuler v-if="showToastRuler" :showToastRuler="showToastRuler" @openRuler="openRuler"
                    rulerType="1"></toastRuler>
<!--        授权弹窗-->
        <div class="get_user" v-if="needLogin" catchtouchmove='true'>
            <div class="get_userInfo">
                <div class="login_logo">
                    <img src="http://cdn.dianshihome.com/wechat/logo_login.png" alt="">
                </div>
                <div class="get_content">
                    授权后体验更好的服务<br/>
                    需要你的授权，以体验电视家小程序全部功能
                </div>
                <div class="get_btn">
                    <div class="not_login" @click="needLogin=false">暂不登录</div>
                    <button @getuserinfo="getVxUserInfo" open-type="getUserInfo" v-if="!userName" class="get_login">微信登录</button>
                </div>
            </div>
        </div>
    </view>
</template>

<script>
    import util from "@/utils/util";
    import receiveToast from "../../components/receiveToast";
    import toastRuler from "../../components/toastRuler";
    import SwitchV from "../../components/switch";
    import store from '../../store'
    import {getUserInfo, getUserCoin, getUserCash, getSignin, getSignResult,getAuth} from "@/utils/api"

    export default {
        data() {
            return {
                value: false,
                index: 0,
                headImgUrl: "http://cdn.dianshihome.com/wechat/defaultHead.png", //默认头像
                nickname:"",
                userInfo: {}, //用户信息
                userId: "",
                switchResult: true,
                userCoin: 0,//用户金币
                userCash: 0,//用户现金,
                userSignDay: 4,   //用户签到了第几天
                topSwipers: [{
                    id: 1,
                    outterImage: 'http://cdn.dianshihome.com/wechat/index_banner.png'
                }],
                currentindex: 0,
                scrollLeft: 0,
                myAdEquityTime: "",  //免广告特权到期时间
                signResult: [],//签到结果
                bannerType: "", //免广告
                showToastRuler: false,
                signTomorrow: "",
                getPrice: "",
                equityFree: true,
                priceBox: "",
                needLogin:false, //授权弹窗
                ticket:"",
            };
        },
        components: {
            receiveToast,
            SwitchV, toastRuler
        },
        computed: {
            showToast() {
                return store.state.showToast
            }
        },
        onLoad() {

        },
        onShow() { //页面从其他页面返回回来的时候更新
            this.userId = this.$store.state.userId
            this.getPageInfo()
        },
        methods: {
            getPageInfo() {
                this.getUserInfo() //用户基本信息
                this.getSignin() //签到
                this.getUserCoin() //用户金币
                this.getUserCash() //用户现金
                this.getSignResult() //签到结果
            },
            openRuler(showToastRuler) {
                this.showToastRuler = !showToastRuler
            },
            luckDraw() {
                if(!this.$store.state.auth){ //跳转先判断
                    this.needLogin=true
                    return
                }
                wx.navigateTo({
                    url: "../luckDraw/main"
                })
            },
            changeToast() {
                this.$store.commit("showToast", true)
            },
            getVxUserInfo(e){
                if(e.target.userInfo){
                    this.needLogin = false
                    wx.showLoading({
                      title: '登录中',
                    });
                    this.isLogin()
                }
            },
            clickHeader(){
                if(!this.$store.state.auth){ //跳转先判断
                    this.needLogin=true
                    return
                }
            },
            isLogin(){  //获取用户信息
                let _this =this
                wx.getSetting({
                    success(res) {
                        if (!res.authSetting['scope.userInfo']) {//未授权getUserInfo
                            wx.authorize({
                                scope: 'scope.getUserInfo',
                                success(res) {
                                    // 用户已经同意小程序使用用户信息，后续调用 wx.userInfo 接口不会弹窗询问
                                    _this.getUserAuth(res)
                                },
                                fail(err){
                                    console.log(err)
                                }
                            })
                        }else{//已授权
                            wx.getUserInfo({
                                success(res) {
                                    _this.getUserAuth(res)
                                },
                                fail(err) {
                                    console.log(err)
                                }
                            })
                        }
                    }
                })
            },
            getUserAuth(info){
                let _this = this
                let parmas ={
                    code:this.$store.state.code,
                }
                getAuth(parmas,1).then(res=>{  //获取用户auth
                    if(res.errCode == 0){
                        if(!!res.data.isNext){
                            _this.ticket = res.data.ticket
                            _this.getDetail(info)
                        }else{
                            _this.$store.commit("userId",res.data.userId)
                            _this.$store.commit("auth",res.data.authorization)
                            _this.$store.commit("openId",res.data.openId)
                            _this.$store.commit("unionId",res.data.unionId)
                            wx.setStorageSync("auth",res.data.authorization)
                            wx.setStorageSync("userId",res.data.userId)
                            wx.setStorageSync("openId",res.data.openId)
                            wx.setStorageSync("unionId",res.data.unionId)
                            this.userId = this.$store.state.userId
                            _this.needLogin = false
                            _this.getPageInfo()
                            wx.hideLoading();
                            return
                        }
                    }else if(res.errCode == 10){
                        wx.redirectTo({
                            url:"../notLogin/main"
                        })
                        wx.clearStorage()
                    }else{
                        wx.login({
                            success (res) {
                                if (res.code) {
                                    _this.$store.commit("code",res.code)
                                } else {
                                    console.log('登录失败！' + res.errMsg)
                                }
                            }
                        })
                        _this.getDetail(info)
                    }
                })
            },
            getDetail(res){  //获取用户的openid  unionid
                let _this=this;
                let parmas ={
                    "code": _this.$store.state.code,         // 微信授权code, 当type=1时必传,
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
                        _this.$store.commit("openId",res.data.openId)
                        _this.$store.commit("unionId",res.data.unionId)
                        wx.setStorageSync("auth",res.data.authorization)
                        wx.setStorageSync("userId",res.data.userId)
                        wx.setStorageSync("openId",res.data.openId)
                        wx.setStorageSync("unionId",res.data.unionId)
                        _this.getSignResult()

                    }else if(res.errCode == 10){
                        wx.redirectTo({
                            url:"../notLogin/main"
                        })
                        wx.clearStorage()
                    }else{
                        wx.showToast({
                            title:"登录失败",
                            icon:"none"
                        })
                        _this.needLogin=false
                        wx.clearStorage()
                    }
                    wx.hideLoading();
                })
            },
            //免费领免广告
            freeReceive() {
                if(!this.$store.state.auth){
                    this.needLogin=true
                    return
                }
                this.$store.commit("freeType", this.$store.state.freeType)
                wx.navigateTo({
                    url: "../freeReceive/main"
                })
            },
            switchChange(data) {
                this.switchResult = data
            },
            scrollView(e) {
                // console.log(e)
            },
            //轮播图的切换事件
            swiperChange(e) {
                this.currentindex = e.target.current  //获取当前轮播图片的下标, 可以给当前指示点加样式
            },
            //  获取用户信息
            getUserInfo() {
                let headers = {}
                getUserInfo(headers).then(res => {
                    if(res.errCode == 0){
                        this.userInfo = res.data
                        this.headImgUrl = this.userInfo.headImgUrl
                        this.nickname=this.userInfo.nickname
                        this.myAdEquityTime = util.formatTime(res.data.adEquityTime)
                        var today = Math.round(new Date())
                        var today_time = util.formatTime(today);
                        if (today_time > this.myAdEquityTime) {
                            //console.log('特权已结束');
                            this.equityFree = false
                            this.$store.commit("freeType", 1)
                        } else {
                            //console.log('特权还没结束');
                            this.equityFree = true
                            this.$store.commit("freeType", 4)
                        }
                    }else{
                        this.isLogin()
                    }
                })
            },
            //  获取用户金币
            getUserCoin() {
                let headers = {}
                getUserCoin(headers).then(res => {
                    if (res.errCode == 0) {
                        this.userCoin = res.data.coin
                    }
                })
            },
//  获取用户现金
            getUserCash() {
                let headers = {}
                getUserCash(headers).then(res => {
                    if (res.errCode == 0) {
                        if (res.data.amount == 0) return this.userCash = res.data.amount
                        this.userCash = util.returnFloat(res.data.amount / 100)
                    }
                })
            },
            //用户进页面就签到
            getSignin() {
                let _this= this
                let headers = {
                    // "appid":this.$store.state.appid,
                }
                getSignin(headers).then(res => {
                    if (res.errCode == 0) {
                        this.getPrice = util.arrmax(res.data.reward)
                        this.priceBox = res.data
                        this.changeToast()
                        this.getUserInfo() //用户基本信息
                        this.getUserCoin() //用户金币
                        this.getUserCash() //用户现金
                        this.getSignResult()
                    }
                    //统计
                    var today = Math.round(new Date())
                    var today_time = util.formatTime(today);
                    wx.reportAnalytics('auto_sign', {
                        sign_num: today_time,
                        user_id: _this.$store.state.userId,
                    });
                })
            },
            //  查询签到结果
            getSignResult() {
                let headers = {
                    // "appid":this.$store.state.appid,
                }
                getSignResult(headers).then(res => {
                    if (res.errCode == 0) {
                        // wx.hideLoading();
                        this.signResult = res.data.recentDays
                        this.signResult.forEach((r, i) => {
                            r.rewardsNeed = util.arrmax(r.rewards)
                        })
                        //奖励类型 0金币，1免广告 ，2实物 3自定义大额金币 4提现额度奖励
                        //额度 > 实物 > 免广告 > 金币
                        let indexToday = this.signResult.findIndex(item => {  //找出明日的index
                            return item.day == res.data.currentDay + 1
                        })
                        if (indexToday == 4) { //签到的显示  向右滑动
                            this.scrollLeft = indexToday * 50
                        } else if (res.data.currentDay >= 5) {
                            this.scrollLeft = indexToday * 100
                        } else {
                            this.scrollLeft = 0
                        }
                        let signArr = this.signResult[indexToday].rewards  //获取明天将要领取的数组 进行对比
                        let itemFour = signArr.find(item => {
                            return item.rewardsType == 4;
                        });
                        let itemTwo = signArr.find(item => {
                            return item.rewardsType == 2;
                        });
                        let itemOne = signArr.find(item => {
                            return item.rewardsType == 1;
                        });
                        let itemThree = signArr.find(item => {
                            return item.rewardsType == 3;
                        });
                        let itemZero = signArr.find(item => {
                            return item.rewardsType == 0;
                        });
                        if (!!itemFour) {
                            if (itemFour.name.indexOf("-") != -1) {
                                this.signTomorrow = itemFour.name.split("-")[itemFour.name.split("-").length - 1]
                            } else {
                                this.signTomorrow = itemFour.name
                            }
                            return
                        }
                        ;
                        if (!!itemTwo) {
                            if (itemTwo.name.indexOf("-") != -1) {
                                this.signTomorrow = itemTwo.name.split("-")[itemTwo.name.split("-").length - 1]
                            } else {
                                this.signTomorrow = itemTwo.name
                            }
                            return
                        }
                        ;
                        if (!!itemOne) {
                            if (itemOne.name.indexOf("-") != -1) {
                                this.signTomorrow = itemOne.name.split("-")[itemOne.name.split("-").length - 1]
                            } else {
                                this.signTomorrow = itemOne.name
                            }
                            return
                        }
                        ;
                        if (!!itemThree && !!itemZero) {
                            this.signTomorrow = itemThree.price + itemZero.price + "金币"
                            return
                        } else if (!!itemThree && !itemZero) {
                            this.signTomorrow = itemThree.price + "金币"
                            return
                        } else {
                            this.signTomorrow = itemZero.price + "金币"
                            return;
                        }
                    }
                })
            },
            openView(type) {
                if (type == 1) {
                    // this.$store.commit("webView","https://shop42751884.m.youzan.com/wscgoods/detail/367w43o68rduc")
                    // wx.navigateTo({
                    //     url:"../webView/main"
                    // })
                    wx.navigateToMiniProgram({
                        appId: 'wxa418cef64294be82',
                        path: 'packages/goods/detail/index?alias=367w43o68rduc',
                        extraData: {
                            foo: ''
                        },
                        envVersion: 'release',
                        success(res) {
                            // 打开成功
                            console.log(res)
                        },
                        fail(err) {
                            console.log(err)
                        }
                    })
                } else if (type == 2) { //主页
                    // this.$store.commit("webView","https://shop42751884.youzan.com/v2/showcase/homepage?alias=PcnU4PR228\n")
                    // wx.navigateTo({
                    //     url:"../webView/main"
                    // })
                    wx.navigateToMiniProgram({
                        appId: 'wxa418cef64294be82',
                        path: 'pages/home/dashboard/index',
                        extraData: {
                            foo: ''
                        },
                        envVersion: 'release',
                        success(res) {
                            // 打开成功
                            console.log(res)
                        },
                        fail(err) {
                            console.log(err)
                        }
                    })
                }
            },
            getAtterbute(e) {
                console.log(e.currentTarget.dataset.order);
            },
            goDetail() {
                wx.navigateTo({
                    url: "../detail/main?id=" + this.testId
                })
            },
            getHots() {
                // wx.showLoading({
                //   title: "加载中..."
                // });
            },
        },
        onPullDownRefresh() {
            // 增加下拉刷新数据的功能
            // this.getHots();
            wx.showLoading({
                title: "刷新中..."
            });
            this.getPageInfo()
            setTimeout(() => {
                wx.hideLoading();
            }, 1000)
            wx.stopPullDownRefresh();
        }
    };
</script>

<style scoped lang="stylus">
    /* 顶部滚动导航栏 */
    .index_page{
        width 100%
        min-height 100%
        position absolute
        background rgba(247,247,247,1)
        .top_background{
            width 100%
            height 281rpx
            position absolute
            top 0
            left 0
            background url($cdnUrl + "wechat/indexTop.png") no-repeat
            background-size 100% 100%
        }
        .user_box{
            width 90%
            margin 46rpx auto
            display flex
            align-items center
            justify-content flex-start
            position relative
            .user_box_headerImg{
                width 75rpx
                height 75rpx
                border-radius 100%
                border 1rpx solid #fff
                overflow hidden
                margin-right 10rpx
                img{
                    width 100%
                    height 100%
                }
            }
            .user_box_info{
                .user_box_info_name{
                    font-size:30rpx;
                    font-weight:500;
                    margin-bottom 5rpx
                    color:rgba(255,255,255,1);
                }
                .user_box_info_day{
                    font-size:24rpx;
                    font-weight:400;
                    color:rgba(255,255,255,1);
                }
            }
        }
        .income_box{
            width 90%
            margin 0 auto
            background-color #ffffff
            height 150rpx
            box-shadow:0px 1rpx 15rpx 0px rgba(0,0,0,0.08);
            border-radius:12rpx;
            display flex
            align-items center
            justify-content center
            position relative
            .income_box_coin{
                width 49.5%
                height 150rpx
                display flex
                align-content center
                justify-content center
                flex-wrap wrap
                >div{
                    text-align center
                }
                >div:nth-child(1){
                    width 100%
                    font-size 42rpx
                    color #333333
                }
                >div:nth-child(2){
                    width 100%
                    font-size 24rpx
                    color #666666
                }
            }
            .income_box_line{
                width 2rpx

                height 60rpx
                background rgba(1,1,1,1)
                opacity 0.05
            }
            .income_box_cash{
                width 49.5%
                height 150rpx
                display flex
                align-content center
                justify-content center
                flex-wrap wrap
                >div{
                    text-align center
                }
                >div:nth-child(1){
                    width 100%
                    font-size 42rpx
                    color #333333
                }
                >div:nth-child(2){
                    width 100%
                    font-size 24rpx
                    color #666666
                }
            }
        }
        .Sign_in_box{
            width 90%
            margin 50rpx auto 25rpx
            display flex
            align-items center
            justify-content space-between
            .Sign_in_tomorrow{
                color #191919
                font-size 28rpx
                font-family Helvetica
                display flex
                align-items center
                justify-content center
                img{
                    width 35rpx
                    height 35rpx
                }
                span{
                    color rgba(242,71,44,1)
                    margin 0 3rpx
                }
                .problem{
                    width 35rpx
                    height 35rpx
                    display flex
                    align-items center
                    justify-content center
                    line-height normal
                    background-color #D0D0D0
                    border-radius 100%
                    color #ffffff
                }
            }
            .Sign_in_switch{
                display flex
                align-items center
                font-size 24rpx
                color rgba(128,128,128,1)
            }
        }
        .sign_date{
            width 95%
            height 180rpx
            margin-left 4.5%
            .scroll-view-list {
                white-space: nowrap;
                overflow-x: scroll;
                .scroll-view-item {
                    display: inline-block;
                    margin-bottom: 10rpx;
                    height: 180rpx;
                    .scroll-item{
                        width 157rpx
                        flex-shrink 0
                        height 180rpx
                        display flex
                        align-content space-between
                        justify-content center
                        flex-wrap wrap
                        margin-right 20rpx
                        .box_top{
                            width 100%
                            height 128rpx
                            background rgba(255,222,173,1)
                            border-radius 17rpx
                            border 1rpx solid #FF915E
                            display flex
                            align-content flex-start
                            justify-content center
                            flex-wrap wrap
                            position relative
                            .sign_img{
                                position absolute
                                width calc(100% + 2rpx)
                                height calc(100% + 2rpx)
                                top 0rpx
                                left 0rpx
                                border-radius 17rpx
                                display flex
                                align-items center
                                justify-content center
                                /*background-color #ffdeab*/
                                img{
                                    width 50%
                                    height 50%
                                }
                            }
                            .sign_img_four{
                                img{
                                    width 100%
                                    height 100%
                                }
                            }
                            .sign_img_one{
                                img{
                                    width 60%
                                    height 60%
                                }
                            }
                            .sign_num{
                                width 100%
                                margin 24rpx 0 10rpx
                                text-align center
                                font-size 22rpx
                                color rgba(249,82,33,1)
                                font-weight bolder
                            }
                            .sign_type{
                                width 58rpx
                                height 58rpx
                                img{
                                    width 100%
                                    height 100%
                                }
                            }
                        }
                        .box_bottom{
                            width 100%
                            font-size 22rpx
                            height 30rpx
                            line-height 30rpx
                            color #666
                            text-align center
                            img{
                                width 40rpx
                                height 30rpx
                            }
                        }
                    }
                }
                ::-webkit-scrollbar {
                    width: 0;
                    height: 0;
                    color: transparent;}
            }
            ::-webkit-scrollbar {width: 0;
                height: 0;
                color: transparent;}
        }
        ::-webkit-scrollbar {
            width: 0;
            height: 0;
            color: transparent;
        }
        .banner_box{
            width 691rpx
            height 159rpx
            margin 31rpx auto 36rpx
            position relative
            .swiper{
                width 100%
                height 100%
                img{
                    width 100%
                    height 100%
                }
            }
            .dots{
                width 100%
                position absolute
                bottom 11rpx
                display flex
                align-items center
                justify-content center
                div{
                    width 15rpx
                    height 5rpx
                    border-radius: 2.5rpx;
                    background-color #ffffff
                    margin-right 4rpx
                }
            }
        }
        .acitve_box{
            width 90%
            margin 0 auto
            .active_title{
                font-size 34rpx
                color #000
                font-weight 500
                margin-bottom 10rpx
                font-weight bolder
            }
            .active_info{
                width 100%
                display flex
                align-items center
                justify-content space-between
                .active_left{
                    width 325rpx
                    height 180rpx
                    background url($cdnUrl + "wechat/index_bottom_left.png") no-repeat
                    background-size 100% 100%
                    display flex
                    align-items center
                    justify-content center
                    .active_left_introduce{
                        width 90%
                        >div:nth-child(1){
                            font-size 30rpx
                            color #82272C
                            font-weight bolder
                        }
                        >div:nth-child(2){
                            font-size 24rpx
                            color #82272C
                        }
                    }
                }
                .active_right{
                    width 325rpx
                    height 180rpx
                    background url($cdnUrl + "wechat/index_bottom_right.png") no-repeat
                    background-size 100% 100%
                    display flex
                    align-items center
                    justify-content center
                    .active_left_introduce{
                        width 90%
                        >div:nth-child(1){
                            font-size 30rpx
                            color #82272C
                            font-weight bolder
                        }
                        >div:nth-child(2){
                            font-size 24rpx
                            color #82272C
                        }
                    }
                }
            }
        }
        .product_index{
            width 90%
            height 260rpx
            margin 25rpx auto 10rpx
            img{
                width 100%
                height 100%
            }
        }
        .more_content{
            width 100%
            text-align center
            font-size 20rpx
            color #999
            margin 15rpx 0
        }
    }
    .activeLine{
        width 27rpx !important
    }
    .opacityClass{
        opacity 0
    }
    .notBorder{
        border 0 !important
    }
    .get_user{
        width 100%
        height 100%
        top 0
        position absolute
        background-color rgba(0,0,0,0.3)
        display flex
        align-items flex-start
        justify-content center
        .get_userInfo{
            width 80%
            margin-top 400rpx
            background-color #ffffff
            border-radius 20rpx
            /*overflow hidden*/
            position relative
            .login_logo{
                position absolute
                top -50rpx
                width 100%
                height 100rpx
                display flex
                align-items center
                justify-content center
                img{
                    width 100rpx
                    height 100rpx
                    border-radius 100%
                }
            }
            .get_content{
                width 100%
                height 100rpx
                text-align center
                font-size 28rpx
                padding 100rpx 0 50rpx
                color #000
            }
            .get_btn{
                width 100%
                display flex
                align-items center
                justify-content center
                font-size 28rpx
                .not_login{
                    width 50%
                    height 75rpx
                    display flex
                    align-items center
                    justify-content center
                    background-color: #f8f8f8;
                    border-bottom-left-radius 20rpx
                }
                .get_login{
                    width 50%
                    height 75rpx
                    display flex
                    align-items center
                    justify-content center
                    font-size 28rpx
                    background-color: #07c160;
                    color #ffffff
                    border-radius 0
                    border-bottom-right-radius 20rpx
                }
                .get_login::after{
                    border 0 !important
                }
    }
        }
    }
</style>
