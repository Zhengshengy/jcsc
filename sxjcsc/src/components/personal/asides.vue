<template>
    <div class="aside">
        <div class="tit">订单中心</div>
        <router-link to="/personal/orders" class="alink">我的订单</router-link>
        <div class="tit">我的钱包</div>
        <router-link to="/personal/wallet" class="alink">账户余额</router-link>
        <router-link to="/personal/integral" class="alink">我的积分</router-link>
        <router-link to="/personal/coupon" class="alink">我的优惠券</router-link>
        <div class="tit">基本功能</div>
        <router-link to="/personal/collect" class="alink">我的收藏</router-link>
        <router-link to="/personal/address" class="alink">收货地址</router-link>
        <!--<router-link to="/personal/support" class="alink">赞助我们</router-link>-->
        <div class="tit">更多功能</div>
        <router-link to="/personal/feedback" class="alink">帮助反馈</router-link>
        <!--<router-link to="/personal/password" class="alink">密码管理</router-link>-->
        <router-link :to="{name:'EnquiryList'}" class="alink">询价列表</router-link>
        <router-link to="/personal/aboutUS" class="alink">关于我们</router-link>
    </div>
</template>

<script>
    export default {
        name: "asides"
    }
</script>

<style lang='scss' scoped>
    .aside{
        width: 171px;
        height: 957px;
        background: #fff;
        margin-bottom: 30px;
        margin-right: 30px;
        float: left;
        .tit{
            margin: 40px 0 20px 30px;
            font-size: 18px;
            color: #333;
            font-weight: bold;
        }
        .alink{
            display: block;
            margin-left: 30px;
            font-size: 16px;
            color: #333;
            margin-bottom: 20px;
        }
        .alink:hover{
            color: #ff0000;
        }
        .router-link-exact-active {
            color: red;
        }
    }
</style>