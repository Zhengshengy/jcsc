<template>
    <div class="float-right trendBox">
        <div class="item pr-50 w-100 py-35" v-for="item in data" :key="item.id" @click="toTrends(item.id)">
            <div class="pic float-left">
                <el-image :src="item.img" v-if="item.img" class="w-100 h-100">
                    <div slot="error" class="image-slot w-100 h-100" >
                        <img src="@/assets/image/public/nopic.png" alt="" class="w-100 h-100">
                    </div>
                </el-image>
                <img src="@/assets/image/public/nopic.png" alt="" v-else class="w-100 h-100">
            </div>
            <div class="right float-left ml-20">
                <p class="info font-18 fw-blod">{{ item.title }}</p>
                <p class="text-6 font-14 mt-30 row2 desc">{{ item.desc }}</p>
                <p class="text-6 mt-25 font-12">
                    <i class="el-icon-view font-14 icon"></i><span class="ml-10">{{ item.click }}</span>
                    <i class="el-icon-time ml-30 text-9 font-14 icon"></i><span class="text-9 ml-10">发表于：{{ item.time }}</span>
                </p>
            </div>
            <div class="clearfloat"></div>
        </div>
        <div class="page" v-if="value>1">
            <el-pagination background
                           :hide-on-single-page="true"
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
        name: 'TrendsMain',
        data(){
            return{
                data:[],
                currentPage: 1,
                pageSize:0,
                total:0,
                value:1
            }
        },
        created(){
            this.getData()
        },
        methods:{
            handleCurrentChange(val) {
                this.getData(val)
            },
            getData(page){
                this.JCService.indexService.Information_many({pag:page}).then(e=>{
                    e.info.data.forEach((item)=>{
                        if (item.img){
                            item.img = this.JCconfig.filePath +'public/' + item.img
                        }
                        let time = item.time * 1000
                        item.time = this.JCutils.Format(time)
                    })
                    this.data = e.info.data
                    this.currentPage = e.info.current_page
                    this.total = e.info.total
                    this.pageSize = e.info.per_page
                    this.value = e.info.last_page
                })
            },
            toTrends(id){
                this.$router.push({path:'/trends/main',query:{id:id}})
            }
        }
    }
</script>
<style lang="scss" scoped>
.trendBox{
    width: 810px;
    padding: 0px 30px 0 30px;
    background: #ffffff;
    .item{
        border-bottom: 1px solid #F5F5F5;
        .pic{
            width: 200px;
            height: 135px;
        }
        .right{
            width: 570px;
            .desc{
                min-height: 40px;
            }
            .info{
                color: #010101;
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