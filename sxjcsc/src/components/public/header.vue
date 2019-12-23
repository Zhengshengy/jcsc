<template>
  <div class="box">
      <div class="main">
          <el-row  type="flex" justify="space-between" class="font-12">
              <el-col :span="14"><div class="grid-content">
                  <img src="../../assets/image/index/topPos.png" alt="" width="9" height="12">
                  <span class="text-primary">【陕西站】</span>
                  <a href="#">切换城市</a>
              </div></el-col>
              <el-col :span="8"><div class="grid-content title">
                  <el-row :gutter="0">
                      <el-col :span="5"><router-link to="/login" class="grid-content pointer text-primary">请登录</router-link></el-col>
                      <el-col :span="5"><router-link to="/register" class="grid-content pointer">免费注册</router-link></el-col>
                      <el-col :span="5"><div class="grid-content pointer" @click="help">帮助中心</div></el-col>
                      <el-col :span="8">
                          <el-popover
                                  popper-class="poppertan"
                                  placement="top-start"
                                  width="80"
                                  trigger="click">
                              <img src="@/assets/image/public/qrcode.jpg" alt="" width="80" height="80">
                              <div class="text-left pointer" slot="reference">
                                  <img src="../../assets/image/index/topPhone.png" alt="" width="14" height="19" class="mr-10">
                                  手机陕西建材商城
                              </div>
                          </el-popover>

                      </el-col>
                  </el-row>
              </div></el-col>
          </el-row>
      </div>
  </div>
</template>
<script>
    export default {
        name:"Header",
        data(){
            return{

            }
        },
        methods:{
            help(){
                this.$router.push('/personal/feedback');
            }
        }
    }
</script>
<style lang="scss" scoped>
    $height:30px;
    .box{
        width: 100%;height:$height;background: #F5F5F5;
        .main{
            width: 1200px;
            margin: 0 auto;
            height: $height;
            line-height: $height;
            img{
                vertical-align: middle;
            }
            .title{
                text-align: center;
            }
        }
    }
</style>
<style>
    .poppertan{min-width: 80px!important;padding: 0!important;left: 1445px!important;}
</style>