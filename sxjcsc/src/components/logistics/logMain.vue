<template>
    <div class="bigbox w-100">
        <div class="box">
            <div class="top">
                <el-breadcrumb class="mt-30 float-left" separator-class="el-icon-arrow-right">
                    <span class="float-left text-6">当前位置：</span>
                    <el-breadcrumb-item :to="{ path: '/' }">陕西建材商城</el-breadcrumb-item>
                    <el-breadcrumb-item >物流信息</el-breadcrumb-item>
                </el-breadcrumb>
                <div class="float-left">
                    <input type="text" v-model="keyword" class="search ml-10" @keyup.enter="search">
                    <span class="btn" @click="search"><i class="el-icon-search icon1"></i></span>
                </div>
            </div>
            <div class="content fl-a">
                <div class="item bg-white p-20 mb-20" v-for="item in data" :key="item.id" >
                    <div class="itemTop">
                        <div class="left mr-20 float-left">
                            <el-image :src="item.img" v-if="item.img">
                                <div slot="error" class="image-slot">
                                    <img src="@/assets/image/public/nopic.png" alt="" class="w-100 h-100">
                                </div>
                            </el-image>
                            <img src="@/assets/image/public/nopic.png" alt="" v-else class="w-100 h-100">
                        </div>
                        <div class="right float-left">
                            <div class="font-18 mb-20 mt-10 text-0 fw-blod">{{ item.name }}</div>
                            <div class="font-14 txt row2">{{ item.line }}</div>
                        </div>
                        <div class="clearfloat"></div>
                    </div>
                    <div class="itemBom fl-a pt-20 mt-20">
                        <div class="address">
                            <img src="@/assets/image/public/pos.png" alt="" class="img-m mr-10">
                            <span class="font-14 text-6">{{ item.address }}</span>
                        </div>
                        <div  class="detail font-14 text-red pointer" @click="toDet(item.id)">
                            查看详情
                            <i class="el-icon-arrow-right"></i>
                        </div>
                    </div>
                </div>
                <div class="clearfloat"></div>
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
        name: "LogMain",
        data(){
            return{
                current:0,
                data:[],
                currentPage: 1,
                pageSize:0,
                total:0,
                keyword:''
            }
        },
        created(){
            this.keyword = this.$route.query.keyword ? this.$route.query.keyword : ''
            this.getData()
        },
        methods: {
            search(){
                this.getData(1)
            },
            handleCurrentChange(val) {
                this.getData(val)
            },
            getData(page) {
                this.JCService.indexService.Logistics_information({pag: page,keyword:this.keyword}).then(e => {
                    e.info.data.forEach((item) => {
                        if (item.img) {
                            item.img.forEach((i, k) => {
                                let pic = i.split(',')
                                item.img[k] = this.JCconfig.filePath + 'public/' + pic[0]
                            })
                        }
                    })
                    this.data = e.info.data
                    this.currentPage = e.info.current_page
                    this.total = e.info.total
                    this.pageSize = e.info.per_page
                })
            },
            toDet(id){
                this.$router.push({path:"/logistics/detail",query:{id:id}})
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

                .icon {
                    color: #666666;
                    font-size: 12px;
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
                        .left{
                            width: 100px;
                            height: 100px;
                        }
                        .right{
                            .txt{
                                max-width: 426px;
                                line-height: 20px;
                                height: 40px;
                                overflow: hidden;
                            }
                        }
                    }
                    .itemBom{
                        border-top: 1px solid #e5e5e5;
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