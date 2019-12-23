<template>
    <div class="cont">
            <div class="banner">
                <el-carousel :interval="3000" arrow="never">
                    <el-carousel-item>
                        <img src="@/assets/image/subwebsite/banner.jpg" alt="">
                    </el-carousel-item>
                </el-carousel>
            </div>
            <div class="contact">
                <div class="tit">
                    <span>联系方式</span>
                </div>
                <div class="info">
                    <h3>西安金运虹旺建材有限公司</h3>
                    <div class="item" v-for="(item,index) in contactList" :key="index">
                        <p>
                            <span>联系人：{{item.contacts}}</span>
                            <!--<span class="online"><img src="@/assets/image/subwebsite/qq.png"/><span>在线联系</span></span>-->
                        </p>
                        <p><span>手机：</span><span class="tel" v-for="(mob,index) in item.mob" :key="index">{{mob}}</span></p>
                        <p>座机：<span class="tel" v-for="(tel,index) in item.tel" :key="index">{{tel}}</span></p>
                        <p><span>地址：</span><span>{{item.addresss}}</span></p>
                    </div>
                    <div class="address">
                        <!--<p><span>店铺地址：</span><span class="url">http://www.sxjcsc.com/shop/13147</span></p>-->
                        <!--<div class="map">-->

                        <!--</div>-->
                    </div>
                </div>
            </div>
        </div>
</template>

<script>
    export default {
        name: "contact",
        props:['contactList'],
        data(){
            return {

            }
        },
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
            .contact{
                background:#fff;
                margin-bottom: 60px;
                .tit{
                    display: flex;
                    height: 40px;
                    border-bottom: 1px solid #E0E0E0;
                    justify-content: space-between;
                    line-height:40px;
                    span{
                        display: block;
                        margin-left: 20px;
                        color: #000;
                        font-weight: bold;
                    }
                }
                .info{
                    padding: 20px;
                    h3{
                        font-size: 18px;
                        color: #000;
                        margin-top: 35px;
                        font-weight: bold;
                    }
                    .item{
                        margin-top: 30px;
                        p{
                            margin-bottom: 10px;
                        }
                        .online{
                            margin-left: 30px;
                            img{
                                width: 12px;
                                height: 14px;
                            }
                            span{
                                color: #666;
                                text-decoration: underline;
                            }
                        }
                        .tel{
                            color: #0048FF;
                            margin-right: 8px;
                        }
                    }
                    .address{
                        margin-top: 35px;
                        border-top: 1px solid #E0E0E0;
                        padding-top: 25px;
                        p{
                            margin-bottom: 10px;
                        }
                        .map{
                            margin-top: 30px;
                            height: 375px;

                        }
                    }
                }
            }
        }
</style>