
<template>
    <div class="container" :style="{width:width,height:height}">
        <!-- 背景图 -->
        <image :src="backgroundImageUrl" model="aspectFill" class="background_image" v-if="backgroundImageUrl"></image>
        <!-- 九宫格 -->
        <div class='sudoku'>
            <div class="square" :style="{backgroundColor:activatedColorIndex==1?'#fff382':'#fff',width:squareWidth,height:squareHeight,marginLeft:squareMarginLeft,marginBottom:squareMarginBottom}">
                <img :src="prizeImages[0].picUrl" model="aspcetFit"></img>
                <div>{{prizeImages[0].name}}</div>
            </div>
            <div class="square" :style="{backgroundColor:activatedColorIndex==2?'#fff382': '#fff',width:squareWidth,height:squareHeight,marginLeft:squareMarginLeft,marginBottom:squareMarginBottom}">
                <img :src="prizeImages[1].picUrl" model="aspcetFit"></img>
                <div>{{prizeImages[1].name}}</div>
            </div>
            <div class="square" :style="{backgroundColor:activatedColorIndex==3?'#fff382': '#fff',width:squareWidth,height:squareHeight,marginLeft:squareMarginLeft,marginBottom:squareMarginBottom}">
                <img :src="prizeImages[2].picUrl" model="aspcetFit"></img>
                <div>{{prizeImages[2].name}}</div>
            </div>
            <div class="square" :style="{backgroundColor:activatedColorIndex==6?'#fff382': '#fff',width:squareWidth,height:squareHeight,marginLeft:squareMarginLeft,marginBottom:squareMarginBottom}">
                <img :src="prizeImages[5].picUrl" model="aspcetFit"></img>
                <div>{{prizeImages[5].name}}</div>
            </div>

            <div class="square" :style="{backgroundColor:activatedColorIndex==5?'#fff382': '#fff',width:squareWidth,height:squareHeight,marginLeft:squareMarginLeft,marginBottom:squareMarginBottom}">
                <img :src="prizeImages[4].picUrl" model="aspcetFit"></img>
                <div>{{prizeImages[4].name}}</div>
            </div>
            <div class="square" :style="{backgroundColor:activatedColorIndex==4?'#fff382':'#fff',width:squareWidth,height:squareHeight,marginLeft:squareMarginLeft,marginBottom:squareMarginBottom}">
                <img :src="prizeImages[3].picUrl" model="aspcetFit"></img>
                <div>{{prizeImages[3].name}}</div>
            </div>
        </div>
        <div @click="clickLuck" class="luck_start"><div>开始抽奖</div></div>
        <div class="luck_surplus">今日剩余 {{lotteryCount}} / {{prizeBox.acquiredCount}}</div>

    </div>
</template>

