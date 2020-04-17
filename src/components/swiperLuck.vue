
<template>
    <div class="luck_swiper">
        <swiper class="swiper" :style="{height:sHeight}" indicator-active-color="#fff" indicator-color="#000"  :vertical="vertical" :circular="circular"  :interval="5000" :duration="duration" :autoplay='autoplay'>
            <block v-for="(item,index) in luckPerson" :key="index">
                <swiper-item class="">
                    <view class="luck_person">恭喜 <view class="luck_person_name">{{item.userName}}</view> 获得 {{item.prizeName}}</view>
                </swiper-item>
            </block>
        </swiper>
    </div>
</template>

<script>
    export default {
        data(){
            return{
                autoplay:true,
                duration:1000,
                circular:true,
                vertical:true
            }
        },
        props:{
            luckPerson: {
                type: Array,
                value: []
            },
            sHeight: {
                type: String,
                value: ''
            }
        }
    };
</script>

<style scoped lang="stylus">
    .luck_swiper{
        width 100%
        font-size 26rpx
        position absolute
        top 25rpx
        color:rgba(75,50,0,1);
    }
    .swiper{
        width 560rpx
        margin 0 auto
        display flex
        justify-content center
        align-items center
        .luck_person{
            height 100%
            display flex
            align-items center
            justify-content flex-start
            white-space: nowrap;
            .luck_person_name{
                max-width 300rpx
                overflow: hidden;
                text-overflow:ellipsis;
                white-space: nowrap;
            }
        }

    }
    .swiper::before{
        content: " ";
        display: block;
        height: 34rpx;
        width: 29rpx;
        margin 15rpx 15rpx 0 30rpx
        background: url($cdnUrl + "wechat/noticeLuck.png") no-repeat;
        background-size: 100%;
    }
</style>
