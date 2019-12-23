<template>
    <div class="box">
        <Top></Top>
        <div class="mid">
            <div class="remind">
                <div class="wrap">
                    <img src="@/assets/image/personal/tooltip.png" alt="" class="mr-10">
                    <span>安全提醒：为了您的财产安全，不要点击陌生链接、不要向陌生人转账或透漏银行卡和验证码信息，谨防诈骗！</span>
                </div>
            </div>
            <div class="main">
                <div class="wrap">
                    <div class="position">
                        <router-link to="/personal" class="link">我的陕西建材商城</router-link>
                        <span class="el-icon-arrow-right"></span>
                        <router-link to="/personal/orders" class="link">订单中心</router-link>
                        <span class="el-icon-arrow-right"></span>
                        <span class="orderNum">订单：{{info.order_sn}}</span>
                    </div>
                    <div class="orderStatus" v-if="status==0">
                        <div class="left">
                            <div class="txt">订单号：{{info.order_sn}}</div>
                            <div class="statusTxt">等待付款</div>
                            <!--<p class="payTip"><img src="@/assets/image/personal/time.png" alt=""><span>剩余10分</span></p>-->
                            <div class="btnBox">
                                <div class="btn" @click="paying(info.id)">付款</div>
                                <!--<div class="btn gray">修改地址</div>-->
                                <!--<div class="btn gray">取消订单</div>-->
                            </div>
                        </div>
                        <div class="right">
                            <div class="txt">该订单会为您保留10分钟（从下单时间算起），10分钟之后如果还未付款，系统将自动删除该订单。</div>
                            <div class="status_wrap">
                                <div class="step step1 active">
                                    <img src="@/assets/image/personal/submitDR.png" alt="">
                                    <p>提交订单</p>
                                    <p class="time">{{info.create_time}}</p>
                                </div>
                                <div class="arrowBox">
                                    <img src="@/assets/image/personal/arrowHalf.png" alt="">
                                    <span class="tool">等待付款</span>
                                </div>
                                <div class="step step2">
                                    <img src="@/assets/image/personal/payD.png" alt="">
                                    <p>付款成功</p>
                                </div>
                                <div class="arrowBox">
                                    <img src="@/assets/image/personal/arrowGray.png" alt="">
                                </div>
                                <div class="step step3">
                                    <img src="@/assets/image/personal/sendD.png" alt="">
                                    <p>商品发货</p>
                                </div>
                                <div class="arrowBox">
                                    <img src="@/assets/image/personal/arrowGray.png" alt="">
                                </div>
                                <div class="step step4">
                                    <img src="@/assets/image/personal/takeD.png" alt="">
                                    <p>等待收货</p>
                                </div>
                                <div class="arrowBox">
                                    <img src="@/assets/image/personal/arrowGray.png" alt="">
                                </div>
                                <div class="step step5">
                                    <img src="@/assets/image/personal/completeD.png" alt="">
                                    <p>订单完成</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="orderStatus" v-if="order_status==4 & status==1">
                        <div class="left">
                            <div class="txt">订单号：{{info.order_sn}}</div>
                            <div class="statusTxt">失败</div>
                            <p class="payTip"></p>
                            <div class="btnBox">
                                <!--<div class="btn">重新购买</div>-->
                            </div>
                            <div class="failReason">失败原因：{{info.reason}}</div>
                        </div>
                        <div class="right">
                            <div class="txt">尊敬的客户，您的订单卖家取消发货，本次购物未完成。</div>
                            <div class="status_wrap">
                                <div class="step step1 active">
                                    <img src="@/assets/image/personal/submitDR.png" alt="">
                                    <p>提交订单</p>
                                    <p class="time">{{info.create_time}}</p>
                                </div>
                                <div class="arrowBox">
                                    <img src="@/assets/image/personal/arrowR.png" alt="">
                                </div>
                                <div class="step step2 active">
                                    <img src="@/assets/image/personal/payDR.png" v-show="status != 5" alt="">
                                    <p>付款成功</p>
                                    <p class="time">{{info.pay_time}}</p>
                                </div>
                                <div class="arrowBox">
                                    <img src="@/assets/image/personal/arrowHalf.png" alt="">
                                    <span class="tool">等待发货</span>
                                </div>
                                <div class="step step3">
                                    <img src="@/assets/image/personal/sendD.png" alt="">
                                    <p>商品发货</p>
                                </div>
                                <div class="arrowBox">
                                    <img src="@/assets/image/personal/arrowGray.png" alt="">
                                </div>
                                <div class="step step4">
                                    <img src="@/assets/image/personal/takeD.png" alt="">
                                    <p>等待收货</p>
                                </div>
                                <div class="arrowBox">
                                    <img src="@/assets/image/personal/arrowGray.png" alt="">
                                </div>
                                <div class="step step5">
                                    <img src="@/assets/image/personal/completeD.png" alt="">
                                    <p>订单完成</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="orderStatus" v-if="order_status==3 & status==1">
                        <div class="left">
                            <div class="txt">订单号：{{info.order_sn}}</div>
                            <div class="statusTxt">订单完成</div>
                            <p class="payTip"></p>
                            <div class="btnBox">
                                <!--<div class="btn">再次购买</div>-->
                            </div>
                        </div>
                        <div class="right">
                            <div class="txt">尊敬的客户，您的订单已完成，祝您下次购物愉快。</div>
                            <div class="status_wrap">
                                <div class="step step1 active">
                                    <img src="@/assets/image/personal/submitDR.png" alt="">
                                    <p>提交订单</p>
                                    <p class="time">{{info.create_time}}</p>
                                </div>
                                <div class="arrowBox">
                                    <img src="@/assets/image/personal/arrowR.png" alt="">
                                </div>
                                <div class="step step2 active">
                                    <img src="@/assets/image/personal/payDR.png" alt="">
                                    <p>付款成功</p>
                                    <p class="time">{{info.pay_time}}</p>
                                </div>
                                <div class="arrowBox">
                                    <img src="@/assets/image/personal/arrowR.png" alt="">
                                </div>
                                <div class="step step3 active">
                                    <img src="@/assets/image/personal/sendDR.png" alt="">
                                    <p>商品发货</p>
                                    <p class="time">{{info.shipping_time}}</p>
                                </div>
                                <div class="arrowBox">
                                    <img src="@/assets/image/personal/arrowR.png" alt="">
                                </div>
                                <div class="step step4 active">
                                    <img src="@/assets/image/personal/takeDR.png" alt="">
                                    <p>等待收货</p>
                                    <p class="time">{{info.receive_time}}</p>
                                </div>
                                <div class="arrowBox">
                                    <img src="@/assets/image/personal/arrowR.png" alt="">
                                </div>
                                <div class="step step5 active">
                                    <img src="@/assets/image/personal/completeDR.png" alt="">
                                    <p>订单完成</p>
                                    <p class="time">{{info.receive_time}}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="orderStatus" v-if="order_status==2 & status==1">
                        <div class="left">
                            <div class="txt">订单号：{{info.order_sn}}</div>
                            <div class="statusTxt">等待收货</div>
                            <p class="payTip"></p>
                            <div class="btnBox">
                                <div class="btn cursor" @click="confirmTake(info.id)">确认收货</div>
                                <div class="btn gray cursor" @click="delayTake(info.id)">延长收货时间</div>
                            </div>
                            <!--<div class="takeTip">您还有<span class="countDown">14天0小时32分18秒</span>来确认收货，超时订单自动确认收货</div>-->
                        </div>
                        <div class="right">
                            <div class="txt">尊敬的客户，您的订单已发货，请您耐心等候商品到达您的手中。</div>
                            <div class="status_wrap">
                                <div class="step step1 active">
                                    <img src="@/assets/image/personal/submitDR.png" alt="">
                                    <p>提交订单</p>
                                    <p class="time">{{info.create_time}}</p>
                                </div>
                                <div class="arrowBox">
                                    <img src="@/assets/image/personal/arrowR.png" alt="">
                                </div>
                                <div class="step step2 active">
                                    <img src="@/assets/image/personal/payDR.png" alt="">
                                    <p>付款成功</p>
                                    <p class="time">{{info.pay_time}}</p>
                                </div>
                                <div class="arrowBox">
                                    <img src="@/assets/image/personal/arrowR.png" alt="">
                                </div>
                                <div class="step step3 active">
                                    <img src="@/assets/image/personal/sendDR.png" alt="">
                                    <p>商品发货</p>
                                    <p class="time">{{info.shipping_time}}</p>
                                </div>
                                <div class="arrowBox">
                                    <img src="@/assets/image/personal/arrowHalf.png" alt="">
                                    <span class="tool">等待收货</span>
                                </div>
                                <div class="step step4">
                                    <img src="@/assets/image/personal/takeD.png" alt="">
                                    <p>等待收货</p>
                                </div>
                                <div class="arrowBox">
                                    <img src="@/assets/image/personal/arrowGray.png" alt="">
                                </div>
                                <div class="step step5">
                                    <img src="@/assets/image/personal/completeD.png" alt="">
                                    <p>订单完成</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="orderStatus" v-if="order_status==1 & status==1">
                        <div class="left">
                            <div class="txt">订单号：{{info.order_sn}}</div>
                            <div class="statusTxt">等待发货</div>
                            <p class="payTip"></p>
                            <div class="btnBox">
                                <!--<div class="btn">修改地址</div>-->
                                <!--<div class="btn gray">取消订单</div>-->
                                <div class="btn"  @click="remind(info.id)">提醒发货</div>
                            </div>
                        </div>
                        <div class="right">
                            <div class="txt">尊敬的客户，您的订单已支付，等待卖家发货，请您耐心等候。</div>
                            <div class="status_wrap">
                                <div class="step step1 active">
                                    <img src="@/assets/image/personal/submitDR.png" alt="">
                                    <p>提交订单</p>
                                    <p class="time">{{info.create_time}}</p>
                                </div>
                                <div class="arrowBox">
                                    <img src="@/assets/image/personal/arrowR.png" alt="">
                                </div>
                                <div class="step step2 active">
                                    <img src="@/assets/image/personal/payDR.png" alt="">
                                    <p>付款成功</p>
                                    <p class="time">{{info.pay_time}}</p>
                                </div>
                                <div class="arrowBox">
                                    <img src="@/assets/image/personal/arrowHalf.png" alt="">
                                    <span class="tool">等待发货</span>
                                </div>
                                <div class="step step3">
                                    <img src="@/assets/image/personal/sendD.png" alt="">
                                    <p>商品发货</p>
                                </div>
                                <div class="arrowBox">
                                    <img src="@/assets/image/personal/arrowGray.png" alt="">
                                </div>
                                <div class="step step4">
                                    <img src="@/assets/image/personal/takeD.png" alt="">
                                    <p>等待收货</p>
                                </div>
                                <div class="arrowBox">
                                    <img src="@/assets/image/personal/arrowGray.png" alt="">
                                </div>
                                <div class="step step5">
                                    <img src="@/assets/image/personal/completeD.png" alt="">
                                    <p>订单完成</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="orderInfo">
                        <div class="address">
                            <div class="tit">收货人信息</div>
                            <div><span class="name">收货人：</span><span>{{addressName}}</span></div>
                            <div><span class="name">地址：</span><span>{{address}}</span></div>
                            <div><span class="name">手机号码：</span><span>{{phone}}</span></div>
                        </div>
                        <div class="logistics">
                            <div class="tit">物流信息</div>
                            <div><span class="name">物流方式：</span><span>邮费到付</span></div>
                            <div v-show="order_status == 2 || order_status == 3"><span class="name">发货时间：</span><span>{{info.shipping_time}}</span></div>
                            <div v-show="order_status== 3"><span class="name">收货时间：</span><span>{{info.receive_time}}</span></div>
                            <div v-show="order_status == 2 || order_status == 3" v-if="info.orderinvoicedetail != undefined">
                                <span class="name">物流单号：</span>
                                <el-image
                                        class="img"
                                        :src="info.orderinvoicedetail[0].name"
                                        :preview-src-list="[info.orderinvoicedetail[0].name]">
                                </el-image>
                            </div>
                        </div>
                        <div class="pay">
                            <div class="tit">付款信息</div>
                            <div><span class="name">付款方式：</span><span>在线支付</span></div>
                            <div v-show="status == 1"><span class="name">付款时间：</span><span>{{info.pay_time}}</span></div>
                            <div><span class="name">商品总额：</span><span>￥{{info.total_money}}</span></div>
                            <div><span class="name">优惠券：</span><span class="red">￥{{info.district_money}}</span></div>
                            <div><span class="name">应支付金额：</span><span>￥{{info.payment_money}}</span></div>
                        </div>
                    </div>
                    <div class="prodInfo">
                        <div class="prods_tit">
                            <div class="nameBox">商品</div>
                            <div class="price">价格</div>
                            <div class="num">数量</div>
                        </div>
                        <div v-if="info.orderdetail">
                            <div class="prods_wrap"  v-for="(item,index) in info.orderdetail.datas" :key="index">
                                <div class="nameBox">
                                    <img :src="item.img[0]" alt="">
                                    <div class="info">
                                        <div class="name singlerow">{{item.name}}</div>
                                        <div class="company">卖方：{{info.shop_name}}</div>
                                    </div>
                                </div>
                                <div class="price">￥{{item.price}}</div>
                                <div class="num">{{item.num}}</div>
                            </div>
                        </div>
                        <div class="allInfo">
                            <div class="flex"><span class="name">商品总额：</span><span>￥{{info.total_money}}</span></div>
                            <div class="flex"><span class="name">商品优惠：</span><span>￥{{info.district_money}}</span></div>
                            <div class="flex"><span class="name">物流方式：</span><span>邮费到付</span></div>
                            <div class="flex actualNum"><span class="name">应付金额：</span><span class="money">￥{{info.payment_money}}</span></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import Top from '@/components/personal/top'
    export default {
        name: "orderDetail",
        components:{
            'Top' :Top,
        },
        data(){
            return {
                order_status:0,
                status:0,
                info:{},
                addressName:'',
                phone:'',
                address:''
            }
        },
        created(){
            this.status=this.$route.query.status;
            this.order_status = this.$route.query.order_status;
            this.JCService.cartServer.userDetail({'id':this.$route.query.id}).then(e=>{
                let Base64 = require('js-base64').Base64;
                let list = JSON.parse(Base64.decode(e.info));
                this.info = list;
                let datas = this.info.orderdetail.datas;
                for(let i in datas){
                    datas[i].img = datas[i].img.split(',');
                    for(let j in datas[i].img){
                        datas[i].img[j] = this.JCconfig.filePath +'public/'+ datas[i].img[j];
                    }
                }
                //下单时间
                this.info.create_time = this.JCutils.Format(this.info.create_time*1000);
                //付款时间
                if(this.info.pay_time != 0){
                    this.info.pay_time = this.JCutils.Format(this.info.pay_time*1000);
                }
                //发货时间
                if(this.info.shipping_time != 0){
                    this.info.shipping_time = this.JCutils.Format(this.info.shipping_time*1000);
                }
                //收货时间、完成时间
                if(this.info.receive_time != 0){
                    this.info.receive_time = this.JCutils.Format(this.info.receive_time*1000);
                }
                //发货单图片
                if(this.info.orderinvoicedetail != undefined){
                    this.info.orderinvoicedetail[0].name = this.JCconfig.filePath + this.info.orderinvoicedetail[0].name;
                }
                //地址获取
                this.JCService.PersonalServer.Address_list({id:this.info.address_id}).then(e=>{
                    let item = e.info[0];
                    let address = item.address.split(',');
                    this.address = address[0]+address[1]+address[2]+address[3];
                    this.addressName = item.name;
                    this.phone = item.phone;
                });
            })
        },
        methods:{
            //付款按钮
            paying(id){
                this.$router.push('/orderPay?id='+id);
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
            //延迟收货
            delayTake(id){
                this.JCService.cartServer.delayOrder({'id':id}).then(e=>{
                    let type = 'success';
                    if(e.status == 0){
                        type = 'warning'
                    }
                    this.$message({
                        message: e.info,
                        type: type
                    });
                })
            }
        }
    }
</script>

<style lang='scss' scoped>
    .box{
        background: #f5f5f5;
    }
    .mid{
        width: 100%;
        background: #f5f5f5;
        padding-bottom: 30px;
        .remind{
            background: #fff;
            height: 30px;
            line-height: 30px;
            font-size: 12px;
            color: #333;
            margin-bottom: 20px;
            img{
                width: 17px;
                height: 15px;
                vertical-align: middle;
            }
        }
        .wrap{
            width: 1200px;
            margin: 0 auto;
            .position{
                font-size: 12px;
                margin-bottom: 20px;
                .link{
                    color: #666;
                }
                .el-icon-arrow-right{
                    margin: 0 10px;
                }
                .orderNum{
                    color: #333;
                    font-weight: bold;
                }
            }
            .orderStatus{
                background: #fff;
                border-top: 3px solid #FF0000;
                display: flex;
                .txt{
                    font-size: 12px;
                    color: #999;
                }
                .left{
                    width: 326px;
                    text-align: center;
                    padding: 20px 0 30px;
                    border-right: 1px solid #f1f1f1;
                    .statusTxt{
                        margin-top: 35px;
                        color: #FF0000;
                        font-size: 24px;
                        font-weight: bold;
                        margin-bottom: 8px;
                    }
                    .payTip{
                        height: 15px;
                        line-height: 15px;
                        font-size: 12px;
                        color: #999;
                        img{
                            width: 15px;
                            height: 15px;
                            margin-right: 3px;
                            vertical-align: middle;
                        }
                    }
                    .btnBox{
                        margin-top: 20px;
                        .btn{
                            width: 100px;
                            height: 29px;
                            border-radius: 2px;
                            border: 1px solid #FF0000;
                            text-align: center;
                            line-height: 29px;
                            margin:0 auto 10px;
                            font-size: 12px;
                            color: #FF0000;
                        }
                        .btn:last-of-type{
                            margin-bottom: 0;
                        }
                        .btn.gray{
                            border-color: #D2D2D2;
                            background: #f5f5f5;
                            color: #333;
                        }
                    }
                    .failReason{
                        font-size: 14px;
                        color: #FF0000;
                        margin-top: 50px;
                    }
                    .takeTip{
                        padding: 0 50px;
                        margin-top: 16px;
                        font-size: 12px;
                        color: #999;
                        line-height: 20px;
                        span{
                            color: #006dff;
                        }
                    }
                }
                .right{
                    padding: 20px 0 30px;
                    .txt{
                        margin-left: 20px;
                    }
                    .status_wrap{
                        display: flex;
                        margin: 55px 0 50px 20px;
                        .step{
                            width: 66px;
                            font-size: 14px;
                            color: #999;
                            text-align: center;
                            img{
                                display: block;
                                height: 21px;
                                margin: 0 auto 26px;
                            }
                            .time{
                                font-size: 12px;
                                margin-top: 8px;
                                line-height: 18px;
                            }
                        }
                        .step.active{
                            color: #333;
                        }
                        .arrowBox{
                            width: 124px;
                            position: relative;
                            img{
                                width: 124px;
                                height: 9px;
                                margin-top: 6px;
                            }
                            .tool{
                                position: absolute;
                                top: -22px;
                                left: 50%;
                                text-align: center;
                                font-size: 12px;
                                color: #FF0000;
                                transform: translate(-50%,0);
                            }
                        }
                    }
                }
            }
            .orderInfo{
                background: #ffffff;
                margin: 30px 0;
                padding: 30px 37px 11px;
                display: flex;
                .tit{
                    font-size: 14px!important;
                    margin-bottom: 16px;
                    color: #333;
                }
                .address{
                    width: 240px;
                    margin-right: 158px;
                    color: #333;
                    div{
                        display: flex;
                        font-size: 12px;
                        margin-bottom: 10px;
                        .name{
                            display: block;
                            width: 84px;
                            flex: 0 0 auto;
                        }
                    }
                }
                .logistics{
                    width: 326px;
                    margin-right: 74px;
                    color: #333;
                    div{
                        display: flex;
                        font-size: 12px;
                        margin-bottom: 10px;
                        .name{
                            display: block;
                            width: 85px;
                            flex: 0 0 auto;
                        }
                        .img{
                            width: 230px;
                            max-height: 300px;
                        }
                    }
                }
                .pay{
                    color: #333;
                    div{
                        display: flex;
                        font-size: 12px;
                        margin-bottom: 10px;
                        .name{
                            display: block;
                            width: 87px;
                            flex: 0 0 auto;
                        }
                        .red{
                            color: #FF0000;
                        }
                    }
                }
            }
            .prodInfo{
                padding-bottom: 30px;
                background: #fff;
                .prods_tit{
                    display: flex;
                    height: 34px;
                    line-height: 34px;
                    font-size: 12px;
                    color: #333;
                    border-bottom: 1px solid #F0F0F0;
                    text-align: center;
                }
                .nameBox{
                    width: 560px;
                }
                .price{
                    width: 320px;
                    margin-left: 40px;
                    text-align: center;
                }
                .num{
                    width: 236px;
                    margin-left: 44px;
                    text-align: center;
                }
                .prods_wrap{
                    display: flex;
                    align-items: center;
                    font-size: 12px;
                    border-bottom: 1px solid #F0F0F0;
                    margin-bottom: 30px;
                    .nameBox{
                        display: flex;
                        align-items: center;
                        img{
                            display: block;
                            width: 60px;
                            height: 60px;
                            margin: 20px 15px 20px 22px;
                        }
                        .info{
                            .name{
                                color: #333;
                                margin-bottom: 10px;
                                max-width: 460px;
                            }
                            .company{
                                color: #666;
                            }
                        }
                    }
                }
            }
            .allInfo{
                padding-right: 25px;
                .flex{
                    display: flex;
                    justify-content: flex-end;
                    align-items: flex-end;
                    font-size: 12px;
                    color: #333;
                    margin-bottom: 15px;
                    span{
                        display: block;
                        width: 120px;
                        text-align: right;
                    }
                    .name{
                        width: 70px;
                        text-align: left;
                    }
                }
                .actualNum{
                    margin-bottom: 0;
                    color: #FF0000;
                    .money{
                        font-size: 18px;
                        font-weight: bold;
                    }
                }
            }
        }
    }
</style>