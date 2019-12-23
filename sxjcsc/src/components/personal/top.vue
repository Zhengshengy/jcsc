<template>
    <div class="w-100 bigbox">
        <div class="box">
            <router-link to="/" class="left float-left mt-35" >
                <img src="@/assets/image/search/logo.png" alt="">
            </router-link>
            <div class="mytit float-left mt-35">{{tit}}</div>
            <div class="right float-right mt-40" v-show="hasRight">
                <div class="top">
                    <div class="float-left shu">
                        <input type="text" class="search" v-model="keyword" @keyup.enter="searchGoods">
                        <img src="@/assets/image/search/icon.png" alt="" class="icon">
                    </div>
                    <div class="btn float-left" @click="searchGoods" >搜产品</div>
                    <div class="btn float-left ml-20" @click="searchShops">搜商家</div>
                    <router-link to="/shoppingCart" class="shoppingCart float-left ml-20" v-if="isShow">
                        <img src="@/assets/image/personal/shoppingcart.png" alt="" class="icon">
                        我的购物车
                        <span>{{ number }}</span>
                    </router-link>
                </div>
            </div>
            <div class="right float-right mt-40" v-show="hasStep">
                <div class="stepBox">
                    <img src="@/assets/image/shoppingcart/step.png" alt="">
                    <div class="step">
                        <p class="step1">1.我的购物车</p>
                        <p>2.填写核对订单信息</p>
                        <p class="step3">3.成功提交订单</p>
                    </div>
                </div>
            </div>
            <div class="clearfloat"></div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "top",
        data(){
            return {
                keyword: '',
                number:0
            }
        },
        props:{
            tit:{
                type:String,
                default:'我的建材商城'
            },
            isShow:{
                type:Boolean,
                default: true
            },
            hasRight:{
                type:Boolean,
                default:true
            },
            hasStep:{
                type:Boolean,
                default:false
            }
        },
        created(){
            this.JCService.cartServer.countCateList().then(e=>{
                this.number = e.info
            })
        },
        methods:{
            searchGoods(){
                if (this.keyword){
                    this.$router.push({path:'/search',query:{keyword:this.keyword}})
                }
            },
            searchShops(){
                if (this.keyword){
                    this.$router.push({path:'/search_shops',query:{keyword:this.keyword}})
                }
            },
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
        .right{
            .top{height: 34px}
            .shu{
                position: relative;
                .icon{
                    position: absolute;
                    left: 10px;
                    bottom: 0;
                    top: 0;
                    margin: auto;
                }
            }
            .btn{
                width: 80px;
                height: 34px;
                background: $red;
                text-align: center;
                color: #ffffff;
                line-height: 34px;
                font-size: 16px;
            }
            .shoppingCart{
                width: 141px;
                height: 34px;
                line-height: 34px;
                text-align: center;
                font-size: 12px;
                color: #333;
                border: 1px solid #dfdfdf;
                img{
                    vertical-align:sub;
                    margin-right: 5px;
                }
                span{
                    margin-left: 5px;
                    padding:3px 8px;
                    border-radius: 10px;
                    background: #ff0000;
                    color: #fff;
                    font-size: 12px;
                }
            }
            .search{
                padding: 0 15px 0 35px;
                width: 255px;
                height: $height;
                border: 2px solid #FF0000;
                border-radius: 0px;
                overflow: hidden;
                color: #000000;
                outline: none;
            }
            .stepBox{
                width: 480px;
                img{
                    display: block;
                    width: 480px;
                    height: 23px;
                    margin-bottom: 5px;
                }
                .step{
                    display: flex;
                    p{
                        width: 160px;
                        font-size: 12px;
                        text-align: center;
                        color: #FF0000;
                    }
                    .step1{
                        color: #FEB4B4;
                    }
                    .step3{
                        color: #ccc;
                    }
                }
            }
        }
    }
</style>