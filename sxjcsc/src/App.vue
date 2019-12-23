<template>
  <div id="app">
    <Header v-if="header_show"></Header>
    <LoginHeader v-if="judgeLogin" v-on:loginHeader="loginHeader"></LoginHeader>
    <router-view v-on:header="header" v-on:footer="footer" v-on:loginHeader="loginHeader"></router-view>
    <Footer v-if="footer_show"></Footer>
  </div>
</template>
<script>
  import Header from './components/public/header'
  import LoginHeader from './components/public/loginHeader'
  import Footer from './components/public/footer'
  import { getCookies } from "./utils/cookies";
  import { mapGetters } from 'vuex'

  export default {
    name: 'App',
    data(){
      return {
          header_show:true,
          footer_show:true,
          judgeLogin:false
      }
    },
    components: {
      'Header':Header,
      'Footer':Footer,
      'LoginHeader':LoginHeader
    },
    computed:{
      ...mapGetters('user',[
          'getIsLogin'
      ])
    },
    watch:{
      getIsLogin(){
        this.isLogin()
      }
    },
    created(){
      let token = getCookies('token')
      if (token){
        this.header_show = false
        this.judgeLogin = true
      }
    },
    methods:{
      header:function (bool) {
        this.header_show = bool;
      },
      //是否显示底部
      footer:function (bool) {
        this.footer_show = bool;
      },
      loginHeader(bool){
        if (bool == false){
          this.header_show = true
          this.judgeLogin = false
        }
      },
      isLogin(){
          let token = getCookies('token')
          if (token){
            this.header_show = false
            this.judgeLogin = true
          }
      }
    }
  }
</script>
<style>
  @import "assets/css/public.css";
  html,body{ height: 100%;min-width: 1200px}
  #app {
    width: 100%;
    height: 100%;
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  *{margin:0;padding:0}
  li{list-style:none}
  img{vertical-align:top;border:none}
  a{ color: black; }
  .el-pagination.is-background .el-pager li:not(.disabled).active{background-color: #FF2100!important;color: #fff!important;border: 1px solid #FF2100!important;}
  .el-pager li{border: 1px solid rgba(209, 209, 209, 1)!important;}
  .el-pager li:hover{color: #FF2100!important;}
  .btn-prev{border: 1px solid rgba(209, 209, 209, 1)!important;padding: 0 10px!important;}
  .btn-next{border: 1px solid rgba(209, 209, 209, 1)!important;padding: 0 10px!important;}
  .el-input__inner{outline: #FF2100!important;}
  /*elementui loading css 覆盖 开始*/
  .el-loading-mask.is-fullscreen {
    z-index: 14000 !important;
  }
  .my-el-custom-spinner {
    background: url("./assets/image/public/loding.gif");
    background-size: 100% 100%;
    width: 250px;
    height: 250px;
    display: inline-block;
  }
  .el-loading-spinner {
    top: 40% !important;
  }
</style>

