<template>
    <div class="nav">
        <div class="wrap">
            <ul>
                <li><router-link :to="'/subwebsite?shop_id='+shopid">店铺首页</router-link></li>
                <li><router-link :to="'/subwebsite/products?shop_id='+shopid">全部商品</router-link></li>
                <li><router-link :to="'/subwebsite/specials?shop_id='+shopid">特价商品</router-link></li>
                <li><router-link :to="'/subwebsite/pricelist?shop_id='+shopid" v-if="!isPrice">价格表<img src="@/assets/image/subwebsite/hot.png"/></router-link></li>
                <li><router-link :to="'/subwebsite/pricelist?shop_id='+shopid" v-if="isPrice">价格表<img src="@/assets/image/subwebsite/hotA.png"/></router-link></li>
                <li><router-link :to="'/subwebsite/introduce?shop_id='+shopid">公司介绍</router-link></li>
                <li><router-link :to="'/subwebsite/contact?shop_id='+shopid">联系我们</router-link></li>
            </ul>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Nav",
        props: ['shopid'],
        data(){
          return {
              isPrice:false
          }
        },
        watch:{
            $route(){
                if(this.$route.path == '/subwebsite/pricelist'){
                    this.isPrice = true;
                }else {
                    this.isPrice = false;
                }
            },
        }
    }
</script>

<style lang='scss' scoped>
    .nav{
        width: 100%;
        height: 40px;
        background: #313131;
        .wrap{
            width: 1200px;
            margin: 0 auto;
            ul{
                display: flex;
                padding: 0 25px;
                li a{
                    display:block;
                    width: 104px;
                    height: 40px;
                    line-height: 40px;
                    color: #fff;
                    font-size: 16px;
                    text-align: center;
                    img{
                        width: 18px;
                        height: 18px;
                        margin-left: 3px;
                        vertical-align: baseline;
                    }
                }
                .router-link-exact-active{
                    background: #FF2100;
                }
            }
        }
    }
</style>