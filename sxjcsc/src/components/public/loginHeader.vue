<template>
    <div class="box">
        <div class="main">
            <el-row  type="flex" justify="space-between" class="font-12">
                <el-col :span="14"><div class="grid-content">
                    <span>陕西建材商城欢迎您！</span>
                    <span class="text-red">陕西建材商城用户</span>
                </div></el-col>
                <el-col :span="10"><div class="grid-content title">
                    <el-row :gutter="0">
                        <el-col :span="5">
                            <!--<el-dropdown>-->
                                <router-link tag="div" to="/personal" class="el-dropdown-link pointer font-12 text-right">个人中心<i class="el-icon-arrow-down el-icon--right"></i></router-link>
                                <!--<el-dropdown-menu slot="dropdown">-->
                                    <!--<el-dropdown-item>-->
                                        <!--<router-link to="/merchant"><span class="text-6">商家中心</span></router-link>-->
                                    <!--</el-dropdown-item>-->
                                <!--</el-dropdown-menu>-->
                            <!--</el-dropdown>-->
                        </el-col>
                        <el-col :span="6"><div class="grid-content pointer text-right text-red">400-029-2889</div></el-col>
                        <el-col :span="4"><div class="grid-content pointer text-right" @click="help">帮助中心</div></el-col>
                        <el-col :span="9"><div class="text-right pointer" @click="exit">
                            <span class="username text-center singlerow">{{ info.nickname }} </span>
                            <span style="display: inline-block;vertical-align: top">(退出)</span>
                        </div></el-col>
                    </el-row>
                </div></el-col>
            </el-row>
        </div>
    </div>
</template>
<script>
    import { mapMutations } from  'vuex'
    export default {
        name:"LoginHeader",
        data(){
            return{
                info:{}
            }
        },
        created(){
            this.JCService.UserServer.User_information().then(e=>{
                this.info = e.value
            })
        },
        methods:{
            ...mapMutations('user',[
                'del_token'
            ]),
            exit(){
                this.$confirm('您确认要退出吗？')
                    .then(()=> {
                        this.del_token()
                        this.$emit('loginHeader',false)
                        window.location.href = '/'
                    })
                    .catch(()=> {});
            },
            help(){
                this.$router.push('/personal/feedback');
            },
        },

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
            .username{
                display: inline-block;
                width: 60%;
            }
        }
    }
</style>
<style scoped>
    /deep/ .el-dropdown-menu__item {
        font-size: 12px;
        line-height: 15px;
        padding: 0 10px;
    }
    /deep/ .el-dropdown-menu__item:hover {
        background: #ffffff;
    }
    /deep/ .el-popper[x-placement^=bottom]{
        margin-top: 0;
    }
</style>