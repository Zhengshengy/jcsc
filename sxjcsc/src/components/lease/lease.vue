<template>
    <div class="bigbox w-100">
        <div class="box">
            <div class="top">
                <el-breadcrumb class="mt-30 float-left" separator-class="el-icon-arrow-right">
                    <span class="float-left text-6">当前位置：</span>
                    <el-breadcrumb-item :to="{ path: '/' }">陕西建材商城</el-breadcrumb-item>
                    <el-breadcrumb-item >出租转让</el-breadcrumb-item>
                </el-breadcrumb>
            </div>
            <div class="content fl-a" >
                <div class="item bg-white p-20 mb-20" v-for="(item,index) in data" :key="index">
                    <div class="itemTop">
                        <el-carousel trigger="click">
                            <el-carousel-item v-for="(img,i) in item.img" :key="i">
                                <el-image :src="img" class="w-100 h-100"></el-image>
                            </el-carousel-item>
                        </el-carousel>
                    </div>
                    <div class="itemBom">
                        <p class="text-0 font-20 mt-20 fw-500 singlerow">{{ item.name }}</p>
                        <p class="text-3 mt-10 font-14 con">{{ item.content }}</p>
                        <div class="mt-15 font-14">
                            <div class="float-left text-primary" v-if="item.mob">联系电话：{{ item.mob }}</div>
                            <span class="float-right text-9">发布时间：{{ item.create_time }}</span>
                        </div>
                    </div>
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
        name: "LeaseIndex",
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
            this.getData()
        },
        methods:{
            handleCurrentChange(val) {
                this.getData(val,this.type)
            },
            getData(page){
                this.JCService.indexService.Lease({pag:page}).then(e=>{
                    e.info.data.forEach((item)=>{
                        let pic = item.img.split(',')
                        pic.forEach((data,index)=>{
                            pic[index] = this.JCconfig.filePath +'public/' + data
                        })
                        item.img = pic
                        let time = item.create_time * 1000
                        item.create_time = this.JCutils.Format(time)
                    })
                    this.data = e.info.data
                    this.currentPage = e.info.current_page
                    this.total = e.info.total
                    this.pageSize = e.info.per_page
                })
            },
        }
    }
</script>

<style lang="scss" scoped>
    .el-carousel__container{
        height: 300px;
    }
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
                    width: 550px;
                    .itemTop {

                    }
                    .itemBom{
                        border-top: 1px solid #e5e5e5;
                        .con{
                            min-height: 60px;
                        }
                    }
                }
            }
            .page{
                text-align: center;
                width: 630px;
                margin: 0px auto;
                height: 30px;
                padding-bottom: 20px;
            }
        }
    }
</style>