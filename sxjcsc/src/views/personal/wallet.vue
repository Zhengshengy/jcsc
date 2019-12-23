<template>
    <div class="bg">
        <div class="my">
            <p class="tit">我的钱包</p>
            <p>陕西建材商城 保障平台资金安全</p>
        </div>
        <div class="wallet">
            <div class="numBox">
                <div>
                    <div class="txt">我的可用余额</div>
                    <div class="num"><span class="int">{{balance.int}}</span><span class="float">.{{balance.float}}</span></div>
                </div>
                <router-link to="/recharge" class="rechange">充值</router-link>
            </div>
            <!--<ul class="tab">-->
                <!--<li :class="{active:year.thisYear}" @click="getList('thisYear',2019)">2019年收支明细</li>-->
                <!--<li :class="{active:year.lastYear}" @click="getList('lastYear',2018)">2018年收支明细</li>-->
            <!--</ul>-->
            <div class="dataBox" v-show="list.count > 0">
                <div class="head">
                    <div class="time">时间</div>
                    <div class="price">金额</div>
                    <div class="operation">操作</div>
                </div>
                <div class="list">
                    <div class="item" v-for="(item,index) in list.datas" :key="index">
                        <div class="time">{{item.creat_time}}</div>
                        <div class="price red" :class="{'blue':item.eandr == '+','red':item.eandr == '-'}" >{{item.eandr}}{{item.money}}</div>
                        <div class="operation" v-if="item.type == -1">购买商品</div>
                        <div class="operation" v-if="item.type == -2">商品交易</div>
                        <div class="operation" v-if="item.type == 1">充值</div>
                        <div class="operation" v-if="item.type == 2">提现</div>
                        <div class="operation" v-if="item.type == 3">开通商铺</div>
                        <div class="operation" v-if="item.type == 4">商品续费</div>
                        <div class="operation" v-if="item.type == 5">赞助平台</div>
                        <div class="operation" v-if="item.type == 6">提成佣金</div>
                        <div class="operation" v-if="item.type == 8">商家退款</div>
                    </div>
                </div>
            </div>
            <div class="noData" v-show="list.count == 0">
                <img src="@/assets/image/personal/nomessage.png" alt="">
                <p>您还没有任何收支明细记录哦</p>
            </div>
            <div class="page" v-if="list.count > 0">
                <el-pagination background  @current-change="handleCurrentChange"
                               :current-page.sync="currentPage" :page-size="6" layout="prev, pager, next, jumper" :total="list.count"
                               prev-text="上一页" next-text="下一页">
                </el-pagination>
            </div>
            <div class="tool" v-if="false">提示：系统仅显示您一年内的余额明细，更早的月明细不再显示。</div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "PersonalWallet",
        data(){
            return {
                balance:{
                    int:0,
                    float:"00"
                },
                // year:{
                //     thisYear:true,
                //     lastYear:false
                // },
                list:[],
                currentPage: 1,
            }
        },
        created(){
            this.JCService.PersonalServer.Balance_num().then(e=>{
                let num = e.info.money.split('.');
                this.balance.int = num[0];
                this.balance.float = num[1];
            })
            this.getData();
        },
        methods:{
            // getList(status,year){
            //     for(var item in this.year){
            //         this.year[item] = false;
            //     }
            //     this.year[status] = true;
            //     if(year == 2018){
            //         this.hasData = true;
            //     }else{
            //         this.hasData = false;
            //     }
            // },
            getData(){
                this.JCService.PersonalServer.getBillData({page:this.currentPage}).then(e=>{
                    this.list = e.info;
                    this.list.count = parseInt(this.list.count);
                    for(let i in this.list.datas){
                        this.list.datas[i].creat_time = this.JCutils.Format(this.list.datas[i].creat_time*1000);
                    }
                })
            },
            handleCurrentChange() {
                this.getData();
            }
        }
    }
</script>

<style lang='scss' scoped>
    .bg{
        background: #fff;
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
                color: #999;
            }
        }
        .wallet{
            padding: 0 20px 40px;
            .numBox{
                padding: 0 39px 49px 29px;
                display: flex;
                justify-content: space-between;
                .txt{
                    font-size: 18px;
                    color: #333;
                    font-weight:bold;
                    margin-bottom: 16px;
                }
                .num{
                    font-weight: bold;
                    color: #333333;
                    .int{
                        font-size: 50px;
                    }
                    .float{
                        font-size: 24px;
                    }
                }
                .rechange{
                    width:217px;
                    height:42px;
                    background:#FF0000;
                    border-radius:2px;
                    line-height: 42px;
                    color: #fff;
                    text-align: center;
                }
            }
            .tab{
                border-bottom: 2px solid #f5f5f5;
                display: flex;
                li{
                    width: 168px;
                    text-align: center;
                    padding-bottom: 9px;
                    position: relative;
                    font-size: 16px;
                    line-height: 1;
                    cursor: pointer;
                }
                li:after{
                    display: inline-block;
                    position: absolute;
                    content:'';
                    width: 2px;
                    height: 12px;
                    top: 2px;
                    right: 0;
                    background: #999;
                }
                li.active:before{
                    display: inline-block;
                    position: absolute;
                    content: '';
                    width: 168px;
                    height: 2px;
                    left: 0;
                    bottom: -2px;
                    background: #FF0000;
                }
            }
            .dataBox{
                padding-top: 20px;
                .head{
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    height: 44px;
                    background: #f5f5f5;
                    font-size: 16px;
                    color: #333;
                    text-align: center;
                }
                .time{
                    width: 300px;
                }
                .price{
                    width: 250px;
                }
                .price.red{
                    color: #FF0000;
                }
                .price.blue{
                    color: #006DFF;
                }
                .operation{
                    width: 150px;
                }
                .list{
                    padding-top: 20px;
                    .item{
                        display: flex;
                        justify-content: space-between;
                        font-size: 16px;
                        color: #333;
                        margin-bottom: 40px;
                        text-align: center;
                    }
                }

            }
            .noData{
                img{
                    display: block;
                    margin: 109px auto 20px;
                }
                p{
                    font-size: 16px;
                    color: #333;
                    text-align: center;
                    margin-bottom: 75px;
                }
            }
            .tool{
                margin-top: 30px;
                font-size: 14px;
                color: #999;
            }
        }
        .page{
            width: 630px;
            margin: 0px auto;
            height: 30px;
            padding-bottom: 20px;
            text-align: center;
        }
    }
</style>