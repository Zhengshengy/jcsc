<template>
    <div class="box">
        <Top :step="step"></Top>
        <div class="main">
            <div class="tit">支付成功</div>
            <div class="info_wrap">
                <img src="@/assets/image/recharge/success.png" alt="">
                <p class="txt">恭喜您充值<span>￥1300.00</span></p>
                <p class="info"><span>资金流水号</span>20191101105201174310</p>
                <p class="info"><span>充值时间</span>2019-11-04 14:50:25</p>
                <div class="btns">
                    <router-link to="/recharge" class="btn active mr-45">继续充值</router-link>
                    <router-link to="/personal/wallet" class="btn">进入我的钱包</router-link>
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
    export default {
        name: "Success",
        props:{
            step:{
                type:Number,
                default:3
            }
        },
        components:{
            'Top':Top
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
            img{
                display: block;
                margin: 46px auto 25px;
            }
            .txt{
                font-size: 18px;
                color: #E60012;
                text-align: center;
                margin-bottom: 45px;
                font-family: "Microsoft YaHei";
                span{
                    font-weight: bold;
                }
            }
            .info{
                font-size: 14px;
                margin-bottom: 10px;
                color: #666;
                margin-left: 285px;
                span{
                    display: inline-block;
                    width: 80px;
                    text-align: right;
                    margin-right: 13px;
                    color: #999;
                }
            }
            .btns{
                margin-top: 30px;
                display: flex;
                justify-content: center;
                .btn{
                    width: 140px;
                    height: 46px;
                    border: 1px solid #006DFF;
                    border-radius: 23px;
                    font-size: 16px;
                    color: #006dff;
                    text-align: center;
                    line-height: 46px;
                }
                .btn.active{
                    background: #006dff;
                    color: #fff;
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