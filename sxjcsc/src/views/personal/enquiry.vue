<template>
    <div class="setbox">
        <el-row class="title w-100 px-20  text-3">
            <el-col :span="12" class="font-16">询价列表</el-col>
            <el-col :span="12" >
                <router-link to="/enquiry" class="font-12 btn text-center float-right mt-10">
                    <img src="@/assets/image/personal/enquery.png" alt="" width="15" style="vertical-align: middle">
                    全网询价
                </router-link>
            </el-col>
        </el-row>
        <div class="content px-20 pt-20">
            <el-row class="mb-20">
                <el-col :span="24" class="float-right text-right">
                    <div class="btn" :class="{'bg-red text-white':status==3}" @click="screen(3)">审核中</div>
                    <div class="btn" :class="{'bg-red text-white':status==1}" @click="screen(1)">审核成功</div>
                    <div class="btn" :class="{'bg-red text-white':status==2}" @click="screen(2)">审核失败</div>
                    <div class="btn" :class="{'bg-red text-white':status==4}" @click="screen(4)" style="margin-right: 0">已过期</div>
                </el-col>
            </el-row>
            <el-row class="item mb-15 h-100" v-for="item in data" :key="item.id">
                <div class="status bg-red" v-if="item.status == 1 && time<=item.end_time">审核成功</div>
                <div class="status bg-primary" v-else-if="item.status == 0 && time<=item.end_time">审核中</div>
                <div class="status bg-muted" v-else-if="item.status == 2 && time<=item.end_time">审核失败</div>
                <div class="status bg-muted" v-else-if="time>item.end_time">已过期</div>
                <el-col :span="12" class="mt-20 left font-14">
                    <p class="singlerow w-90">
                        <span class="text-6">发布时间：</span>
                        <span class="text-3">{{ item.create_time }}</span>
                    </p>
                    <p class="mt-10 singlerow w-90 ">
                        <span class="text-6">报价截止时间：</span>
                        <span class="text-3">{{ item.end_time1 }}</span>
                    </p>
                    <p class="mt-10 singlerow w-90">
                        <span class="text-6">联系人：</span>
                        <span class="text-3">{{ item.contacts }}</span>
                    </p>
                    <p class="mt-10 singlerow w-90">
                        <span class="text-6">手机号：</span>
                        <span class="text-3">{{ item.phone }}</span>
                    </p>
                    <p class="mt-10 singlerow w-90">
                        <span class="text-6">公司名称：</span>
                        <span class="text-3">{{ item.corporate_name }}</span>
                    </p>
                    <p class="mt-10 singlerow w-90">
                        <span class="text-6">收货地址：</span>
                        <span class="text-3">{{ item.corporate_address }}</span>
                    </p>
                </el-col>
                <el-col :span="12" class="right h-100">
                    <el-row v-if="item.url">
                        <el-col :span="12">
                            <div class="pic">
                                <img src="@/assets/image/personal/excle.png" alt="" class="w-100">
                            </div>
                            <p class="font-12 text-6 text-center">陕西建材商城钢材询价单</p>
                            <div class="btns w-100 mt-10 text-center">
                                <div class="bitem pointer" @click="downloadExcel(item.url)">下载</div>
                                <!--<div class="bitem ml-20">查看</div>-->
                            </div>
                        </el-col>
                        <el-col :span="12" class="mt-15">
                            <div class="pic">
                                <img src="@/assets/image/personal/goods.png" alt="" class="w-100">
                            </div>
                            <p class="font-14 text-3 text-center">共{{ item.b_id }}个商品求购</p>
                        </el-col>
                    </el-row>
                    <el-row v-else>
                        <el-col :span="24" class="mt-15">
                            <div class="pic">
                                <img src="@/assets/image/personal/goods.png" alt="" class="w-100">
                            </div>
                            <p class="font-14 text-3 text-center">共{{ item.b_id }}个商品求购</p>
                        </el-col>
                    </el-row>
                    <div class="del" @click="del(item.id)"><i class="el-icon-close"></i></div>
                    <div class="cat font-12 text-primary pointer" @click="main(item.id)">查看详情</div>
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
        name: 'EnquiryList',
        data() {
            return {
                status:3,
                currentPage: 1,
                pageSize:0,
                total:0,
                data:[],
                time: Math.round(new Date().getTime() / 1000)
            };
        },
        created(){
            this.getData(1,this.status)
        },
        methods: {
            getData(pag,status){
                this.JCService.PersonalServer.Inquiry({pag:pag,type:status}).then(e=>{
                    e.info.data.forEach(item=>{
                        item.end_time1 = this.JCutils.Format1(item.end_time * 1000)
                        item.create_time = this.JCutils.Format1(item.create_time * 1000)
                    })
                    this.data = e.info.data
                })
            },
            handleCurrentChange(val) {
                this.getData(val,this.status)
            },
            screen(status){
                this.status = status
                this.getData(1,status)
            },
            del(id){
                this.$confirm('您确定要删除次条记录吗?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.JCService.PersonalServer.Inquiry_delete({inquiry_id:id}).then(e=>{
                        if (e.status == 1){
                            this.data = this.data.filter(item=>{return item.id != id})
                            this.$message({type: 'success', message: '删除成功!'});
                        }
                    })
                })
            },
            main(id){
                this.$router.push({path:'/personal/inquiryDet',query:{id:id}})
            },
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
        min-height: 895px;
        background: #ffffff;
        .title{
            height: 50px;
            border: 1px solid #F5F5F5;
            line-height: 50px;
            .btn{width: 105px;height: 30px;border:1px solid rgba(221, 221, 221, 1);border-radius:5px;line-height: 30px}
        }
        .content{
            .btn{display: inline-block;width: 66px;height: 27px;border-radius:5px;font-size:14px;text-align: center;
            line-height: 27px;margin-right: 20px;cursor: pointer}
            .item{border: 1px solid rgba(210,210,210,1);height:205px;position: relative;overflow: hidden}
            .status{position: absolute;width: 100px;height: 25px;transform:rotate(-45deg);top: 15px;left: -25px;
                text-align: center;font-size: 12px;line-height: 25px;color: #ffffff;
            }
            .left{padding-left: 65px;border-right: 1px solid #D2D2D2}
            .right{padding: 0 55px;padding-top: 50px;position: relative;
                .pic{width: 47px;margin: 0 auto 14px}
                .btns{
                    .bitem{border: 1px solid rgba(221, 221, 221, 1);border-radius: 5px;width: 48px;height: 25px;text-align: center;
                    font-size: 12px;display: inline-block;line-height: 27px;color: #666666;
                    }
                }
                .del{position: absolute;right: 15px;top:10px;width: 20px;height: 20px;color: #cccccc;cursor: pointer}
                .del i{font-size: 20px;font-weight: bold}
                .cat{width: 50px;height: 13px;position: absolute;right: 15px;bottom:20px;}
            }

        }
    }
    .page{
        width: 630px;
        margin: 0 auto;
        padding: 30px;
        height: 30px;
        text-align: center;
    }
</style>