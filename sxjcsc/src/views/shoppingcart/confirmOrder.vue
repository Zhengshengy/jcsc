<template>
    <div class="box">
        <Top :tit="'订单结算页'" :isShow="false" :hasRight="false" :hasStep="true"></Top>
        <div class="main">
            <div class="tit">填写并核对订单信息</div>
            <div class="info_wrap">
                <div class="address_wrap">
                    <div class="publicTit">收货人信息</div>
                    <div class="address" v-if="addressList.length > 0">
                        <div class="item"><span class="name">{{addressList[aIdIndex].name}}</span><span class="desc">{{addressList[aIdIndex].area}}</span><span class="tel">{{addressList[aIdIndex].phone}}</span><span class="tag" v-if="addressList[aIdIndex].status">默认地址</span><div class="btns"><span @click="setDefault(addressList[aIdIndex].id)" v-if="!addressList[aIdIndex].status">设为默认地址</span><span @click="edit(addressList[aIdIndex].id)">编辑</span></div></div>
                        <div class="moreList" v-show="moreAddress">
                            <div class="item cursor" v-for="(item,index) in addressList" :key="index" v-show="item.id != aId" @click="chooseAid(item.id,index)"><span class="name">{{item.name}}</span><span class="desc">{{item.address}}</span><span class="tel">{{item.phone}}</span><span class="tag" v-if="item.status">默认地址</span><div class="btns"><span @click="setDefault(item.id)" v-if="!item.status">设为默认地址</span><span @click="edit(item.id)">编辑</span></div></div>
                        </div>
                    </div>
                    <div class="address" v-if="addressList.length == 0">
                        <h3>您还未添加收货地址</h3>
                    </div>
                    <div class="more cursor" v-if="addressList.length  > 1" @click="showAddress">{{moreTxt}}<span class="el-icon-d-arrow-left" :class="{'rotate':moreAddress}"></span></div>
                    <div class="btn cursor" @click="add">新增收货地址</div>
                </div>
                <div class="pay_wrap">
                    <div class="publicTit">支付方式</div>
                    <div class="onLine">在线支付</div>
                </div>
                <div class="order_wrap">
                    <div class="publicTit">确认订单消息</div>
                    <router-link to="/shoppingCart" class="btn cursor">返回修改购物车</router-link>
                    <div class="orderInfo">
                        <div class="delivery">
                            <p>配送方式</p>
                            <div>物流配送</div>
                        </div>
                        <div class="prod_wrap">
                            <div class="company">商家：<span class="name">{{prodInfo.name}}</span></div>
                            <div class="prodList" v-for="(item,index) of prodInfo.list" :key="index">
                                <div class="prod">
                                    <img :src="item.img[0]" alt="">
                                    <div class="title">{{item.name}}</div>
                                    <div class="price">￥{{item.price}}</div>
                                    <div class="num">x{{item.num}}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="useCoupon" v-if="hasCoupon">
                    <div class="publicTit cursor" @click="isCoupon">使用优惠券<span class="el-icon-arrow-down" :class="{'rotate':showCoupon}"></span></div>
                    <div class="couponList" v-show="showCoupon">
                        <div class="tab">
                            <span class="title">商品优惠券</span>
                            <!--<span class="title active">包邮劵</span>-->
                        </div>
                        <div class="list scroll">
                            <div class="item" :class="{'chooseC':choosecoupon.id == item.id,'gray':total < item.rule}"  @click="chooseCoupon(item)" v-for="(item,index) in couponList" :key="index">
                                <div class="info">
                                    <div class="num">￥{{item.money}}</div><div class="rule">商品满{{item.rule}}即可使用</div>
                                </div>
                                <div class="time">有效期至{{item.end_time}}</div>
                                <p v-if="total < item.rule"><img src="@/assets/image/shoppingcart/tool.png" alt="">不满足该优惠券使用条件</p>
                            </div>
                            <!--<div class="item chooseC">-->
                                <!--<div class="info">-->
                                    <!--<div class="num">￥10</div><div class="rule">商品满200即可使用</div>-->
                                <!--</div>-->
                                <!--<div class="time">有效期至2019-11-08</div>-->
                                <!--<p></p>-->
                            <!--</div>-->
                            <!--<div class="item gray">-->
                                <!--<div class="info">-->
                                    <!--<div class="num">￥10</div><div class="rule">商品满200即可使用</div>-->
                                <!--</div>-->
                                <!--<div class="time">有效期至2019-11-08</div>-->
                                <!--<p><img src="@/assets/image/shoppingcart/tool.png" alt="">不满足该优惠券使用条件</p>-->
                            <!--</div>-->
                            <!--<div class="item  chooseF">-->
                                <!--<div class="info">-->
                                    <!--<div class="num">包邮</div><div class="rule">商品满200即可使用</div>-->
                                <!--</div>-->
                                <!--<div class="time">有效期至2019-11-08</div>-->
                                <!--<p><img src="@/assets/image/shoppingcart/tool.png" alt="">所结算商品中没有符合条件的商品</p>-->
                            <!--</div>-->
                            <!--<div class="item itemF">-->
                                <!--<div class="info">-->
                                    <!--<div class="num">包邮</div><div class="rule">商品满200即可使用</div>-->
                                <!--</div>-->
                                <!--<div class="time">有效期至2019-11-08</div>-->
                                <!--<p><img src="@/assets/image/shoppingcart/tool.png" alt="">所结算商品中没有符合条件的商品</p>-->
                            <!--</div>-->
                            <!--<div class="item">-->
                                <!--<div class="info">-->
                                    <!--<div class="num">￥10</div><div class="rule">商品满200即可使用</div>-->
                                <!--</div>-->
                                <!--<div class="time">有效期至2019-11-08</div>-->
                                <!--<p><img src="@/assets/image/shoppingcart/tool.png" alt="">不满足该优惠券使用条件</p>-->
                            <!--</div>-->
                        </div>
                        <div class="result">
                            金额抵用 <span class="couponNum">￥{{choosecoupon.money}}</span> 使用优惠券1张，优惠 <span>{{choosecoupon.money}}元</span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="orderAmount">
                <div class="total"><span class="text-red">{{totalNum}}</span>件商品，总商品金额：<span class="fixedW">￥{{total}}</span></div>
                <div class="coupon">优惠券：<span class="fixedW text-red">-￥{{choosecoupon.money}}</span></div>
                <!--<div class="logistics">物流方式：<span class="fixedW text-red">邮费到付</span></div>-->
                <div class="actual">
                    <div class="money">应付金额：<span class="fixedW text-red">￥{{trueMoney}}</span></div>
                    <div class="send" v-if="addressList.length > 0"><span>寄送至：<span>{{addressList[aIdIndex].area}}</span> </span><span class="consignee">收货人：<span>{{addressList[aIdIndex].name}}</span>  <span>{{addressList[aIdIndex].phone}}</span></span></div>
                </div>
                <div class="submit cursor" @click="submitOrder">提交订单</div>
            </div>
        </div>
        <Add :showForm="showForm" :isEdit="isEdit" :editId="editId" @closeForm="closeForm" @success="addressSuccess" ></Add>
    </div>
