<template>
    <div class="bigbox w-100">
        <div class="box">
            <div class="top">
                <span class="font-12 text-3">相关商家</span>
                <i class="el-icon-arrow-right icon ml-10"></i>
                <input type="text" class="search ml-10" v-model="keyword" @keyup.enter="toSearch">
                <span class="btn" @click="toSearch"><i class="el-icon-search icon1"></i></span>
                <span class="text-3 font-12 ml-10">本次共找到<span class="text-red">{{ total }}</span>条信息</span>
            </div>
            <div class="conditions my-15">
                <div class="item float-left font-12 text-center mr-5" :class="{'text-red':check == 1}" @click="comSort">综合排序<i class="el-icon-sort-down "></i></div>
                <div class="item float-left font-12 text-center mr-5" :class="{'text-red':check == 2}" @click="recomSort">推荐排序<i class="el-icon-sort-down "></i></div>
                <div class="item float-left font-12 text-center" :class="{'text-red':check == 3}" @click="timeSort" >入驻时间<i class="el-icon-sort-down "></i></div>
            </div>
            <div class="content">
                <router-link tag="div" :to="{name:'subwebsiteIndex',query:{shop_id:item.id}}" class="item" v-for="item in data" :key="item.id">
                <div class="pic float-left">
                    <img :src="item.img" alt="" class="w-100 h-100">
                </div>
                <div class="info float-left ml-20">
                    <p class="name font-18 fw-blod">{{ item.name }}</p>
                    <p class="mt-20 text-6 font-14 row2" style="width: 740px;min-height: 40px">{{ item.major }}</p>
                    <p class="text-9 mt-20 font-12">
                        <span>地址：</span><span>{{ item.addresss }}</span>
                    </p>
                </div>
                <div class="contact float-right mt-20 text-red">
                    <div class="left float-left">
                        <img src="@/assets/image/search/phone.png" alt="">
                    </div>
                    <div class="right float-left font-16 text-center pointer" @click="open(item.mob)">联系卖家</div>
                </div>
            </router-link>
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
         name:'Shops',
         data(){
             return{
                 data:[],
                 currentPage: 1,
                 pageSize:0,
                 total:0,
                 keyword: '',
                 check: 1
             }
         },
         watch:{
             '$route':function(newUrl,oldUrl){
                 if(newUrl.query.keyword!=oldUrl.query.keyword){
                     this.keyword = this.$route.query.keyword ? this.$route.query.keyword : ''
                     this.getData()
                 }
             }
         },
         created(){
             this.keyword = this.$route.query.keyword ? this.$route.query.keyword : ''
             this.getData(1)
         },
         methods:{
             getData(pag){
                 this.name = this.$route.query.name ? this.$route.query.name : '商品库'
                 this.JCService.indexService.Shops_search({pag:pag,keyword:this.keyword}).then(e=>{
                     e.info.data.forEach((item,index)=>{
                         e.info.data[index].img = this.JCconfig.filePath+'public/' + item.img
                     })
                     this.data = e.info.data
                     this.currentPage = e.info.current_page
                     this.total = e.info.total
                     this.pageSize = e.info.per_page
                 })
             },
             handleCurrentChange(val){
                 this.getData(val)
             },
             toSearch(){
                 this.$router.push({path:'search_shops',query:{keyword:this.keyword}})
             },
             open(mob) {
                 if (mob){
                     this.$alert(mob,'这是手机号');
                 }

             },
             comSort(){
                 this.check = 1
                 this.getData()
             },
             timeSort(){
                 this.check = 3
                 this.data = this.data.sort((a,b)=>{return b.create_time - a.create_time})
             },
             recomSort(){
                 this.check = 2
                 this.data = this.data.sort((a,b)=>{return a.id - b.id})
             }
        }
    }
</script>
<style lang="scss" scoped>
    $height:40px;
    $height1:30px;
    .bigbox{
        background: #F5F5F5;
        overflow: hidden;
        .box{
            width: 1200px;
            margin: 0 auto;
            .top{
                height: 70px;
                border-bottom: 2px solid #E2DCDC;
                line-height: 70px;
                .icon{
                    color: #666666;
                    font-size: 12px;
                }
                .search{
                    width:200px;
                    height:30px;
                    background:rgba(255,255,255,1);
                    border:1px solid rgba(204, 204, 204, 1);
                    outline: none;
                    padding-left: 10px;
                }
                .btn{
                    padding:6px 9px 9px 9px;
                    background: #FF0000;
                    color: #ffffff;
                    line-height: 30px;
                }
            }
            .conditions{
                height: $height;
                .item{
                    width: 90px;
                    height: $height;
                    background:rgba(255,231,231,1);
                    line-height: $height;
                    cursor: pointer;
                }
                .address{
                    width: 90px;
                    height: $height;
                    line-height: $height;
                    .icon{
                        color: #999999;
                    }
                }
                .price{
                    line-height: $height;
                    input{
                        width: 80px;
                        height: 24px;
                        background:rgba(255,255,255,1);
                        border:1px solid rgba(204, 204, 204, 1);
                        border-radius:2px;
                        outline: none;
                        padding-left: 5px;
                    }
                }
                .btn{
                    width: 50px;
                    height: 25px;
                    color: #FF0000;
                    border: 1px solid #FF0000;
                    text-align: center;
                    line-height: 25px;
                }
            }
        }
        .content{
            background: #ffffff;
            .item{
                padding: 30px 20px 30px 30px;
                border-bottom: 1px solid #E6E6E5;
                height: 120px;
                .pic{
                    width: 120px;
                    height: 120px;
                }
                .icon{
                        vertical-align: bottom;
                    }
                .contact{
                    width: 150px;
                    height: 40px;
                    border: 1px solid #E71F19;
                    border-radius:2px;
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
                        width: 110px;
                        line-height: 40px;
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
</style>