<script>
    /*
     * @Author: wujiayi
     * @Date: 2019-08-19
     * @Last Modified by: wujiayi
     * @Last Modified time: 2019-08-19
     */

    //定时器
    let interval = null;
    let timer = null;
    //九宫格旋转速度，值越大速度越慢
    let rotationalSpeed = 23;
    export default {
        props:{
            width:{ //九宫格容器宽度
                type:String,
                default:'100%',
            },
            height:{ //九宫格容器高度
                type:String,
                default:'100%',
            },
            backgroundImageUrl:{ //九宫格容器背景图片
                type:String,
                default:'',
            },
            squareWidth:{ //九宫格格子宽度
                type:String,
                default:'184rpx',
            },
            squareHeight:{ //九宫格格子高度
                type:String,
                default:'160rpx',
            },
            squareMarginLeft:{ //九宫格格子左边距
                type:String,
                default:'10rpx',
            },
            squareMarginBottom:{ //九宫格格子下边距
                type:String,
                default:'20rpx',
            },
            prizeBox:{ //奖品列表图片
                type:Array,
            },
        },

        data() {
            return {
                activatedColorIndex: -1, //当前位置选中状态
                btnDisabled:false,//抽奖按钮是否可以点击
                startGame:false,//是否正在抽奖
                prizeImages:"",
                lotteryCount:"" //抽奖次数
            };
        },
        mounted(){
            // this.prizeImages = this.prizeBox.products
        },
        methods: {
            //点击抽奖按钮
            clickLuck() {
                let that = this;
                //判断是否可以点击抽奖按钮
                if (that.lotteryCount<=0) {
                    mpvue.showToast({
                        title:'次数不足',
                        icon:'none'
                    })
                    return
                }
                if (this.btnDisabled) {
                    return
                }
                this.btnDisabled = !this.btnDisabled;
                this.startGame = true;
                --that.lotteryCount;
                interval && clearInterval(interval);
                // 九宫格旋转(设置当前位置选中状态)
                let index = 0;
                interval = setInterval(function() {
                    if (index > 6) {
                        index = 0;
                    }
                    that.activatedColorIndex = index;
                    index++;
                }, rotationalSpeed);
                that.$emit('getlotteryPosition')
            },
            // 九宫格旋转减速
            stop(lotteryPosition) {
                let that = this;
                interval && clearInterval(interval);
                let currentIndex = that.activatedColorIndex + 1;
                that.stopLuck(lotteryPosition, currentIndex, rotationalSpeed, 30);
            },

            /**
             * lotteryPosition:中奖位置
             * currentIndex:当前选中位置
             * speed：九宫格旋转速度
             * stepTime：每次增加的旋转时间 值越大旋转速度越慢
             */
            stopLuck(lotteryPosition, currentIndex, speed, stepTime) {
                let that = this;
                timer && clearTimeout(timer);
                timer = setTimeout(()=> {

                    if (currentIndex > 6) {
                        currentIndex = 0;
                    }

                    //当前位置为选中状态
                    that.activatedColorIndex = currentIndex;

                    //如果旋转时间过短或者当前位置不等于中奖位置则递归执行直到旋转至中奖位置
                    if (speed < 300 || currentIndex != lotteryPosition) {
                        //旋转速度越来越慢
                        stepTime++;
                        speed += stepTime;
                        //当前位置+1
                        currentIndex++;
                        that.stopLuck(lotteryPosition, currentIndex, speed, stepTime);
                    } else {
                        //抽奖结束
                        //假设中奖
                        setTimeout(()=>{
                            this.showLuckMask = true
                            this.$emit("changeLuckBox",{showLuckMask:true,lotteryCount:this.lotteryCount})
                            this.activatedColorIndex = -1;
                            this.btnDisabled = !this.btnDisabled;
                            this.startGame = false;
                        },500)
                    }
                }, speed);
            }
        },
        watch:{
            prizeBox(val){
                this.prizeImages = val.products
                if(val.acquiredCount<=val.uLimit){
                    this.lotteryCount = val.acquiredCount - val.attend
                }else {
                    val.acquiredCount = val.uLimit
                    this.lotteryCount = val.uLimit - val.attend
                }

            }
        }
    };
</script>

<style scoped lang="stylus">
    /* 顶部滚动导航栏 */
    .container {
        position: relative;
        margin: auto;
        > .background_image {
            width: 100%;
            height: 100%;
            position: absolute;
            top: 0;
            left: 0;
        }
        > .sudoku {
            width: 100%;
            display: flex;
            flex-wrap: wrap;
            position: relative;
            z-index: 2;
            align-items center
            justify-content center
            > .square {
                display flex
                align-content  flex-start
                justify-content center
                flex-wrap wrap
                background:rgba(255,255,255,1);
                box-shadow:0rpx 10rpx 0rpx 0rpx rgba(255,167,165,1);
                border-radius:12rpx;
                &:nth-of-type(3n-2) {
                    margin-left: 0 !important;
                }
                > image {
                    width 100%
                    height 115rpx
                }
                > div{
                    width 100%
                    text-align center
                    font-size 24rpx
                    color:rgba(102,102,102,1);
                }
            }
        }
        .luck_start{
            width 100%
            position: absolute;
            bottom: -108rpx;
            display inline-flex
            align-items center
            justify-content center
            div{
                width 390rpx
                height 98rpx
                background url($cdnUrl + "wechat/luckButton.png")  no-repeat
                background-size contain
                font-size:40rpx;
                font-weight:500;
                color:rgba(255,255,255,1);
                display inline-flex
                /*align-items center*/
                justify-content center
                line-height 90rpx
            }
        }
        .luck_surplus{
            width 100%
            text-align center
            font-size:30rpx;
            color:rgba(75,50,0,1);
            position: absolute;
            bottom: -165rpx;
        }

    }
</style>
