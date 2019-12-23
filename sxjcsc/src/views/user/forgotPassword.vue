<template>
    <div class="w-100">
        <div class="bigbox m-0-auo">
            <div class="top">
                <router-link to="/">
                    <img src="@/assets/image/search/logo.png" alt="" width="197" height="43" class="mt-30">
                </router-link>
                <span class="text-3 font-24 mt-35 tit ml-30" style="vertical-align: top">欢迎登录</span>
            </div>
        </div>
        <div class="w-100 box" :style="{backgroundImage: 'url('+bg+')'}">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm"  class="demo-ruleForm">
                <div class="kuang">
                    <div class="title text-red text-center fw-blod font-20">
                        <i class="el-icon-s-custom font-24 icon mr-15"></i>
                        <span class="zi">忘记密码</span>
                    </div>
                    <el-form-item class="phone mt-35 myinput" prop="phone">
                        <el-input placeholder="请输入手机号码" type="tel" v-model="ruleForm.phone">
                            <template slot="prepend">手 机 号 码</template>
                        </el-input>
                    </el-form-item>
                    <el-form-item class="phone mt-20 myinput" prop="code">
                        <el-input placeholder="请输入手机验证码" type="number" v-model="ruleForm.code">
                            <template slot="prepend">手机验证码</template>
                            <el-button :disabled="disabled" slot="append" class="pointer" @click="getcode">{{ buttonText }}</el-button>
                        </el-input>
                    </el-form-item>
                    <el-form-item class="phone mt-20 myinput" prop="password">
                        <el-input placeholder="设置您的登陆密码" type="password" v-model="ruleForm.password">
                            <template slot="prepend">设置新密码</template>
                        </el-input>
                    </el-form-item>
                    <el-form-item class="phone mt-20 myinput" prop="password_a">
                        <el-input placeholder="再次确认密码" type="password" v-model="ruleForm.password_a" @keyup.enter.native="reg">
                            <template slot="prepend">确认新密码</template>
                        </el-input>
                    </el-form-item>
                    <div class="btn font-18 text-white text-center pointer" @click="reg">保存修改</div>
                    <div class="font-14 text-center">
                        <el-checkbox v-model="checked">
                            <span class="text-3">我已阅读并同意</span>
                            <router-link to="" class="blue">《陕西建材商城服务协议》</router-link>
                        </el-checkbox>
                    </div>
                </div>
                <div class="bottom m-0-auo">
                    <span class="mr-30 float-right login font-16 pointer" @click="tologin">登录</span>
                </div>
            </el-form>
        </div>
    </div>

</template>
<script>
    import { mapMutations } from 'vuex'
    export default {
        name: 'ForgotPassword',
        data(){
            let checkPhone = (rule, value, callback) => {
                const reg = /^1[3|4|5|7|8][0-9]\d{8}$/
                if (!value) {
                    return callback(new Error('手机号不能为空'));
                }else if (!reg.test(value)) {
                    return callback(new Error('请输入正确的手机号'));
                }else {
                    callback()
                }
            };
            let checkCode = (rule,value,callback) =>{
                if (!value){
                    return callback(new Error('请输入验证码'))
                } else {
                    this.checkcode(value).then(e=>{
                        if (e == 0){
                            return callback(new Error('验证码错误'))
                        } else if(e == 1){
                            callback()
                        }
                    })
                }
            }
            let checkPassword = (rule, value, callback) => {
                if (!value) {
                    return callback(new Error('请输入密码'));
                } else {
                    const reg = /[a-zA-Z]\w{4,16}/
                    if (reg.test(value)) {
                        callback();
                    } else {
                        return callback(new Error('由英文字母和数字组成的4-16位字符，以字母开头'));
                    }
                }
            };
            let checkPassword1 = (rule, value, callback) => {
                if (!value) {
                    return callback(new Error('请再次输入密码'));
                } else {
                    if (value !== this.ruleForm.password) {
                        return callback(new Error('两次输入密码不一致'));
                    } else {
                        callback()
                    }
                }
            };
            return{
                input:null,
                checked:true,
                bg:require('@/assets/image/public/bg.png'),
                disabled:false,
                buttonText: '获取验证码',
                flag: true,
                ruleForm:{
                    phone:'',
                    code:'',
                    password:'',
                    password_a:''
                },
                rules:{
                    phone:[
                        { validator: checkPhone, trigger: 'change'}
                    ],
                    code:[
                        { validator:checkCode, trigger: 'blur' },
                    ],
                    password:[
                        { validator: checkPassword, trigger: 'change' }
                    ],
                    password_a:[
                        { validator: checkPassword1, trigger: 'change' }
                    ]
                }
            }
        },
        methods:{
            ...mapMutations('user',[
                'set_token'
            ]),

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
            checkcode(code){
                return new Promise(resolve => {
                    this.JCService.UserServer.ActionCode({code:code,phone:this.ruleForm.phone}).then(e=>{
                        if (e.status == 0){
                            resolve(0)
                        } else if (e.status == 1){
                            resolve(1)
                        }
                    })
                })
            },
            reg(){
                if (this.checked){
                    this.$refs.ruleForm.validate((valid)=>{
                        if (valid){
                            this.JCService.UserServer.Retrieve_password(this.ruleForm).then(e=>{
                                if (e.status == 1) {
                                    this.$message.success('保存成功')
                                    this.set_token(e.token)
                                    let redirect = decodeURIComponent(this.$route.query.redirect || '/');
                                    this.$router.push({
                                        path: redirect
                                    })
                                }
                            })
                        }
                    })
                }else {
                    this.$message.warning('请阅读并同意陕西建材商城服务协议')
                }
            },
            tologin(){
                let redirect = this.$route.query.redirect ? this.$route.query.redirect : ''
                this.$router.push({path:'/login',query:{redirect:redirect}})
            }
        }
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
        padding: 85px 0 85px;
        .kuang{
            width:475px;
            height:500px;
            background:rgba(255,255,255,1);
            border:1px solid rgba(0, 0, 0, 0.2);
            border-bottom: none;
            margin: 0 auto ;
            padding: 35px 95px 0;
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
        .bottom{
            width:665px;
            height:50px;
            background: #FFFBFB;
            border: 1px solid rgba(0, 0, 0, 0.2);
            border-top: 0;
            .login{
                line-height: 50px;
                color:#006DFF ;
            }
        }
    }
</style>
<style scoped>
    /deep/.el-input-group--prepend .el-input__inner, .el-input-group__append{
        height: 54px;
    }
</style>