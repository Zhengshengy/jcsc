<template>
    <div class="box">
        <p class="my">我的订单</p>
        <div class="tab">
            <!--<div class="item" @click="tabFun('all')">-->
                <!--<img v-show="status.all == 0" src="@/assets/image/personal/orders.png" alt="">-->
                <!--<img v-show="status.all == 1" src="@/assets/image/personal/ordersA.png" alt="">-->
                <!--<p>全部订单</p>-->
            <!--</div>-->
            <div class="item" @click="tabFun('paying',0,1)">
                <img v-show="status.paying == 0" src="@/assets/image/personal/paying.png" alt="">
                <img v-show="status.paying == 1" src="@/assets/image/personal/payingA.png" alt="">
                <p>待支付</p>
            </div>
            <div class="item" @click="tabFun('send',1,1)">
                <img v-show="status.send == 0" src="@/assets/image/personal/send.png" alt="">
                <img v-show="status.send == 1" src="@/assets/image/personal/sendA.png" alt="">
                <p>待发货</p>
            </div>
            <div class="item" @click="tabFun('take',1,2)">
                <img v-show="status.take == 0" src="@/assets/image/personal/take.png" alt="">
                <img v-show="status.take == 1" src="@/assets/image/personal/takeA.png" alt="">
                <p>待收货</p>
            </div>
            <div class="item" @click="tabFun('fail',1,4)">
                <img v-show="status.fail == 0" src="@/assets/image/personal/fail.png" alt="">
                <img v-show="status.fail == 1" src="@/assets/image/personal/failA.png" alt="">
                <p>失败</p>
            </div>
            <div class="item" @click="tabFun('complete',1,3)">
                <img v-show="status.complete == 0" src="@/assets/image/personal/complete.png" alt="">
                <img v-show="status.complete == 1" src="@/assets/image/personal/completeA.png" alt="">
                <p>已完成</p>
            </div>
        </div>
        <div class="detailTit" v-if="listLen>0">
            <div class="detail">订单详情</div>
            <div class="money" v-show="small == 1">金额</div>
            <div class="status">订单状态</div>
            <div class="operation" v-show="small == 1">操作</div>
        </div>
        <div class="list" v-if="listLen>0">
            <div class="item" v-for="item in list" :key="item.id">
                <div class="time">
                    <div class="mr-45">{{item.create_time}}</div>
                    <div><span>订单号：</span>{{ item.order_sn }}</div>
                </div>
                <div class="info_wrap">
                    <div class="prods">
                        <div class="prod" v-for="(prod,index) in item.orderdetail.datas" :key="index" v-show="index<2">
                            <img :src="prod.img[0]" alt="">
                            <div class="info">
                                <div class="name singlerow">{{prod.name}}</div>
                                <router-link :to="'/subwebsite/?shop_id='+item.shop_id" class="company singlerow">卖方：{{item.shop_name}}</router-link>
                            </div>
                            <div class="num">x{{prod.num}}</div>
                        </div>
                    </div>
                    <div class="total" v-show="small == 1">总额￥{{item.total_money}}</div>
                    <div class="status" :class="{'noLine':small == 0}">
                        <div v-if="item.order_status == 3">已完成</div>
                        <div v-if="item.order_status == 1 & item.status == 1">待发货</div>
                        <div v-if="item.order_status == 2">待收货</div>
                        <div v-if="item.order_status == 4">失败</div>
                        <div v-if="item.status == 0">待支付</div>
                        <router-link :to="'/order/detail?id='+item.id+'&status='+item.status+'&order_status='+item.order_status" class="toDetail">订单详情</router-link>
                    </div>
                    <div class="operation" v-show="small == 1">
                        <div class="btn" v-if="item.order_status == 3"><img src="@/assets/image/personal/cartBtn.png" alt="">订单完成</div>
                        <div class="btn cursor" v-if="item.order_status == 1 & item.status == 1" @click="remind(item.id)"><img src="@/assets/image/personal/cartBtn.png" alt="">提醒发货</div>
                        <div class="btn cursor" v-if="item.order_status == 2" @click="confirmTake(item.id)"><img src="@/assets/image/personal/cartBtn.png" alt="">确认收货</div>
                        <div class="btn" v-if="item.order_status == 4"><img src="@/assets/image/personal/cartBtn.png" alt="">订单失败</div>
                        <div class="btn cursor" v-if="item.status == 0" @click="paying(item.id)"><img src="@/assets/image/personal/cartBtn.png" alt="">继续支付</div>
                    </div>
                </div>
            </div>
        </div>
        <div class="list" v-if="listLen == 0">
            <h3>暂无订单</h3>
        </div>
        <div class="page" v-show="small == 1">
            <el-pagination background
                           @current-change="handleCurrentChange"
                           :current-page.sync="currentPage" :page-size="5"
                           layout="prev, pager, next, jumper" :total="total"
                           prev-text="上一页" next-text="下一页">
            </el-pagination>
        </div>
    </div>
