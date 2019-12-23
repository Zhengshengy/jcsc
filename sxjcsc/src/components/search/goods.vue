<template>
    <div class="bigbox w-100">
        <div class="box">
            <div class="top">
                <span class="font-12 text-3">{{ name }}</span>
                <i class="el-icon-arrow-right icon ml-10"></i>
                <input type="text" class="search ml-10" v-model="keyword" @keyup.enter="toSearch">
                <span class="btn" @click="toSearch"><i class="el-icon-search icon1"></i></span>
                <span class="text-3 font-12 ml-10">本次共找到<span class="text-red">{{ total }}</span>条信息</span>
            </div>
            <div class="conditions my-15">
                <div class="item float-left font-12 text-center text-red mr-5">综合排序<i class="el-icon-sort-down "></i></div>
                <div class="item float-left font-12 text-center mr-5">成交笔数<i class="el-icon-sort-down "></i></div>
                <div class="item float-left font-12 text-center">发布时间<i class="el-icon-sort-down "></i></div>
                <div class="float-left address font-12 text-center">所在地<i class="el-icon-caret-bottom icon ml-15"></i></div>
                <div class="price font-12 text-3 float-left">
                    价格
                    <input type="number">
                    <span class="text-6"> - </span>
                    <input type="number">
                </div>
                <div class="btn float-left font-14 ml-15 mt-5">确定</div>
            </div>
        </div>
        <div class="content">
            <router-link tag="div" :to="{name:'productdetail',query:{id:item.id,shop_id:item.shopid}}" class="item float-left" v-for="(item,index) in data" :key="index">
                <div class="pic">
                    <img :src="item.img" alt="" class="w-100 h-100">
                </div>
                <div class="info px-10 font-12 pb-15">
                    <div class="price text-red font-16 mt-15 fw-blod" v-if="item.price">￥{{ item.price }}元</div>
                    <div class="price text-red font-16 mt-15 fw-blod" v-else>价格面议</div>
                    <p class="text-6  mt-10 row2" style="min-height: 32px" v-if="item.introduce">{{ item.introduce }}</p>
                    <p v-else class="text-6  mt-10 row2" style="min-height: 32px">暂无介绍</p>
                    <p class="text-9 mt-15 singlerow " v-if="item.shops_name">{{ item.shops_name }}</p>
                    <p class="text-9 mt-15 singlerow " v-else>暂无商铺名</p>
                    <div class="address mt-15 w-100">
                        <i class="el-icon-location text-red font-14" v-if="item.addresss"></i>
                        <span class="text-9 singlerow ml-5 addspan">{{ item.addresss }}</span>
                    </div>
                </div>
            </router-link>
            <div class="clearfloat"></div>
        </div>
        <div class="ban m-0-auo mt-20">
            <a href="#"><img src="@/assets/image/index/ban4.png"/></a>
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
        name:"Goods",
        data(){
            return {
                data:[],
                currentPage: 1,
                pageSize:0,
                total:0,
                name:'',
                id:null,
                keyword: '',
            }
        },
        watch:{
            '$route':function(newUrl,oldUrl){
                if(newUrl.query.id!=oldUrl.query.id || newUrl.query.keyword!=oldUrl.query.keyword){
                    this.id = this.$route.query.id ? this.$route.query.id : null
                    this.name = this.$route.query.name ? this.$route.query.name : '商品库'
                    this.keyword = this.$route.query.keyword ? this.$route.query.keyword : ''
                    this.getData()
                }
            }
        },
        created(){
            this.id = this.$route.query.id ? this.$route.query.id : null
            this.name = this.$route.query.name ? this.$route.query.name : '商品库'
            this.keyword = this.$route.query.keyword ? this.$route.query.keyword : ''
            this.getData(1)
        },
        methods:{
            handleCurrentChange(val){
                this.getData(val)
            },
            getData(pag){
                this.name = this.$route.query.name ? this.$route.query.name : '商品库'
                this.JCService.indexService.Product_commodity({pag:pag,productid:this.id,keyword:this.keyword}).then(e=>{
                    e.info.data.forEach((item,index)=>{
                        let pic = item.img.split(',')[0]
                        e.info.data[index].img = this.JCconfig.filePath+'public/' + pic
                    })
                    this.data = e.info.data
                    this.currentPage = e.info.current_page
                    this.total = e.info.total
                    this.pageSize = e.info.per_page
                })
            },
            toSearch(){
                this.$router.push({path:'search',query:{keyword:this.keyword,id:this.id,name:this.name}})
            }
        }
    }
</script>
<style lang="scss" scoped>
    $height:40px;
    $height1:30px;
    .bigbox{
        background: #F5F5F5;
        min-height: 500px;
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
            width: 1200px;
            margin: 0 auto;
            .item{
                width: 19%;
                border: 1px solid rgba(225, 225, 225, 1);
                margin: 0 1% 1% 0;
                .addspan{
                    display: inline-block;
                    vertical-align: bottom;
                    width: 85%;
                }
                .pic{
                    width: 100%;
                    height: 224px;
                    background: #999999;
                }
            }
            .item:nth-child(5n){
                margin-right: 0;
            }
        }
        .ban{
            width: 1200px;
        }
        .page{
            width: 630px;
            margin: 30px auto;
            height: 30px;
        }
    }
</style>