</template>

<script>
    import Top from '@/components/personal/top'
    import Add from '@/components/personal/addAddress'
    import { Decimal } from 'decimal.js'

    export default {
        name: "confirmOrder",
        data(){
            return {
                showCoupon:false,
                moreAddress:false,
                moreTxt:'更多地址',
                showForm:false,
                isEdit:false,
                editId:0,
                aId:0,
                sId:0,
                aIdIndex:0,
                addressList:[],
                prodInfo:{},
                total:0,
                trueMoney:0,
                totalNum:0,
                hasCoupon:false,
                couponList:[],
                choosecoupon:{
                    'money':0
                }
            }
        },
        components:{
            'Top':Top,
            'Add':Add,
        },
        created(){
            this.getAddress();
            this.JCService.cartServer.getSelectShops().then(e=>{
                if(e.status == 0){
                    this.$message({
                        message: '您当前没有待提交订单',
                        type: 'warning'
                    });
                    setTimeout(()=>{
                        this.$router.push('/personal/orders');
                    },2000)
                    return false;
                }
                for(let i in e.info){
                    this.prodInfo = e.info[i];
                }
                this.sId = this.prodInfo.id;
                this.totalNum = e.sum;
                let list = this.prodInfo.list;
                for(let j in list){
                    list[j].img = list[j].img.split(',');
                    let num = Number(list[j].num)
                    let price = Number(list[j].price)
                    let total = new Decimal(price).mul(new Decimal(num))
                    this.total = new Decimal(this.total).add(total);
                    this.trueMoney = this.total;
                    for(let k in list[j].img){
                        list[j].img[k] = this.JCconfig.filePath +'public/'+list[j].img[k];
                    }
                }
                // 用户领取的商铺优惠券
                this.JCService.PersonalServer.getUserCoupon({
                    'type':1,
                    'shop_id':this.sId
                }).then(e=>{
                    if(e.status == 1){
                        this.couponList = e.info;
                        this.hasCoupon = true;
                        for(let i in this.couponList){
                            this.couponList[i].end_time = this.JCutils.Format1(this.couponList[i].end_time*1000);
                        }
                    }
                })
            })

        },
        methods:{
            //获取地址
            getAddress(){
                this.JCService.PersonalServer.Address_list().then(e=>{
                    this.addressList = e.info;
                    this.addressList.forEach(item=>{
                        let address = item.address.split(',');
                        item.area = address[0]+'  '+address[1]+'  '+address[2]+'  '+address[3];
                    })
                    this.addressList.sort((a,b)=>{return b.status - a.status});
                    if(this.addressList.length > 0){
                        this.aId = this.addressList[0].id;
                    }
                });
            },
            showAddress(){
                switch (this.moreAddress) {
                    case true:
                        this.moreTxt='更多地址'
                        break;
                    case false:
                        this.moreTxt='收起地址'
                        break;
                }
                this.moreAddress = !this.moreAddress;
            },
            addressSuccess(){
                this.showForm = false;
                this.$message({
                    message: '保存成功',
                    type: 'success'
                });
                this.getAddress();
            },
            //选择地址
            chooseAid(id,index){
                this.aId = id;
                this.aIdIndex = index;
                this.showAddress();
            },
            isCoupon(){
                this.showCoupon = !this.showCoupon;
            },
            chooseCoupon(item){
                if(this.choosecoupon.id != undefined){
                    this.choosecoupon = {
                        'money':0
                    }
                    return ;
                }
                if(this.total < item.rule){
                    this.$message({
                        message: '不满足该优惠券使用条件',
                        type: 'warning'
                    });
                }else{
                    this.choosecoupon = item;
                    let total = new Decimal(this.total);
                    let money = new Decimal(this.choosecoupon.money);
                    this.trueMoney = total.sub(money);
                }
            },
            add(){
                if(this.addressList.length >= 5){
                    this.$message({
                        message: '最多只能添加5个收货地址',
                        type: 'warning'
                    });
                    return  false;
                }
                this.showForm = true;
                this.isEdit = false;
            },
            setDefault(id){
                this.JCService.PersonalServer.Address_del({address_id:id,type:1}).then(e=>{
                    if(e.status == 1){
                        this.$message({
                            message: '设置默认地址成功',
                            type: 'success'
                        });
                        this.getAddress();
                    }
                })
            },
            edit(id){
                this.isEdit = true;
                this.showForm = true;
                this.editId = id;
            },
            closeForm(){
                this.showForm = false;
            },
            submitOrder(){
                if(this.aId == 0){
                    this.$message({
                        message: '请选择收货地址后再提交',
                        type: 'warning'
                    });
                    return false;
                }
                let sendData = {
                    'shopid':this.sId,
                    'addressid':this.aId,
                    'payment_type':2,
                    'code':this.trueMoney.toNumber(),
                }
                if(this.choosecoupon.cid != undefined){
                    sendData.cid = this.choosecoupon.id
                }
                //下单
                this.JCService.cartServer.place(sendData).then(e=>{
                    if(e.status == 1){
                        this.$router.push('/orderPay?id='+e.info);
                    }else{
                        this.$message({
                            message: e.info,
                            type: 'warning'
                        });
                    }
                })
            }
        }
    }
