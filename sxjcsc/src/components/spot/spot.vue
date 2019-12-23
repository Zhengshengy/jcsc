<template>
    <div class="bigbox">
        <div class="box m-0-auo">
            <div class="top">
                <div class="float-left">
                    <el-breadcrumb class="mt-30 float-left" separator-class="el-icon-arrow-right">
                        <span class="float-left text-6">当前位置：</span>
                        <el-breadcrumb-item :to="{ path: '/' }">陕西建材商城</el-breadcrumb-item>
                        <el-breadcrumb-item >今日现货</el-breadcrumb-item>
                    </el-breadcrumb>
                    <div class="float-left">
                        <input type="text" class="search ml-10" v-model="keyword" @keyup.enter="toSearch">
                        <span class="btn" @click="toSearch"><i class="el-icon-search icon1"></i></span>
                    </div>
                </div>
                <div class="float-right">
                    <div class="item float-left text-3 font-14 text-center mr-20 pointer" v-bind:class="{ actvite:index==current}" v-for="(item,index) in title" :key="index" @click="classify(index,item.id)">{{item.name}}</div>
                    <div class="clearfloat"></div>
                </div>
            </div>
            <div class="content">
                <div class="item" v-for="item in data" :key="item.id" @click="toSpot(item.id)">
                    <div class="pic float-left">
                        <img class="w-100 h-100" :src="item.img" alt="">
                    </div>
                    <div class="info float-left ml-20">
                        <p class="name font-18 fw-blod singlerow">{{ item.title }}</p>
                        <p class="mt-25 text-6">{{ item.author }}</p>
                        <p class="text-6 mt-30 font-12">
                            <i class="el-icon-view font-14 icon"></i><span class="ml-10">{{ item.click }}</span>
                            <i class="el-icon-time ml-30 text-9 font-14 icon"></i><span class="text-9 ml-10">发表于：{{ item.time }}</span>
                        </p>
                    </div>
                    <div class="contact float-right mt-20 text-red pointer" @click="open(item.mob)">
                        <div class="left float-left">
                            <img src="@/assets/image/search/phone.png" alt="">
                        </div>
                        <div class="right float-left font-16 text-center">联系卖家</div>
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
        name:'Spot',
        data(){
            return{
                title:[],
                current:0,
                data:[],
                currentPage: 1,
                pageSize:0,
                total:0,
                id:1,
                keyword:''
            }
        },
        created() {
            this.JCService.indexService.Spot_classification().then(e=>{
                this.title = e.info
            })
            this.keyword = this.$route.query.keyword ? this.$route.query.keyword : ''
            this.getData(1,this.id,this.keyword)
        },
        methods:{
            handleCurrentChange(val) {
                this.getData(val,this.id)
            },
            getData(page,param,keyword){
                this.JCService.indexService.Spot_today({pag:page,param:param,keyword:keyword}).then(e=>{
                    e.info.data.forEach((item,index)=>{
                        e.info.data[index].img = this.JCconfig.filePath +'public/' + item.img
                        let time = item.time * 1000
                        e.info.data[index].time = this.JCutils.Format(time)
                    })
                    this.data = e.info.data
                    this.currentPage = e.info.current_page
                    this.total = e.info.total
                    this.pageSize = e.info.per_page
                })
            },
            classify(index,id){
                this.current = index
                this.id = id
                this.keyword = ''
                this.getData(1,id)
            },
            open(mob) {
                this.$alert(mob,'这是手机号');
            },
            toSpot(id){
                this.$router.push({path:'/spot/main',query:{id:id}})
            },
            toSearch(){
                this.getData(1,this.id,this.keyword)
            }
        }
    }
</script>
<style lang="scss" scoped>
    .bigbox{background: #F5F5F5;overflow: hidden}
    .box{
        width: 1200px;
        .top {
            height: 70px;
            line-height: 70px;
            .actvite{
                background:rgba(255,0,0,1);
                border-radius:5px;
                font-weight: bold;
                color: #ffffff;
            }
            .item{
                width: 70px;
                height: 30px;
                margin-top: 20px;
                line-height: 30px;
            }
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
            .item{
                padding: 30px 20px 30px 30px;
                border-bottom: 1px solid #E6E6E5;
                height: 120px;
                .info{
                    width: 60%;
                }
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