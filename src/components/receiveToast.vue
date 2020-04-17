<template>
    <div class="toast_box" :class="{isDown:showToast,isUp:!showToast}" catchtouchmove='true'>
        <div class="close_img" @click="changeToast"></div>
        <div class="toast_content">
<!--            金币-->
<!--            <div class="toast_content_title">恭喜你领取成功</div>-->
            <div class="toast_content_gift" v-if="getPrice.rewardsType == 0">
                <div class="toast_content_gift_num">{{getPrice.price}}</div>
                <div class="toast_content_gift_money">{{getPrice.name}}</div>
            </div>
<!--            大额金币-->
            <div class="toast_content_gift" v-if="getPrice.rewardsType == 3">
                <div class="toast_content_gift_num">{{getPrice.price}}</div>
                <div class="toast_content_gift_money">金币</div>
            </div>
<!--            免广告-->
            <div class="toast_content_gift" v-if="getPrice.rewardsType == 1">
                <div class="toast_content_gift_num">{{getPrice.count}}天</div>
                <div class="toast_content_gift_money">免广告</div>
            </div>
<!--            额度-->
            <div class="toast_content_gift" v-if="getPrice.rewardsType == 4">
                <div class="toast_content_gift_num_new"><div>{{getPrice.count/100 + '元额度'}}</div></div>
<!--                <div class="toast_content_gift_money">{{getPrice.name}}</div>-->
            </div>
            <div class="conDay_div">你已经连续签到{{priceBox.conDay}}天</div>
            <div class="price_string">{{priceAll}}</div>
            <div class="toast_content_button" @click="changeToast">确定</div>
<!--            <div class="toast_content_button">最高再领999金</div>-->
<!--            <button class="toast_content_button" open-type="share">炫耀一下</button>-->
<!--            <div class="toast_content_next" @click="changeToast">下次再说</div>-->
        </div>
    </div>
</template>
<script>
    import store from '../store'
export default {
    props:{
        getPrice:{
            type:Object
        },
        priceBox:{
            type:Object
        }
    },
    data(){
        return{
            priceAll:""
        }
    },
    mounted(){
        let priceArr=[]
        this.priceBox.reward.forEach((r,i)=>{
            if(r.rewardsType == 0 || r.rewardsType == 3){
                priceArr.push(this.priceAll + r.count + "金币")
            }else if(r.rewardsType == 1){
                priceArr.push(this.priceAll +r.count+"天免广告")
            }else if(r.rewardsType == 4){
                priceArr.push(this.priceAll +r.count/100+"元额度")
            }
        })
        this.priceAll ="恭喜你获得"+priceArr.join("，")
    },
    methods:{
        changeToast(){
            store.commit("showToast",false)
        },
        onShareAppMessage (res){
            let that=this;
            if (res.from === 'button') {
                // 来自页面内转发按钮
                return{
                    title:"我在电视家福利吧领取了999金币！",
                    path: "/pages/index/main"
                }
            }else{
                return {
                    title: "我在电视家福利吧领取了999金币！",
                    path: "/pages/index/main"
                }
            }
        },
    },
    watch:{

    }
}
</script>
<style lang="stylus" scoped>
.toast_box
    width 100%
    height 100%
    background-color rgba(0,0,0,1)
    position absolute
    color #fff
    display flex
    top 0
    /*align-items center*/
    justify-content center
    overflow hidden
    .close_img
        position absolute
        top 130rpx
        right 64rpx
        width 36rpx
        height 36rpx
        background url($cdnUrl + "wechat/closeToast.png")  no-repeat
        background-size contain
    .toast_content
        width 100%
        margin-top 320rpx
        .toast_content_title
            width 100%
            text-align center
            font-size:40rpx;
            font-weight:600
            color:rgba(255,255,255,1);
        .toast_content_gift
            width 300rpx
            height 202rpx
            margin 0 auto
            background url($cdnUrl + "wechat/signIn.png")  no-repeat
            background-size 100% 100%
            display flex
            align-content  center
            justify-content center
            flex-wrap wrap
            .toast_content_gift_num{
                width 100%;
                text-align center
                margin-top 20rpx
                margin-left 10rpx
                font-size 36rpx
            }
            .toast_content_gift_num_new{
                width 100%
                height 100%
                display flex
                align-items center
                justify-content center
                div{
                    margin-top 20rpx
                }
            }
            .toast_content_gift_money{
                width 100%;
                text-align center
                margin-left 10rpx
                font-size 34rpx
            }
        .toast_content_gift_new{
            width 100%
            .toast_content_gift_num{
                width 300rpx
                height 202rpx
                margin 0 auto
                img{
                    width 100%
                    height 100%
                }
            }
            .toast_content_gift_num_four{
                width 250rpx
                height 220rpx
                margin 50rpx auto
                img{
                    width 100%
                    height 100%
                }
            }
        }
        .conDay_div{
            width 100%
            font-size 24rpx
            color #ccc
            text-align center
            margin 20rpx 0
        }
        .price_string{
            width 80%
            font-size 32rpx
            color #fff
            text-align center
            margin 0rpx auto
        }
        .toast_content_button{
            width 416rpx
            height 95rpx
            margin 55rpx auto 0
            background url($cdnUrl + "wechat/receive.png")  no-repeat
            background-size contain
            display flex
            align-items center
            justify-content center
            font-size:32rpx;
            font-weight:500;
            color:rgba(211,68,6,1);
        }
        .toast_content_next{
            width 100%
            font-size 28rpx
            color:rgba(255,155,20,1);
            text-align center
            margin-top 20rpx
        }


</style>


