<template>
    <div class="receive_box">
<!--        //没费领免广告-->
        <div class="receive_box_one" v-show="type == 1">
            <div class="freeReceiveBtnOne"></div>
            <div class="freeReceiveBtn" @click="addInviterEquity(6)"></div>
        </div>
        <!--        //成功领取  退出重新进入电视家即可领取-->
        <div v-show="type == 2" class="receive_success_two">
            <div class="receive_box_two" ></div>
            <button open-type="share" class="freeReceiveBtnTwo"></button>
        </div>
        <!--        //  分享好友再领取-->
        <div v-show="type == 3" class="receive_success_three">
            <div class="receive_box_three" ></div>
            <button open-type="share" class="freeReceiveBtnThree"></button>
        </div>
        <!--        //  正在享受免广告-->
        <div v-show="type == 4" class="receive_success_four">
            <div class="receive_box_four" ></div>
            <button open-type="share" class="freeReceiveBtnFour"></button>
        </div>
        <!--        又领了1天免广告-->
        <div v-show="type == 5" class="receive_success_five">
            <div class="receive_box_five" ></div>
            <button open-type="share" class="freeReceiveBtnFive"></button>
        </div>
        <!--        权益内领取完-->
        <div v-show="type == 6" class="receive_success_six">
            <div class="receive_box_six" ></div>
            <button open-type="share" class="freeReceiveBtnSix"></button>
        </div>
    </div>

</template>

<script>
    import {addInviterEquity} from "@/utils/api"
    import util from "@/utils/util"
    export default {
        data() {
            return {
                type: "",
            };
        },
        mounted(){
            this.type=this.$store.state.freeType
            this.$store.commit("shareNum",0)
        },
        methods: {
            addInviterEquity(type){
                let _this=this
                //type 1-7天 2-1越 3-3月 4-6月 5-1年 6-3天 7-1天
                let nowType = this.$store.state.freeType
                if(nowType == 3||nowType == 6||nowType == 5)return
                if(type == 7){
                    if(this.$store.state.shareNum == 0){
                        this.$store.state.shareNum++
                        this.$store.commit("shareNum", this.$store.state.shareNum++)
                        setTimeout(()=>{
                            wx.showToast({
                                title: "分享失败，请分享到不同群",
                                icon:"none"
                            });
                        },1000)
                        return
                    }
                }else{
                    wx.reportAnalytics('free_receive', {
                        receive_num: 1,
                        user_id:_this.$store.state.userId,
                    });
                }
                let headers = {
                    oid: this.$store.state.openId,
                    uid: this.$store.state.unionId,
                    type: type,
                    sign: util.md5(type + this.$store.state.unionId + this.$store.state.openId + util.salt)
                }
                addInviterEquity(headers).then(res => {
                    if(res.data.errCode == 0){
                        if(this.$store.state.freeType == 4){ //进来是在权益中  领取成功就去
                            setTimeout(()=>{
                                this.type = 5
                                this.$store.commit("freeType",this.type)
                            },2000)
                            return
                        }
                        if(this.$store.state.freeType == 1){
                            setTimeout(()=>{
                                this.type = 2
                                this.$store.commit("freeType",this.type)
                            },2000)
                            return
                        }
                        if(this.$store.state.freeType == 2){
                            setTimeout(()=>{
                                this.type = 3
                                this.$store.commit("freeType",this.type)
                            },2000)
                            return
                        }
                    }else if(res.data.errCode == 206){
                        let goType = this.$store.state.freeType
                        if(goType == 4 || goType == 5|| goType == 1|| goType == 2){
                            setTimeout(()=>{
                                this.type = 6
                                this.$store.commit("freeType",this.type)
                            },2000)
                            return
                        }
                    }
                })
            }
        },
        onShareAppMessage(ops) {
            let _this=this
            if (ops.from === "button") {
                // 来自页面内转发按钮
                this.addInviterEquity(7)
                wx.reportAnalytics('share_friends', {
                    share_num: 1,
                    user_id: _this.$store.state.userId,
                });
            }
            return {
                title: "快来电视家和我一起领免广告特权吧",//这里是定义转发的标题
                path: "pages/index/main",//这里是定义转发的地址
                imageUrl: "http://cdn.dianshihome.com/wechat/shareBackImg.png", // 可以更换分享的图片
                success: function(res) {
                    // 转发成功
                    // console.log("转发成功:" + JSON.stringify(res));
                },
                fail: function(res) {
                    // 转发失败
                    // console.log("转发失败:" + JSON.stringify(res));
                }
            };
        },
    };
