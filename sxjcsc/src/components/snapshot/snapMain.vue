<template>
    <div class="bigbox w-100">
        <div class="box">
            <div class="top">
                <el-breadcrumb class="mt-30 float-left" separator-class="el-icon-arrow-right">
                    <span class="float-left text-6">当前位置：</span>
                    <el-breadcrumb-item :to="{ path: '/' }">陕西建材商城</el-breadcrumb-item>
                    <el-breadcrumb-item >随手拍</el-breadcrumb-item>
                </el-breadcrumb>
                <div class="float-left">
                    <input type="text" v-model="keyword" class="search ml-10" @keyup.enter="search">
                    <span class="btn" @click="search"><i class="el-icon-search icon1"></i></span>
                </div>
            </div>
            <div class="content">
                <el-image :src="item" :preview-src-list="pic" class="item float-left" v-for="(item,index) in pic" :key="index" @click="showImage(index)">
                    <div slot="error" class="image-slot">
                        <img src="@/assets/image/public/nopic.png" alt="" class="w-100 h-100">
                    </div>
                </el-image>
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
        name: "SnapMain",
        data(){
            return{
                data:[],
                currentPage: 1,
                pageSize:0,
                total:0,
                pic:[],
                keyword: ''
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
            getData(page){
                let arr = []
                this.JCService.indexService.Conveniently({pag:page,keyword:this.keyword}).then(e=>{
                    e.info.data.forEach((item)=>{
                        item.img = this.JCconfig.filePath +'public/' + item.img
                        arr.push(item.img)
                    })
                    this.pic = arr
                    this.data = e.info.data
                    this.currentPage = e.info.current_page
                    this.total = e.info.total
                    this.pageSize = e.info.per_page
                })
            },
            showImage(index){
                let imgArr = this.pic;
                let before = imgArr.slice(0, index)
                let after = imgArr.slice(index);
                this.pic = after.concat(before);
            }
        }
    }
</script>
<style scoped>
    /deep/.el-image__error{background: #fff}
</style>
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
               .item{
                   width:24%;
                   height:285px;
                   margin-right: 1%;
                   margin-bottom: 12px;
               }
               .item:nth-child(4n){
                   margin-right: 0;
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