</template>

<script>
    export default {
        name: "orders",
        props:{
            small:{
                type:Number,
                default:1
            }
        },
        data () {
            return {
                status:{
                  // all:1,
                  paying:1,
                  send:0,
                  take:0,
                  fail:0,
                  complete: 0
                },
                currentPage: 1,
                type:1,
                payType:0,
                orderType:1,
                list:[],
                listLen:0,
                totalLen:{},
                total:0
            }
        },
        created(){
            this.getData();
            //订单总数获取
            this.JCService.PersonalServer.conum().then(e=>{
                this.totalLen = e.info;
                this.total = this.totalLen[0];
            })
        },
        methods:{
            getData(){
                let sendData = {
                    'status':this.payType,
                    'page':this.currentPage,
                    'order_type':1,
                }
                if(this.payType == 1){
                    sendData.order_status = this.orderType;
                }
                this.JCService.PersonalServer.orderIndex(sendData).then(e=>{
                    let Base64 = require('js-base64').Base64;
                    this.list = JSON.parse(Base64.decode(e.info));
                    for(let i in this.list){
                        this.list[i].create_time = this.JCutils.Format(this.list[i].create_time*1000);
                        let item = this.list[i].orderdetail.datas;
                        for(let j in item){
                            item[j].img = item[j].img.split(',');
                            for(let k in item[j].img){
                                item[j].img[k] = this.JCconfig.filePath+'public/'+item[j].img[k];
                            }
                        }
                    }
                    this.listLen = this.list.length;
                })
            },
            tabFun(txt,status,order_status){
                for(var item in this.status){
                    this.status[item] = 0;
                }
                this.status[txt] = 1;
                this.payType = status;
                this.orderType = order_status;
                if(status == 0){
                    this.total=this.totalLen[0];
                }else{
                    this.total=this.totalLen[order_status];
                }
                this.getData();
            },
            handleSizeChange() {

            },
            handleCurrentChange() {
                this.getData();
            },
            //提醒发货
            remind(id){
               this.JCService.cartServer.alertSipping({'orderid':id}).then(e=>{
                   let type = 'success';
                   if(e.status == 0){
                       type = 'warning'
                   }
                   this.$message({
                       message: e.info,
                       type: type
                   });
               })
            },
            //继续支付
            paying(id){
                this.$router.push('/orderPay?id='+id);
            },
            //确认收货
            confirmTake(id){
                this.JCService.cartServer.confirmOrder({'id':id}).then(e=>{
                    let type = 'success';
                    if(e.status == 0){
                        type = 'warning'
                    }else{
                        this.$router.push('/personal/orders');
                    }
                    this.$message({
                        message: e.info,
                        type: type
                    });
                })
            },
        }
    }
</script>

