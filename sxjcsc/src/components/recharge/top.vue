<template>
    <div class="w-100 bigbox">
        <div class="box">
            <router-link to="/" class="left float-left mt-35" >
                <img src="@/assets/image/search/logo.png" alt="">
            </router-link>
            <div class="right float-right mt-40">
                <div class="step1" :class="{'step1A':step == 1}">1.填写充值金额</div>
                <div class="step2" :class="{'step2A':step == 2}">2.在线支付</div>
                <div class="step3" :class="{'step3A':step == 3}">3.充值完成</div>
            </div>
            <div class="clearfloat"></div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "top",
        props:{
            step:{
                type:Number,
                default:1
            }
        },
        methods:{

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
        .right{
            width: 375px;
            height: 25px;
            margin-top: 50px;
            line-height: 25px;
            text-align: center;
            font-size: 12px;
            color: #333;
            display: flex;
            .step1{
                width: 136px;
                background-image: url("../../assets/image/recharge/step1.png");
                background-size: 100% 100%;
            }
            .step1A{
                background-image: url("../../assets/image/recharge/step1A.png");
                color: #E60012;
            }
            .step2{
                width: 127px;
                background-image: url("../../assets/image/recharge/step2.png");
                background-size: 100% 100%;
                margin-left: -10px;
            }
            .step2A{
                background-image: url("../../assets/image/recharge/step2A.png");
                color: #E60012;
            }
            .step3{
                width: 131px;
                background-image: url("../../assets/image/recharge/step3.png");
                background-size: 100% 100%;
                margin-left: -10px;
            }
            .step3A{
                background-image: url("../../assets/image/recharge/step3A.png");
                color: #E60012;
            }
        }
    }
</style>