<template>
    <div class="props-test">
        <div class="props-test-item" v-for="(item,index) in dataArray" :key="index">{{item.name}}--------{{item.age}}</div>
        <div @click="change">change props data!</div>
    </div>
</template>
<script>
export default {
    props:{
        dataArray:{
            type:Array
        }
    },
    data(){
        return{
            list:this.dataArray
        }
    },
    methods:{
        change(){
            //this.dataArray.shift();
            this.dataArray[0].age=101
            console.log(this.dataArray);
            console.log(this.list);
        }
    },
    watch:{

    }
}
</script>
<style lang="stylus" scoped>
.props-test{
    width 100%
    margin-top 100rpx
    .props-test-item{
        width 300rpx
        height  80rpx
        text-align center
        font-size 28rpx
    }
}
</style>


