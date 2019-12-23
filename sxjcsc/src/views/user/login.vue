<template>
    <div class="w-100 bg">
        <div class="bigbox m-0-auo">
            <div class="top">
                <router-link to="/">
                    <img src="@/assets/image/search/logo.png" alt="" width="197" height="43" class="mt-30">
                </router-link>
                <span class="text-3 font-24 mt-35 tit ml-30" style="vertical-align: top">欢迎登陆</span>
            </div>
        </div>
        <div class="box w-100" :style="{backgroundImage: 'url('+bg+')'}">
            <div class="kuang" >
                <el-form :model="ruleForm" :rules="rules" ref="ruleForm"  class="demo-ruleForm">
                    <div class="title text-red text-center fw-blod font-20">
                        <i class="el-icon-s-custom font-24 icon mr-15"></i>
                        <span class="zi">用户登录</span>
                    </div>
                    <el-form-item class="phone mt-35 myinput" prop="phone">
                        <el-input placeholder="请输入手机号码" type="tel" v-model="ruleForm.phone">
                            <template slot="prepend">手 机 号 码</template>
                        </el-input>
                    </el-form-item>
                    <el-form-item class="phone mt-20 myinput" prop="code">
                        <el-input placeholder="请输入手机验证码" type="number" v-model="ruleForm.code" @keyup.enter.native="login">
                            <template slot="prepend">手机验证码</template>
                            <el-button :disabled="disabled" slot="append" class="pointer" @click="getcode">{{ buttonText }}</el-button>
                        </el-input>
                    </el-form-item>
                    <div class="mt-20 px-20">
                        <span class="text-6 font-14 pointer" @click="passLogin">账号密码登录</span>
                        <span class="text-6 font-14 pointer" @click="WXLogin">
                            <img src="@/assets/image/public/wx.png" alt="" width="26" class="ml-15">
                            微信登录
                        </span>
                        <span class="text-6 font-14 float-right pointer" @click="toreg">注册</span>
                    </div>
                    <div class="btn font-18 text-white text-center pointer" @click="login">立即登录</div>
                    <div class="font-14 text-center">
                        <el-checkbox v-model="checked">
                            <span class="text-3">我已阅读并同意</span>
                            <router-link to="" class="blue">《陕西建材商城服务协议》</router-link>
                        </el-checkbox>
                    </div>
                </el-form>
            </div>
        </div>
    </div>
</template>
<script>
    import { mapMutations } from 'vuex'
    export default {
        name: 'Login',
        data(){
            let checkPhone = (rule, value, callback) => {
                if (!value) {
                    return callback(new Error('手机号不能为空'));
                } else {
                    const reg = /^1[3|4|5|7|8][0-9]\d{8}$/
                    if(!reg.test(value)){
                        return callback(new Error('请输入正确的手机号'));
                    }else{
                        callback();
                    }
                }
            };
            let checkCode = (rule,value,callback) =>{
                if (!value && value.length!=4){
                    return callback(new Error('请输入验证码'))
                } else {
                    callback()
                }
            }
            return{
                checked:true,
                bg:require('@/assets/image/public/bg.png'),
                disabled:false,
                buttonText: '获取验证码',
                flag: true,
                ruleForm:{
                    phone:'',
                    code:'',
                },
                rules:{
                    phone:[
                        { validator: checkPhone, trigger: 'change'}
                    ],
                    code:[
                        { validator:checkCode, trigger: 'change' },
                    ],
                }
            }
        },
        methods:{
            ...mapMutations('user',[
                'set_token'
            ]),
            async checkcode(code){
                try {
                    var res = await this.checkcode1(code)
                    return res
                }catch (e) {
                    console.log(e)
                }
            },
            getcode(){
                this.$refs.ruleForm.validateField('phone', (errMsg) => {
                    if (!errMsg){
                        this.JCService.UserServer.Register({phone:this.ruleForm.phone}).then(e=>{
                            if (e.status == 1){
                                let time = 120
                                this.buttonText = '已发送'
                                this.disabled = true
                                if (this.flag) {
                                    this.flag = false;
                                    let timer = setInterval(() => {
                                        time--;
                                        this.buttonText = time + ' 秒'
                                        if (time === 0) {
                                            clearInterval(timer);
                                            this.buttonText = '重新获取'
                                            this.disabled = false
                                            this.flag = true;
                                        }
                                    }, 1000)
                                }
                            }else {
                                this.$message.warning(e.info)
                            }
                        })
                    }
                })
            },
            checkcode1(code){
                return new Promise(resolve => {
                    this.JCService.UserServer.ActionCode({code:code,phone:this.ruleForm.phone}).then(e=>{
                        if (e.status == 0){
                            resolve(false)
                        } else if (e.status == 1){
                            resolve(true)
                        }
                    })
                })
            },
            passLogin(){
                let redirect = this.$route.query.redirect ? this.$route.query.redirect : ''
                this.$router.push({path:'/password_login',query:{redirect:redirect}})
            },
            toreg(){
                let redirect = this.$route.query.redirect ? this.$route.query.redirect : ''
                this.$router.push({path:'/register',query:{redirect:redirect}})
            },
            login(){
                if (this.checked){
                    this.$refs.ruleForm.validate((valid)=>{
                        if (valid){
                            this.JCService.UserServer.Verification(this.ruleForm).then(e=>{
                                if (e.status == 1) {
                                    this.$message.success('登录成功')
                                    this.set_token(e.token)
                                    let redirect = decodeURIComponent(this.$route.query.redirect || '/');
                                    this.$router.push({
                                        path: redirect
                                    })
                                }else if (e.status == 0){
                                    this.$message.success('登录失败')
                                    this.$refs['ruleForm'].resetFields()
                                }
                            })
                        }
                    })
                } else {
                    this.$message.warning('请阅读并同意陕西建材商城服务协议')
                }
            },
            WXLogin(){
                const APPID = 'wx558d2da6d49f67b1'
                let redirect_uri = encodeURI('http://jancai029.com')
                let url = `https://open.weixin.qq.com/connect/qrconnect?appid=${APPID}&redirect_uri=${redirect_uri}&response_type=code&scope=snsapi_login&state=STATE#wechat_redirect`
                window.location.href = url
            }
        },

    }
</script>
<style lang="scss" scoped>
.bigbox{
    width: 1200px;
    .top{
        .tit{
            display: inline-block;
        }
    }
}
.box{
    padding: 150px 0;
    .kuang{
        width:475px;
        height:340px;
        background:rgba(255,255,255,1);
        border:1px solid rgba(0, 0, 0, 0.2);
        margin: 0 auto;
        padding: 35px 95px;
        .icon{
            vertical-align: bottom;
        }
        .zi{
            letter-spacing: 5px
        }
        .btn{
            width: 370px;
            height: 40px;
            line-height: 40px;
            background: #FF4040;
            margin: 50px auto 20px;
        }
        .blue{
            color: #006DFF;
        }
    }
}

</style>
<style scoped>
    /deep/.el-input-group--prepend .el-input__inner, .el-input-group__append{
        height: 54px;
    }
</style>