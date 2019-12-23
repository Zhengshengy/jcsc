<template>
    <div class="supportBox">
        <div class="Title">赞助我们</div>
        <div class="tit">赞助金额</div>
        <div class="select">
            <div class="item" @click="select(1)">
                <img src="@/assets/image/personal/squarebox.png" v-show="!isSelet.sel1" alt="" class="choose">
                <img src="@/assets/image/personal/squareboxA.png" v-show="isSelet.sel1" alt="" class="choose">
                <img src="@/assets/image/personal/bronze.png" alt="" class="type">
                <span class="typeName">银牌赞助商</span>
                <span>100元</span>
            </div>
            <div class="item" @click="select(2)">
                <img src="@/assets/image/personal/squarebox.png" v-show="!isSelet.sel2" alt="" class="choose">
                <img src="@/assets/image/personal/squareboxA.png" v-show="isSelet.sel2" alt="" class="choose">
                <img src="@/assets/image/personal/silver.png" alt="" class="type">
                <span class="typeName">银牌赞助商</span>
                <span>1000元</span>
            </div>
            <div class="item" @click="select(3)">
                <img src="@/assets/image/personal/squarebox.png" v-show="!isSelet.sel3" alt="" class="choose">
                <img src="@/assets/image/personal/squareboxA.png" v-show="isSelet.sel3" alt="" class="choose">
                <img src="@/assets/image/personal/gold.png" alt="" class="type">
                <span class="typeName">平台合作伙伴</span>
                <span>10000元</span>
            </div>
        </div>
        <div class="warmPrompt">
            <div class="tit">温馨提示</div>
            <p>1、赞助不是购买,它并不对应产品功能解锁或增值付费模块。</p>
            <p>2、允许多次赞助，以最高等级为准；例如：赞助一个银牌赞助商,一个金牌赞助商，则显示为金牌赞助商,不会显示一金一银。</p>
            <p>3、为表感谢您的赞助与支持，我们会将头衔显示在商铺首页里面。</p>
        </div>
        <div class="pay" @click="paying">立即支付</div>
    </div>
</template>

<script>
    export default {
        name: "Support",
        data(){
            return {
                isSelet:{
                    sel1:true,
                    sel2:false,
                    sel3:false
                },
                supportNum:100
            }
        },
        methods:{
            select(num){
                for(var val in this.isSelet){
                    this.isSelet[val] = false;
                }
                switch (num) {
                    case 1:
                        this.isSelet.sel1 = true;
                        this.supportNum = 100;
                        break;
                    case 2:
                        this.isSelet.sel2 = true;
                        this.supportNum = 1000;
                        break;
                    case 3:
                        this.isSelet.sel3 = true;
                        this.supportNum = 10000;
                        break;
                }
            },
            paying(){
                this.$router.push('/supportPay');
            }
        }
    }
</script>

<style lang='scss' scoped>
    .supportBox{
        background: #fff;
        padding-bottom: 200px;
        .Title{
            line-height: 52px;
            font-size: 16px;
            color: #000;
            padding-left: 20px;
            border-bottom: 1px solid #9393A1;
            margin-bottom: 30px;
        }
        .tit{
            padding-left: 30px;
            font-size: 16px;
            color: #FF0000;
            margin-bottom: 20px;
        }
        .select .item{
            display: flex;
            align-items: center;
            width: 936px;
            height: 60px;
            margin: 0 auto;
            border-bottom:1px solid #ddd;
            font-size: 16px;
            color: #333;
            cursor: pointer;
            .choose{
                width: 20px;
                height: 20px;
                margin-right: 25px;
                margin-left: 20px;
            }
            .type{
                margin-right: 15px;
            }
            .typeName{
                display: block;
                width: 200px;
            }
        }
        .warmPrompt{
            margin-top: 20px;
            p{
                font-size: 14px;
                color: #666;
                margin-left: 30px;
                margin-bottom: 6px;
            }
        }
        .pay{
            width:222px;
            height:50px;
            background:#FF0000;
            border-radius:2px;
            font-size: 18px;
            color: #fff;
            text-align: center;
            line-height: 50px;
            font-weight: bold;
            margin-left: 30px;
            margin-top: 10px;
            cursor: pointer;
        }
    }
</style>