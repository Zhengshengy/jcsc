<template>
    <div class="w-100 big">
        <SearchTop :dataTransfer="actvite"></SearchTop>
        <div class="box m-0-auo">
            <el-breadcrumb class="my-20" separator-class="el-icon-arrow-right">
                <span class="float-left text-6">当前位置：</span>
                <el-breadcrumb-item :to="{ path: '/' }">陕西建材商城</el-breadcrumb-item>
                <el-breadcrumb-item :to="{ path: '/logistics' }">物流信息</el-breadcrumb-item>
                <el-breadcrumb-item>物流详情</el-breadcrumb-item>
            </el-breadcrumb>
            <Article :dataTransfer="data" :pevdata="pevdata" :nextdata="nextdata" :key="id"></Article>
            <Aside :dataTransfer="data"></Aside>
            <Related :information="information"></Related>
        </div>
    </div>
</template>

<script>
    import SearchTop  from '@/components/search/top'
    import Article  from '@/components/logistics/article'
    import Aside from '@/components/logistics/aside'
    import Related from '@/components/logistics/related'
    export default {
        name: "LogisticsDetail",
        components:{
            'SearchTop': SearchTop,
            'Article': Article,
            'Aside': Aside,
            'Related': Related,
        },
        data(){
            return{
                actvite: 6,
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
        watch:{
            '$route':function(newUrl,oldUrl){
                if(newUrl.query.id!=oldUrl.query.id){
                    this.id = this.$route.query.id
                    this.getData()
                }
            }
        },
        methods:{
            getData(){
                this.id = this.$route.query.id
                let id = this.id
                let obj = {id:id}
                this.JCService.indexService.Details_logistics(obj).then(e=>{
                    let time = e.info.time * 1000
                    e.info.time = this.JCutils.Format(time)
                    this.data = e.info
                })
                this.JCService.indexService.Upper_logistics(obj).then(e=>{
                    if (e.info){
                        this.pevdata = e.info
                    } else {
                        this.pevdata.title = ''
                    }
                })
                this.JCService.indexService.Lower_logistics(obj).then(e=>{
                    if (e.info){
                        this.nextdata = e.info
                    } else {
                        this.nextdata.title = ''
                    }
                })
                this.JCService.indexService.Relevant_logistics().then(e=>{
                    e.info.forEach(item=>{
                        item.img = this.JCconfig.filePath + 'public/' + item.img
                    })
                    this.information = e.info
                })
            }
        }
    }
</script>

<style lang='scss' scoped>
    .big{
        background: #F5F5F5;
        overflow: hidden;
        .bigbox{
            background: #fff;
        }
        .box{
            width: 1200px;
        }
    }
</style>