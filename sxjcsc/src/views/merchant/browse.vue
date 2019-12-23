<template>
    <div class="box pt-30">
        <el-row :gutter="20">
            <el-col :span="6">
                <div class="item">
                    <div class="float-left itemleft" style="background: #FF8761"></div>
                    <div class="itemright float-left">
                        <p class="text-center text-3 font-12 mt-30">累计销售金额</p>
                        <p class="text-center font-18 mt-5 fw-blod" style="color: #FF3D00">￥215.620</p>
                    </div>
                </div>
            </el-col>
            <el-col :span="6">
                <div class="item">
                    <div class="float-left itemleft" style="background: #57BDDE"></div>
                    <div class="itemright float-left">
                        <p class="text-center text-3 font-12 mt-30">累计销售金额</p>
                        <p class="text-center font-18 mt-5 fw-blod" style="color: #00C1FF">45</p>
                    </div>
                </div>
            </el-col>
            <el-col :span="6">
                <div class="item">
                    <div class="float-left itemleft" style="background: #B198DC"></div>
                    <div class="itemright float-left">
                        <p class="text-center text-3 font-12 mt-30">交易中的订单数</p>
                        <p class="text-center font-18 mt-5 fw-blod" style="color: #B198DC">10</p>
                    </div>
                </div>
            </el-col>
            <el-col :span="6">
                <div class="item">
                    <div class="float-left itemleft" style="background: #6DC7BE"></div>
                    <div class="itemright float-left">
                        <p class="text-center text-3 font-12 mt-30">商铺在售商品</p>
                        <p class="text-center font-18 mt-5 fw-blod" style="color: #6DC7BE">20</p>
                    </div>
                </div>
            </el-col>
        </el-row>
        <el-row class="mt-20" :gutter="20">
            <el-col :span="8">
                <div class="info">
                    <div class="top" style="background: #054683">
                        <div class="heard bg-red"></div>
                    </div>
                    <div class="px-45">
                        <p class="text-9 font-12" style="margin-top: 60px">
                            <span>店铺名称：</span><span class="text-6">陕西顶美管业有限公司</span>
                        </p>
                        <p class="text-9 font-12 mt-10">
                            <span>店铺管理：</span>
                            <span class="text-6">袁军磊</span>
                        </p>
                        <p class="text-9 font-12 mt-10">
                            <span>店铺到期时间：</span>
                            <span class="text-6">2020年8月12日</span>
                        </p>
                        <p class="text-9 font-12 mt-10">
                            <span>上次登陆时间：</span>
                            <span class="text-6">2020年8月12日  15:24</span>
                        </p>
                    </div>
                    <p class="px-25 text-9 font-12" style="margin-top: 60px">陕西省西安市未央区太华北路华远好天地1803室</p>
                    <div class="bottom mt-25 text-6 font-14">
                        <div class="btn " style="border-right: 1px solid #CCCCCC">店铺设置</div>
                        <div class="btn ">进入商铺</div>
                    </div>
                </div>
            </el-col>
            <el-col :span="16">
                <el-row :gutter="20">
                    <el-col :span="14">
                        <div class="moneyBox bg-white">
                            <div class="title text-6 font-18 px-25 py-15">账户资金</div>
                            <div class="p-25">
                                <div class="money float-left">
                                    <p class="text-6 text-center mt-25">总金额</p>
                                    <p class="text-6 text-center">￥7000.00</p>
                                </div>
                                <div class="btns float-left ml-40">
                                    <div class="btn bg-primary float-left">充值</div>
                                    <div class="btn bg-red float-left" style="margin-left: 10px">提现</div>
                                </div>
                            </div>
                        </div>
                    </el-col>
                    <el-col :span="10">
                        <div class="moneyBox bg-white">
                            <div class="title text-6 font-18 px-20 py-15">品牌管理</div>
                            <el-row :gutter="20" class="p-20">
                                <el-col :span="8">
                                    <div class="item"></div>
                                    <p class="text-6 font-14 text-center mt-10">远大阀门</p>
                                </el-col>
                                <el-col :span="8">
                                    <div class="item"></div>
                                    <p class="text-6 font-14 text-center mt-10">远大阀门</p>
                                </el-col>
                                <el-col :span="8">
                                    <div class="item"></div>
                                    <p class="text-6 font-14 text-center mt-10">远大阀门</p>
                                </el-col>
                            </el-row>
                            <p class="text-6 font-14 text-center mt-15">共12品牌</p>
                            <p class="font-14 text-center text-primary mt-5">查看详情</p>
                        </div>
                    </el-col>
                </el-row>
                <el-row class="mt-20">
                    <el-col :span="24" class="pBox">
                        <div class="title text-6 font-18 px-20 py-15">价格表</div>
                        <el-row :gutter="20" class="p-10">
                            <el-col :span="4">
                                <div class="item "></div>
                            </el-col>
                            <el-col :span="4">
                                <div class="item"></div>
                            </el-col>
                            <el-col :span="4">
                                <div class="item "></div>
                            </el-col>
                            <el-col :span="4">
                                <div class="item "></div>
                            </el-col>
                            <el-col :span="4">
                                <div class="item "></div>
                            </el-col>
                            <el-col :span="4">
                                <div class="item">
                                    <p class="text-6 font-14 text-center mt-30">共12条</p>
                                    <p class="font-14 text-center text-primary mt-5">查看详情</p>
                                </div>
                            </el-col>
                        </el-row>
                    </el-col>
                </el-row>
            </el-col>
        </el-row>
        <el-row class="py-15 px-25 bg-white mt-20" justify="space-between" style="border: 1px solid #F5F5F5">
            <el-col :span="12" class="font-18 text-6 mt-5">我的订单</el-col>
            <el-col :span="12">
                <div class="float-right text-3 font-12 more">
                    查看更多
                </div>
            </el-col>
        </el-row>
        <el-row class="p-20 bg-white">
            <el-col :span="8" class="text-3 font-14">商品信息</el-col>
            <el-col :span="2" class="text-3 font-14">单价</el-col>
            <el-col :span="2" class="text-3 font-14">数量</el-col>
            <el-col :span="8" class="text-3 font-14">买家信息</el-col>
            <el-col :span="2" class="text-3 font-14">实收款</el-col>
            <el-col :span="2" class="text-3 font-14">管理操作</el-col>
        </el-row>
        <el-row class="mt-10">
            <el-col :span="24" >
                <p class="text-9 font-12 px-20" style="line-height: 30px">
                    <span>订单编号：123456789102</span>
                    <span style="margin-left: 60px">下单时间：2019-18-30  20:50:00</span>
                </p>
                <el-row class="p-20 bg-white" style="height: 90px;line-height: 50px">
                    <el-col :span="8" class="text-6 font-12">
                        <el-checkbox>
                            <img src="@/assets/image/public/transfer.svg" alt="" width="50" height="50" style="vertical-align: middle">
                            <span class="ml-10">304不锈钢高压球阀</span>
                        </el-checkbox>
                    </el-col>
                    <el-col :span="2" class="text-6 font-12">60.8</el-col>
                    <el-col :span="2" class="text-6 font-12">1</el-col>
                    <el-col :span="8" class="text-6 font-12" style="line-height: 18px">
                        <p>苏大强</p>
                        <p>15619381686</p>
                        <p class="singlerow">陕西省西安市未央区太华北路华远好天地1803室</p>
                    </el-col>
                    <el-col :span="2" class="text-6 font-12 text-red">￥1076</el-col>
                    <el-col :span="2" class="text-6 font-12" style="line-height: 18px">
                        <p class="text-primary text-center" style="width: 60px">详情</p>
                        <div class="text-white bg-red  delivery mt-5">发货</div>
                    </el-col>
                </el-row>
                <el-row class="p-20 bg-white" style="height: 90px;line-height: 50px">
                    <el-col :span="8" class="text-6 font-12">
                        <el-checkbox>
                            <img src="@/assets/image/public/transfer.svg" alt="" width="50" height="50" style="vertical-align: middle">
                            <span class="ml-10">304不锈钢高压球阀</span>
                        </el-checkbox>
                    </el-col>
                    <el-col :span="2" class="text-6 font-12">60.8</el-col>
                    <el-col :span="2" class="text-6 font-12">1</el-col>
                    <el-col :span="8" class="text-6 font-12" style="line-height: 18px">
                        <p>苏大强</p>
                        <p>15619381686</p>
                        <p class="singlerow">陕西省西安市未央区太华北路华远好天地1803室</p>
                    </el-col>
                    <el-col :span="2" class="text-6 font-12 text-red">￥1076</el-col>
                    <el-col :span="2" class="text-6 font-12" style="line-height: 18px">
                        <p class="text-primary text-center" style="width: 60px">详情</p>
                        <div class="text-white bg-red  delivery mt-5">发货</div>
                    </el-col>
                </el-row>
            </el-col>
        </el-row>
        <el-row class="mt-10">
            <el-col :span="24" >
                <p class="text-9 font-12 px-20" style="line-height: 30px">
                    <span>订单编号：123456789102</span>
                    <span style="margin-left: 60px">下单时间：2019-18-30  20:50:00</span>
                </p>
                <el-row class="p-20 bg-white" style="height: 90px;line-height: 50px">
                    <el-col :span="8" class="text-6 font-12">
                        <el-checkbox>
                            <img src="@/assets/image/public/transfer.svg" alt="" width="50" height="50" style="vertical-align: middle">
                            <span class="ml-10">304不锈钢高压球阀</span>
                        </el-checkbox>
                    </el-col>
                    <el-col :span="2" class="text-6 font-12">60.8</el-col>
                    <el-col :span="2" class="text-6 font-12">1</el-col>
                    <el-col :span="8" class="text-6 font-12" style="line-height: 18px">
                        <p>苏大强</p>
                        <p>15619381686</p>
                        <p class="singlerow">陕西省西安市未央区太华北路华远好天地1803室</p>
                    </el-col>
                    <el-col :span="2" class="text-6 font-12 text-red">￥1076</el-col>
                    <el-col :span="2" class="text-6 font-12" style="line-height: 18px">
                        <p class="text-primary text-center" style="width: 60px">详情</p>
                        <div class="text-white bg-red  delivery mt-5">发货</div>
                    </el-col>
                </el-row>
                <el-row class="p-20 bg-white" style="height: 90px;line-height: 50px">
                    <el-col :span="8" class="text-6 font-12">
                        <el-checkbox>
                            <img src="@/assets/image/public/transfer.svg" alt="" width="50" height="50" style="vertical-align: middle">
                            <span class="ml-10">304不锈钢高压球阀</span>
                        </el-checkbox>
                    </el-col>
                    <el-col :span="2" class="text-6 font-12">60.8</el-col>
                    <el-col :span="2" class="text-6 font-12">1</el-col>
                    <el-col :span="8" class="text-6 font-12" style="line-height: 18px">
                        <p>苏大强</p>
                        <p>15619381686</p>
                        <p class="singlerow">陕西省西安市未央区太华北路华远好天地1803室</p>
                    </el-col>
                    <el-col :span="2" class="text-6 font-12 text-red">￥1076</el-col>
                    <el-col :span="2" class="text-6 font-12" style="line-height: 18px">
                        <p class="text-primary text-center" style="width: 60px">详情</p>
                        <div class="text-white bg-red  delivery mt-5">发货</div>
                    </el-col>
                </el-row>
            </el-col>
        </el-row>
    </div>
