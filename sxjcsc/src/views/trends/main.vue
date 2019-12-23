<template>
    <div class="w-100 bigbox">
        <SearchTop :dataTransfer="actvite"></SearchTop>
        <div class="box m-0-auo">
            <el-breadcrumb class="my-20" separator-class="el-icon-arrow-right">
                <span class="float-left text-6">当前位置：</span>
                <el-breadcrumb-item :to="{ path: '/' }">陕西建材商城</el-breadcrumb-item>
                <el-breadcrumb-item :to="{ path: '/trends' }">行业资讯</el-breadcrumb-item>
                <el-breadcrumb-item>文章正文</el-breadcrumb-item>
            </el-breadcrumb>
            <News :dataTransfer="data" :pevdata="pevdata" :nextdata="nextdata" :key="id"></News>
            <div class="float-right">
                <TrendsLeft></TrendsLeft>
            </div>
            <MoreTrends :information="information"></MoreTrends>
        </div>
    </div>
</template>

<script>
    import SearchTop  from '@/components/search/top'
    import News  from '@/components/spot/news'
    import MoreTrends from '@/components/trends/moreTrends'
    import TrendsLeft  from '@/components/trends/left'
    export default {
        name: "TrendsMain",
        components:{
            'SearchTop': SearchTop,
            'News': News,
            'MoreTrends': MoreTrends,
            'TrendsLeft' : TrendsLeft
        },
        watch:{
            '$route':function(newUrl,oldUrl){
                if(newUrl.query.id!=oldUrl.query.id){
                    this.id = this.$route.query.id
                    this.getData()
                }
            }
        },
        data(){
            return{
                actvite: 10,
                article:[],
                data:{},
                pevdata:{},
                nextdata:{},
                id:0,
                information:[]
            }
        },
        created(){
            this.getData()
        },
        methods:{
            getData(){
                this.id = this.$route.query.id
                let id = this.id
                let obj = {id:id}
                this.JCService.indexService.Details_article(obj).then(e=>{
                    e.info.time = this.JCutils.Format(e.info.time)
                    this.data = e.info
                    let val = this.data.content.indexOf('src="/ueditor');
                    for(let i=0;i<100;i++){
                        if(val == -1){
                            break;
                        }
                        this.data.content = this.data.content.replace('src="/ueditor','width="80%" src="https://029jcsc.com/ueditor');
                    }
                })
                this.JCService.indexService.Upper_article(obj).then(e=>{
                    if (e.info){
                        this.pevdata = e.info
                    } else {
                        this.pevdata.title = ''
                    }
                })
                this.JCService.indexService.Lower_article(obj).then(e=>{
                    if (e.info){
                        this.nextdata = e.info
                    } else {
                        this.nextdata.title = ''
                    }
                })
                this.JCService.indexService.Relevant_article().then(e=>{
                    e.info.forEach(item=>{
                        item.img = this.JCconfig.filePath + 'public/' + item.img
                    })
                    this.information = e.info
                })
            }
        }
    }
</script>

<style lang="scss" scoped>
    .bigbox{
        background: #F5F5F5;
        overflow: hidden;
        .box{
            width: 1200px;
        }
    }
</style>