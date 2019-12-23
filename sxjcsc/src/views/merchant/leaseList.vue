<template>
    <div class="setbox">
        <div class="title px-20 font-16 text-3">
            出租转让
            <div class="float-right">
                <router-link :to="{name:'AddLease'}">
                    <div class="item pointer text-3 font-12 float-left"><i class="el-icon-heavy-rain"></i>新增信息</div>
                </router-link>
            </div>
        </div>
        <div class="content">
            <el-row class="pb-20" style="border-bottom: 1px solid #F5F5F5">
                <el-col :span="24" class="px-20 pt-30">
                    <div class="float-left pic">
                        <img src="@/assets/image/public/transfer.svg" alt="" width="122" height="122">
                        <div class="num text-white font-12 text-center">共5张</div>
                    </div>
                    <div class="wid float-left mx-35">
                        <p class="text-3 font-14 fw-blod singlerow">出租转让未央湖华博物流600平米钢构11米高库房</p>
                        <p class="text-6 font-12 row3 mt-15" style="line-height: 18px">
                            600平方米的钱，用1800平方米的面积，可租一层，两层、三层任意选，分割
                            方便，经济适用，交通便利.方便，经济适用，交通便利方便，经济适用，交通便利
                        </p>
                        <p class="text-3 font-12 mt-15">联系电话：15619381686</p>
                    </div>
                    <div class="float-left text-3 font-14 mx-25" style="line-height: 118px">2019-11-06 15:48:45</div>
                    <div class="float-right mt-40">
                        <div class="btn float-left edit">编辑</div>
                        <div class="btn float-left shelves ml-10">删除</div>
                    </div>
                </el-col>
            </el-row>
            <div class="page">
                <el-pagination background
                               @current-change="handleCurrentChange"
                               :current-page.sync="currentPage" :page-size="pageSize"
                               layout="prev, pager, next, jumper" :total="total"
                               prev-text="上一页" next-text="下一页">
                </el-pagination>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        name: 'LeaseList',
        data() {
            return {
                currentPage: 1,
                pageSize:0,
                total:0,
                value:1
            }
        },
        methods: {
            handleCurrentChange(val) {
            },
        }
    }
</script>
<style scoped lang="scss">
    .setbox{
        width: 1000px;
        height: 970px;
        margin: 30px 0 0 30px;
        background: #ffffff;
        .title{
            height: 50px;
            border: 1px solid #F5F5F5;
            line-height: 50px;
            .item{width:105px;height:29px;border:1px solid rgba(221, 221, 221, 1);margin-top:12px;border-radius:5px;line-height: 30px;text-align: center}
        }
        .pic{width: 122px;height: 122px;border-radius: 5px;overflow: hidden;position: relative}
        .num{width: 122px;height: 25px;background:rgba(0,0,0,.5);position: absolute;bottom: 0;line-height: 25px}
        .wid{width: 415px}
        .edit{background: red;color: #ffffff}
        .shelves{background: #AEAEAE;color: #ffffff}
        .btn{width: 60px;height: 30px;border-radius: 5px;text-align: center;line-height: 30px;font-size: 12px;cursor: pointer}
        .page{
            width: 630px;
            margin: 30px auto;
            height: 30px;
        }
    }
</style>
