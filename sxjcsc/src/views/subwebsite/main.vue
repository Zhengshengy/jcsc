<template>
    <div class="cont">
        <div class="banner">
            <el-carousel :interval="3000" arrow="never">
                <el-carousel-item>
                    <img src="@/assets/image/subwebsite/banner.jpg" alt="">
                </el-carousel-item>
            </el-carousel>
        </div>
        <div class="synopsis">
            <div class="tit">
                <span>公司介绍</span>
                <router-link :to="'/subwebsite/introduce?shop_id='+shopid" class="introduce">详细介绍</router-link>
            </div>
            <div class="txt" v-html="introduce"></div>
        </div>
        <div class="prodtit">
            <span>全部商品</span>
            <router-link :to="'/subwebsite/products?shop_id='+shopid" class="more">更多<img src="@/assets/image/subwebsite/more.png"></router-link>
        </div>
        <ul class="prodList">
            <li v-for="(item,index) in prodList" :key="index"  @click="detail(item.id,1)">
                <img :src="item.img" alt="">
                <p class="price" v-if="item.minprice != null || item.minprice != '' || item.minprice != undefined">￥{{item.minprice}}元</p>
                <p class="price" v-if="item.minprice == null || item.minprice == '' || item.minprice == undefined">暂无价格</p>
                <p class="name row2">{{item.pname}}</p>
            </li>
        </ul>
        <div class="prodtit" v-if="specialsList.length != 0">
            <span>特价商品</span>
            <router-link :to="'/subwebsite/specials?shop_id='+shopid" class="more">更多<img src="@/assets/image/subwebsite/more.png"></router-link>
        </div>
        <ul class="prodList" v-if="specialsList.length != 0">
            <li v-for="(item,index) in specialsList" :key="index" @click="detail(item.id,2)">
                <img :src="item.img" alt="">
                <p class="price" v-if="item.price != null || item.price != '' || item.price != undefined">￥{{item.price}}元<span>特价</span></p>
                <p class="price" v-if="item.price == null || item.price == '' || item.price == undefined">暂无价格<span>特价</span></p>
                <p class="name row2">{{item.pname}}</p>
            </li>
        </ul>
    </div>
</template>

<script>
    export default {
        name: "subwebsiteIndex",
        props:['introduce'],
        data(){
            return {
                prodList:[],
                specialsList:[],
                shopid:''
            }
        },
        created(){
            this.shopid = this.$route.query.shop_id;
            this.JCService.SubWebsiteServer.product({
                'shopid':this.$route.query.shop_id,
                'type':1,
                'otype':2,
            }).then(e=>{
                this.prodList = e.info.data;
                for(let i in this.prodList){
                    let img = this.prodList[i].img.split(',');
                    this.prodList[i].img = this.JCconfig.filePath +'public/'+ img[0];
                }
            });
            this.JCService.SubWebsiteServer.product({
                'shopid':this.$route.query.shop_id,
                'type':2,
                'otype':2,
            }).then(e=>{
                this.specialsList = e.info.data;
                for(let i in this.specialsList){
                    let img = this.specialsList[i].img.split(',');
                    this.specialsList[i].img = this.JCconfig.filePath +'public/'+ img[0];
                }
            })
        },
        methods:{
            //商品详情
            detail(id,type){
                this.$router.push('/subwebsite/productdetail?id='+id+'&type='+type+'&shop_id='+this.shopid);
            },
        }
    }
</script>

<style lang='scss' scoped>
    .cont{
        width: 960px;
        padding-bottom: 40px;
        .banner{
            width: 100%;
            height: 300px;
            background: #999999;
            margin-bottom: 15px;
            .el-carousel__item h3 {
                color: #475669;
                font-size: 18px;
                opacity: 0.75;
                line-height: 300px;
                text-align: center;
                margin: 0;
            }
            .el-carousel__item:nth-child(2n) {
                background-color: #99a9bf;
            }
            .el-carousel__item:nth-child(2n+1) {
                background-color: #d3dce6;
            }
        }
        .synopsis,.inquirysheet{
            background:#fff;
            margin-bottom: 20px;
            .tit{
                display: flex;
                height: 40px;
                border-bottom: 1px solid #E0E0E0;
                justify-content: space-between;
                line-height:40px;
                span{
                    display: block;
                    margin-left: 20px;
                }
                .introduce{display: block;margin-right: 20px;color: #333;}
            }
            .txt{
                padding: 24px 22px 22px;
                line-height: 21px;
            }
            .addfile{
                padding: 20px 20px 40px;
                line-height: 29px;
                span{
                    font-size: 14px;
                    color: #000;
                }
                label{
                    display:inline-block;
                    width: 96px;
                    height: 29px;
                    background: #FF2100;
                    color: #fff;
                    font-size: 16px;
                    border: none;text-align: center;
                }
                .tool{
                    color: #999;
                }
            }
        }
    }
    .prodtit{
        display: flex;
        justify-content: space-between;
        margin-bottom: 15px;
        span{
            display: block;
            text-indent: 15px;
            position: relative;
            font-size: 16px;
            color: #000;
        }
        span:before{
            content: '';
            display: block;
            width: 4px;
            height: 16px;
            background: #FF2100;
            position: absolute;
            left: 0;
            top: 3px;
        }
        .more{
            display: block;
            color: #333;
            line-height: 20px;
            img{
                width: 12px;
                height: 10px;
                margin-left: 6px;
                margin-right: 20px;
                vertical-align: baseline;
            }
        }
    }
    .prodList{
        background: #fff;
        padding: 15px;
        display: flex;
        flex-wrap: wrap;
        margin-bottom: 25px;
        li{
            display: block;
            width: 220px;
            border:1px solid #E1E1E1;
            margin-bottom: 16px;
            position: relative;
            margin-right: 14px;
            cursor: pointer;
            img{
                display: block;
                width: 220px;
                height: 220px;
            }
            .price{
                font-size: 16px;
                color: #FF0000;
                margin: 20px 13px 13px;
                font-weight: bold;
                position: relative;
                line-height: 18px;
                span{
                    display: block;
                    position: absolute;
                    width: 32px;
                    height: 18px;
                    color: #fff;
                    background: #FF0000;
                    font-size: 12px;
                    line-height: 18px;
                    text-align: center;
                    border-radius: 5px;
                    right: 0;
                    top: 0;
                }
            }
            .name{
                padding: 0 13px;
                color: #333;
                line-height: 21px;
                margin-bottom: 20px;
            }
            .label{
                position: absolute;
                right: 0;
                top: 0;
                display: block;
                width: 24px;
                height: 24px;
                text-align: center;
                line-height: 24px;
                background: #E2203D;
                color: #fff;
                border-radius: 50%;
                transform: translate(50%,-50%);
            }
        }
        li:nth-child(4n){
            margin-right: 0;
        }
    }
</style>