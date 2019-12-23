<template>
    <div class="box">
        <Top :tit="'我的购物车'" :isShow="isShow"></Top>
        <div class="mid">
            <div class="main" v-if="prodsObj.length != 0">
                <div class="allNum">全部商品（<span>60</span>）</div>
                <div class="prodHead">
                    <div class="select" @click="chooseAllprods"><span class="el-icon-check" v-show="allChecked"></span></div>
                    <div class="prod">商品</div>
                    <div class="spec">规格</div>
                    <div class="price">单价</div>
                    <div class="num">数量</div>
                    <div class="money">金额</div>
                    <div class="operation">操作</div>
                </div>
                <div class="company" v-for="(item,index) in prodsObj" :key="index">
                    <div class="info">
                        <div class="select" @click="chooseShopProds(index)"><span class="el-icon-check" v-show="item.checked"></span></div>
                        <div class="name cursor" @click="inShop(item.id)"><img src="@/assets/image/shoppingcart/shop.png" alt="">店铺：{{item.name}}</div>
                        <div class="coupon" :class="{'show':couponSId == item.id}">
                            <div class="btn" @click="showCoupon(item.id)"><img src="@/assets/image/shoppingcart/triangle.png" alt="">优惠券<span class="el-icon-arrow-down"></span></div>
                            <div class="couponBox" v-show="couponSId == item.id">
                                <div class="head" v-if="false">
                                    <img src="@/assets/image/shoppingcart/horn.png" alt="">
                                    <span>您已领取1张优惠券</span>
                                </div>
                                <div class="couponList" :class="{'scroll':false}">
                                    <div class="item" v-for="(item1,index1) in item.coupon" :key="index1">
                                        <div class="reduce">￥{{item1.money}}</div>
                                        <div class="ruleBox">
                                            <div class="rule">满{{item1.rule}}可用</div>
                                            <div class="time">{{item1.create_time}}-{{item1.end_time}}</div>
                                        </div>
                                        <div class="receiveBox" v-if="item1.ifcoupon == 0">
                                            <div class="receive" @click="addCoupon(item1.id,index,index1)">领取</div>
                                        </div>
                                        <div class="receiveBox" v-if="item1.ifcoupon == 1">
                                            <div class="receive">已领取</div>
                                        </div>
                                    </div>
                                    <!--<div class="item">-->
                                        <!--<div class="reduce red">包邮</div>-->
                                        <!--<div class="ruleBox">-->
                                            <!--<div class="rule">满100可用</div>-->
                                            <!--<div class="time">2019.11.11-2019.12.11</div>-->
                                        <!--</div>-->
                                        <!--<div class="receive">领取</div>-->
                                    <!--</div>-->
                                </div>
                                <img src="@/assets/image/personal/close.png" alt="" class="close" @click="closeCoupon">
                            </div>
                        </div>
                    </div>
                    <div class="prodList">
                        <div class="item" v-for="(item1,key) in item.list" :class="{'choose':item1.checked}" :key="key">
                            <div class="select" @click="choose(index,key)"><span class="el-icon-check" v-show="item1.checked"></span></div>
                            <div class="prod pointer" @click="prodDetail(item1.shopid,item1.cid)">
                                <img :src="item1.img[0]" alt="">
                                <div class="name row2">{{item1.name}}</div>
                            </div>
                            <div class="spec">{{item1.spec}}</div>
                            <div class="price">￥{{item1.price}}</div>
                            <div class="num">
                                <span class="float-left" @click="numChange(index,key,-1,item1.shopid,item1.id)">-</span>
                                <input type="number" class="float-left" v-model="item1.num" @blur="numEntry(index,key,item1.shopid,item1.id)">
                                <span class="float-left" @click="numChange(index,key,1,item1.shopid,item1.id)">+</span>
                            </div>
                            <div class="money">￥{{item1.total}}</div>
                            <div class="operation cursor" @click="showDelDialog(item1.id,item1.checked)">删除</div>
                        </div>
                    </div>
                </div>
                <div class="totalBox">
                    <div class="select" @click="chooseAllprods"><span class="el-icon-check" v-show="allChecked"></span></div>
                    <p>全选</p>
                    <div class="delTxt cursor" @click="delGoods">{{chooseNums == 0 ? '' : '删除选中商品'}}</div>
                    <div class="chooseNum">已选择<span>{{chooseNums}}</span>件商品</div>
                    <div class="total">总价：<span>￥{{totalPrice}}</span></div>
                    <div class="settlement" @click="confirm">去结算</div>
                </div>
            </div>
            <div class="main" v-if="prodsObj.length == 0">
                <h3>您的购物车里还没有商品,快去挑选需要的商品添加吧~</h3>
            </div>
        </div>
        <Del :showDel="showDel" @closeDel="closeDel" :delTxt="'您确定要删除该商品吗？'" @delete="delProd"></Del>
    </div>
