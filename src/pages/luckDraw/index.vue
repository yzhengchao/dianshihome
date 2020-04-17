<template>
    <div class="luck_page">
        <div class="top_img"></div>
        <div class="luck_box">
            <!--        公告蓝-->
            <swiperLuck :luckPerson="luckPerson" sHeight="52rpx"></swiperLuck>
            <div class="luck_content">
                <lottery ref="lottery" @getlotteryPosition = "getlotteryPosition" :prizeBox="prizeBox"  @changeLuckBox="changeLuckBox"></lottery>
            </div>
        </div>
        <div class="luck_introduce">
            <div class="luck_ruler" @click="openRuler(showToastRuler,2)">活动规则</div>
            <div class="luck_check" @click="openRuler(showToastRuler,3)">奖励查询</div>
        </div>
        <!--        中奖弹窗-->
        <div class="mask_luck" v-if="showLuckMask">
            <div class="center_box">
                <div class="luck_content" :class="{get_fail:userWinning==2,get_success:userWinning==1}">
                    <div class="luck_prize"><img :src="winningPrize.picUrl" alt=""></div>
<!--                    <div class="luck_prize" v-if="winningPrize.skuCode.indexOf('mgz') != -1"><img :src="winningPrize.picUrl" alt=""></div>-->
<!--                    <div class="luck_prize luck_prize_new" v-if="winningPrize.skuCode.indexOf('jb') != -1"><img :src="winningPrize.picUrl" alt=""></div>-->
                    <div class="luck_words" >{{winningPrize.name}}</div>
                </div>
                <div class="luck_close" @click="showLuckMask = false"></div>
            </div>
        </div>
        <toastRuler v-if="showToastRuler" :showToastRuler="showToastRuler" :prizeBox="prizeBox" @openRuler="openRuler" :rulerType="rulerType" :recordList="recordList"></toastRuler>
    </div>

</template>

<script>
    import lottery from '@/components/luck-draw';
    import swiperLuck from '@/components/swiperLuck';
    import store from '../../store'
    import {getPrizeInfo,getRecord,getTurntableAttend} from "@/utils/api"
    import toastRuler from "../../components/toastRuler";
    export default {
        components:{
            lottery,  //抽奖组件
            swiperLuck, //公告
            toastRuler
        },
        data() {
            return {
                prizeBox:[], //奖品列表图片
                luckPerson:[],
                showLuckMask:false,
                platform:"4", //那个终端用户  1微信  4 ios和android
                acode:"xcx_choujiang",//活动编码
                showToastRuler:false,
                rulerType:"",
                recordList:"",//中奖记录列表
                winningPrize:{//抽中的奖品
                    picUrl:""
                },
                userWinning:0
            };
        },
        created(){

        },
        mounted(){
            this.getPrizeInfo()
            this.getRecord("all")
        },
        methods: {
            openRuler(showToastRuler,type){
                this.showToastRuler = !showToastRuler
                this.rulerType=type
            },
            getlotteryPosition(){ //抽奖
                let that = this;
                //模拟网络请求时间
                let parmas={
                    userid:this.$store.state.userId,
                    platform: this.platform,
                    acode: this.acode,
                }
                getTurntableAttend(parmas).then(res => {
                    wx.reportAnalytics('luck_draw', {
                        luck_draw: 1,
                        user_id: this.$store.state.userId,
                    });
                   if(res.errCode == 0){
                       if(res.data.winning == 1){ //1中奖 2未中奖
                           this.userWinning = res.data.winning
                           this.winningPrize = res.data.prize
                           // res.dat=
                           let indexPrize= this.prizeBox.products.findIndex(item => {
                               return item.skuCode == this.winningPrize.skuCode;
                           });
                           setTimeout(()=> {
                               // 中奖位置
                               that.$refs.lottery.stop(indexPrize + 1);
                           }, 1000);
                       }else{
                           this.userWinning = res.data.winning //没中奖
                           this.winningPrize={
                               picUrl:"http://cdn.dianshihome.com/wechat/cryForFail.png",
                               name:"很遗憾，本次没有抽中奖品"
                           }
                           setTimeout(()=> {
                               this.showLuckMask = true
                               // 中奖位置
                               that.$refs.lottery.stop(0);
                           }, 1000);
                       }
                   }else{
                       wx.showToast({
                           title:res.msg,
                           icon:'none'
                       })
                   }
                })
            },
            changeLuckBox(data){
                this.showLuckMask = data.showLuckMask
                this.lotteryCount=data.lotteryCount
                if(!!this.showLuckMask){
                    this.getRecord("single")
                }
            },
            getPrizeInfo(){
                let parmas = {
                    userid:this.$store.state.userId,
                    // userid:"c8a639ef838e602cdf0927c258c9178a",
                    platform: this.platform,
                    acode: this.acode,
                }
                getPrizeInfo(parmas).then(res => {
                    if(res.errCode == 0){
                        this.prizeBox = res.data
                    }
                })
            },
            getRecord(type){
                let param2 = {
                    userid: this.$store.state.userId,
                    // userid:"c8a639ef838e602cdf0927c258c9178a",
                    winning: 1,
                    acode: this.acode,
                };
                getRecord(param2).then(res => {
                    if(res.errCode == 0){
                        this.recordList = res.data
                    }
                })
                // if(type == "single") return
                let parmas = {
                    winning: 1,
                    acode: this.acode,
                }
                getRecord(parmas).then(res => {
                    if(res.errCode == 0){
                        this.luckPerson = res.data
                    }
                })

            },
        }
    };
