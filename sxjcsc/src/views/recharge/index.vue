<template>
    <div class="box">
        <Top :step="step"></Top>
        <div class="main">
            <div class="tit">填写充值金额</div>
            <div class="info_wrap">
                <div class="accountBox">
                    <div class="txt">充值账户：</div>
                    <div class="account">yjl19911121</div>
                </div>
                <div class="numBox">
                    <div class="txt">充值金额：</div>
                    <div class="num_wrap">
                        <div class="num"><input type="text" v-model="num" @keyup="checkNum"><span>元</span></div>
                        <p>请注意：支持微信、支付宝扫码支付，在线支付成功后，充值金额会在1分钟内到账；如果有充值失败问题，请联系客服处理。</p>
                        <el-button :plain="true" class="next" @click="next">下一步</el-button>
                    </div>
                </div>
            </div>
            <div class="tips">
                <p class="mb-10">温馨提示：</p>
                <p>1，充值成功后，余额可能存在延迟现象，一般1到5分钟内到账，如有问题，请咨询客服；</p>
                <p>2，充值金额输入值必须是不小于1且不大于50000的正整数；</p>
                <p>3，您只能用微信、支付宝扫码支付，如遇到任何支付问题请咨询客服；</p>
                <p>4，充值成功后，您可以进入账户充值记录页面查看余额充值状态。</p>
            </div>
        </div>
    </div>
</template>

<script>
    import Top from  '@/components/recharge/top'
    export default {
        name: "RechargeIndex",
        props:{
            step:{
                type:Number,
                default:1
            }
        },
        data(){
            return{
                num:''
            }
        },
        components:{
            'Top':Top
        },
        methods:{
            checkNum(){
                this.num = this.num.replace(/^0*/g,'');//第一个数不能为0 ，若为0替换为空
                this.num = this.num.replace(/[^\d.]/g,"");//是否是数字 和小数点，若是除数字 和小数点之外的则替换为空
                this.num = this.num.replace(/^\./g,"");//确证第一个为数字而不是“.”
                this.num = this.num.replace(".","$#$").replace(/\./g,"").replace("$#$",".");//保证”.“只出现一次，而不能出现两次以上
                //只能输入两个小数
                this.num = this.num.replace(/^(-)*(\d+)\.(\d\d).*$/,'$1$2.$3');
                this.num = this.num.replace(/[^\d.]/g,"");  //清除“数字”和“.”以外的字符
            },
            next(){
                var exp = /(^[1-9]([0-9]{0,5})?(\.[0-9]{1,2})?$)|(^[0-9]\.[0-9]([0-9])?$)/;
                if (exp.test(this.num)) {
                    // this.JCService.PersonalServer.Recharge({code:this.num}).then(e=>{
                    //     if (e.status == 0){
                    //         this.$router.push('/recharge')
                    //     }else {
                    //         this.$router.push({path:'/paying',query:{code:this.num,id:e.info.order_sn}});
                    //     }
                    // })
                    this.$router.push({path:'/paying',query:{code:this.num}});
                } else {
                    this.$message({
                        message: '请填写正确的金额！',
                        type: 'warning'
                    });
                    this.num = ''
                }
            },
        }
    }
</script>

<style lang='scss' scoped>
    .main{
        width: 992px;
        margin: 43px auto 400px;
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
            .accountBox{
                display: flex;
                margin-bottom: 15px;
            }
            .txt{
                width: 75px;
                margin-right: 6px;
            }
            .numBox{
                display: flex;
                margin-bottom: 35px;
                .num_wrap{
                    .num{
                        font-size: 14px;
                        color: #666;
                        input{
                            display: inline-block;
                            width: 134px;
                            height: 28px;
                            margin-right: 15px;
                            padding: 0 5px;
                        }
                    }
                    p{
                        font-size: 12px;
                        color: #999;
                        margin-bottom: 15px;
                    }
                    .next{
                        width:155px;
                        height:36px;
                        background:#E60012;
                        border-radius:5px;
                        text-align: center;
                        line-height: 36px;
                        font-size: 18px;
                        color: #fff;
                        font-weight: bold;
                        padding: 0;
                    }
                }
            }
        }
        .tips{
            width: 830px;
            margin: 0 auto 55px;
            padding: 20px 30px;
            color: #333;
            font-size: 12px;
            border: 2px solid #EDD28B;
            background: #FFFDEE;
            p{
                margin-bottom: 7px;
            }
        }
    }
</style>