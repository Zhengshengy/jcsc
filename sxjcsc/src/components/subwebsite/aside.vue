<template>
    <div class="aside">
        <div class="info_wrap">
            <div class="tit">厂家信息</div>
            <div class="name singlerow">{{info.name}}</div>
            <div class="major">
                <span>主营类目：</span>
                {{info.major}}
            </div>
            <div class="address" v-show="info.position != null">
                <span>所在地区：</span>
                {{info.position}}
            </div>
            <div class="collectShop pointer" @click="collect" v-if="info.guanzhu != 1">
                <img src="@/assets/image/subwebsite/collect.png" alt="">
                收藏店铺
            </div>
            <div class="collectShop pointer" @click="cancelCollect" v-if="info.guanzhu == 1">
                <img src="@/assets/image/subwebsite/collect.png" alt="">
                已收藏
            </div>
        </div>
        <div class="sale_wrap" v-if="hasRecommend">
            <div class="tit">商品推荐</div>
            <ul>
                <li class="pointer" v-for="(item,index) in recommend" @click="detail(item.id)">
                    <div class="prodname">
                        <span>{{index+1}}</span> {{item.pname}}
                    </div>
                    <div class="price" v-if="item.minprice != null">￥{{item.minprice}}</div>
                    <div class="price" v-if="item.minprice == null">暂无价格</div>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Aside",
        props:['shopId','info','recommend','hasRecommend'],
        data(){
            return {
                shopid:''
            }
        },
        methods:{
            collect(){
                this.$emit('collect');
            },
            cancelCollect(){
                this.$emit('cancelCollect');
            },
            //商品详情
            detail(id){
                this.$router.push('/subwebsite/productdetail?id='+id+'&type=1');
            },
        }
    }
</script>

<style lang='scss' scoped>
    .aside{
        width: 220px;
        margin-bottom: 60px;
        .info_wrap{
            width: 100%;
            padding-bottom: 15px;
            border: 1px solid #E0E0E0;
            margin-bottom: 20px;
            background: #fff;
            .tit{
                width: 100%;
                height: 37px;
                line-height: 37px;
                background: #C5C5C5;
                color: #fff;
                font-size: 16px;
                font-weight: bold;
                text-align: center;
            }
            .name{
                padding: 0 10px;
                color: #000;
                text-align: center;
                margin: 34px 0 26px;
            }
            .major,.address{
                padding: 0 10px;
                line-height: 21px;
                margin-bottom: 16px;
                span{
                    color: #999;
                }
            }
            .collectShop{
                width: 124px;
                height: 30px;
                border: 1px solid #E0E0E0;
                border-radius: 15px;
                margin: 0 auto;
                line-height: 30px;
                text-align: center;
                img{
                    vertical-align: sub;
                }
            }
        }
        .sale_wrap{
            width: 100%;
            border: 1px solid #E0E0E0;
            background: #fff;
            .tit{
                width: 109px;
                height: 30px;
                line-height: 30px;
                border-bottom: 2px solid #FF2100;
                color: #FF2100;
                text-align: center;
            }
            ul{
                padding: 0 20px;
                li{
                    border-bottom: 1px dashed #E0E0E0;
                    margin-top: 13px;
                    .prodname{
                        font-size: 12px;
                        color: #000;
                        line-height: 21px;
                        margin-bottom: 20px;
                        span{
                            display: inline-block;
                            width: 16px;
                            height: 16px;
                            text-align: center;
                            line-height: 16px;
                            color: #fff;
                            border-radius: 50%;
                            background: #FF0000;
                        }
                    }
                    .prodname:hover{
                        color: #FF0000;
                        span{
                            color: #fff;
                        }
                    }
                    .price{
                        font-size: 16px;
                        color: #FF0000;
                        margin-bottom: 16px;
                        font-weight: bold;
                    }
                }
                li:last-child{
                    border: none;
                }
            }
        }
    }
</style>