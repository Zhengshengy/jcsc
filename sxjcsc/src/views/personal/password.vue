<template>
    <div class="wrap">
        <div class="tit">密码管理</div>
        <div class="main">
            <div class="item">
                <img src="@/assets/image/personal/password1.png" alt="" width="58" height="74" class="payImg">
                <p>支付密码</p>
                <span>支付所购买商品或服务时使用</span>
                <router-link to="/personal/changePassword?type=1" class="btn">设置支付密码</router-link>
            </div>
            <div class="item">
                <img src="@/assets/image/personal/password2.png" width="61" height="75" alt="">
                <p>登录密码</p>
                <span>定期更换密码有助于账号安全</span>
                <router-link to="/personal/changePassword?type=2" class="btn">修改登陆密码</router-link>
            </div>
            <div class="item" v-if="false">
                <img src="@/assets/image/personal/password3.png" width="47" height="75" alt="">
                <p>手机号</p>
                <span>156*****686</span>
                <router-link to="/" class="btn">修改手机号</router-link>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "password",
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
            margin-bottom: 30px;
        }
        .main{
            display: flex;
            padding: 0 30px;
            .item{
                width:283px;
                height:356px;
                border:1px solid #ddd;
                text-align: center;
                margin-right: 35px;
                img{
                    margin: 68px auto 24px;
                    display: block;

                }
                .payImg{
                    margin-top: 64px;
                }
                p{
                    font-size: 20px;
                    color: #000;
                    margin-bottom: 17px;
                }
                span{
                    display: block;
                    font-size: 14px;
                    color: #999;
                    margin-bottom: 30px;
                }
                .btn{
                    display: block;
                    width:200px;
                    height:48px;
                    margin: 0 auto;
                    border:1px solid #ddd;
                    font-size: 16px;
                    color: #000;
                    line-height: 48px;
                }
                .btn:hover{
                    border-color: #006dff;
                    color: #006dff;
                }
            }
            .item:last-of-type{
                margin-right: 0;
            }
        }

    }
</style>