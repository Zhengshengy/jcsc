<template>
    <div class="setbox">
        <div class="title w-100 pl-20 font-16 text-3">订单列表</div>
        <div class="content p-20">
            <el-row>
                <el-col :span="24" class="btns pb-20 ">
                    <el-button round>全部订单</el-button>
                    <el-button round type="primary">待发货</el-button>
                    <el-button round>待收货</el-button>
                    <el-button round>已完成</el-button>
                </el-col>
            </el-row>
            <el-row class="mt-20">
                <el-col :span="6">
                    <span class="text-3 font-12">订单编号</span> <el-input class="shu" size="small" placeholder="搜索订单编号" v-model="input" clearable ></el-input>
                </el-col>
                <el-col :span="6">
                    <span class="text-3 font-12">用户名</span> <el-input class="shu" size="small" placeholder="搜索收货人姓名" v-model="input" clearable ></el-input>
                </el-col>
                <el-col :span="6">
                    <span class="text-3 font-12">手机号</span> <el-input class="shu" size="small" placeholder="搜索收货人手机号" v-model="input" clearable ></el-input>
                </el-col>
                <el-col :span="6">
                    <span class="text-3 font-12">商品名称</span> <el-input class="shu" size="small" placeholder="搜索商品名称" v-model="input" clearable ></el-input>
                </el-col>
            </el-row>
            <el-row class="mt-15">
                <el-col :span="24">
                    <span class="text-3 font-12 mr-10">订单时间</span><el-date-picker size="small"
                            v-model="value1"
                            type="daterange"
                            align="center"
                            unlink-panels
                            range-separator="至"
                            start-placeholder="选择时间"
                            end-placeholder="选择时间"
                            :picker-options="pickerOptions">
                    </el-date-picker>
                </el-col>
            </el-row>
            <el-row class="mt-20">
                <el-col :span="24">
                    <div class="anniu">
                        <div class="item">查询</div>
                        <div class="item item1">重置</div>
                    </div>
                </el-col>
            </el-row>
        </div>
        <el-row class="p-20 bg-white mt-20">
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
                        <p class="text-9 text-center mt-10" style="width: 60px">发货</p>
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
                        <p class="text-9 text-center mt-10" style="width: 60px">发货</p>
                    </el-col>
                </el-row>
            </el-col>
        </el-row>
    </div>
</template>
<script>
    export default {
        name: 'ShopOrder',
        data(){
            return{
                input:'',
                pickerOptions: {
                    shortcuts: [{
                        text: '最近一周',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                            picker.$emit('pick', [start, end]);
                        }
                    }, {
                        text: '最近一个月',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                            picker.$emit('pick', [start, end]);
                        }
                    }, {
                        text: '最近三个月',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                            picker.$emit('pick', [start, end]);
                        }
                    }]
                },
                value1: '',
            }
        }
    }
</script>
<style scoped lang="scss">
    .setbox{
        width: 1000px;
        margin: 30px 0 0 30px;

        .title{
            height: 50px;
            border: 1px solid #F5F5F5;
            line-height: 50px;
            background: #ffffff;
        }
        .content{
            background: #ffffff;
            .btns{border-bottom: 1px solid #f5f5f5}
            .shu{width: 165px;color: #999999;margin-left: 10px;}

        }
        .anniu{
            margin: 0 auto;width: 160px;
            .item{
                width: 67px;height: 30px;text-align: center;border-radius:5px;background:rgba(0,109,255,1);color: #ffffff;float: left;
                line-height: 30px;font-size: 12px;
            }
            .item1{background: #DDDDDD;color: #666666;margin-left: 24px}
        }
    }
</style>