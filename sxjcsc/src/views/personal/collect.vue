<template>
    <div class="bg">
        <div class="myTit">我的收藏</div>
        <div class="list">
            <div class="item" v-for="(item,index) in list" :key="index">
                <div class="left">
                    <img class="headImg" :src="item.shops_img" alt="">
                    <div class="shopName">{{item.name}}</div>
                    <div class="followNum"><img src="@/assets/image/personal/collect.png" alt=""><span>{{item.quantity}}</span></div>
                    <div class="btns">
                        <div class="inShop pointer" @click="enterShops(item.id)"><img src="@/assets/image/personal/shop.png" alt="">进入商铺</div>
                    </div>
                    <div class="funKey">
                        <div class="toOne" v-if="item.top == 1" @click="sticky(2,item.id)">取消置顶</div>
                        <div class="toOne" v-if="item.top == 0" @click="sticky(1,item.id)">置顶</div>
                        <div class="cancelCollect" @click="showCancel(item.id)">取消收藏</div>
                    </div>
                </div>
                <div class="rightBox">
                    <div class="operation">
                        <div class="more"><span>查看更多</span><span class="el-icon-arrow-right"></span></div>
                    </div>
                    <div class="prods">
                        <div class="prod pointer" v-for="(prod,i) in item.prods" :key="i" @click="enterProd(prod.id,item.id)">
                            <img :src="prod.img" alt="">
                            <div class="name singlerow">{{prod.name}}</div>
                        </div>
                    </div>
                    <div class="coupons" v-if="item.coupon_name">
                        <div class="coupon pointer" v-for="(coupon,k) in item.coupons" :key="k">
                            <div class="num">￥{{coupon.money}}</div>
                            <div class="rule">满{{coupon.rule}}元可用</div>
                            <div class="time">{{coupon.create_time}}  -  {{coupon.end_time}}</div>
                            <div class="getCoupon pointer" @click="getCoupon(coupon.id)">立即领取</div>
                        </div>
                    </div>
                </div>
                <div class="delBox" :ref="`cancel${item.id}`">
                    <div class="del">
                        <img src="@/assets/image/personal/sad.png" alt="">
                        <span>亲，确认要抛弃我么~</span>
                    </div>
                    <div class="btns">
                        <div class="confirm" @click="cancel(item.id)">确定</div>
                        <div class="cancel" @click="close(item.id)">取消</div>
                    </div>
                </div>
            </div>
        </div>
        <div class="page">
            <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange"
                           :current-page.sync="currentPage" :page-size="3" layout="prev, pager, next, jumper" :total="this.total"
                           prev-text="上一页" next-text="下一页">
            </el-pagination>
        </div>
        <div class="stickyBox" v-show="showSticky">
            <img src="@/assets/image/personal/sticky.png" alt="" class="mark">
            <span class="txt">{{stickyTxt}}</span>
            <div class="close" @click="closeSticky"><img src="@/assets/image/personal/addressClose.png" alt=""></div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Collect",
        data(){
            return{
                showSticky:false,
                stickyTxt:'取消置顶成功！',
                currentPage: 1,
                total:0,
                list:[],
            }
        },
        created(){
            this.getlist();
        },
        methods:{
            getlist(){
                this.JCService.PersonalServer.Collect({'pag':this.currentPage}).then(e=>{
                    this.total = e.info.total ? e.info.total : 0;
                    this.list = e.info.data;
                    for(let i in this.list){
                        let listItem = this.list[i];
                        listItem.shops_img = this.JCconfig.filePath +'/public/'+ listItem.shops_img;
                        listItem.prods = [];
                        listItem.coupons = [];
                        let prodLen = listItem.commdity_id.length;
                        for(let j=0;j<prodLen;j++){
                            listItem.prods.push({
                                'id':listItem.commdity_id[j],
                                'name':listItem.commdity_name[j],
                                'img':this.JCconfig.filePath +'/public/'+listItem.commodity[j].split(',')[0]
                            })
                        }
                        if(listItem.coupon_name){
                            let couponLen = listItem.coupon_name.length;
                            for(let k=0;k<couponLen;k++){
                                listItem.coupons.push({
                                    'id':listItem.coupon_id[k],
                                    'name':listItem.coupon_name[k],
                                    'create_time':this.JCutils.Format3(listItem.create_time[k]*1000),
                                    'end_time':this.JCutils.Format3(listItem.end_time[k]*1000),
                                    'money':listItem.money[k],
                                    'rule':listItem.rule[k],
                                })
                            }
                        }

                    }
                });
            },
            showCancel(id){
                this.$refs[`cancel${id}`][0].style.display = 'block';
            },
            cancel(id){
                this.$refs[`cancel${id}`][0].style.display = 'none';
                this.JCService.PersonalServer.Collect_cancel({'commdity_id':id}).then(e=>{
                    if(e.info == 1){
                        this.$message({
                            message: '取消收藏成功',
                            type: 'success'
                        });
                        this.getlist();
                    }
                })
            },
            close(id){
                this.$refs[`cancel${id}`][0].style.display = 'none';
            },
            sticky(top,id){
                switch (top) {
                    case 1:
                        this.stickyTxt = '置顶成功！';
                        this.currentPage = 1;
                    break;
                    case 2:
                        this.stickyTxt = '取消置顶成功！';
                    break;
                }
                let _this = this;
                this.JCService.PersonalServer.Collect_top({'commdity_id':id,'type':1,'top':top}).then(e=>{
                    if(e.status == 1){
                        _this.getlist();
                        _this.showSticky = true;
                        setTimeout( ()=> {
                            _this.showSticky = false;
                        },3000)
                    }else{
                        this.$message({
                            message: e.info,
                            type: 'warning'
                        });
                    }
                })
            },
            closeSticky(){
                this.showSticky = false;
            },
            handleSizeChange() {
            },
            handleCurrentChange() {
                this.getlist();
            },
            //进入商铺
            enterShops(id){
                this.$router.push('/subwebsite?shop_id='+id);
            },
            //浏览商品
            enterProd(id,sid){
                this.$router.push('/subwebsite/productdetail?id='+id+'&type=1&shop_id='+sid);
            },
            //领取优惠券
            getCoupon(id){
                this.JCService.PersonalServer.addUserCoupon({
                    'id':id,
                    'type':1
                }).then(e=>{
                    if(e.status == 1){
                        this.$message({
                            message: e.info,
                            type: 'success'
                        });
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
    .bg{
        background: #fff;
        padding-bottom: 30px;
        .myTit{
            font-size: 16px;
            color: #000;
            height: 53px;
            line-height: 53px;
            border-bottom: 1px solid #f5f5f5;
            padding-left: 18px;
            margin-bottom: 10px;
        }
        .list{
            padding: 20px;
            .item{
                border: 1px solid #D2D2D2;
                margin-bottom: 20px;
                display: flex;
                position: relative;
                .left{
                    width: 236px;
                    position: relative;
                    min-height: 260px;
                    .headImg{
                        display: block;
                        width: 65px;
                        height: 65px;
                        border-radius: 2px;
                        margin: 36px auto 15px;
                    }
                    .shopName{
                        font-size: 12px;
                        color: #333;
                        text-align: center;
                        margin-bottom: 36px;
                    }
                    .followNum{
                        text-align: center;
                        font-size: 12px;
                        color: #999;
                        line-height: 16px;
                        img{
                            margin-right: 6px;
                        }
                    }
                    .btns{
                        position: absolute;
                        left: 0;
                        bottom: 0;
                        display: flex;
                        div{
                            width: 236px;
                            height: 33px;
                            text-align: center;
                            background: #F9F9F9;
                            border-top: 1px solid #ddd;
                            border-left: 1px solid #ddd;
                            line-height: 33px;
                            font-size: 12px;
                            color: #333;
                            img{
                                vertical-align: sub;
                                margin-right: 5px;
                            }
                        }
                        .inShop{
                            border-left: 0;
                        }
                    }
                    .funKey{
                        position: absolute;
                        width: 100%;
                        top: 0;
                        left: 0;
                        display: flex;
                        justify-content: space-between;
                        display: none;
                        div{
                            width: 117px;
                            height: 23px;
                            background: #7F7F7F;
                            font-size: 12px;
                            color: #fff;
                            line-height: 23px;
                            text-align: center;
                            cursor: pointer;
                        }
                    }
                }
                .left:hover .funKey{
                    display: flex;
                }
                .rightBox{
                    width: 720px;
                    border-left:1px solid #D2D2D2;
                    .operation{
                        text-align: right;
                        margin: 20px 20px 30px 0;
                        .more{
                            display: inline-block;
                            font-size: 12px;
                            color: #333;
                            line-height: 25px;
                            padding:0 5px 0 10px;
                            background: #f1f1f1;
                            border: 1px solid #ddd;
                        }
                    }
                    .prods{
                        padding: 0 30px;
                        display: flex;
                        margin-bottom: 20px;
                        .prod{
                            width: 95px;
                            margin-right: 46px;
                            font-size: 12px;
                            img{
                                width: 95px;
                                height: 95px;
                                border: 1px solid #D2D2D2;
                            }
                            .name{
                                color: #666;
                                margin: 10px 0 15px;
                            }
                            .name:hover{
                                color: #FF0000;
                            }
                            .price{
                                color: #FF0000;
                                text-align: center;
                            }
                        }
                        .prod:last-of-type{
                            margin-right: 0;
                        }
                    }
                    .coupons{
                        padding: 0 20px;
                        display: flex;
                        margin-bottom: 20px;
                        .coupon{
                            width: 208px;
                            height: 69px;
                            margin-right: 28px;
                            position: relative;
                            background: url("../../assets/image/personal/bgBlue.png");
                            background-size: 100% 100%;
                            color: #fff;
                            .num{
                                font-size: 18px;
                                font-weight: bold;
                                margin: 5px 0 5px 5px;
                            }
                            .rule{
                                font-size: 0.1em;
                                margin-left: 5px;
                                margin-bottom: 3px;
                            }
                            .time{
                                font-size: 0.1em;
                                margin-left: 5px;
                            }
                            .getCoupon{
                                position: absolute;
                                top: 9px;
                                right: 12px;
                                width:71px;
                                height:23px;
                                border:1px solid #fff;
                                border-radius:12px;
                                font-size: 12px;
                                color: #fff;
                                text-align: center;
                                line-height: 23px;
                            }
                        }
                        .coupon.red{
                            background: url("../../assets/image/personal/bgRed.png");
                        }
                        .coupon:last-of-type{
                            margin-right: 0;
                        }
                    }
                }
            }
        }
        .page{
            width: 630px;
            margin: 30px auto 0;
            height: 30px;
        }
    }
    .delBox{
        width: 960px;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
        background: rgba(255,255,255,.85);
        display: none;
        .del{
            text-align: center;
            height: 32px;
            line-height: 32px;
            margin: 100px 0 30px;
            font-size: 16px;
            color: #333;
            img{
                margin-right: 11px;
            }
        }
        .btns{
            display: flex;
            justify-content: center;
            div{
                width:94px;
                height:36px;
                background:#fff;
                border:1px solid #D0D0D0;
                border-radius:4px;
                text-align: center;
                font-size: 12px;
                line-height: 36px;
                cursor: pointer;
                color: #999;
            }
            .confirm{
                margin-right: 20px;
                color: #fff;
                background: #FF0000;
            }
        }
    }
    .stickyBox{
        width: 412px;
        height: 128px;
        position: fixed;
        top: 50%;
        left: 50%;
        z-index: 100;
        transform: translate(-50%,-50%);
        background: #fff;
        box-shadow:0 0 5px rgba(0,0,0,.3);
        text-align: center;
        .mark{
            width: 48px;
            height: 48px;
            margin-top: 40px;
            margin-right: 12px;
        }
        .txt{
            font-size: 18px;
            color: #000;
            font-weight: bold;
            line-height: 128px;
        }
        .close{
            position: absolute;
            width: 13px;
            height: 13px;
            top:10px;
            right: 10px;
            cursor: pointer;
        }
    }
</style>