<template>
    <div class="bigbox w-100">
        <div class="box">
            <div class="top">
                <el-breadcrumb class="mt-30 float-left" separator-class="el-icon-arrow-right">
                    <span class="float-left text-6">当前位置：</span>
                    <el-breadcrumb-item :to="{ path: '/' }">陕西建材商城</el-breadcrumb-item>
                    <el-breadcrumb-item >特价商品</el-breadcrumb-item>
                </el-breadcrumb>
                <div class="float-left">
                    <input type="text" v-model="keyword" class="search ml-10" @keyup.enter="search">
                    <span class="btn" @click="search"><i class="el-icon-search icon1"></i></span>
                </div>
            </div>
        </div>
        <div class="content">
            <router-link tag="div" :to="{name:'productdetail',query:{id:item.id,shop_id:item.shopid,type:2}}" class="item float-left" v-for="item in data" :key="item.id">
                <div class="pic">
                    <img :src="item.img" class="w-100 h-100" alt="" >
                </div>
                <div class="info px-10 font-12 pb-15">
                    <div class="price text-red font-16 mt-15 fw-blod">
                        <div class="float-left" v-if="item.price">￥{{ item.price }}</div>
                        <div class="float-right label text-white font-12">特价</div>
                        <div class="clearfloat"></div>
                    </div>
                    <p class="text-6  mt-10 row2">{{ item.name }}</p>
                    <p class="text-9 mt-15 singlerow">{{ item.commdity_name }}</p>
                    <div class="address mt-15 w-100" v-if="item.addresss">
                        <i class="el-icon-location-outline text-red font-14"></i>
                        <span class="text-9 singlerow w-90 dis">{{ item.addresss }}</span>
                    </div>
                </div>
            </router-link>
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
</template>
<script>
    export default {
        name:"BargainMain",
        data(){
            return {
                data:[],
                currentPage: 1,
                pageSize:0,
                total:0,
                keyword:""
            }
        },
        created(){
            this.keyword = this.$route.query.keyword ? this.$route.query.keyword : ''
            this.getData(1)
        },
        methods:{
            handleCurrentChange(val){
                this.getData(val)
            },
            getData(pag){
                this.JCService.indexService.Specials({pag:pag,keyword: this.keyword}).then(e=>{
                    e.info.data.forEach((item,index)=>{
                        e.info.data[index].img = this.JCconfig.filePath+'public/' + item.img
                    })
                    this.data = e.info.data
                    this.currentPage = e.info.current_page
                    this.total = e.info.total
                    this.pageSize = e.info.per_page
                })
            },
            search(){
                this.getData(1)
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
        }
        .content{
            width: 1200px;
            margin: 0 auto;
            .item{
                width: 19%;
                border: 1px solid rgba(225, 225, 225, 1);
                margin: 0 1% 1% 0;
                .pic{
                    width: 100%;
                    height: 224px;
                }
                .info{
                    height: 110px;
                }
                .label{
                    background:#FF0000;
                    border-radius:5px;
                    padding: 2px 5px;
                }
                .address span{
                    display: inline-block;
                    vertical-align: bottom;
                }
            }
            .item:nth-child(5n){
                margin-right: 0;
            }
        }
        .page{
            width: 630px;
            margin: 30px auto;
            height: 30px;
        }
    }
</style>