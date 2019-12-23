<template>
    <div class="bigbox w-100">
        <div class="box">
            <div class="top">
                <el-breadcrumb class="mt-30 float-left" separator-class="el-icon-arrow-right">
                    <span class="float-left text-6">当前位置：</span>
                    <el-breadcrumb-item :to="{ path: '/' }">陕西建材商城</el-breadcrumb-item>
                    <el-breadcrumb-item >建材市场</el-breadcrumb-item>
                </el-breadcrumb>
                <div class="float-left">
                    <input type="text" v-model="keyword" class="search ml-10" @keyup.enter="search">
                    <span class="btn" @click="search"><i class="el-icon-search icon1"></i></span>
                </div>
            </div>
            <div class="content">
                <div class="item" v-for="item in data" :key="item.id">
                    <div class="pic float-left">
                        <el-image :src="item.img" v-if="item.img" class="w-100 h-100">
                            <div slot="error" class="image-slot w-100 h-100">
                                <img src="@/assets/image/public/nopic.png" alt="" class="w-100 h-100">
                            </div>
                        </el-image>
                        <img src="@/assets/image/public/nopic.png" alt="" v-else class="w-100 h-100">
                    </div>
                    <div class="info float-left ml-20">
                        <p class="name font-18 fw-blod">{{ item.catename}}</p>
                        <p class="mt-25 text-6 font-14 notext" v-if="item.text">市场简介：{{ item.text }}</p>
                        <p v-else class="notext"></p>
                        <p class="text-9 mt-20 font-12 ">2019-09-28</p>
                    </div>
                    <div class="contact float-right mt-10 text-red">
                        <div class="btn" @click="map(item.degree,item.address)">
                            <div class="left float-left">
                                <img src="@/assets/image/public/nav.png" alt="">
                            </div>
                            <div class="right float-left font-16 text-center">到这里去</div>
                            <div class="clearfloat"></div>
                        </div>
                        <div class="mt-15 btn btn1">
                            <div class="left float-left">
                                <img src="@/assets/image/public/into.png" alt="">
                            </div>
                            <div class="right float-left font-16 text-center">进入市场</div>
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
        name: "MarketMain",
        data(){
            return{
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
        methods:{
            search(){
                this.getData(1)
            },
            handleCurrentChange(val) {
                this.getData(val,this.type)
            },
            getData(page){
                this.JCService.indexService.Building_material({pag:page,keyword:this.keyword}).then(e=>{
                    e.info.data.forEach((item)=>{
                        item.img = this.JCconfig.filePath +'public/' + item.img
                        let time = item.create_time * 1000
                        item.create_time = this.JCutils.Format(time)
                    })
                    this.data = e.info.data
                    this.currentPage = e.info.current_page
                    this.total = e.info.total
                    this.pageSize = e.info.per_page
                })
            },
            map(lng_lat,address){
                if (lng_lat){
                    let data = lng_lat.split(',')
                    let lng = data[0]
                    let lat = data[1]
                    let url = this.$router.resolve({
                        name: "Map",
                        query: {lng:lng,lat:lat,address:address}
                    })
                    window.open(url.href,'_blank')
                } else {
                    this.$alert('暂无市场地址','消息');
                }

            }
        }
    }
</script>

<style scoped lang="scss">
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
                background: #ffffff;
                border:1px solid rgba(230, 230, 229, 1);
                .item{
                    padding: 30px 20px 30px 30px;
                    border-bottom: 1px solid #E6E6E5;
                    height: 120px;
                    .pic{
                        width: 120px;
                        height: 120px;
                    }
                    .info{
                        width: 770px;
                    }
                    .icon{
                        vertical-align: bottom;
                    }
                    .notext{
                        min-height: 35px;
                    }
                    .contact{
                        width: 150px;
                        border-radius:2px;
                        .btn{
                            height: 38px;
                            border: 1px solid #E71F19;
                            .left{
                                width: 40px;
                                height: 100%;
                                background: #E71F19;
                                img{
                                    display: block;
                                    margin: 8px auto;
                                }
                            }
                            .right{
                                width: 108px;
                                line-height: 40px;
                            }
                        }
                        .btn1{
                            border-color: #FFB873;
                            .left{
                                background: #FFB873;
                            }
                            .right{
                                color: #FFB873;
                            }
                        }

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