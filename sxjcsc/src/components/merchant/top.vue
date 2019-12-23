<template>
    <div class="w-100 bigbox">
        <div class="box">
            <router-link to="/" class="left float-left mt-35" >
                <img src="@/assets/image/search/logo.png" alt="">
            </router-link>
            <div class="mytit float-left mt-35">商家管理中心</div>
            <div class="clearfloat"></div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "top",
        data(){
            return {
                keyword: ''
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
        .mytit{
            font-size: 20px;
            color: #333;
            margin-left: 35px;
            padding-top: 24px;
        }
    }
</style>