</template>
<script>
    export default {
        name: 'Browse'
    }
</script>
<style scoped lang="scss">
    .box{
        width: 1000px;
        .item{
            height: 100px;
            background: #ffffff;
            .itemleft{height: 100px;width: 75px}
            .itemright{width: 160px;height: 100px}
        }
        .info{
            height: 465px;background: #ffffff;
            .top{height: 160px;position: relative}
            .heard{width: 90px;height: 90px;border-radius: 50%;border: 4px solid #FFFFFF;position: absolute;
                left: 0;right: 0;bottom:-45px;margin: auto;
            }
            .bottom{height: 50px;border-top:1px solid #CCCCCC;display: flex;justify-content: space-between;
                .btn{width: 50%;text-align: center;line-height: 50px}
            }
        }
        .moneyBox{
            height: 265px;
            .money{width: 100px;height: 100px;border-radius: 50%;border: 25px solid #FFC400}
            .btns{
                margin-top: 60px;
                .btn{width: 60px;height: 25px;border-radius: 2px;text-align: center;color: #ffffff;font-size: 14px;line-height: 25px}
            }
            .item{width: 100%;height: 64px;border-radius: 5px;border: 1px solid #cccccc}
        }
        .title{border-bottom: 1px solid #F5F5F5}
        .pBox{
            background: #ffffff;height: 180px;
            .item{overflow: hidden}
        }
        .more{width: 105px;height: 30px;border-radius:5px;border:1px solid rgba(221, 221, 221, 1);line-height: 30px;text-align: center}
        .delivery{height: 25px;line-height: 25px;text-align: center;width: 60px;border-radius: 5px}
    }

</style>
