<template>
    <div class="w-100 bigbox">
        <SearchTop :dataTransfer="actvite"></SearchTop>
        <div class="box m-0-auo">
            <el-breadcrumb class="my-20" separator-class="el-icon-arrow-right">
                <span class="float-left text-6">当前位置：</span>
                <el-breadcrumb-item :to="{ path: '/' }">陕西建材商城</el-breadcrumb-item>
                <el-breadcrumb-item :to="{ path: '/spot' }">今日现货</el-breadcrumb-item>
                <el-breadcrumb-item>文章正文</el-breadcrumb-item>
            </el-breadcrumb>
            <News :dataTransfer="data" :pevdata="pevdata" :nextdata="nextdata" :key="id"></News>
            <ManuInfo :dataTransfer="data"></ManuInfo>
            <MoreSpot :information="information"></MoreSpot>
        </div>
    </div>
</template>
<script>
    import SearchTop  from '@/components/search/top'
    import News  from '@/components/spot/news'
    import ManuInfo from '@/components/spot/manuInfo'
    import MoreSpot from '@/components/spot/moreSpot'
    export default {
        name:'SpotMain',
        components:{
            'SearchTop': SearchTop,
            'News': News,
            'ManuInfo': ManuInfo,
            'MoreSpot': MoreSpot,
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
                actvite: 1,
                article:[],
                data:{},
                pevdata:{},
                nextdata:{},
                id:0,
                information:[]
            }
        },
        created() {
            this.getData()
        },
        methods:{
            getData(){
                this.id = this.$route.query.id
                let id = this.id
                let obj = {id:id}
                this.JCService.indexService.Details_goods(obj).then(e=>{
                    let time = e.info.time * 1000
                    e.info.time = this.JCutils.Format(time)
                    this.data = e.info
                    let val = this.data.content.indexOf('src="/ueditor');
                    for(let i=0;i<100;i++){
                        if(val == -1){
                            break;
                        }
                        this.data.content = this.data.content.replace('src="/ueditor','width="80%" src="https://029jcsc.com/ueditor');
                    }
                })
                this.JCService.indexService.Upper_goods(obj).then(e=>{
                    if (e.info){
                        this.pevdata = e.info
                    } else {
                        this.pevdata.title = ''
                    }
                })
                this.JCService.indexService.Lower_goods(obj).then(e=>{
                    if (e.info){
                        this.nextdata = e.info
                    } else {
                        this.nextdata.title = ''
                    }
                })
                this.JCService.indexService.Relevant_goods().then(e=>{
                    e.info.forEach(item=>{
                        item.img = this.JCconfig.filePath + 'public/' + item.img
                        let time = item.time * 1000
                        item.time = this.JCutils.Format(time)
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