<template>
    <div class="ruler">
        <transition>
            <div class="ruler_box" v-if="rulerType == '1' && showToastRuler">
                <div class="ruler_content">
                    <div class="ruler_content_title">签到规则</div>
                    <div class="ruler_content_info">
                        1. 签到可以得到金币，获得金币的数量以页面显示为准<br/>
                        2. 连续签到可得更多惊喜（权益不固定，以实际得到的权益为准），若签到中断则从第一天开始开始计算<br/>
                        3. 活动过程中，如用户出现违规行为，电视家将收回违规用户的全部金币，必要时追究法律责任，活动最终解释权归电视家所有
                    </div>
                </div>
                <div class="ruler_close" @click="closeRuler"><div></div></div>
            </div>
            <div class="ruler_box ruler_box_new" v-if="rulerType == '2' && showToastRuler">
                <div class="ruler_content ruler_content_new">
                    <div class="ruler_content_title">抽奖规则</div>
                    <div class="ruler_content_info">
                        1.每个达到参与条件的用户获得{{prizeBox.acquiredCount}}次转盘机会<br/>
                        2.参与转盘的用户将获得对应奖品<br/>
                        3.虚拟奖品（如金币，免广告）等将会直接发放到您的账号中<br/>
                        4.本活动最终解释权归电视家所有<br/>
                    </div>
                </div>
                <div class="ruler_close" @click="closeRuler"><div></div></div>
            </div>
            <div class="ruler_box" v-if="rulerType == '3' && showToastRuler">
                <div class="ruler_content">
                    <div class="ruler_content_title ruler_content_title_prize">奖励查询</div>
                    <div class="prize_introduce">
                        <div>奖品</div>
<!--                        <div>时间</div>-->
                    </div>
                    <div class="ruler_content_info .ruler_content_info_new">
                        <div class="prize_every" v-for="(item ,index) in recordList" :key="index">
                            <div>{{item.prizeName}}</div>
<!--                            <div>{{item.attendTime}}</div>-->
                        </div>
                    </div>
                </div>
                <div class="ruler_close" @click="closeRuler"><div></div></div>
            </div>
        </transition>
    </div>
</template>
<script>
    import util from "../utils/util";
export default {
    props:{
        showToastRuler:{
            type:Boolean
        },
        rulerType:{
            type:Number
        },
        recordList:{
            type:Array
        },
        prizeBox:{
            type:Object
        }
    },
    data(){
        return{
            prizeList:""
        }
    },
    mounted(){
        if(!!this.recordList){
            this.recordList.forEach(r=>{
                if(r.attendTime == 0)return
                r.attendTime = util.formatTime(r.attendTime)
            })
        }
    },
    methods:{
        closeRuler(){
            this.$emit("openRuler",this.showToastRuler)
        }
    },
    watch:{
    }
}
</script>
<style lang="stylus" scoped>
    .v-enter,
    .v-leave-to{
        opacity: 0;
        transform: translateX(100px);
    }
    .v-enter-active,
    .v-leave-active{
        transition: all 4s ease;
    }
    .ruler{
        width 100%
        height 100%
        position absolute
        top 0
        left 0
        background-color:rgba(0,0,0,0.8);
        display flex
        justify-content center
        z-index 999
        .ruler_box{
            width 560rpx
            /*height 740rpx*/
            margin-top 300rpx
            display flex
            align-content space-between
            justify-content center
            flex-wrap wrap
            .ruler_content{
                width 560rpx
                /*height 640rpx*/
                background-color #ffffff
                border-radius 28rpx
                .ruler_content_title{
                    width 100%
                    height 200rpx
                    background url($cdnUrl + "wechat/ruler_title.png") no-repeat
                    background-size 100% 100%
                    font-size 34rpx
                    display flex
                    align-items center
                    justify-content center
                    color #ffffff
                }
                .prize_introduce{
                    width 500rpx
                    margin 0 auto
                    display flex
                    align-items center
                    justify-content center
                    height 40rpx
                    div{
                        width 50%
                        height 40rpx
                        line-height 40rpx
                        margin-bottom 10rpx
                        color #191919
                        font-size 30rpx
                        font-weight bolder
                        text-align center
                    }
                }
                .ruler_content_title_prize{
                    background url($cdnUrl + "wechat/ruler_title_new.png") no-repeat
                    background-size 100% 100%
                }
                .ruler_content_info{
                    width 500rpx
                    margin 0 auto
                    color #191919
                    font-size 24rpx
                    font-weight bolder
                    letter-spacing 1rpx
                    line-height 42rpx
                    padding-bottom 20rpx
                    .prize_every{
                        width 100%
                        display flex
                        align-items center
                        justify-content center
                        div{
                            width 50%
                            margin-bottom 10rpx
                            color #191919
                            font-size 24rpx
                            text-align center
                            overflow hidden/*超出部分隐藏*/
                            white-space nowrap/*不换行*/
                            text-overflow ellipsis/*超出部分文字以...显示*/
                        }
                    }
                }
                .ruler_content_info_new{
                    height 400rpx
                    overflow-y scroll
                }
                .ruler_content_info::-webkit-scrollbar {
                    display: none;
                }
            }

            .ruler_close{
                width 100%
                height 50rpx
                margin-top 50rpx
                div{
                    width 50rpx
                    height 50rpx
                    margin 0 auto
                    background url($cdnUrl + "wechat/ruler_close.png") no-repeat
                    background-size 100% 100%
                }
             }
        }
        .ruler_box_new{
            /*height 880rpx*/
            margin-top 300rpx
            .ruler_content_new{
                /*height 770rpx*/
            }
        }
    }
</style>


