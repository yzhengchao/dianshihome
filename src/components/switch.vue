<template>
    <div class="toggle-button" @click="goto">
    <span class="weui-switch" :class="{'weui-switch-on' : checked}" :value="value" @click="changeTo">
      <i class="weui-switch-text" :class="{'checked' : checked}">{{checked ? onText : offText}}</i>
    </span>
    </div>
</template>
<script>
    export default {
        name: 'Switch',
        props: {
            onText: {
                type: String,
                default: ''
            },
            offText: {
                type: String,
                default: ''
            },
            propsChecked: {
                type: Boolean,
                default: false
            }
        },
        data () {
            return {
                checked: true
            };
        },
        methods: {
            changeTo () {
                this.checked = !this.checked;
                this.$emit('switchChange', this.checked);
            }
        },
        mounted () {
            this.checked = this.propsChecked;
        }
    }
</script>
<style lang="stylus" scoped>
    .weui-switch {
        display: block;
        position: relative;
        width: 78rpx;
        height: 40rpx;
        border: 1rpx solid #DFDFDF;
        outline: 0;
        border-radius: 20rpx;
        box-sizing: border-box;
        background-color: #BBC2BE;
        transition: background-color 0.1s, border 0.1s;
        /*cursor: pointer;*/
        margin-left 12rpx
    }
    .weui-switch:before {
        content: "";
        position: absolute;
        top: 4rpx;
        left: 0;
        width: 30rpx;
        height: 30rpx;
        border-radius: 15px;
        background-color: #FDFDFD;
        transition: transform 0.3s cubic-bezier(0.45, 1, 0.4, 1);
    }
    .weui-switch:after {
        content: "";
        position: absolute;
        top: 4rpx;
        left: 0;
        width: 30rpx;
        height: 30rpx;
        border-radius: 15rpx;
        background-color: #FFFFFF;
        transition: transform 0.3s cubic-bezier(0.4, 0.4, 0.25, 1.35);

    }
    .weui-switch-text {
        position: absolute;
        color: #ffffff;
        font-size: 24rpx;
        top: 50%;
        right: 12%;
        transform: translateY(-50%);

        &.checked {
            left: 10%;
        }
    }
    .weui-switch-on {
        border-color:#3AA0FA;
        background-color: #3AA0FA;
        margin-left 12rpx

    }
    .weui-switch-on:before {
        border-color: #3AA0FA;
        background-color: #3AA0FA;
    }
    .weui-switch-on:after {
        transform: translateX(44rpx);
    }
</style>


