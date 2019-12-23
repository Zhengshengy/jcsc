<template>
    <div class="header">
        <div class="wrap">
            <div class="left">
                <router-link to="/" class="logo">
                    <img src="@/assets/image/search/logo.png" alt="">
                </router-link>
                <div class="name_wrap">
                    <div class="t">
                        <div class="name singlerow">{{name}}</div>
                        <!--<div class="type">-->
                            <!--<img src="@/assets/image/subwebsite/agent.png"/>-->
                            <!--<span>代理商</span>-->
                        <!--</div>-->
                    </div>
                    <div class="b cursor" @click="collect" v-if="follow != 1"><img src="@/assets/image/subwebsite/collect.png" alt="">收藏店铺</div>
                    <div class="b cursor" @click="cancelCollect" v-if="follow == 1"><img src="@/assets/image/subwebsite/collect.png" alt="">已收藏</div>
                </div>
            </div>
            <div class="search">
                <div class="top">
                    <div class="float-left shu">
                        <input type="text" class="search" v-model="keyword" @keyup.enter="searchGoods">
                        <img src="@/assets/image/search/icon.png" alt="" class="icon">
                    </div>
                    <div class="btn float-left" @click="searchGoods">搜产品</div>
                    <div class="btn float-left ml-20" @click="searchShops">搜商家</div>
                    <router-link to="/enquiry" class="btn xun float-left ml-20">全网询价</router-link>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Header",
        props:['name','follow'],
        data(){
            return {
                keyword: ''
            }
        },
        watch:{
            '$route':function(newUrl,oldUrl){
                if(newUrl.query.keyword!=oldUrl.query.keyword){
                    this.keyword = this.$route.query.keyword ? this.$route.query.keyword : ''
                }
            }
        },
        created(){
            this.keyword = this.$route.query.keyword ? this.$route.query.keyword : '';
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
            //收藏商铺
            collect(){
                this.$emit('collect');
            },
            cancelCollect(){
                this.$emit('cancelCollect');
            },
        }
    }
</script>

<style lang='scss' scoped>
    $height:30px;
    $red:#FF0000;
    .header{
        height: 120px;
        background: #fff;
        font-size: 12px;
        .wrap{
            margin: 0 auto;
            width: 1200px;
            display: flex;
            justify-content: space-between;
            padding-top: 30px;
            .left{
                display: flex;
                .logo{
                    padding-right: 12px;
                    border-right: 1px solid #e6e6e6;
                    img{
                        display: block;
                        width: 218px;
                        height: 48px;
                    }
                }
                .name_wrap{
                    margin-left: 20px;
                    .t{
                        height: 30px;
                        display: flex;
                        line-height: 30px;
                        .name{
                            margin-right: 12px;
                            max-width: 150px;
                        }
                        .type{
                            width: 81px;
                            height: 30px;
                            background: #FF2100;
                            border-radius: 5px;
                            text-align: center;
                            color: #fff;
                            img{
                                width: 16px;
                                height: 16px;
                                vertical-align: sub;
                                margin-right: 5px;
                            }
                        }
                    }
                    .b img{
                        width: 15px;
                        height: 14px;
                        margin-right: 10px;
                        vertical-align: sub;
                    }
                }
            }
            .search{
                .top{height: 34px;margin-top: 10px;}
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
                    cursor: pointer;
                }
                .xun{
                    background: #FFB873;
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
            }
        }
    }
</style>