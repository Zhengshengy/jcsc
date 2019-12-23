<template>
    <div class="bg">
        <div class="my">
            <p class="tit">我的积分</p>
            <p>平台积分，可在后期兑换礼品，尽请期待！</p>
        </div>
        <div class="wallet">
            <div class="numBox">
                <div>
                    <div class="txt">我的可用积分</div>
                    <div class="num"><span class="int">{{integral}}</span><span class="float">.00</span></div>
                </div>
                <!--<router-link to="/" class="rechange">积分商城</router-link>-->
            </div>
            <!--<ul class="tab">-->
                <!--<li :class="{active:year.thisYear}" @click="getList('thisYear',2019)">2019年积分明细</li>-->
                <!--<li :class="{active:year.lastYear}" @click="getList('lastYear',2018)">2018年积分明细</li>-->
            <!--</ul>-->
            <div class="dataBox">
                <div class="head">
                    <div class="time">时间</div>
                    <div class="price">积分</div>
                    <div class="operation">操作</div>
                </div>
                <ul class="list">
                    <li v-for="(i,index) in list.data" class="list-item" :key="index">
                        <div class="item">
                            <div class="time">{{i.create_time}}</div>
                            <div class="price blue">+{{i.point}}</div>
                            <div class="operation" v-if="i.source == 0">订单</div>
                            <div class="operation" v-if="i.source == 1">登陆</div>
                            <div class="operation" v-if="i.source == 2">活动</div>
                            <div class="operation" v-if="i.source == 3">签到</div>
                        </div>
                    </li>
                </ul>
                <!--<div class="list">-->
                    <!--<div class="item">-->
                        <!--<div class="time">2019-09-30 11:30:05</div>-->
                        <!--<div class="price red">-50</div>-->
                        <!--<div class="operation">兑换礼品</div>-->
                    <!--</div>-->
                <!--</div>-->
            </div>
            <div class="noData" v-show="list.total == 0">
                <img src="@/assets/image/personal/nomessage.png" alt="">
                <p>您还没有任何积分明细记录哦</p>
            </div>
            <div class="page" v-if="list.total > 0">
                <el-pagination background  @current-change="handleCurrentChange"
                               :current-page.sync="currentPage" :page-size="6" layout="prev, pager, next, jumper" :total="list.total"
                               prev-text="上一页" next-text="下一页">
                </el-pagination>
            </div>
            <div class="tool">提示：系统仅显示您一年内的积分明细，更早的积分明细不再显示。</div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Integral",
        data(){
            return {
                // year:{
                //     thisYear:true,
                //     lastYear:false
                // },
                integral:0,
                list:[],
                currentPage: 1,
            }
        },
        created(){
            this.JCService.PersonalServer.Integral_num().then(e=>{
                this.integral = e.info ? e.info : 0;
            });
            this.JCService.PersonalServer.Integral_detail({pag:this.currentPage}).then(e=>{
                this.list = e.info;
                for(let i in this.list.data){
                    this.list.data[i].create_time = this.JCutils.Format(this.list.data[i].create_time*1000);
                }
            })
        },
        methods:{
            // getList(status,year){
            //     for(var item in this.year){
            //         this.year[item] = false;
            //     }
            //     this.year[status] = true;
            // },
            handleCurrentChange() {
                this.JCService.PersonalServer.Integral_detail({pag:this.currentPage}).then(e=>{
                    this.list = e.info;
                })
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