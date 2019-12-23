<template>
    <div class="bg">
        <div class="w-100 bigbox">
            <div class="box">
                <router-link to="/" class="left float-left mt-35" >
                    <img src="@/assets/image/search/logo.png" alt="">
                </router-link>
                <div class="mytit float-left mt-35">订单结算页</div>
                <div class="clearfloat"></div>
            </div>
        </div>
        <div class="mid">
            <div class="main">
                <div class="top">
                    <div class="tit">订单提交成功，请您尽快付款！</div>
                    <p>订单编号：<span>2019110750571015-1</span></p>
                    <p>商品：平台赞助</p>
                    <p>卖家：上海凯一特阀门有限公司</p>
                    <div class="support">赞助金额<span class="num">100.00</span>元</div>
                    <div class="detail">查看订单详情</div>
                </div>
                <div class="code_wrap">
                    <div class="codeBox">
                        <div class="tit" v-show="type=='2'">微信支付</div>
                        <div class="tit" v-show="type=='1'">支付宝支付</div>
                        <div class="getCode">
                            <div class="tit">距离二维码过期还剩<span>58</span>秒,过期后请刷新页面重新获取二维码</div>
                            <div class="code"><img src="" alt=""></div>
                            <div class="tooltip">
                                <img src="@/assets/image/personal/sys.png" alt="">
                                <div>
                                    <p v-show="type=='2'">请使用微信扫一扫</p>
                                    <p v-show="type=='1'">请使用支付宝扫一扫</p>
                                    <p>扫描二维码支付</p>
                                </div>
                            </div>
                        </div>
                        <div class="regain">
                            <div class="tit">二维码已过期，<span>刷新</span>页面重新获取二维码</div>
                            <img src="@/assets/image/personal/toolWechat.png" alt="" v-show="type=='2'">
                            <img src="@/assets/image/personal/toolAlipay.png" alt="" v-show="type=='1'">
                        </div>
                    </div>
                    <router-link to="/personal/supportPay" class="other">
                        <span class="el-icon-arrow-left"></span>
                        <span>选择其他支付方式</span>
                    </router-link>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "SupportPayment",
        data () {
            return {
                type:''
            }
        },
        created() {
            this.type=this.$route.query.type;
        },
        methods: {

        }
    }
</script>

<style lang='scss' scoped>
    $height:30px;
    $red:#FF0000;
    .bigbox{border-bottom: 2px solid $red;background: #fff;}
    .box{
        width: 1200px;
        margin: 0 auto;
        .left{
            width: 270px;
            height: 60px;
            margin-bottom: 25px;
        }
        .mytit{
            font-size: 20px;
            color: #333;
            margin-left: 35px;
            padding-top: 24px;
        }
    }
    .bg{background: #f5f5f5;}
    .mid{
        width: 100%;
        background: #f5f5f5;
        padding-bottom: 240px;
        .main{
            width: 1200px;
            margin: 0 auto;
            .top{
                background: #fff;
                position: relative;
                margin-bottom: 20px;
                padding-bottom: 26px;
                .tit{
                    font-size: 18px;
                    color: #FF0000;
                    font-weight: bold;
                    margin: 0 20px 33px;
                    padding-top: 30px;
                }
                p{
                    font-size: 14px;
                    color: #333;
                    margin-bottom: 15px;
                    margin-left: 46px;
                }
                .support{
                    position: absolute;
                    top: 50px;
                    right: 20px;
                    font-size: 14px;
                    color: #666;
                    .num{
                        font-size: 18px;
                        color: #FF0000;
                        font-weight: bold;
                    }
                }
                .detail{
                    position: absolute;
                    top: 94px;
                    right: 20px;
                    width:109px;
                    height:30px;
                    background:#E2DCDC;
                    border-radius:5px;
                    color: #333;
                    text-align: center;
                    line-height: 30px;
                    font-size: 12px;
                    cursor:pointer;
                }
            }
            .code_wrap{
                padding: 20px;
                background: #fff;
                position: relative;
                .codeBox{
                    border: 1px solid #ddd;
                    display: flex;
                    padding: 27px 0 122px 52px;
                    .tit{
                        font-size: 18px;
                        color: #333;
                        margin-right: 58px;
                        line-height: 1;
                    }
                    .getCode{
                        margin-right: 50px;
                        .tit{
                            font-size: 12px;
                            color: #333;
                            line-height: 18px;
                            margin-bottom: 22px;
                            margin-right: 0;
                            span{
                                color: #FF0000;
                            }
                        }
                        .code{
                            border: 1px solid #ddd;
                            width: 300px;
                            height: 300px;
                            margin-bottom: 20px;
                            img{
                                display: block;
                                width: 264px;
                                height: 264px;
                                margin: 18px 18px;
                            }
                        }
                        .tooltip{
                            width:300px;
                            height:60px;
                            background:#FF0000;
                            display: flex;
                            align-items: center;
                            img{
                                display: block;
                                width: 40px;
                                margin: 0 32px 0 52px;
                            }
                            div p{
                                font-size: 16px;
                                color: #FFFEFE;
                                line-height: 22px;
                            }
                        }
                    }
                    .regain{
                        .tit{
                            font-size: 12px;
                            color: #FE0000;
                            margin-bottom: 22px;
                            line-height: 18px;
                            span{
                                color: #006DFF;
                            }
                        }
                        img{
                            margin-left: 34px;
                            height: 384px;
                        }
                    }
                }
                .other{
                    position: absolute;
                    left: 77px;
                    bottom: 55px;
                    font-size: 14px;
                    color: #006DFF;
                    line-height: 20px;
                    .el-icon-arrow-left{
                        font-size: 18px;
                        line-height: 20px;
                        margin-right: 20px;
                    }
                }
            }
        }
    }
</style>