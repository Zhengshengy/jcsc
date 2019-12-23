<template>
    <div class="bg">
        <Top :tit="txt" :hasRight="hasRight"></Top>
        <div class="mid">
            <div class="main">
                <div class="top">
                    <div class="tit">订单提交成功，请您尽快付款！</div>
                    <p>订单编号：<span>{{info.order_sn}}</span></p>
                    <!--<p>商品：平台赞助</p>-->
                    <p>商家：陕西建材商城</p>
                    <div class="support">{{typeTxt}}<span class="num">{{info.payment_money}}</span>元</div>
                    <div class="btn cursor" v-show="hasDetail" @click="showOrder(info.id)">查看订单详情</div>
                </div>
                <div class="bom" v-if="paymentType == 0">
                    <div class="balance">
                        <div class="info">
                            <div class="tit float-left">账户余额支付</div>
                            <div class="recharge float-left" v-if="balance>=info.payment_money">
                                <span>当前账户余额：<span>{{balance}}</span>元</span>
                            </div>
                            <div class="recharge float-left" v-if="balance<info.payment_money">
                                <span>当前账户余额：<span>{{balance}}</span>元，不足以支付该订单</span>
                                <router-link to="/recharge" class="czBtn">去充值</router-link>
                            </div>
                            <div class="pay float-right">支付<span>{{info.payment_money}}</span>元</div>
                        </div>
                        <!--<div class="password">-->
                            <!--<p>请输入6位数字支付密码</p>-->
                            <!--<div class="wrap float-left">-->
                                <!--<input ref="pwd1" type="password" maxlength="6" v-model="msg1" @blur="blur(1)" style="position: absolute;z-index: -1;left:-100%;opacity: 0"/>-->
                                <!--<ul class="pwd-wrap" :class="{'focus':isFocus1==true}" @click="focus(1)">-->
                                    <!--<li><i v-if="msg1Length > 0"></i></li>-->
                                    <!--<li><i v-if="msg1Length > 1"></i></li>-->
                                    <!--<li><i v-if="msg1Length > 2"></i></li>-->
                                    <!--<li><i v-if="msg1Length > 3"></i></li>-->
                                    <!--<li><i v-if="msg1Length > 4"></i></li>-->
                                    <!--<li><i v-if="msg1Length > 5"></i></li>-->
                                <!--</ul>-->
                            <!--</div>-->
                            <!--<span to="/" class="forget cursor" v-if="false">忘记支付密码？</span>-->
                            <!--<span to="/" class="set cursor" @click="showSet">设置支付密码</span>-->
                            <!--<div class="clearfloat"></div>-->
                        <!--</div>-->
                        <div class="payBtn cursor" :class="{'active':parseFloat(this.balance)>=parseFloat(this.info.payment_money)}" @click="balancePay">立即支付</div>
                    </div>
                    <div class="payType">
                        <div class="alipay" @click="payType(1)" v-if="false"><img src="@/assets/image/personal/alipay.png" alt="">支付宝支付</div>
                        <div @click="payType(2)"><img src="@/assets/image/personal/wechat.png" alt="">微信支付</div>
                    </div>
                </div>
                <div class="code_wrap" v-if="paymentType != 0">
                    <div class="codeBox">
                        <div class="tit" v-show="paymentType == 2">微信支付</div>
                        <div class="tit" v-show="paymentType == 1">支付宝支付</div>
                        <div class="getCode">
                            <div class="tit" v-if="false">距离二维码过期还剩<span>{{time}}</span>秒,过期后自动跳转商城首页</div>
                            <div class="code"><img :src="codeSrc" alt=""></div>
                            <div class="tooltip">
                                <img src="@/assets/image/personal/sys.png" alt="">
                                <div>
                                    <p v-show="paymentType == 2">请使用微信扫一扫</p>
                                    <p v-show="paymentType == 1">请使用支付宝扫一扫</p>
                                    <p>扫描二维码支付</p>
                                </div>
                            </div>
                        </div>
                        <div class="regain">
                            <div class="tit" v-if="false">二维码已过期，<span>刷新</span>页面重新获取二维码</div>
                            <img src="@/assets/image/personal/toolWechat.png" alt="" v-show="paymentType == 2">
                            <img src="@/assets/image/personal/toolAlipay.png" alt="" v-show="paymentType == 1">
                        </div>
                    </div>
                    <div class="other" @click="choosePayType">
                        <span class="el-icon-arrow-left"></span>
                        <span>选择其他支付方式</span>
                    </div>
                </div>
                <div class="success" v-if="false">
                    <div class="infoBox">
                        <img src="@/assets/image/shoppingcart/success.png" alt="">
                        <div class="red">购买成功，我们会尽快给您处理！</div>
                        <p><span>订单编号</span>20191101105201174310</p>
                        <p><span>购买时间</span>2019-11-04 14:50:25</p>
                        <div class="btns">
                            <span class="btn see cursor">查看订单</span><router-link to="/" class="btn cursor">返回首页</router-link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!--<div class="shadow" v-show="showForm">-->
            <!--<div class="password">-->
                <!--<div class="tit">设置支付密码</div>-->
                <!--<div class="form">-->
                    <!--<p>输入手机号</p>-->
                    <!--<div class="tel">-->
                        <!--<input type="text">-->
                        <!--<span>*</span>-->
                    <!--</div>-->
                    <!--<p>验证码</p>-->
                    <!--<div class="code">-->
                        <!--<input type="text" placeholder="请填写验证码">-->
                        <!--<span>获取验证码</span>-->
                    <!--</div>-->
                    <!--<p>输入支付密码</p>-->
                    <!--<div class="wrap">-->
                        <!--<input ref="pwd2" type="password" maxlength="6" v-model="msg2" @blur="blur(2)" style="position: absolute;z-index: -1;left:-100%;opacity: 0"/>-->
                        <!--<ul class="pwd-wrap float-left mr-15" :class="{'focus':isFocus2==true}" @click="focus(2)">-->
                            <!--<li><i v-if="msg2Length > 0"></i></li>-->
                            <!--<li><i v-if="msg2Length > 1"></i></li>-->
                            <!--<li><i v-if="msg2Length > 2"></i></li>-->
                            <!--<li><i v-if="msg2Length > 3"></i></li>-->
                            <!--<li><i v-if="msg2Length > 4"></i></li>-->
                            <!--<li><i v-if="msg2Length > 5"></i></li>-->
                        <!--</ul>-->
                        <!--<span>温馨提示：请输入6位数支付密码</span>-->
                        <!--<div class="clearfloat"></div>-->
                    <!--</div>-->
                    <!--<div class="preserve cursor">保存支付密码</div>-->
                <!--</div>-->
                <!--<img src="@/assets/image/personal/addressClose.png" class="close cursor" alt="" @click="closeForm">-->
            <!--</div>-->
        <!--</div>-->
    </div>
