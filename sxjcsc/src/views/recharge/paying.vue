<template>
    <div class="box">
        <Top :step="step"></Top>
        <div class="main">
            <div class="tit">订单支付</div>
            <div class="info_wrap">
                <div class="numBox">
                    <div class="txt">支付金额：</div>
                    <div class="num">{{ code }}元</div>
                </div>
                <div class="codeBox">
                    <!--<div class="alipay">-->
                        <!--<img src="@/assets/image/index/prod1.jpg" alt="">-->
                        <!--<p>请使用手机支付宝扫码支付</p>-->
                    <!--</div>-->
                    <div class="wechat">
                        <img :src="'data:image/png;base64,'+qrade" alt="">
                        <p>请使用手机微信扫码支付</p>
                    </div>
                </div>
            </div>
        </div>
        <div class="questions">
            <div class="tit">付款遇到问题？</div>
            <p class="stit">1，什么是直接支付？</p>
            <p>直接支付是陕西建材商城联合微信和支付宝平台推出的便捷支付方式。直接扫码支付完成付款，如有在支付时出现问题，请联系官方客服处理问题。</p>
        </div>
    </div>
</template>

<script>
    import Top from  '@/components/recharge/top'
    import { getCookies } from "../../utils/cookies";
    export default {
        name: "Paying",
        props:{
            step:{
                type:Number,
                default:2
            }
        },
        components:{
            'Top':Top
        },
        data(){
            return{
                code: 0.00,
                qrade: '',
                path: "",
                socket: "",
                msg:{
                    type:'order',
                    token:'',
                    atype:1,
                    btype:2,
                    id:''
                },
                timer:''
            }
        },
        created() {
            this.path = this.JCconfig.SocketPath
            this.code = this.$route.query.code
            this.msg.token = getCookies('token')
            // this.msg.id = this.$route.query.id
            // let id = this.$route.query.id
            // this.JCService.PersonalServer.GetRecharge({id:id}).then(e=>{
            //     if (e.status == 0){
            //         this.$router.push('/recharge')
            //     }else {
            //         this.qrade = e.info.qrcode
            //     }
            // })
            this.JCService.PersonalServer.Recharge({code:this.code}).then(e=>{
                if (e.status == 0){
                    this.$message.error('充值失败，请稍后重试')
                    this.$router.push('/recharge')
                }else {
                    this.qrade = e.info.qrcode
                    this.msg.id = e.info.order_sn
                    this.init()
                }
            })
        },
        methods:{
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
                    this.$message('充值成功')
                    this.$router.push('/personal')
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
            }
        },
        beforeDestroy () {
            // 销毁监听
            this.socket.onclose = this.close()
        }
    }
</script>

<style lang='scss' scoped>
    .main{
        width: 992px;
        margin: 43px auto;
        border: 1px solid #ccc;
        border-radius: 5px;
        .tit{
            width: 100%;
            height: 36px;
            line-height: 36px;
            background: #f5f5f5;
            font-size: 20px;
            color: #666;
            text-indent: 20px;
        }
        .info_wrap{
            padding: 24px 86px;
            font-size: 14px;
            color: #666;
            .numBox{
                display: flex;
                align-items: baseline;
                margin-bottom: 36px;
                .txt{
                    width: 75px;
                    margin-right: 6px;
                }
                .num{
                    font-size: 24px;
                    font-weight: bold;
                    color: #DE0010;
                }
            }
            .codeBox{
                display: flex;
                .alipay{
                    width: 248px;
                    margin: 0 85px 12px 118px;
                }
                .wechat{
                    width: 248px;
                }

                img{
                    display: block;
                    width: 165px;
                    height: 165px;
                    margin:0 auto 23px;
                }
                p{
                    width: 248px;
                    height: 36px;
                    background: #f5f5f5;
                    position: relative;
                    line-height: 36px;
                    text-align: center;
                    font-size: 14px;
                    color: #666;
                }
                p:before{
                    display: block;
                    content: '';
                    position: absolute;
                    border: 10px solid transparent;
                    border-bottom-color: #f5f5f5;
                    left: 50%;
                    top: -10px;
                    transform: translate(-50%,-50%);
                }
            }
        }
    }
    .questions{
        width: 992px;
        margin: 0 auto 300px;
        .tit{
            font-size: 16px;
            color: #333;
            margin-bottom: 20px;
        }
        .stit,p{
            font-size: 12px;
            color: #666;
            margin-bottom: 7px;
            text-indent: 15px;
        }
        .stit{
            color: #333;
        }
    }
</style>