<template>
    <div>　　　　　　
        <web-view :src="webViewUrl"></web-view>
    </div>

</template>

<script>
    // import swiperLuck from '@/components/swiperLuck';
    export default {
        data() {
            return{
                webViewUrl:""
            }
        },
        mounted() {
            console.log(this.$store.state.webView)
            this.webViewUrl = this.$store.state.webView
        },
        methods: {

        }
    };
</script>
<style scoped lang="stylus">
</style>