</script>
<style scoped lang="stylus">
    /* 顶部滚动导航栏 */
    .receive_box{
        width 100%
        min-height 100%
        position absolute
        background url($cdnUrl + "wechat/receiveBack.jpg")  no-repeat
        background-size 100% 100%
        .receive_box_one{
            width 100%
            height 1159rpx
            background url($cdnUrl + "wechat/freeReceiveBack.png")  no-repeat
            background-size 100% 100%
            position absolute
            bottom 0
            .freeReceiveBtn{
                width 95%
                height 176.1rpx
                background url($cdnUrl + "wechat/todayGotIt.gif")  no-repeat
                background-size 100% 100%
                position absolute
                bottom 20rpx
                left 2.5%
            }
        }
        .receive_success_two{
            width 100%
            margin-top 208rpx
            .receive_box_two{
                width 666rpx
                height 855rpx
                background url($cdnUrl+"/wechat/sucessFreeOne.png") no-repeat
                background-size 100% 100%
                margin 0 auto
            }
            .freeReceiveBtnTwo{
                width 96%
                height 176.1rpx
                background url($cdnUrl + "wechat/shareFriends.gif") no-repeat
                background-size 100% 100%
                position relative
                left 0
                top -45rpx
            }
        } .receive_success_three{
            width 100%
            margin-top 208rpx
            .receive_box_three{
                width 666rpx
                height 855rpx
                background url($cdnUrl+"/wechat/todayGotIt.png") no-repeat
                background-size 100% 100%
                margin 0 auto
            }
            .freeReceiveBtnThree{
                width 96%
                height 176.1rpx
                background url($cdnUrl + "wechat/shareFriends.gif") no-repeat
                background-size 100% 100%
                position relative
                left 0
                top -45rpx
            }
        }
        .receive_success_four{
            width 100%
            margin-top 276rpx
            .receive_box_four{
                width 657rpx
                height 600rpx
                background url($cdnUrl+"/wechat/enjoyFree.png") no-repeat
                background-size 100% 100%
                margin 0 auto
            }
            .freeReceiveBtnFour{
                width 96%
                height 176.1rpx
                background url($cdnUrl + "wechat/shareRightNow.gif") no-repeat
                background-size 100% 100%
                margin 108rpx auto 0
            }
        }
        .receive_success_five{
            width 100%
            margin-top 276rpx
            .receive_box_five{
                width 657rpx
                height 600rpx
                background url($cdnUrl+"/wechat/againFree.png") no-repeat
                background-size 100% 100%
                margin 0 auto
            }
            .freeReceiveBtnFive{
                width 96%
                height 176.1rpx
                background url($cdnUrl + "wechat/shareRightNow.gif") no-repeat
                background-size 100% 100%
                margin 108rpx auto 0
            }
        }
        .receive_success_six{
            width 100%
            margin-top 276rpx
            .receive_box_six{
                width 657rpx
                height 600rpx
                background url($cdnUrl+"/wechat/todayHasGot.png") no-repeat
                background-size 100% 100%
                margin 0 auto
            }
            .freeReceiveBtnSix{
                width 96%
                height 176.1rpx
                background url($cdnUrl + "wechat/shareRightNow.gif") no-repeat
                background-size 100% 100%
                margin 108rpx auto 0
            }
        }

    }
    button::after{
        border 0 !important
    }
</style>
