<template>
    <div class="bigbox w-100">
        <div class="box">
            <div class="top">
                <div class="float-left">
                    <el-breadcrumb class="mt-30 float-left" separator-class="el-icon-arrow-right">
                        <span class="float-left text-6">当前位置：</span>
                        <el-breadcrumb-item :to="{ path: '/' }">陕西建材商城</el-breadcrumb-item>
                        <el-breadcrumb-item >求购信息</el-breadcrumb-item>
                    </el-breadcrumb>
                </div>
                <div class="float-right text-3 font-14 pointer">
                    <div class="item float-left mr-25 " :class="{'active':type==1}" @click="swit(1)">未成交</div>
                    <div class="item float-left mr-25" :class="{'active':type==2}" @click="swit(2)">已成交</div>
                    <div class="item float-left" :class="{'active':type==3}" @click="swit(3)">已过期</div>
                </div>
            </div>
            <div class="content fl-a">
                <div class="item bg-white p-20 mb-20 w-50" v-for="item in data" :key="item.id">
                    <div class="itemTop">
                        <div class="left mr-20 float-left">
                            <el-image :src="item.img" v-if="item.img" class="w-100 h-100">
                                <div slot="error" class="image-slot w-100 h-100">
                                    <img src="@/assets/image/public/zxxq.jpg" alt="" class="w-100 h-100">
                                </div>
                            </el-image>
                            <img src="@/assets/image/public/zxxq.jpg" alt="" v-else class="w-100 h-100">
                        </div>
                        <div class="right float-left">
                            <div class="font-18 mb-10 mt-10 text-0 fw-blod demand">{{ item.content }}</div>
                            <div class="font-14 txt">
                                <div class="float-left">
                                    <i class="el-icon-time text-9  icon"></i><span class="text-6 ml-10">2019-09-28  14:42</span>
                                </div>
                                <div class="float-right pointer" @click="todetal(item.id)">
                                    <div class=" text-center text-white main">查看详情</div>
                                </div>
                            </div>
                        </div>
                        <div class="clearfloat"></div>
                    </div>
                    <div class="status text-center text-white bg-red" v-if="type==2">已完成</div>
                    <div class="status text-center text-white" style="background: #006DFF;" v-if="type==3">已过期</div>
                </div>
            </div>
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
        name: "Demand",
        data(){
            return{
                data:[],
                currentPage: 1,
                pageSize:0,
                total:0,
                type:1
            }
        },
        created(){
            this.getData(1,1)
        },
        methods:{
            handleCurrentChange(val) {
                this.getData(val,this.type)
            },
            getData(page,type){
                this.JCService.indexService.Demand({pag:page,param:type}).then(e=>{
                    e.info.data.forEach((item)=>{
                        if (item.img){
                            let pic = item.img.split(',')
                            item.img = this.JCconfig.filePath +'public/' + pic[0]
                        } else {
                            item.img = this.JCconfig.filePath +'public/' + item.img
                        }
                        item.time = this.JCutils.Format(item.time)
                    })
                    this.data = e.info.data
                    this.currentPage = e.info.current_page
                    this.total = e.info.total
                    this.pageSize = e.info.per_page
                })
            },
            swit(type){
                this.type = type
                this.getData(1,this.type)
            },
            todetal(id){
                this.$router.push({path:'/demand/main',query:{id:id}})
            }
        }
    }
</script>

<style lang="scss" scoped>
    .bigbox {
        background: #F5F5F5;
        overflow: hidden;
        .box {
            width: 1200px;
            margin: 0 auto;
            .top {
                height: 70px;
                line-height: 70px;
                .active{
                    background: red;
                    color: #ffffff;
                    padding: 0px 10px;
                    line-height: 30px;
                    margin-top: 20px;
                    border-radius: 5px;
                }
                .search {
                    width: 200px;
                    height: 30px;
                    background: rgba(255, 255, 255, 1);
                    border: 1px solid rgba(204, 204, 204, 1);
                    outline: none;
                    padding-left: 10px;
                }

                .btn {
                    padding: 6px 9px 9px 9px;
                    background: #FF0000;
                    color: #ffffff;
                    line-height: 30px;
                }
            }
            .content{
                flex-wrap: wrap;
                .item{
                    position: relative;
                    width: 550px;
                    overflow: hidden;
                    .itemTop {
                        .left{
                            width: 135px;
                            height: 135px;
                        }
                        .right{
                            width: 395px;
                            .txt{
                                line-height: 30px;
                                height: 30px;
                            }
                            .demand{
                                height: 80px;
                            }
                            .main{
                                padding: 0 10px;
                                border-radius: 5px;
                                background: #FFB873;
                            }
                        }
                    }
                    .itemBom{
                        border-top: 1px solid #e5e5e5;
                    }
                    .status{
                        width: 100px;
                        height: 23px;
                        position: absolute;
                        top: 10px;
                        right: -30px;
                        transform: rotate(45deg);
                        font-size: 14px;
                        line-height: 25px;
                    }
                }
            }
            .page{
                width: 630px;
                margin: 30px auto;
                height: 30px;
            }
        }
    }
</style>