</script>
<style scoped lang="stylus">
    /* 顶部滚动导航栏 */
    .luck_page{
        width 100%
        min-height 100%
        position absolute
        background url($cdnUrl + "wechat/backGroundLuck.jpg")  no-repeat
        background-size cover
        .top_img{
            width 633rpx
            height 184rpx
            background url($cdnUrl + "wechat/luckTitle.png")  no-repeat
            background-size contain
            margin 55rpx auto 180rpx
        }
        .luck_box{
            width 690rpx
            height 715rpx
            margin 0 auto
            position relative
            background url($cdnUrl + "wechat/luckBox.png")  no-repeat
            background-size contain
            .luck_content{
                width 594rpx
                height 383rpx
                padding-top 135rpx
                margin 0 auto
            }

        }
        .luck_introduce{
            width 85%
            margin 15rpx auto
            font-size:24rpx;
            color:rgba(255,255,255,1)
            display flex
            align-items center
            justify-content space-between
            .luck_ruler{
                display flex
                align-items center
                justify-content center
                text-decoration:underline
            }
            .luck_ruler::before {
                content: " ";
                display: block;
                height: 28rpx;
                width: 28rpx;
                margin-right 5rpx
                background: url($cdnUrl + "wechat/luckRuler.png") no-repeat;
                background-size: 100%;
            }
            .luck_check{
                display flex
                align-items center
                justify-content center
                text-decoration:underline
            }
            .luck_check::before {
                content: " ";
                display: block;
                height: 28rpx;
                width: 28rpx;
                margin-right 5rpx
                background: url($cdnUrl + "wechat/luckGift.png") no-repeat;
                background-size: 100%;
            }
        }
        .mask_luck{
            width 100%
            min-height 100%
            background-color rgba(0,0,0,0.6)
            position absolute
            top 0
            z-index 999
            display flex
            align-items center
            justify-content center
            .center_box{
                width 575rpx
                display flex
                align-content  flex-start
                justify-content center
                flex-wrap wrap
               .luck_content{
                   width 100%
                   height 546rpx
                   margin-bottom 48rpx
                   .luck_prize{
                       width 460rpx
                       height 240rpx
                       margin 172rpx auto 0rpx
                       img{
                           width 100%
                           height 100%
                       }
                   }
                   .luck_prize_new{
                       height 260rpx
                   }
                   .luck_words{
                       width 100%
                       text-align center
                       font-size:30rpx;
                       color:rgba(170,6,6,1);
                   }
               }
                .luck_close{
                    width 64rpx
                    height 64rpx
                    background: url($cdnUrl + "wechat/closePrize.png") no-repeat;
                    background-size: 100%;
                }
            }
        }
    }
    .get_fail{
        background: url($cdnUrl + "wechat/getFail.png") no-repeat !important;
        background-size: 100% !important;
        .luck_prize{
            display flex !important
            align-items flex-end !important
            justify-content center !important
            img{
                width 184rpx !important
                height 112rpx !important
                margin 0 auto 60rpx !important
            }
        }
    }
    .get_success{
        background: url($cdnUrl + "wechat/gotPrize.png") no-repeat !important;
        background-size: 100% !important;
        .luck_prize{
            width 460rpx !important;
            height 240rpx !important;
            margin 172rpx auto 0rpx !important;
            img{
                width 100% !important;
                height 100% !important;
            }
        }
    }
</style>