</template>

<script>
    import Top from '@/components/personal/top'
    import { getCookies } from "../../utils/cookies";
    export default {
        name: "pay",
        props:{
            txt:{
                type:String,
            },
            typeTxt:{
                type:String
            },
            hasDetail:{
                type:Boolean,
                default: false
            },
            hasRight:{
                default:false
            },
            isSuccess:{
                type:Boolean,
                default:false
            }
        },
        components:{
            'Top':Top
        },
        data () {
            return {
                msg1:'',
                msg2:'',
                msg1Length:0,
                msg2Length:0,
                isFocus1:false,
                isFocus2:false,
                showForm:false,
                paymentType:0,
                codeSrc:'',
                balance:0,
                info:{},
                order_status:0,
                status:0,
                time:600,
                path: "ws://jancai029.com:9502",
                socket: "",
                msg:{
                    type:'order',
                    token:'',
                    atype:1,
                    btype:1,
                    id:''
                },
                timer:''
            }
        },
        created(){
            this.path = this.JCconfig.SocketPath;
            this.msg.token = getCookies('token');
            this.JCService.cartServer.userDetail({'id':this.$route.query.id}).then(e=>{
                let Base64 = require('js-base64').Base64;
                let list = JSON.parse(Base64.decode(e.info));
                this.info = list;
                this.order_status = this.info.order_status;
                this.status = this.info.status;
            })
            this.getBalance();
        },
        watch:{
            // msg1(curVal){
            //     if(/[^\d]/g.test(curVal)){
            //         this.msg1 = this.msg1.replace(/[^\d]/g,'');
            //     }else{
            //         this.msg1Length = curVal.length;
            //     }
            // },
            // msg2(curVal){
            //     if(/[^\d]/g.test(curVal)){
            //         this.msg2 = this.msg2.replace(/[^\d]/g,'');
            //     }else{
            //         this.msg2Length = curVal.length;
            //     }
            // },
        },
        methods: {
            //余额支付密码
            // focus(num){
            //     switch (num) {
            //         case 1:
            //             this.$refs.pwd1.focus();
            //             this.isFocus1 = true;
            //             break;
            //         case 2:
            //             this.$refs.pwd2.focus();
            //             this.isFocus2 = true;
            //             break;
            //     }
            // },
            // blur(num){
            //     switch (num) {
            //         case 1:
            //             this.isFocus1 = false;
            //             break;
            //         case 2:
            //             this.isFocus2 = false;
            //             break;
            //     }
            // },
            //账户余额获取
            getBalance(){
                this.JCService.cartServer.getUserInfo().then(e=>{
                    this.balance = e.info.money;
                })
            },
            //支付方式
            payType(type){
                if(type == 1){
                    this.paymentType = 1;
                    // this.$router.push('/payment?type=1&id='+this.$route.query.id);
                }else if(type == 2){
                    //微信支付
                    let _this = this;
                    _this.JCService.cartServer.index({
                        'payment_type':1,
                        'orderid':_this.$route.query.id
                    }).then(e=>{
                        if(e.status == 0){
                            _this.$message({
                                message: e.info,
                                type: 'warning'
                            });
                            _this.paymentType = 0;
                        }else{
                            _this.paymentType = 2;
                            _this.codeSrc = 'data:image/png;base64,'+e.info.qrcode;
                            // 初始化
                            _this.init();
                            _this.msg.id = e.info.order_sn;
                            // let timer=setInterval(function () {
                            //     if(_this.time<=0){
                            //         _this.$router.push('/');
                            //     }
                            //     _this.JCService.cartServer.userDetail({'id':_this.$route.query.id}).then(e=>{
                            //         let Base64 = require('js-base64').Base64;
                            //         let list = JSON.parse(Base64.decode(e.info));
                            //         if(list.status == 1){
                            //             _this.$message({
                            //                 message: '支付成功',
                            //                 type: 'success'
                            //             });
                            //             clearInterval(timer);
                            //             _this.$router.push('/personal/orders');
                            //         }
                            //     })
                            //     _this.time -= 1;
                            // },1000)
                        }
                    })
                    // this.$router.push('/payment?type=2&id='+this.$route.query.id);
                }
            },
            choosePayType(){
                this.paymentType = 0;
            },
            // showSet(){
            //     this.showForm = true;
            // },
            // closeForm(){
            //     this.showForm = false;
            // },
            showOrder(id){
                this.$router.push('/order/detail?id='+id+'&status='+this.status+'&order_status='+this.order_status);
            },
            //socket
            init: function () {
                if(typeof(WebSocket) === "undefined"){
                    alert("您的浏览器不支持socket")
                }else{
                    // 实例化socket
                    this.socket = new WebSocket(this.path)
                    // 监听socket连接
                    this.socket.onopen = this.open
                    // 监听socket错误信息
                    this.socket.onerror = this.error
                    // 监听socket消息
                    this.socket.onmessage = this.getMessage
                }
            },
            open() {
                console.log("socket连接成功")
                this.send(JSON.stringify(this.msg))
            },
            error() {
                console.log("连接错误")
            },
            getMessage(msg) {
                msg = JSON.parse(msg.data)
                if (msg.status == 0){
                    let that = this
                    this.timer = setTimeout(function () {
                        that.send(JSON.stringify(that.msg))
                    },3000)
                }else if (msg.status == 1){
                    if (this.timer){
                        clearTimeout(this.timer)
                    }
                    this.$message('支付成功')
                    this.$router.push('/personal/orders')
                }
            },
            send(params) {
                this.socket.send(params)
            },
            close: function () {
                if (this.timer){
                    clearTimeout(this.timer)
                }
                console.log("socket已经关闭")
            },
            //余额支付
            balancePay(){
                if(parseFloat(this.balance)<parseFloat(this.info.payment_money)){
                    this.$message({
                        message: '账户余额不足，请充值后操作',
                        type: 'warning'
                    });
                    return false;
                }
                if(this.info.status == 1){
                    this.$message({
                        message: '该订单已支付，请勿重复操作',
                        type: 'warning'
                    });
                    return false;
                }
                this.JCService.cartServer.index({
                    'payment_type':2,
                    'orderid':this.$route.query.id
                }).then(e=>{
                    if(e.status == 1){
                        this.$message({
                            message: '支付成功',
                            type: 'success'
                        });
                        this.getBalance();
                        let _this = this;
                        setTimeout(function () {
                            _this.$router.push('/personal/orders');
                        },2000)
                    }else{
                        this.$message({
                            message: e.info,
                            type: 'warning'
                        });
                    }
                })
            }
        },
        beforeDestroy () {
            // 销毁监听
            this.socket.onclose = this.close()
        }
    }
