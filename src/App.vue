<script>
/* 这部分相当于原生小程序的 app.js */
export default {
  created() {
      this.$store.commit("appid","3c3065a6f979f9b2b49e98ea1d02f313")
      wx.setStorageSync("appid","3c3065a6f979f9b2b49e98ea1d02f313")
      // 主要是为了获取code
      let _this=this
      wx.login({
          success (res) {
              if (res.code) {
                  console.log(res.code)
                  _this.$store.commit("code",res.code)
              } else {
                  console.log('登录失败！' + res.errMsg)
              }
          }
      })
// 获取用户的当前设置。本项目里判断用户是否已授权登录
//       wx.getSetting({
//           success (res) {
//               if (res.authSetting['scope.userInfo']) {
//                   wx.getUserInfo({
//                       success: function (res) {
//                           // 如果用户已经授权则会调用该方法
//                           console.log(res)
//                           _this.$store.commit("userInfo",res.userInfo)
//                           // that.$wxhttp.authSuccessReq(res)
//                       }
//                   })
//               } else {
//                   console.error('用户没有授权')
//               }
//           }
//       })
  },
    method:{
      // getAuth(){
      //
      // }
    }
};
</script>

<style>
/* 这部分相当于原生小程序的 app.wxss */
.container {
  /*min-height: 100%;*/
  /*display: flex;*/
  /*flex-direction: column;*/
  /*align-items: center;*/
  /*justify-content: space-between;*/
  /*box-sizing: border-box;*/
  /*position: relative;*/
}

</style>
<style lang="stylus" type="text/stylus" rel="stylesheet/stylus">
  @import 'stylus/variables.styl';
  @import 'stylus/font.css';
  body{
     font-family number
  }
</style>
