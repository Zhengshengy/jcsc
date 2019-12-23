<template>
    <div class="bg">
        <div class="my">
            <p class="tit">我的优惠券</p>
            <p><img src="@/assets/image/personal/coupon.png"/>领取更多优惠劵</p>
        </div>
        <div class="selectBox">
            <div class="select" :class="{'active':isDown.coupon==true}" @click="select('coupon')">
                <div class="tit"><span>{{couponTxt}}</span><span class="el-icon-arrow-down el-icon--right" :class="{'rotate':isDown.coupon==true}"></span></div>
                <div class="list" v-show="isDown.coupon">
                    <div :class="{'active':coupon == 1}" @click="chooseCoupon(1)">可用优惠券</div>
                    <div :class="{'active':coupon == 2}" @click="chooseCoupon(2)">已用优惠券</div>
                    <div :class="{'active':coupon == 3}" @click="chooseCoupon(3)">过期优惠券</div>
                </div>
            </div>
            <!--<div class="select" :class="{'active':isDown.type==true}" @click="select('type')">-->
                <!--<div class="tit"><span>{{typeTxt}}</span><span class="el-icon-arrow-down el-icon&#45;&#45;right" :class="{'rotate':isDown.type==true}"></span></div>-->
                <!--<div class="list" v-show="isDown.type">-->
                    <!--<div :class="{'active':type == 1}" @click="chooseType(1)">满减券</div>-->
                    <!--<div :class="{'active':type == 2}" @click="chooseType(2)">免邮券</div>-->
                <!--</div>-->
            <!--</div>-->
        </div>
        <div class="couponList" v-show="dataLen > 0">
            <div class="item" v-for="item in list" :key="item.id">
                <div class="top topBlue">
                    <div class="num"><span>￥</span><div>{{ item.money }}</div></div>
                    <div class="condition">满{{ item.rule }}可用</div>
                    <div class="time">{{ item.create_time }}-{{ item.end_time }}</div>
                </div>
                <div class="bom">
                    <div class="type"><span>类型：</span>商品优惠券</div>
                    <div class="name"><span>店铺：</span>{{ item.name }}</div>
                    <router-link :to="{name:'subwebsiteIndex',query:{shop_id:item.shop_id}}" tag="div" class="btn">立即使用</router-link>
                </div>
            </div>
            <!--<div class="item">-->
                <!--<div class="top topRed">-->
                    <!--<div class="num">包邮</div>-->
                    <!--<div class="condition">满200可用</div>-->
                    <!--<div class="time">2019.09.28-2019.12.16</div>-->
                <!--</div>-->
                <!--<div class="bom">-->
                    <!--<div class="type"><span>类型：</span>物流包邮券</div>-->
                    <!--<div class="name"><span>店铺：</span>陕西三只羊建材有限公司</div>-->
                    <!--<div class="btn">立即使用</div>-->
                <!--</div>-->
            <!--</div>-->
            <!--<div class="item">-->
                <!--<div class="top topGray">-->
                    <!--<div class="num">包邮</div>-->
                    <!--<div class="condition">满200可用</div>-->
                    <!--<div class="time">2019.09.28-2019.12.16</div>-->
                <!--</div>-->
                <!--<div class="bom">-->
                    <!--<div class="type"><span>类型：</span>物流包邮券</div>-->
                    <!--<div class="name"><span>店铺：</span>陕西三只羊建材有限公司</div>-->
                    <!--<img src="@/assets/image/personal/use.png" alt="">-->
                <!--</div>-->
            <!--</div>-->
            <!--<div class="item">-->
                <!--<div class="top topGray">-->
                    <!--<div class="num">包邮</div>-->
                    <!--<div class="condition">满200可用</div>-->
                    <!--<div class="time">-2019.12.16</div>-->
                <!--</div>-->
                <!--<div class="bom">-->
                    <!--<div class="type"><span>类型：</span>物流包邮券</div>-->
                    <!--<div class="name"><span>店铺：</span>陕西三只羊建材有限公司</div>-->
                    <!--<img src="@/assets/image/personal/expired.png" alt="">-->
                <!--</div>-->
            <!--</div>-->
        </div>
        <div class="noData" v-show="dataLen == 0">
            <img src="@/assets/image/personal/nomessage.png" alt="">
            <p>亲~您还没有一张劵，快去喜欢的商铺领取吧！</p>
        </div>
        <div class="page">
            <el-pagination background
                           @current-change="handleCurrentChange"
                           :current-page.sync="currentPage" :page-size="pageSize"
                           layout="prev, pager, next, jumper" :total="total"
                           prev-text="上一页" next-text="下一页">
            </el-pagination>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Coupon",
        data(){
            return {
                isDown:{
                    coupon:false,
                    type:false
                },
                couponTxt:'可用优惠券',
                typeTxt:'优惠券类型',
                dataLen:10,
                coupon:1,
                type:0,
                currentPage: 1,
                pageSize:0,
                total:0,
                list: []
            }
        },
        created(){
            this.getData()
        },
        methods:{
            select(txt){
                this.isDown[txt] = !this.isDown[txt];
            },
            chooseCoupon(num){
                this.coupon = num;
                switch(num) {
                    case 1:
                        this.couponTxt = '可用优惠券';
                        // this.dataLen = 3;
                        break;
                    case 2:
                        this.couponTxt = '已用优惠券';
                        break;
                    case 3:
                        this.couponTxt = '过期优惠券';
                        // this.dataLen = 0;
                        break;
                }
                this.getData()
            },
            chooseType(num){
                this.type = num;
                switch(num) {
                    case 1:
                        this.typeTxt = '满减劵';
                        this.dataLen = 3;
                        break;
                    case 2:
                        this.typeTxt = '免邮劵';
                        break;
                }
            },
            handleCurrentChange(val){
                this.getData(val)
            },
            getData(){
                //用户优惠券
                this.JCService.PersonalServer.getUserAllCoupon({pag:this.currentPage,state:this.coupon}).then(e=>{
                    e.info.data.forEach(item=>{
                        item.create_time = this.JCutils.Format1(item.create_time*1000)
                        item.end_time = this.JCutils.Format1(item.end_time*1000)
                    })
                    this.list = e.info.data
                    this.currentPage = e.info.current_page
                    this.total = e.info.total
                    this.pageSize = e.info.per_page
                });
            }
        }
    }