</script>

<style lang='scss' scoped>
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
                .btn{
                    position: absolute;
                    top: 95px;
                    right: 20px;
                    width:109px;
                    height:30px;
                    background:#E2DCDC;
                    border-radius:5px;
                    text-align: center;
                    line-height: 30px;
                    font-size: 12px;
                    color: #333;
                }
            }
            .balance{
                padding: 20px 20px 30px;
                background: #fff;
                .info{
                    height: 80px;
                    border: 1px solid #ddd;
                    padding: 0 25px;
                    line-height: 80px;
                    font-size: 16px;
                    color: #666;
                    margin-bottom: 30px;
                    .tit{
                        font-weight: bold;
                        margin-right: 65px;
                    }
                    .recharge{
                        .czBtn{
                            display: inline-block;
                            width:100px;
                            height:35px;
                            background:#FF4040;
                            color: #fff;
                            line-height: 35px;
                            text-align: center;
                            margin-left: 52px;
                        }
                    }
                    .pay{
                        color: #999;
                    }
                }
                .password{
                    padding: 0 24px;
                    font-size: 12px;
                    p{
                        color: #999;
                        margin-bottom: 8px;
                    }
                    .forget{
                        color: #006dff;
                        line-height: 40px;
                        margin-left: 10px;
                        user-select: none;
                    }
                    .set{
                        color: #FF0000;
                        line-height: 40px;
                        margin-left: 10px;
                        user-select: none;
                    }
                    .forget:hover,.set:hover{
                        text-decoration: underline;
                    }
                }
                .payBtn{
                    width:222px;
                    height:50px;
                    background:#B5B5B5;
                    border-radius:2px;
                    line-height: 50px;
                    text-align: center;
                    font-size: 18px;
                    color: #fff;
                    font-weight: bold;
                    margin-top: 20px;
                    margin-left: 24px;
                }
                .payBtn.active{
                    background: #FF0000;
                }
            }
            .payType{
                height: 84px;
                background: #fff;
                display: flex;
                align-items: center;
                padding: 0 44px;
                margin-top: 20px;
                img{
                    vertical-align: middle;
                    margin-right: 15px;
                }
                div{cursor: pointer;}
                .alipay{
                    padding-right: 40px;
                    position: relative;
                    margin-right: 43px;
                }
                .alipay:after{
                    position: absolute;
                    display: inline-block;
                    content: '';
                    width: 2px;
                    height: 15px;
                    background: #ddd;
                    top: 3px;
                    right: 0;
                }
            }
            .success{
                background: #fff;
                padding: 20px;
                .infoBox{
                    border: 1px solid #ddd;
                    img{
                        display: block;
                        width: 61px;
                        height: 61px;
                        margin: 123px auto 25px;
                    }
                    .red{
                        font-size: 18px;
                        color: #E60012;
                        margin-bottom: 45px;
                        text-align: center;
                    }
                    p{
                        margin-left: 461px;
                        font-size: 14px;
                        color: #666;
                        margin-bottom: 15px;
                        span{
                            color: #999;
                            margin-right: 15px;
                        }
                    }
                    .btns{
                        margin-top: 25px;
                        text-align: center;
                        margin-bottom: 160px;
                        .btn{
                            display: inline-block;
                            width: 140px;
                            height: 46px;
                            border: 1px solid #006dff;
                            color: #006dff;
                            line-height: 46px;
                            border-radius: 23px;
                        }
                        .btn.see{
                            background: #006dff;
                            color: #fff;
                            margin-right: 45px;
                        }
                    }
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
    .wrap{
        .pwd-wrap{
            width: 238px;
            height: 40px;
            padding-bottom: 1px;
            background: #fff;
            border:1px solid #ddd;
            display: flex;
            display: -webkit-box;
            display: -webkit-flex;
            cursor: pointer;
        }
        .pwd-wrap.focus{
            border-color: #006dff;
        }
        .pwd-wrap li{
            list-style-type:none;
            text-align: center;
            line-height: 40px;
            -webkit-box-flex: 1;
            flex: 1;
            -webkit-flex: 1;
            border-right:1px solid #ddd ;
        }
        .pwd-wrap li:last-child{
            border-right: 0;
        }
        .pwd-wrap li i{
            height: 10px;
            width: 10px;
            border-radius:50% ;
            background: #000;
            display: inline-block;
        }
    }
    .shadow{
        position: fixed;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        background: rgba(0,0,0,.3);
        z-index: 100;
        .password,.detail{
            width: 760px;
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate(-50%,-50%);
            background: #fff;
            box-shadow: 0 0 5px #333;
        }
        .tit{
            height: 28px;
            background: #F3F3F3;
            line-height: 28px;
            padding-left: 12px;
            font-size: 14px;
            color: #333;
            border-bottom: 1px solid #C4C4C4;
        }
        .form{
            padding: 40px 30px;
            font-size: 12px;
            color: #666;
            p{
                margin-bottom: 8px;
            }
            .tel,.code{
                line-height: 32px;
                margin-bottom: 13px;
                input{
                    height: 32px;
                    padding: 0 10px;
                    border: 1px solid #ccc;
                }
            }
            .tel{
                input{
                    width: 375px;
                    margin-right: 13px;
                }
                span{
                    font-size: 20px;
                    font-weight: bold;
                    color: #FF0000;
                }
            }
            .code{
                input{
                    width: 133px;
                    margin-right: 30px;
                }
                span{
                    display: inline-block;
                    width: 85px;
                    height: 32px;
                    color: #FF0000;
                    border: 1px solid #FF0000;
                    text-align: center;
                }
            }
            .wrap{
                margin-bottom: 22px;
                .pwd-wrap{
                    height: 32px;
                }
                .pwd-wrap li{
                    line-height: 32px;
                }
                span{
                    line-height: 32px;
                }
            }
            .preserve{
                width: 114px;
                height: 30px;
                border: 1px solid #ccc;
                background: #F6F6F6;
                line-height: 30px;
                text-align: center;
                font-size: 14px;
                color: #333;
                margin-bottom: 60px;
            }
        }
        .detail{
            .wrap{
                padding: 20px 20px 30px;
                .address{
                    font-size: 14px;
                    color: #333;
                    margin-bottom: 20px;
                    span{
                        margin-right: 10px;
                    }
                }
                .table{
                    border: 1px solid #FF0014;
                    text-align: center;
                    font-size: 14px;
                    max-height: 445px;
                    .prod{
                        width: 275px;
                    }
                    .price,.num,.money{
                        width: 147px;
                    }
                    .max{
                        max-height: 346px;
                    }

                    .max.scroll{
                        overflow-y: scroll;
                    }
                    .th{
                        background: #FF0014;
                        height: 48px;
                        line-height: 48px;
                        font-weight: bold;
                        color: #fff;
                        display: flex;
                    }
                    .tr{
                        display: flex;
                        height: 114px;
                        line-height: 114px;
                        color: #333;
                        border-bottom: 1px  solid #FF0014;
                        div{
                            border-right: 1px solid #FF0014;
                        }
                        div:last-child{
                            border-right: none;
                        }
                    }
                    .all{
                        display: flex;
                        height: 50px;
                        line-height: 50px;
                        .total{
                            width: 571px;
                        }
                        .totalNum{
                            width: 149px;
                            height: 50px;
                            background: #FF4040;
                            font-weight: bold;
                            color: #fff;
                        }
                    }
                }
            }
        }
        .close{
            display: block;
            width: 9px;
            height: 9px;
            position: absolute;
            top: 10px;
            right: 11px;
        }
    }
</style>