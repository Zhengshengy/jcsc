<template>
    <div class="bigbox w-100">
        <div class="box">
            <div class="top">
                <el-breadcrumb class="mt-30 float-left" separator-class="el-icon-arrow-right">
                    <span class="float-left text-6">当前位置：</span>
                    <el-breadcrumb-item :to="{ path: '/' }">陕西建材商城</el-breadcrumb-item>
                    <el-breadcrumb-item >推荐商铺</el-breadcrumb-item>
                </el-breadcrumb>
                <div class="float-left">
                    <input type="text" v-model="keyword" class="search ml-10" @keyup.enter="search">
                    <span class="btn" @click="search"><i class="el-icon-search icon1"></i></span>
                </div>
            </div>
            <div class="content">
                <div  class="Tjitem  mr-20 mb-20 bg-white" v-for="item in data" :key="item.id">
                <div class="san  text-white font-14"><span class="text">推荐</span></div>
                <div class="p-20 item">
                    <span class="font-16 fw-500">{{ item.name }}</span>
                    <div class="mt-20 font-14 text-3 pr-30">
                        <p class="singlerow">主营类目：{{ item.major }}</p>
                    </div>
                </div>
                <div class="py-20 px-20">
                    <div class="float-left left" v-if="item.img">
                        <div class="pic float-left mr-20" v-for="(i,k) in item.img" :key="k" >
                            <img :src="i" alt="" width="100" height="100">
                        </div>
                        <div class="clearfloat"></div>
                    </div>
                    <div v-else>
                        <p>暂无图片</p>
                    </div>
                    <div class="float-right right">
                        <div class="btn pointer" @click="open(item.mob)">
                            <div class="btnleft float-left">
                                <img src="@/assets/image/search/phone.png" alt="">
                            </div>
                            <div class="btnright float-left font-16 text-center">联系卖家</div>
                        </div>
                        <router-link tag="div" :to="{name:'subwebsiteIndex',query:{shop_id:item.id}}" class="btn btn1 pointer" @click="map(item.lng_lat,item.addresss)">
                            <div class="btnleft float-left">
                                <img src="@/assets/image/public/pos1.png" alt="">
                            </div>
                            <div class="btnright float-left font-16 text-center">到商家去</div>
                        </router-link>
                    </div>
                    <div class="clearfloat"></div>
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
        name: "FinerMain",
        data(){
            return{
                data:[],
                currentPage: 1,
                pageSize:0,
                total:0,
                keyword :''
            }
        },
        created(){
            this.keyword = this.$route.query.keyword ? this.$route.query.keyword : ''
            this.getData()
        },
        methods:{
            handleCurrentChange(val) {
                this.getData(val)
            },
            search(){
                this.getData(1)
            },
            getData(page=1){
                this.JCService.indexService.Recommend_shops({pag:page,keyword:this.keyword}).then(e=>{
                    e.info.data.forEach((item)=>{
                        if (item.img){
                            item.img.forEach((i,k)=>{
                                let pic = i.split(',')
                                item.img[k] = this.JCconfig.filePath +'public/' + pic[0]
                            })
                        }
                    })
                    this.data = e.info.data
                    this.currentPage = e.info.current_page
                    this.total = e.info.total
                    this.pageSize = e.info.per_page
                })
            },
            open(mob) {
                this.$alert(mob,'这是手机号');
            },
            map(lng_lat,address){
                if (lng_lat){
                    let data = lng_lat.split(',')
                    let lng = data[0]
                    let lat = data[1]
                    let url = this.$router.resolve({
                        path: "/map",
                        query: {lng:lng,lat:lat,address:address}
                    })
                    console.log(url.href)
                    window.open(url.href,'_blank')
                } else {
                    this.$alert('该商铺暂未设置地址','消息');
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
               .Tjitem{position: relative;overflow: hidden;}
               .Tjitem .item{border-bottom: 1px solid #E5E5E5;padding-bottom: 8px;}
               .Tjitem .san{width: 100px;height: 100px;background-color:  #FF2505;transform:rotate(45deg);position: absolute;top: -50px;right: -50px}
               .Tjitem .san .text{position: absolute;bottom: 10px;left: 38px}
               .Tjitem .left{
                   width: 890px;
                   height: 100px;
                   .more{
                        width:70px;
                        height:100px;
                        background:rgba(251,251,251,1);
                    }
               }
               .Tjitem .right{
                   width: 230px;
                   height: 100px;
                   .btn{
                       color: #E71F19;
                       width:150px;
                       height:40px;
                       border-radius:2px;
                       border: 1px solid #E71F19;
                       margin: 0 auto;
                       .btnleft{
                        width: 40px;
                        height: 100%;
                        background: #E71F19;
                            img{
                                display: block;
                                margin: 8px auto;
                            }
                        }
                        .btnright{
                            width: 110px;
                            line-height: 40px;
                        }
                   }
                   .btn1{
                       color: #FFB873;
                       border-color: #FFB873;
                       margin-top: 15px;
                       .btnleft{
                           background: #FFB873;
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