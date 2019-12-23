<template>
    <div class="setbox">
        <div class="title w-100 pl-20 font-16 text-3">商铺转移</div>
        <div class="content pl-40 pt-30">
            <el-row>
                <el-col :span="24">
                    <img src="@/assets/image/public/transfer.svg" alt="" class="pic">
                </el-col>
            </el-row>
            <el-row class="mt-20">
                <el-col :span="24">
                    <div class="float-left font-14 zi mr-15 mt-10 text-3">转移ID：</div>
                    <div class="shu float-left mr-30">
                        <el-input
                                placeholder="请输入内容"
                                v-model="input"
                                clearable>
                        </el-input>
                        <p class="text-6 font-14 mt-20">用户名：累累 <span class="ml-30">用户ID：1017</span></p>
                    </div>
                    <el-button type="danger" class="wid" plain>检测ID</el-button>
                </el-col>
            </el-row>
            <el-row class="mt-20">
                <el-col :span="24">
                    <div class="float-left font-14 zi mr-15 mt-10 text-3">手机验证码：</div>
                    <div class="shu float-left mr-30">
                        <el-input
                                placeholder="请输入内容"
                                v-model="input"
                                clearable>
                        </el-input>
                        <p class="text-6 font-14 mt-20">绑定手机号：156****1686，请查看手机信息获取验证码。</p>
                        <p class="text-red fw-blod mt-20">温馨提示：</p>
                        <p class="text-6 mt-10 font-14">
                            请慎重考虑是否转移商铺，如果出现问题请联系公司客服。     联系电话：400-029-2889
                        </p>
                    </div>
                    <el-button type="primary" class="wid" plain>获取验证码</el-button>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="24">
                    <el-button  type="danger" class="bg-red btn pointer">确定转移</el-button>
                </el-col>
            </el-row>
        </div>
    </div>
</template>
<script>
    export default {
        name: 'Transfer',
        data() {
            return {
                input:''
            };
        },
        methods: {}
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
        }
        .pic{width: 85px;display: block;margin: 30px auto 60px}
        .shu{
            width: 650px;
        }
        .zi{width: 85px;text-align: right}
        .wid{width: 110px}
        .btn{
            display: block;
            width: 450px;
            height: 50px;
            margin: 80px auto;
            background: red;
            font-size: 18px;
            font-weight:bold;
        }
    }
</style>