<template>
    <div>
        <div>
            <div class="company float-left">
                <img :src="info.headimgurl" alt="">
                <div class="name singlerow">{{ info.nickname }}</div>
                <router-link to="/" class="edit" v-if="false">编辑信息</router-link>
            </div>
            <div class="info float-left">
                <p>我的钱包</p>
                <div class="info_wrap">
                    <div class="item">
                        <div class="num">{{ money }}</div>
                        <div class="name">账户余额</div>
                        <div class="link">
                            <router-link to="/recharge" class="a">充值</router-link>
                            <router-link to="/personal/wallet" class="a">明细</router-link>
                        </div>
                    </div>
                    <div class="item">
                        <div class="num">{{ integral }}</div>
                        <div class="name">我的积分</div>
                        <div class="link">
                            <router-link to="/personal/integral" class="a">明细</router-link>
                        </div>
                    </div>
                    <!--<div class="item">-->
                        <!--<div class="num">10</div>-->
                        <!--<div class="name">商品优惠券</div>-->
                        <!--<div class="link">-->
                            <!--<router-link to="/" class="a">详情</router-link>-->
                        <!--</div>-->
                    <!--</div>-->
                    <!--<div class="item">-->
                        <!--<div class="num">20</div>-->
                        <!--<div class="name">物流包邮券</div>-->
                        <!--<div class="link">-->
                            <!--<router-link to="/" class="a">详情</router-link>-->
                        <!--</div>-->
                    <!--</div>-->
                </div>
            </div>
            <div class="clearfloat"></div>
        </div>
        <div class="mt-30">
            <div class="order float-left">
                <Orders :small="small"></Orders>
            </div>
            <div class="collect float-right">
                <p class="my">我的收藏</p>
                <div class="list">
                    <div class="item" v-for="(item,index) in collect" :key="index">
                        <img :src="item.shops_img" alt="">
                        <div class="collect_info">
                            <div class="name singlerow">{{ item.name }}</div>
                            <div class="major singlerow">主营产品：{{ item.major }}</div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="clearfloat"></div>
        </div>
    </div>
</template>

<script>
    import Orders from '@/components/personal/orders'
    export default {
        name: "default",
        props:{
            small:{
                type:Number,
                default:0
            }
        },
        components:{
            'Orders':Orders,
        },
        data(){
            return {
                info: {},
                money: '',
                integral: '',
                collect: []
            }
        },
        created() {
            this.JCService.UserServer.User_information().then(e=>{
                let str = e.value.headimgurl
                if(str.substr(0,1) != "h"){
                    e.value.headimgurl = this.JCconfig.filePath + e.value.headimgurl
                }
                this.info = e.value
            })
            this.JCService.PersonalServer.Balance_num().then(e=>{
                this.money = e.info ? e.info.money : 0
            })
            this.JCService.PersonalServer.Integral_num().then(e=>{
                this.integral = e.info ? e.info : 0;
            });
            this.JCService.PersonalServer.Recommend_collect().then(e=>{
                e.info.forEach(item=>{
                    item.shops_img = this.JCconfig.filePath + 'public/' + item.shops_img
                })
                this.collect = e.info
            });
        },
    }
</script>

<style lang='scss' scoped>
    .company{
        width: 250px;
        height: 243px;
        background: #CB0000;
        img{
            display: block;
            width: 110px;
            height: 110px;
            border-radius: 50%;
            border: 3px solid #fff;
            margin: 25px auto 20px;
        }
        .name{
            font-size: 18px;
            color: #fff;
            text-align: center;
            padding: 0 10px;
        }
        .edit{
            display: block;
            width:96px;
            height:24px;
            border:1px solid #fff;
            border-radius:12px;
            font-size: 16px;
            color: #fff;
            line-height: 24px;
            margin: 18px auto 0;
            text-align: center;
        }
    }
    .info{
        width: 709px;
        height: 225px;
        margin: 9px 0;
        padding-left: 40px;
        background: #fff;
        p{
            font-size: 16px;
            color: #000;
            margin-top: 20px;
        }
        .info_wrap{
            display: flex;
            margin-top: 62px;
            .item{
                margin-right: 100px;
                .num{
                    font-size: 24px;
                    color: #000;
                    font-weight: bold;
                    margin-bottom: 15px;
                }
                .name{
                    font-size: 14px;
                    color: #000;
                    margin-bottom: 20px;
                }
                .link{
                    display: flex;
                    justify-content: space-between;
                    .a{
                        display: block;
                        font-size: 14px;
                        color: #006DFF;
                    }
                    .a:hover{
                        color: #ff0000;
                    }
                }
            }
        }
    }
    .order{
        width: 638px;
    }
    .collect{
        width: 341px;
        background: #fff;
        .my{
            padding: 18px;
            font-size: 16px;
            color: #000;
        }
        .list{
            border-top: 1px solid #f5f5f5;
            padding: 15px 30px 15px 20px;
            .item{
                display: flex;
                margin-bottom: 30px;
                cursor: pointer;
                img{
                    display: block;
                    width:55px;
                    height:55px;
                    border-radius:2px;
                    margin-right: 17px;
                }
                .collect_info{
                    font-size: 14px;
                    .name{
                        color: #333;
                        margin: 8px 0;
                        max-width: 219px;
                    }
                    .major{
                        color: #666;
                        max-width: 219px;
                    }
                }
            }
            .item:last-child{
                margin-bottom: 0;
            }
        }
    }
</style>