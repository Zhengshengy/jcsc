<template>
    <div class="wrap">
        <div class="tit" v-if="type == '1'">支付密码修改</div>
        <div class="tit" v-if="type == '2'">登陆密码修改</div>
        <div v-show="!isSuccess">
            <div class="flex">
                <span class="title">手机号码：</span>
                <div>156****1686</div>
            </div>
            <div class="flex">
                <span class="title">短信验证码：</span>
                <div>
                    <input type="text">
                    <div class="getCode">获取验证码</div>
                </div>
            </div>
            <div class="flex" v-if="type == '1'">
                <span class="title">输入新的支付密码：</span>
                <div>
                    <input type="text" @blur="payReg" v-model="payNum">
                    <p>请输入6位数字支付密码</p>
                </div>
            </div>
            <div class="flex" v-if="type == '2'">
                <span class="title">输入新的登陆密码：</span>
                <div>
                    <input type="text" v-model="loginNum" @blur="loginReg">
                    <p>请输入6~12位登陆密码</p>
                </div>
            </div>
            <div class="flex" v-if="type == '1'">
                <span class="title">再次输入新的支付密码：</span>
                <div>
                    <input type="text" @blur="RePayReg" v-model="rePayNum">
                    <p>请输入6位数字支付密码</p>
                </div>
            </div>
            <div class="flex" v-if="type == '2'">
                <span class="title">再次输入新的登陆密码：</span>
                <div>
                    <input type="text" v-model="reLoginNum" @blur="reLoginReg">
                    <p>请输入6~12位登陆密码</p>
                </div>
            </div>
            <div class="confirm">确认修改</div>
        </div>
        <div class="success" v-show="isSuccess">
            <img src="@/assets/image/personal/modifySuccess.png" alt="">
            <p>密码修改成功</p>
            <router-link to="/personal" class="btn">返回个人中心</router-link>
        </div>
    </div>
</template>

<script>
    export default {
        name: "paymentPassword",
        data(){
            return {
                isSuccess:false,
                type:'',
                payNum:'',
                rePayNum:'',
                loginNum:'',
                reLoginNum:''
            }
        },
        created(){
            this.type=this.$route.query.type;
        },
        methods:{
            payReg(){
                var reg=/^\d{6}$/;
                if(!reg.test(this.payNum)){
                    this.$message({
                        message: '请输入6位数字密码',
                        type: 'warning'
                    });
                }
            },
            RePayReg(){
                var reg=/^\d{6}$/;
                if(!reg.test(this.payNum)){
                    this.$message({
                        message: '请输入6位数字密码',
                        type: 'warning'
                    });
                }else if(this.payNum != this.rePayNum){
                    this.$message({
                        message: '两次密码输入不一致，请重新输入',
                        type: 'warning'
                    });
                }
            },
            loginReg(){

            },
            reLoginReg(){

            }
        }
    }
</script>

<style lang='scss' scoped>
    .wrap{
        background: #fff;
        padding-bottom: 350px;
        .tit{
            font-size: 16px;
            color: #000;
            height: 52px;
            line-height: 52px;
            border-bottom: 1px solid #f5f5f5;
            text-indent: 20px;
            margin-bottom: 120px;
        }
        .flex{
            display: flex;
            margin-bottom: 20px;
            line-height: 34px;
            font-size: 14px;
            color: #333;
            span{
                display: block;
                width: 404px;
                margin-right: 16px;
                text-align: right;
            }
            input{
                width: 190px;
                height: 34px;
                border: 1px solid #ddd;
                padding: 0 5px;
            }
            .getCode{
                display: inline-block;
                width: 90px;
                height: 34px;
                background: #F5F5F5;
                border: 1px solid #ddd;
                margin-left: 10px;
                text-align: center;
                cursor: pointer;
            }
            p{
                display: inline-block;
                font-size: 12px;
                color: #999;
                margin-left: 23px;
            }
        }
        .confirm{
            width: 151px;
            height: 42px;
            background: #E12423;
            border-radius: 2px;
            color: #fff;
            line-height: 42px;
            font-size: 16px;
            margin: 20px auto 0;
            text-align: center;
        }
        .success{
            text-align: center;
            img{
                display: block;
                width: 80px;
                height: 80px;
                margin: 90px auto 12px;
            }
            p{
                font-size: 14px;
                color: #333;
            }
            .btn{
                display: block;
                width:250px;
                height:42px;
                background:#E12423;
                border-radius:2px;
                line-height: 42px;
                font-size: 16px;
                color: #fff;
                margin: 20px auto 0;
            }
        }
    }
</style>