</template>

<script>
    import Top from '@/components/personal/top'
    import Del from '@/components/personal/delDialog'
    import {Decimal} from 'decimal.js';
    export default {
        name: "index",
        props:{
            isShow:{
                default:false
            }
        },
        data(){
            return {
                prodsObj:[],
                totalPrice:0,
                totalFare:0,
                allChecked:false,
                chooseNums:0,
                couponSId:0,
                userCoupon:[],
                num:1,
                showDel:false,
                delId:[],
                checkedId:[],
                chooseSId:0,
            }
        },
        created(){
            this.getList();
        },
        components:{
            'Top' :Top,
            'Del' :Del
        },
        methods:{
            getList(){
                this.JCService.cartServer.cateList({}).then(e=>{
                    this.prodsObj = e.info;
                    for(let i of this.prodsObj){
                        for(let j in i.list){
                            i.list[j].total = new Decimal(i.list[j].price).mul(new Decimal(i.list[j].num));
                            i.list[j].img = i.list[j].img.split(',');
                            for(let k in i.list[j].img){
                                i.list[j].img[k]= this.JCconfig.filePath +'public/'+i.list[j].img[k];
                            }
                        }
                        for(let n in i.coupon){
                           i.coupon[n].create_time = this.JCutils.Format1(i.coupon[n].create_time*1000);
                           i.coupon[n].end_time = this.JCutils.Format1(i.coupon[n].end_time*1000)
                        }
                    }
                });
            },
            showCoupon(id){
                this.couponSId = id;
            },
            //领取优惠券
            addCoupon(id,index,index1){
                this.JCService.PersonalServer.addUserCoupon({
                    'id':id,
                    'type':1
                }).then(e=>{
                    if(e.status == 1){
                        this.$message({
                            message: e.info,
                            type: 'success'
                        });
                        this.prodsObj[index].coupon[index1].ifcoupon = 1;
                    }else{
                        this.$message({
                            message: e.info,
                            type: 'warning'
                        });
                    }
                })
            },
            closeCoupon(){
                this.couponSId = 0;
            },
            closeDel(){
                this.showDel = false;
            },
            showDelDialog(id,check){
                if(check){
                    this.delId = [];
                    this.showDel = true;
                    this.delId.push(id);
                }else{
                    this.$message({
                        message: '您还未选择要删除的商品',
                        type: 'warning'
                    });
                }
            },
            //单个商品删除
            delProd(){
                this.JCService.cartServer.editList({
                    'type':1,
                    'id':this.delId,
                }).then(e=>{
                    if(e.status == 1){
                        this.showDel = false;
                        this.getList();
                        this.$message({
                            message: '删除商品成功',
                            type: 'success'
                        });
                    }
                });
            },
            //多个商品删除
            delGoods(){
                if(this.allChecked){
                    //清空购物车
                    this.JCService.cartServer.editList({
                        'type':0,
                    }).then(e=>{
                        let message = '',type = 'success';
                        if(e.status == 1){
                            message = '清空购物车成功'
                            this.getList();
                        }else{
                            message = e.info;
                            type = 'warning';
                        }
                        this.$message({
                            message: message,
                            type: type
                        });
                    });
                }else{
                    this.JCService.cartServer.editList({
                        'type':1,
                        'id':this.checkedId,
                    }).then(e=>{
                        if(e.status == 1){
                            this.showDel = false;
                            this.getList();
                            this.$message({
                                message: '删除商品成功',
                                type: 'success'
                            });
                        }
                    });
                }
            },
            //判断选择商品数目
            chooseProdNums(){
                this.checkedId = [];
                var prods = this.prodsObj;
                this.chooseNums = 0;
                for(var val in prods){
                    for(var prod in prods[val].list){
                        if(prods[val].list[prod].checked){
                            this.chooseNums+=1;
                            this.checkedId.push(prods[val].list[prod].id);
                        }
                    }
                }
            },
            //控制商品的数量
            numChange(index,key,numChange,sid,id){
                var prods = this.prodsObj[index]['list'][key];

                if ( numChange == 1 ) {
                    prods.num++;
                } else if ( numChange == -1 ) {
                    prods.num--;
                }

                if ( prods.num <= 1 ) {
                    prods.num = 1;
                }
                //购物车商品数量编辑
                this.JCService.cartServer.editList({
                    'type':2,
                    'sid':sid,
                    'id':id,
                    'num':prods.num
                }).then(e=>{
                    if(e.status != 1){
                        this.$message({
                            message: e.info,
                            type: 'warning'
                        });
                    }else{
                        this.getList();
                    }
                });

                this.calTotalPrice();
            },
            //用户填写数量判断
            numEntry(index,key,sid,id){
                var prods = this.prodsObj[index]['list'][key];
                var reg = /^\+?[1-9][0-9]*$/;
                if(!reg.test(prods.num)){
                    this.$message({
                        message: '数量格式输入错误，请重新输入',
                        type: 'warning'
                    });
                    prods.num = 1;
                }
                //购物车商品数量编辑
                this.JCService.cartServer.editList({
                    'type':2,
                    'sid':sid,
                    'id':id,
                    'num':prods.num
                }).then(e=>{
                    if(e.status == 0){
                        this.$message({
                            message: e.info,
                            type: 'warning'
                        });
                    }else{
                        this.getList();
                    }
                });
                this.calTotalPrice();
            },
            //选择全部的商品
            chooseAllprods(){
                if(this.prodsObj.length>1){
                    this.$message({
                        message: '只能选择同一商铺的商品进行结算!',
                        type: 'warning'
                    });
                    return false;
                }else if(this.prodsObj.length == 1){
                    this.chooseSId = this.prodsObj[0].id;
                }
                var flag = true;
                if ( this.allChecked ) {
                    flag = false;
                }
                for ( var i = 0, len = this.prodsObj.length; i < len; i++ ) {
                    this.prodsObj[i]['checked'] = flag;
                    var list = this.prodsObj[i]['list'];
                    for(let j in list){
                        list[j]['checked'] = flag;
                    }
                }
                this.allChecked = !this.allChecked;
                this.calTotalPrice();
                this.chooseProdNums();
            },
            //店铺商品全选
            chooseShopProds(index){
                let _this = this;
                function operation() {
                    var list = _this.prodsObj[index]['list'];
                    if ( _this.prodsObj[index]['checked'] ){
                        for(let i in list){
                            list[i]['checked'] = false;
                        }
                    } else {
                        for(let i in list){
                            list[i]['checked'] = true;
                        }
                    }
                    _this.prodsObj[index]['checked'] = !_this.prodsObj[index]['checked'];

                    // 判断是否选择所有商品的全选
                    _this.isChooseAll();
                    _this.chooseProdNums();
                    _this.calTotalPrice();
                }
                //只能选择一个商铺商品
                if(this.chooseSId == 0){
                    operation();
                    //已选择商品的商铺id
                    this.chooseSId = this.prodsObj[index].id;
                }else{
                    if(this.prodsObj[index].id != this.chooseSId){
                        this.$message({
                            message: '只能选择同一商铺的商品进行结算!',
                            type: 'warning'
                        });
                    }else{
                        operation();
                    }
                }
                if(this.chooseNums == 0){
                    this.chooseSId = 0;
                }
            },
            //单个商品的选择
            choose(index,key){
                let _this = this;
                function operation() {
                    let list = _this.prodsObj[index]['list'];
                    if ( list[key]['checked'] ) {
                        _this.prodsObj[index]['checked'] = false;
                        _this.allChecked = false;
                        list[key]['checked'] = !list[key]['checked'];
                    } else {
                        list[key]['checked'] = !list[key]['checked'];

                        // 判断是否选择当前店铺的全选
                        let flag = true;
                        for(let i in list){
                            if ( list[i]['checked'] == false ) {
                                flag = false;
                                break;
                            }
                        }
                        flag == true ? _this.prodsObj[index]['checked'] = true : _this.prodsObj[index]['checked'] = false;
                    }
                    // 判断是否选择所有商品的全选
                    _this.isChooseAll();
                    _this.chooseProdNums();
                    _this.calTotalPrice();
                }
                //只能选择一个商铺商品
                if(this.chooseSId == 0){
                    operation();
                    //已选择商品的商铺id
                    this.chooseSId = this.prodsObj[index].id;
                }else{
                    if(this.prodsObj[index].id != this.chooseSId){
                        this.$message({
                            message: '只能选择同一商铺的商品进行结算!',
                            type: 'warning'
                        });
                    }else{
                        operation();
                    }
                }

                if(this.chooseNums == 0){
                    this.chooseSId = 0;
                }
            },
            //判断是否选择所有商品的全选
            isChooseAll(){
                let flag1 = true;
                for ( let i = 0, len = this.prodsObj.length; i < len; i++ ) {
                    if ( this.prodsObj[i]['checked'] == false ){
                        flag1 = false;
                        break;
                    }
                }
                flag1 == true ? this.allChecked = true : this.allChecked = false;
            },
            //计算全部商品总额
            calTotalPrice(){
                let oThis = this;
                this.totalPrice = 0;
                for ( let i = 0, len = this.prodsObj.length; i < len; i++ ) {
                    let list = this.prodsObj[i]['list'];
                    for(let j in list){
                        if ( list[j]['checked'] ) {
                            oThis.totalPrice = new Decimal(oThis.totalPrice).add(new Decimal(list[j].price).mul(new Decimal(list[j].num)));
                        }
                    }
                }
            },
            //去结算
            confirm(){
                if(this.chooseNums > 0){
                    this.JCService.cartServer.setSelectShops({
                        'sid':this.chooseSId,
                        'cid':this.checkedId
                    }).then(e=>{
                        if(e.status == 1){
                            this.$router.push('/confirmOrder');
                        }else{
                            this.$message({
                                message: e.info,
                                type: 'warning'
                            });
                        }
                    })
                }else{
                    this.$message({
                        message: '请选择需要结算的商品!',
                        type: 'warning'
                    });
                }
            },
            //商品详情
            prodDetail(shopid,id){
                this.$router.push('/subwebsite/productdetail?id='+id+'&type=1'+'&shop_id='+shopid);
            },
            //进入商铺
            inShop(id){
                this.$router.push('/subwebsite/?shop_id='+id);
            }
        }
    }
