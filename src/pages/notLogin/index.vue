<template>
    <div class="login_box">
        <div class="notice_word">非常抱歉，您尚未登录过电视家</div>
        <div class="notice_path">前往电视家手机版登录</div>
        <div class="login_enjoy">
            <div class="login_enjoy_title">
                <div class="haveBack">登录立享</div>
            </div>
            <div class="login_enjoy_content">
                <div class="every_box">
                    <div class="every_icon"></div>
                    <div class="every_name">专享频道</div>
                </div>
                <div class="every_box">
                    <div class="every_icon"></div>
                    <div class="every_name">免广告</div>
                </div>
                <div class="every_box">
                    <div class="every_icon"></div>
                    <div class="every_name">金币提现</div>
                </div>
                <div class="every_box">
                    <div class="every_icon"></div>
                    <div class="every_name">百万金币</div>
                </div>
                <div class="every_box">
                    <div class="every_icon"></div>
                    <div class="every_name">睡觉赚钱</div>
                </div>
                <div class="every_box">
                    <div class="every_icon"></div>
                    <div class="every_name">走路赚钱</div>
                </div>
            </div>
        </div>
    </div>

</template>

<script>
    // import swiperLuck from '@/components/swiperLuck';
    export default {

        data() {
            return {
            };
        },
        mounted(){

        },
        methods: {
        }
    };
</script>
<style scoped lang="stylus">
    /* 顶部滚动导航栏 */
    .login_box{
        width 100%
        min-height 100%
        position absolute
        background url($cdnUrl + "wechat/login_back.jpg")  no-repeat
        background-size 100% 100%
        .notice_word{
            text-align center
            margin 110rpx 0 22rpx
            font-size 34rpx
            color rgba(255,255,255,1)

        }
        .notice_path{
            font-size 42rpx
            text-align center
            color rgba(255,255,255,1)
            margin-bottom 105rpx
        }
        .login_enjoy{
            width 710rpx
            height 766rpx
            margin 0 auto
            background url($cdnUrl + "wechat/login_centenr.png")  no-repeat
            background-size 100% 100%
            .login_enjoy_title{
                width 80%
                height 140rpx
                margin 0 auto
                border-bottom 1rpx dashed #979797
                display flex
                align-items center
                justify-content center
                font-size 40rpx
                color: #063967;
                .haveBack{
                    width 296rpx
                    height 30rpx
                    background url($cdnUrl + "wechat/title_login.png")  no-repeat
                    background-size 100% 100%
                    display flex
                    align-items center
                    justify-content center
                    line-height normal
                }
            }
            .login_enjoy_content{
                width 92%
                margin 0 auto
                display flex
                align-items center
                justify-content space-around
                flex-wrap wrap
                .every_box{
                    width calc(100% /3)
                    /*height 95rpx*/
                    display flex
                    justify-content center
                    flex-wrap wrap
                    div{
                        margin 60rpx 0 12rpx
                    }
                    div:nth-child(1){
                        width 95rpx
                        height 95rpx
                        background url($cdnUrl + "wechat/tv_login.png")  no-repeat
                        background-size 100% 100%
                    }
                    div:nth-child(2){
                        width 100%
                        color #092034
                        font-size 26rpx
                        text-align center
                        margin 0
                    }
                }
                .every_box:nth-child(2){
                    div:nth-child(1){
                        background url($cdnUrl + "wechat/skip_login.png")  no-repeat
                        background-size 100% 100%
                    }

                }
                .every_box:nth-child(3){
                    div:nth-child(1){
                        background url($cdnUrl + "wechat/cash_login.png")  no-repeat
                        background-size 100% 100%
                    }

                }
                .every_box:nth-child(4){
                    div:nth-child(1){
                        background url($cdnUrl + "wechat/gold_login.png")  no-repeat
                        background-size 100% 100%
                    }

                }
                .every_box:nth-child(5){
                    div:nth-child(1){
                        background url($cdnUrl + "wechat/sleep_login.png")  no-repeat
                        background-size 100% 100%
                    }

                }
                .every_box:nth-child(6){
                    div:nth-child(1){
                        background url($cdnUrl + "wechat/walk_login.png")  no-repeat
                        background-size 100% 100%
                    }

                }
            }
        }
    }
</style>
