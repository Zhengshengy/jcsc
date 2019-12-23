<template>
    <div class="box">
        <Top></Top>
        <div class="main">
            <Left></Left>
            <div class="right float-right">
                <router-view></router-view>
            </div>
            <div class="clearfloat"></div>
        </div>
    </div>
</template>

<script>
    import Top from '@/components/merchant/top'
    import Left from '@/components/merchant/left'
    export default {
        name: "MerchantIndex",
        props:{
            small:{
                type:Number,
                default:0
            }
        },
        components:{
            'Top' :Top,
            'Left':Left,
        },
    }
</script>

<style lang='scss' scoped>
.box{
    background: #F5F5F5;
    .main{
        width: 1200px;
        margin: 0 auto;
        min-height: 1000px;
        padding-bottom: 30px;
    }
}
</style>