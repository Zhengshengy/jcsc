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
                        <router-link to="/merchant" class="link">商家管理中心</router-link>
                        <span class="el-icon-arrow-right"></span>
                        <router-link to="/merchant/shopOrder" class="link">订单查询</router-link>
                        <span class="el-icon-arrow-right"></span>
                        <span class="orderNum">订单：106407681272</span>
                    </div>
                    <div class="orderStatus" v-if="status=='5'">
                        <div class="left">
                            <div class="txt">订单号：106407681273</div>
                            <div class="statusTxt">等待付款</div>
                            <div class="btnBox">
                                <div class="btn">提醒买家付款</div>
                            </div>
                        </div>
                        <div class="right">
                            <div class="txt">尊敬的商家，该订单已提交，等待买家付款！</div>
                            <div class="status_wrap">
                                <div class="step step1 active">
                                    <img src="@/assets/image/personal/submitDR.png" alt="">
                                    <p>提交订单</p>
                                    <p class="time">2019-11-04 11:07:17</p>
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
                    <div class="orderStatus" v-if="status=='4'">
                        <div class="left">
                            <div class="txt">订单号：106407681273</div>
                            <div class="statusTxt">订单失败</div>
                            <div class="failReason" v-show="false">失败原因：该商品没货了！</div>
                            <div class="failReason">失败原因；买家未付款，订单自动结束！</div>
                        </div>
                        <div class="right">
                            <div class="txt" v-show="false">尊敬的客户，您的订单卖家取消发货，本次购物未完成。</div>
                            <div class="txt">尊敬的商家，该订单已提交，等待买家付款！</div>
                            <div class="status_wrap" v-show="false">
                                <div class="step step1 active">
                                    <img src="@/assets/image/personal/submitDR.png" alt="">
                                    <p>提交订单</p>
                                    <p class="time">2019-11-04 11:07:17</p>
                                </div>
                                <div class="arrowBox">
                                    <img src="@/assets/image/personal/arrowR.png" alt="">
                                </div>
                                <div class="step step2 active">
                                    <img src="@/assets/image/personal/payDR.png" v-show="status != 5" alt="">
                                    <p>付款成功</p>
                                    <p class="time">2019-11-04 11:07:17</p>
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
                            <div class="status_wrap">
                                <div class="step step1 active">
                                    <img src="@/assets/image/personal/submitDR.png" alt="">
                                    <p>提交订单</p>
                                    <p class="time">2019-11-04 11:07:17</p>
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
                    <div class="orderStatus" v-if="status=='3'">
                        <div class="left">
                            <div class="txt">订单号：106407681273</div>
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
                                    <p class="time">2019-11-04 11:07:17</p>
                                </div>
                                <div class="arrowBox">
                                    <img src="@/assets/image/personal/arrowR.png" alt="">
                                </div>
                                <div class="step step2 active">
                                    <img src="@/assets/image/personal/payDR.png" alt="">
                                    <p>付款成功</p>
                                    <p class="time">2019-11-04 11:07:17</p>
                                </div>
                                <div class="arrowBox">
                                    <img src="@/assets/image/personal/arrowR.png" alt="">
                                </div>
                                <div class="step step3 active">
                                    <img src="@/assets/image/personal/sendDR.png" alt="">
                                    <p>商品发货</p>
                                    <p class="time">2019-11-04 11:07:17</p>
                                </div>
                                <div class="arrowBox">
                                    <img src="@/assets/image/personal/arrowR.png" alt="">
                                </div>
                                <div class="step step4 active">
                                    <img src="@/assets/image/personal/takeDR.png" alt="">
                                    <p>等待收货</p>
                                    <p class="time">2019-11-04 11:07:17</p>
                                </div>
                                <div class="arrowBox">
                                    <img src="@/assets/image/personal/arrowR.png" alt="">
                                </div>
                                <div class="step step5 active">
                                    <img src="@/assets/image/personal/completeDR.png" alt="">
                                    <p>订单完成</p>
                                    <p class="time">2019-11-04 11:07:17</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="orderStatus" v-if="status=='2'">
                        <div class="left">
                            <div class="txt">订单号：106407681273</div>
                            <div class="statusTxt">等待收货</div>
                            <p class="payTip"></p>
                            <div class="btnBox">
                                <div class="btn">提醒买家收货</div>
                            </div>
                            <div class="takeTip">您还有<span class="countDown">14天0小时32分18秒</span>来确认收货，超时订单自动确认收货</div>
                        </div>
                        <div class="right">
                            <div class="txt">尊敬的商家，该订单已发货，请您耐心等候买家确认收货。</div>
                            <div class="status_wrap">
                                <div class="step step1 active">
                                    <img src="@/assets/image/personal/submitDR.png" alt="">
                                    <p>提交订单</p>
                                    <p class="time">2019-11-04 11:07:17</p>
                                </div>
                                <div class="arrowBox">
                                    <img src="@/assets/image/personal/arrowR.png" alt="">
                                </div>
                                <div class="step step2 active">
                                    <img src="@/assets/image/personal/payDR.png" alt="">
                                    <p>付款成功</p>
                                    <p class="time">2019-11-04 11:07:17</p>
                                </div>
                                <div class="arrowBox">
                                    <img src="@/assets/image/personal/arrowR.png" alt="">
                                </div>
                                <div class="step step3 active">
                                    <img src="@/assets/image/personal/sendDR.png" alt="">
                                    <p>商品发货</p>
                                    <p class="time">2019-11-04 11:07:17</p>
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
                    <div class="orderStatus" v-if="status=='1'">
                        <div class="left">
                            <div class="txt">订单号：106407681273</div>
                            <div class="statusTxt">等待发货</div>
                            <p class="payTip"></p>
                            <div class="btnBox">
                                <div class="btn cursor" @click="sendDialog">确认发货</div>
                                <div class="btn gray cursor" @click="cancleDialog">取消发货</div>
                            </div>
                        </div>
                        <div class="right">
                            <div class="txt">尊敬的商家，该订单已支付，请及时发货！</div>
                            <div class="status_wrap">
                                <div class="step step1 active">
                                    <img src="@/assets/image/personal/submitDR.png" alt="">
                                    <p>提交订单</p>
                                    <p class="time">2019-11-04 11:07:17</p>
                                </div>
                                <div class="arrowBox">
                                    <img src="@/assets/image/personal/arrowR.png" alt="">
                                </div>
                                <div class="step step2 active">
                                    <img src="@/assets/image/personal/payDR.png" alt="">
                                    <p>付款成功</p>
                                    <p class="time">2019-11-04 11:07:17</p>
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
                            <div class="tit">买家信息</div>
                            <div><span class="name">收货人：</span><span>袁军磊</span></div>
                            <div><span class="name">地址：</span><span>陕西省西安市未央区太华北路 华远好天地1803</span></div>
                            <div><span class="name">手机号码：</span><span>15619381686</span></div>
                        </div>
                        <div class="logistics">
                            <div class="tit">物流信息</div>
                            <div><span class="name">物流方式：</span><span>邮费到付</span></div>
                            <div v-show="status == 2 || status == 3"><span class="name">发货时间：</span><span>2019-11-06  09:22</span></div>
                            <div v-show="status == 3"><span class="name">收货时间：</span><span>2019-11-12  09:22</span></div>
                            <div v-show="status == 2 || status == 3"><span class="name">物流单号：</span><img src="" alt=""></div>
                        </div>
                        <div class="pay">
                            <div class="tit">付款信息</div>
                            <div><span class="name">付款方式：</span><span>在线支付</span></div>
                            <div v-show="status!='5'"><span class="name">付款时间：</span><span>2019-11-06  09:22</span></div>
                            <div><span class="name">商品总额：</span><span>￥1799.00</span></div>
                            <div><span class="name">优惠券：</span><span class="red">￥10</span></div>
                            <div><span class="name">应支付金额：</span><span>￥1799.00</span></div>
                        </div>
                    </div>
                    <div class="prodInfo">
                        <div class="prods_tit">
                            <div class="nameBox">商品</div>
                            <div class="price">价格</div>
                            <div class="num">数量</div>
                        </div>
                        <div class="prods_wrap">
                            <div class="nameBox">
                                <img src="@/assets/image/index/prod1.jpg" alt="">
                                <div class="info">
                                    <div class="name singlerow">贝威斯三角阀加长型加厚水阀开关不锈钢家用</div>
                                    <div class="company">卖方：陕西三只羊建材有限公司</div>
                                </div>
                            </div>
                            <div class="price">￥1799.00</div>
                            <div class="num">1</div>
                        </div>
                        <div class="allInfo">
                            <div class="flex"><span class="name">商品总额：</span><span>￥1799.00</span></div>
                            <div class="flex"><span class="name">商品优惠：</span><span>￥10.00</span></div>
                            <div class="flex"><span class="name">物流方式：</span><span>邮费到付</span></div>
                            <div class="flex actualNum"><span class="name">应付金额：</span><span class="money">￥1769.00</span></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="shadow" v-show="isSend">
            <div class="sendBox">
                <div class="title">上传发货单</div>
                <div class="upload">
                    <el-upload action="#" list-type="picture-card" :auto-upload="false" multiple>
                        <i slot="default" class="el-icon-camera-solid"></i>
                        <span class="txt">点击上传发货单</span>
                        <div slot="file" slot-scope="{file}">
                            <img class="el-upload-list__item-thumbnail" :src="file.url" alt=""  >
                            <span class="el-upload-list__item-actions">
                            <span class="el-upload-list__item-preview" @click="handlePictureCardPreview(file)" >
                                <i class="el-icon-zoom-in"></i>
                            </span>
                            <span v-if="!disabled" class="el-upload-list__item-delete" @click="handleDownload(file)"  >
                              <i class="el-icon-download"></i>
                            </span>
                            <span v-if="!disabled" class="el-upload-list__item-delete" @click="handleRemove(file)" >
                              <i class="el-icon-delete"></i>
                            </span>
                        </span>
                        </div>
                    </el-upload>
                    <el-dialog :visible.sync="dialogVisible">
                        <img width="100%" :src="dialogImageUrl" alt="">
                    </el-dialog>
                    <div class="submit cursor" @click="confirmSend">确认发货</div>
                </div>
                <div class="close" @click="closeSend"><img src="@/assets/image/personal/addressClose.png" alt=""></div>
            </div>
        </div>
        <div class="shadow" v-show="isCancle">
            <div class="cancleBox">
                <div class="title">取消发货</div>
                <div class="form">
                    <img src="@/assets/image/index/cancleSend.png" alt="">
                    <div class="fl-c">
                        <p>取消原因:</p>
                        <input type="text">
                    </div>
                    <div class="submit cursor" @click="confirmCancle">确认取消发货</div>
                </div>
                <div class="close" @click="closeCancle"><img src="@/assets/image/personal/addressClose.png" alt=""></div>
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
                status:'',
                dialogImageUrl: '',
                dialogVisible: false,
                disabled: false,
                isSend:false,
                isCancle:false,
            }
        },
        created(){
            this.status=this.$route.query.type;
        },
        methods:{
            //发货单弹框
            sendDialog(){
                this.isSend = true;
            },
            //取消发货弹框
            cancleDialog(){
                this.isCancle = true;
            },
            handleRemove(file) {
                console.log(file);
            },
            handlePictureCardPreview(file) {
                this.dialogImageUrl = file.url;
                this.dialogVisible = true;
            },
            handleDownload(file) {
                console.log(file);
            },
            //关闭发货单弹框
            closeSend(){
                this.isSend = false;
            },
            //关闭取消发货弹框
            closeCancle(){
                this.isCancle = false;
            },
            //上传发货单
            confirmSend(){
                alert('上传发货单');
            },
            //确认取消发货
            confirmCancle(){
                alert('确认取消发货');
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
                        font-weight: bold;
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
    .shadow{
        position: fixed;
        top: 0;
        left: 0;
        z-index: 100;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,.3);
        .title{
            height: 28px;
            background: #F3F3F3;
            border-bottom: 1px solid #C4C4C4;
            padding-left: 12px;
            font-size: 14px;
            color: #333;
            line-height: 28px;
            border-radius: 5px 5px 0 0;
            margin-bottom: 25px;
        }
        .close{
            position: absolute;
            top:11px;
            right: 11px;
            cursor: pointer;
        }
    }
    .sendBox,.cancleBox{
        position: absolute;
        top: 50%;
        left: 50%;
        width: 450px;
        background:#fff;
        transform: translate(-50%,-50%);
        border-radius: 5px;
        box-shadow:0 0 5px rgba(0,0,0,.3);
        .upload{
            padding: 30px 30px 60px;
            max-height: 355px;
        }
        .form{
            padding: 30px;
            img{
                display: block;
                width: 46px;
                height: 54px;
                margin: 0 auto 25px;
            }
            .fl-c{
                font-size: 14px;
                color: #333;
                margin-bottom: 30px;
                input{
                    display: block;
                    width: 305px;
                    height: 30px;
                    border: 1px solid #ccc;
                    padding: 0 5px;
                    margin-left: 10px;
                    border-radius: 5px;
                }
            }
        }
        .submit{
            width:122px;
            height:30px;
            background:#f6f6f6;
            border:1px solid #ccc;
            border-radius:2px;
            text-align: center;
            line-height: 30px;
            font-size: 14px;
            color: #333;
            margin: 0 auto;
        }
    }
</style>
<style lang="scss">
    .el-upload--picture-card{
        display: block;
        width: 122px;
        height: 122px;
        border-color: #ccc;
        margin:0 auto 20px;
        line-height: 0;
        font-size: 12px;
        color: #999;
        .el-icon-camera-solid{
            display: block;
            margin: 30px auto 10px;
        }
        .txt{
            display: inline-block;
            width: 48px;
            line-height: 18px;
        }
    }
    .el-upload--picture-card:hover .el-icon-camera-solid, .el-upload:focus .el-icon-camera-solid{
        color: #409EFF;
    }
</style>