<style lang='scss' scoped>
    .box{
        width: 100%;
        background: #fff;
        .my{
            font-size: 16px;
            color: #000;
            margin-bottom: 48px;
            height: 53px;
            border-bottom: 1px solid #F5F5F5;
            line-height: 53px;
            text-indent: 18px;
        }
        .tab{
            display: flex;
            justify-content: space-around;
            margin-bottom: 26px;
            .item{
                p{
                    font-size: 14px;
                    color: #000;
                    margin-top: 10px;
                    text-align: center;
                }
            }
        }
        .detailTit{
            width: auto;
            height: 35px;
            margin:  0 20px;
            background: #f5f5f5;
            display: flex;
            line-height: 35px;
            font-size: 12px;
            color: #333;
            div{
                width: 158px;
                text-align: center;
            }
            .detail{
                width: 480px;
                text-align: left;
                text-indent: 17px;
            }
        }
        .list{
            border-top: 1px solid #F5F5F5;
            padding:20px;
            h3{text-align: center;}
            .item{
                border: 1px solid #e5e5e5;
                margin-bottom: 20px;
                .time{
                    display: flex;
                    height: 31px;
                    background: #f5f5f5;
                    line-height: 31px;
                    font-size: 12px;
                    color: #666;
                    padding-left: 15px;
                    span{
                        color: #999;
                    }
                }
                .info_wrap{
                    display: flex;
                    align-items: center;
                    position: relative;
                    .prods{
                        width: 480px;
                        border-right: 1px solid #e5e5e5;
                        .prod{
                            display: flex;
                            align-items: center;
                            padding: 15px;
                            border-bottom: 1px solid #e5e5e5;
                            img{
                                display: block;
                                width: 60px;
                                height: 60px;
                                border-radius: 2px;
                                margin-right: 15px;
                            }
                            .info{
                                width: 315px;
                                margin-right: 16px;
                                font-size: 12px;
                                .name{
                                    color: #333;
                                    margin: 10px 0;
                                }
                                .company{
                                    color: #666;
                                }
                            }
                            .num{
                                font-size: 12px;
                                color: #666;
                            }
                        }
                        .prod:last-of-type{
                            border-bottom: 0;
                        }
                    }
                    .total,.status,.operation{
                        width: 158px;
                        font-size: 12px;
                        text-align: center;
                    }
                    .total{
                        color: #666;
                    }
                    .status{
                        color: #666;
                        .fail{
                            color: #FF0000;
                        }
                        .toDetail{
                            color: #333;
                        }
                    }
                    .operation{
                        color: #333;
                        border-right: 0;
                        .btn{
                            width:87px;
                            height:29px;
                            background:#f5f5f5;
                            border:1px solid #ddd;
                            border-radius:2px;
                            margin: 0 auto;
                            color: #333;
                            user-select: none;
                            img{
                                vertical-align: middle;
                                margin-right: 6px;
                            }
                        }
                        .cancel{
                            color: #999;
                            margin-top: 8px;
                        }
                    }
                    .total:after,.status:after{
                        display: block;
                        content: '';
                        position: absolute;
                        height: 100%;
                        top: 0;
                        left: 639px;
                        width: 1px;
                        background: #e5e5e5;
                    }
                    .status:after{
                        left:798px;
                    }
                    .noLine:after{
                        display: none;
                    }
                }
                .info{
                    .tit{
                        display: flex;
                        justify-content: space-between;
                        font-size: 14px;
                        margin: 8px 60px 15px 0;
                        width: 725px;
                        .name{
                            color: #333;
                        }
                        .price{
                            color: #FF0000;
                        }
                    }
                    .tit.has{
                        width: 407px;
                        margin: 8px 30px 15px 0;
                    }
                    .company{
                        display: flex;
                        font-size: 14px;
                        .name{
                            color: #666;
                        }
                        .status{
                            color: #006DFF;
                            margin-left: 31px;
                        }
                    }
                }
                .btn{
                    width:86px;
                    height:27px;
                    border:1px solid #a0a0a0;
                    border-radius:14px;
                    line-height: 27px;
                    text-align: center;
                    font-size: 14px;
                    color: #666;
                }
            }
            .item:last-child{margin-bottom: 0;}
        }
        .page{
            text-align: center;
            width: 630px;
            margin: 0px auto;
            height: 30px;
            padding-bottom: 20px;
        }
    }
</style>