</script>

<style lang='scss' scoped>
    .bg{
        background: #fff;
        padding-bottom: 30px;
        .my{
            padding: 0 19px  0 18px;
            height: 53px;
            line-height: 53px;
            display: flex;
            justify-content: space-between;
            margin-bottom: 34px;
            border-bottom: 1px solid #f5f5f5;
            .tit{
                font-size: 16px;
                color: #000;
            }
            p{
                font-size: 14px;
                color: #333;
                img{
                    margin-right: 3px;
                    vertical-align: sub;
                }
            }
        }
        .selectBox{
            width: 939px;
            height: 30px;
            background: #f5f5f5;
            margin: 0 auto 30px;
            line-height: 30px;
            font-size: 12px;
            display: flex;
            .select{
                width: 130px;
                margin-left: 15px;
                border: 1px solid transparent;
                border-bottom-width: 0;
                position: relative;
                cursor: pointer;
                .tit{
                    font-size: 12px;
                    color: #333;
                    text-indent: 20px;
                    line-height: 30px;
                    span{
                        transition: all .3s ease-in-out;
                        margin-left: 3px;
                        text-indent: 0;
                    }
                    span.rotate{
                        transform: rotate(180deg);
                    }
                }
                .list{
                    position: absolute;
                    top: 100%;
                    left: -1px;
                    width: 130px;
                    border: 1px solid #ddd;
                    border-top-width: 0;
                    background: #fff;
                    color: #666;
                    text-indent: 22px;
                    transition: all .3s ease-in;
                    z-index: 10;
                    div{
                        position: relative;
                    }
                    div.active{
                        color: #E60012;
                    }
                    div.active:before{
                        position: absolute;
                        display: block;
                        content: '';
                        width: 11px;
                        height: 7px;
                        background: url("../../assets/image/personal/choose.png");
                        left: 4px;
                        top: 11px;
                    }
                }
            }
            .select.active{
                border-color: #ddd;
                background: #fff;
            }
        }
        .couponList{
            width: 939px;
            margin: 0 auto;
            display: flex;
            flex-wrap: wrap;
            .item{
                width: 213px;
                margin-right: 28px;
                margin-bottom: 28px;
                background: #f9f9f9;
                .top{
                    width: 100%;
                    height: 179px;
                    background-size:100% 100%;
                    text-align: center;
                    color: #fff;
                    font-size: 14px;
                    .num{
                        padding-top: 35px;
                        font-size: 35px;
                        font-weight: bold;
                        display: flex;
                        align-items: start;
                        justify-content: center;
                        span{
                            font-size: 24px;
                            font-weight: normal;
                        }
                        div{
                            font-size: 40px;
                        }
                    }
                    .condition{
                        margin: 25px 0;
                    }
                }
                .topBlue{
                    background-image: url("../../assets/image/personal/mj.png");
                }
                .topRed{
                    background-image: url("../../assets/image/personal/by.png");
                }
                .topGray{
                    background-image: url("../../assets/image/personal/gray.png");
                }
                .bom{
                    height: 163px;
                    padding: 0 18px;
                    font-size: 12px;
                    color: #666;
                    span{
                        color: #333;
                    }
                    .type{
                        margin: 19px 0 10px;
                    }
                    .name{
                        margin-bottom: 38px;
                    }
                    .btn{
                        width:121px;
                        height:33px;
                        border:1px solid #006dff;
                        border-radius:17px;
                        font-size: 14px;
                        color: #006dff;
                        text-align: center;
                        line-height: 33px;
                        background: #fff;
                        margin: 0 auto;
                    }
                    img{
                        margin-left: 99px;
                    }
                }
            }
            .item:nth-of-type(4n){
                margin-right: 0px;
            }
        }
        .noData{
            img{
                display: block;
                margin: 111px auto 30px;
            }
            p{
                font-size: 16px;
                color: #333;
                text-align: center;
                margin-bottom: 200px;
            }
        }
        .page{
            width: 630px;
            margin: 30px auto;
            height: 30px;
        }
    }
</style>