</script>

<style lang='scss' scoped>
    .box{
        background: #F5F5F5;
        .main{
            width: 1160px;
            background: #fff;
            margin: 0 auto;
            padding: 30px 20px;
            .tit{
                font-size: 16px;
                color: #FF0000;
                font-weight: bold;
                margin-bottom: 20px;
            }
            .info_wrap{
                width: 1120px;
                border: 1px solid #ddd;
                padding: 0 20px;
                .publicTit{
                    font-size: 14px;
                    color: #333;
                    font-weight: bold;
                    margin-top: 14px;
                }
                .address_wrap,.pay_wrap,.order_wrap{
                    position: relative;
                    border-bottom: 1px solid #E6E6E6;
                    margin-bottom: 10px;
                    .btn{
                        position: absolute;
                        top: 20px;
                        right: 0;
                        color: #FF0000;
                        font-size: 12px;
                    }
                }
                .address_wrap{
                    .address{
                        padding-left: 15px;
                        font-size: 12px;
                        color: #666;
                        margin-top: 28px;
                        h3{
                            text-align: center;
                            margin-bottom: 15px;
                        }
                        .item{
                            cursor: pointer;
                            height: 30px;
                            line-height: 30px;
                            margin-bottom: 15px;
                            position: relative;
                            padding-left: 12px;
                            span{
                                margin-right: 15px;
                            }
                            .tag{
                                display: inline-block;
                                width: 59px;
                                height: 20px;
                                color: #fff;
                                font-size: 12px;
                                background: #999;
                                text-align: center;
                                line-height: 20px;
                            }
                            .btns{
                                position: absolute;
                                top: 0;
                                right: 0;
                                display: none;
                                color: #006dff;
                            }
                        }
                        .item:hover{
                            background: #FFF3F3;
                            .btns{
                                display: block;
                            }
                        }
                    }
                    .more{
                        font-size: 12px;
                        color: #666;
                        margin-bottom: 18px;
                        padding-left: 20px;
                        span{
                            transform: rotate(-90deg);
                            margin-left: 6px;
                            transition: all .3s ease-in-out;
                        }
                        span.rotate{
                            transform: rotate(-270deg);
                        }
                    }
                }
                .pay_wrap{
                    .onLine{
                        width: 98px;
                        height: 30px;
                        font-size: 14px;
                        line-height: 30px;
                        border: 1px solid #FF0000;
                        color: #FF0000;
                        text-align: center;
                        margin: 14px 0 20px 20px;
                    }
                }
                .order_wrap{
                    border-bottom: none;
                    .orderInfo{
                        display: flex;
                        background: #F7F7F7;
                        margin: 13px 0;
                        .delivery{
                            width: 331px;
                            font-size: 12px;
                            p{
                                color: #333;
                                margin: 16px 0 15px 20px;
                            }
                            div{
                                width: 98px;
                                height: 30px;
                                line-height: 30px;
                                text-align: center;
                                color: #FF0000;
                                border: 1px solid #FF0000;
                                margin-left: 20px;
                            }
                        }
                        .prod_wrap{
                            width: 787px;
                            background: #F3FBFE;
                            font-size: 12px;
                            .company{
                                margin: 15px 0 16px 20px;
                                color: #333;
                            }
                            .prodList{
                                padding-left: 20px;
                                .prod{
                                    display: flex;
                                    margin-bottom: 30px;
                                    align-items: center;
                                    img{
                                        display: block;
                                        width: 82px;
                                        height: 82px;
                                        margin-right: 19px;
                                    }
                                    .title{
                                        color: #666;
                                        width: 248px;
                                        margin-right: 145px;
                                        line-height: 18px;
                                    }
                                    .price{
                                        color: #FF0000;
                                        margin-right: 130px;
                                    }

                                }
                            }
                        }
                    }
                    .btn{
                        top: 3px;
                    }
                }
                .useCoupon{
                    margin-bottom: 13px;
                    .el-icon-arrow-down{
                        margin-left: 8px;
                        transition: all .3s ease-in-out;
                    }
                    .el-icon-arrow-down.rotate{
                        transform: rotate(180deg);
                    }
                    .couponList{
                        margin-top: 35px;
                        padding: 0 20px;
                        user-select: none;
                        .tab{
                            margin-bottom: 18px;
                            .title{
                                display: inline-block;
                                margin-right: 75px;
                                font-size: 12px;
                                height: 20px;
                                border-bottom: 2px solid #fff;
                                color: #333;
                                cursor: pointer;
                            }
                            .title.active{
                                color: #FF0000;
                                border-color: #FF0000;
                            }
                        }
                        .list{
                            display: flex;
                            height: 110px;
                            margin-bottom: 20px;
                            cursor: pointer;
                            .item{
                                width: 198px;
                                height: 70px;
                                margin-right: 22px;
                                background-image: url("../../assets/image/shoppingcart/bgBlue.png");
                                background-size: 100% 100%;
                                position: relative;
                                flex: 0 0 auto;
                                .info{
                                    margin: 15px 0 3px 13px;
                                    color: #fff;
                                    font-size: 12px;
                                    display: flex;
                                    align-items: baseline;
                                    .num{
                                        font-size: 24px;
                                        font-weight: bold;
                                        margin-right: 9px;
                                    }
                                }
                                .time{
                                    font-size: 12px;
                                    opacity: 0.5;
                                    margin-left: 15px;
                                    color: #fff;
                                }
                                p{
                                    position: absolute;
                                    left: 0;
                                    bottom: -20px;
                                    height: 13px;
                                    line-height: 13px;
                                    margin-top: 12px;
                                    color: #999;
                                    font-size: 12px;
                                    img{
                                        width: 13px;
                                        height: 13px;
                                        margin-right: 1px;
                                        vertical-align: text-top;
                                    }
                                }
                            }
                            .item.gray{
                                background-image: url("../../assets/image/shoppingcart/bgGray.png");
                                .time{
                                    color: #666;
                                }
                            }
                            .item.chooseC{
                                background-image: url("../../assets/image/shoppingcart/chooseC.png");
                            }
                            .item.itemF{
                                background-image: url("../../assets/image/shoppingcart/bgRed.png");
                            }
                            .item.chooseF{
                                background-image: url("../../assets/image/shoppingcart/chooseF.png");
                            }
                        }
                        .list.scroll{
                            overflow-x: scroll;
                        }
                        .scroll::-webkit-scrollbar{
                            height: 3px;
                        }
                        .scroll::-webkit-scrollbar-track{
                            background: rgb(239, 239, 239);
                            border-radius:2px;
                        }
                        .scroll::-webkit-scrollbar-thumb{
                            background: #bfbfbf;
                            border-radius:10px;
                        }
                        .scroll::-webkit-scrollbar-corner{
                            background: #179a16;
                        }
                    }
                    .result{
                        height: 40px;
                        background: #F6F6F6;
                        padding-left: 20px;
                        margin-bottom: 9px;
                        line-height: 40px;
                        font-size: 12px;
                        color: #666;
                        .couponNum{
                            color: #FF0000;
                            margin-left: 3px;
                            margin-right: 28px;
                        }
                    }
                }
            }
            .orderAmount{
                text-align: right;
                margin-top: 25px;
                font-size: 12px;
                color: #333;
                .total,.coupon{
                    margin-bottom: 15px;
                }
                .logistics{
                    margin-bottom: 20px;
                }
                .actual{
                    background: #F4F4F4;
                    border-top: 1px solid #e6e6e6;
                    padding: 20px 0;
                    .money{
                        margin-bottom: 13px;
                        .text-red{
                            font-size: 18px;
                            font-weight: bold;
                        }
                    }
                    .send{
                        color: #999;
                        margin-right: 20px;
                        .consignee{
                            margin-left: 16px;
                        }
                    }
                }
                .fixedW{
                    display: inline-block;
                    width: 125px;
                    margin-right: 20px;
                }
                .submit{
                    width:135px;
                    height:35px;
                    background:#E1373A;
                    border-radius:2px;
                    font-size: 18px;
                    font-weight: bold;
                    color: #fff;
                    text-align: center;
                    line-height: 35px;
                    margin: 20px 0 15px 987px;
                }
            }
        }
    }

</style>