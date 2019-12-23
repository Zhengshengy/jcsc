<template>
    <div class="setbox">
        <el-row class="title w-100 px-20  text-3">
            <el-col :span="24" class="font-16">询价详情</el-col>
        </el-row>
        <div class="content px-30 pt-30">
            <el-table :data="data.commodity" :header-cell-style="{background:'#F5F5F5',color:'#333333',fontWeight:'bold'}" style="width: 100%">
                <el-table-column prop="name" label="商品名称" width="280"></el-table-column>
                <el-table-column prop="number" label="数量" width="100"></el-table-column>
                <el-table-column prop="unit" label="单位" width="100"></el-table-column>
                <el-table-column prop="make" label="品牌"></el-table-column>
                <el-table-column prop="remarks" label="备注"></el-table-column>
            </el-table>
            <div class="num text-right text-3 font-16">共{{data.length}}件商品</div>
            <div class="file" v-if="data.url">
                <img src="@/assets/image/personal/excle.png" alt="" width="26" style="vertical-align: middle">
                <span class="text text-6 font-14">陕西建材商城钢材询价单</span>
                <div class="bitem pointer" @click="downloadExcel(data.url)">下载</div>
                <!--<div class="bitem ml-20">查看</div>-->
            </div>
            <div class="mt-20 font-14">
                <span class="text-6">发布时间：</span>
                <span class="text-3">{{ data.create_time }}</span>
                <span class="text-6 ml-30">报价截止时间：</span>
                <span class="text-3">{{ data.end_time }}</span>
                <span class="text-6 ml-30">联系人：</span>
                <span class="text-3">{{ data.contacts }}</span>
                <span class="text-6 ml-30">手机号：</span>
                <span class="text-3">{{ data.phone }}</span>
            </div>
            <div class="mt-20 font-14">
                <span class="text-6">公司名称：</span>
                <span class="text-3">{{ data.corporate_name }}</span>
                <span class="text-6 ml-30">收货地址：</span>
                <span class="text-3">{{ data.corporate_address }}</span>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        name: 'InquiryDetails',
        data() {
            return {
                data: [],

            }
        },
        created(){
            let id = this.$route.query.id
            this.JCService.PersonalServer.Inquiry_details({inquiry_id:id}).then(e=>{
                console.log(e)
                e.info.create_time = this.JCutils.Format1(e.info.create_time * 1000)
                e.info.end_time = this.JCutils.Format1(e.info.end_time * 1000)
                e.info.length = e.info.commodity.length
                this.data = e.info
            })
        },
        methods: {
            downloadExcel(src) {
                let a = document.createElement('a')
                a.setAttribute('download','')
                a.href = '/jcsc'+src
                a.click();
            }
        }
    }
</script>
<style scoped lang="scss">
    .setbox{
        width: 1000px;
        height: 895px;
        background: #ffffff;
        .title{
            height: 50px;
            border: 1px solid #F5F5F5;
            line-height: 50px;
        }
        .content{
            .num{height: 55px;line-height: 55px;border-bottom: 1px solid #F5F5F5}
        }
        .file{height: 60px;border-bottom: 1px solid #F5F5F5;line-height: 60px}
        .text{margin: 0 37px 0 20px}
        .bitem{border: 1px solid rgba(221, 221, 221, 1);border-radius: 5px;width: 48px;height: 25px;text-align: center;
            font-size: 12px;display: inline-block;line-height: 27px;color: #666666;
        }
    }
</style>
<style scoped>
    /deep/.el-table .cell{text-align: center}
</style>