<template>
    <div class="setbox">
        <div class="title w-100 pl-20 font-16 text-3">商铺续费</div>
        <div class="content">
            <el-row>
                <el-col :span="24" class="text-3 font-16 text-center">选择商铺续费方式</el-col>
            </el-row>
            <el-row class="mt-40">
                <el-col :span="24">
                    <el-radio v-model="radio" label="1">
                        <el-input class="wid"  value="一年（默认365天）888元" :disabled="true"></el-input>
                    </el-radio>

                </el-col>
            </el-row>
            <el-row class="mt-40">
                <el-col :span="24">
                    <el-radio v-model="radio" label="2">
                        <el-input class="wid" v-model="input" placeholder="请输入16位抵用码" ></el-input>
                    </el-radio>

                    <el-button style="margin-left: 30px">检测抵用码</el-button>
                </el-col>
            </el-row>
            <p class="text-red font-16 mt-20 fw-blod">温馨提示：</p>
            <p class="mt-10 text-6 font-14">1、开通商铺有邀请朋友赚佣金的权限，最多五级下线提成。</p>
            <p class="mt-10 text-6 font-14">2、一级5元、二级到五级没级提1元，详细查看提成表。</p>
            <el-row>
                <el-col :span="24">
                    <el-button  type="danger" class="bg-red btn">确认续费</el-button>
                </el-col>
            </el-row>
        </div>
    </div>
</template>
<script>
    export default {
        name: 'Renewal',
        data(){
            return{
                radio:'1',
                input:''
            }
        }
    }
</script>
<style scoped lang="scss">
    .setbox {
        width: 1000px;
        height: 970px;
        margin: 30px 0 0 30px;
        background: #ffffff;

        .title {
            height: 50px;
            border: 1px solid #F5F5F5;
            line-height: 50px;
        }
        .content{
            padding: 75px;
            .wid{width: 650px}
        }
        .btn{
            display: block;
            width: 450px;
            height: 50px;
            margin: 80px auto;
            background: red;
            font-size: 18px;
            font-weight:bold;
            color: #ffffff;
        }
    }
</style>

<style scoped>
    /deep/ .el-button{border-color:red ;color: red}
    /deep/ .el-button:hover{background: rgba(255,0,0,.5);color: #ffffff}
    /deep/ .el-radio{margin-right: 20px}
    /deep/ .el-radio__inner{width: 26px;height: 26px;background: #ffffff}
    /deep/ .el-radio__inner::after{width: 13px;height: 13px;background: #006DFF}
    /deep/ .el-radio__input.is-checked .el-radio__inner{background: #ffffff;border-color: #006DFF}
</style>