</script>

<style lang='scss' scoped>
    .mid{
        width: 100%;
        background: #f5f5f5;
        .main{
            width: 1200px;
            margin: 0 auto;
            background: #fff;
            padding: 30px 20px;
            font-size: 12px;
            color: #333;
            min-height: 300px;
            h3{text-align: center;}
            .allNum{
                font-size: 18px;
                font-weight: bold;
                color: #FF0000;
                margin-bottom: 20px;
            }
            .prodHead{
                height: 44px;
                background: #F3F3F3;
                display: flex;
                align-items: center;
                text-align: center;
            }
            .select{
                width: 13px;
                height: 13px;
                background: #fff;
                border: 1px solid  #C5C5C5;
                margin: 0 17px 0 11px;
                cursor: pointer;
                span{
                    display: block;
                    font-size: 12px;
                    margin: 2px 0 0 1px;
                }
            }
            .prod{
                width: 348px;
                margin-right: 9px;
            }
            .spec{
                width: 150px;
            }
            .price{
                width: 145px;
                margin-right: 40px;
            }
            .num{
                width: 80px;
                margin-right: 39px;
            }
            .money{
                width: 145px;
            }
            .operation{
                width: 162px;
            }
            .company{
                margin-top: 20px;
                .info{
                    display: flex;
                    height: 25px;
                    align-items: center;
                    margin-bottom:6px;
                    .select{
                        margin-right: 15px;
                    }
                    .name{
                        margin-right: 20px;
                        img{
                            width: 18px;
                            height: 15px;
                            margin-right: 5px;
                        }
                    }
                    .coupon{
                        position: relative;
                        width: 69px;
                        height: 25px;
                        line-height: 25px;
                        border: 1px solid #FF6262;
                        .btn{
                            font-size: 12px;
                            color: #FF0000;
                            cursor: pointer;
                            user-select: none;
                            img{
                                width: 7px;
                                height: 25px;
                                margin-right: 7px;
                            }
                            .el-icon-arrow-down{
                                margin-left: 5px;
                                transition: all .3s  ease-in-out;
                            }
                        }
                        .couponBox{
                            position: absolute;
                            left: 0;
                            top: 35px;
                            width: 336px;
                            border: 1px solid #ff4400;
                            padding: 10px 7px 12px 8px;
                            background: #fff;
                            z-index:100;
                            .head{
                                height: 33px;
                                border-bottom: 1px solid #ddd;
                                line-height: 33px;
                                color: #666;
                                img{
                                    width: 11px;
                                    height: 11px;
                                    margin-right: 7px;
                                    vertical-align: middle;
                                }
                            }
                            .couponList{
                                margin-top: 17px;
                                padding: 0 22px 0 8px;
                                .item{
                                    margin-bottom: 20px;
                                    height: 28px;
                                    display: flex;
                                    align-items: center;
                                    .reduce{
                                        width: 53px;
                                        height: 28px;
                                        line-height: 28px;
                                        background: #66A7FF;
                                        text-align: center;
                                        font-size: 14px;
                                        color: #fff;
                                        font-weight: bold;
                                        margin-right: 12px;
                                    }
                                    .reduce.red{
                                        background: #F06671;
                                    }
                                    .ruleBox{
                                        width: 178px;
                                        font-size: 12px;
                                        line-height: 1;
                                        color: #333;
                                        .time{
                                            color: #999;
                                            margin-top: 1px;
                                        }
                                    }
                                    .receiveBox{
                                        width:49px;
                                        height:25px;
                                        border:1px solid #c5c5c5;
                                        .receive{
                                            width:49px;
                                            height:25px;
                                            text-align: center;
                                            color: #666;
                                            cursor: pointer;
                                            user-select: none;
                                        }
                                    }
                                    .receiveBox.get{
                                        border-color: transparent;
                                    }
                                }
                                .item:last-of-type{
                                    margin-bottom: 0;
                                }
                            }
                            .couponList.scroll{
                                max-height: 175px;
                                overflow-y: scroll;
                            }
                            .close{
                                position: absolute;
                                width: 12px;
                                height: 12px;
                                top: 10px;
                                right: 10px;
                                cursor: pointer;
                            }
                        }
                        .couponBox:before,.couponBox:after{
                            position: absolute;
                            display: block;
                            content: '';
                            width: 0;
                            height: 0;
                            border: 5px solid transparent;
                            border-bottom-color:#ff4400;
                            left: 37px;
                            top:-11px;
                        }
                        .couponBox:after{
                            border-bottom-color:#fff;
                            top: -10px;
                        }
                    }
                    .coupon.show{
                        .el-icon-arrow-down{
                            transform: rotate(180deg);
                        }
                    }
                }
                .prodList{
                    border: 1px solid #ddd;
                    .item{
                        border-bottom: 1px solid #ddd;
                        display: flex;
                        padding: 16px 0 22px 0;
                        text-align: center;
                        .select{
                            margin-top: 5px;
                        }
                        .prod{
                            display: flex;
                            align-items: center;
                            img{
                                width: 82px;
                                height: 82px;
                                border: 1px solid #C5C5C5;
                                margin-right: 20px;
                            }
                            .name{
                                text-align: left;
                                color: #000;
                                line-height: 18px;
                            }
                        }
                        .num{
                            margin-top: 30px;
                            span{
                                display: inline-block;
                                width: 16px;
                                height: 20px;
                                line-height: 20px;
                                border: 1px solid #C5C5C5;
                                color: #999;
                                text-align: center;
                                cursor: pointer;
                                background: #fff;
                                user-select: none;
                            }
                            input{
                                display: inline-block;
                                width: 44px;
                                height: 20px;
                                border: 1px solid #C5C5C5;
                                border-left-width: 0;
                                border-right-width:0;
                                text-align: center;
                                outline: none;
                            }
                        }
                        .price,.operation,.money,.spec{
                            height: 82px;
                            line-height: 82px;
                        }
                    }
                    .item:last-of-type{
                        border-bottom: 0;
                    }
                    .item.choose{
                        background: #FFF4E8;
                    }
                }
            }
            .totalBox{
                position: relative;
                margin-top: 20px;
                height: 58px;
                border: 1px solid #ddd;
                display: flex;
                align-items: center;
                .delTxt{
                    margin-left: 33px;
                    margin-right: 650px;
                }
                .chooseNum{
                    color: #999;
                    margin-top: -8px;
                    margin-right: 35px;
                    span{
                        color: #FF0000;
                        margin: 0 3px;
                    }
                }
                .total{
                    color: #999;
                    margin-top: -12px;
                    span{
                        color: #FF0000;
                        font-size: 16px;
                        font-weight: bold;
                    }
                }
                .settlement{
                    position: absolute;
                    width: 107px;
                    height: 58px;
                    background: #E64347;
                    top: 0;
                    right: 0;
                    font-size: 18px;
                    color: #fff;
                    font-weight: bold;
                    text-align: center;
                    line-height: 58px;
                    cursor: pointer;
                }
            }
        }
    }
</style>