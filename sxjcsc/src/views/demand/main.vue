<template>
    <div class="w-100 big">
        <SearchTop :dataTransfer="actvite"></SearchTop>
        <div class="box m-0-auo">
            <el-breadcrumb class="my-20" separator-class="el-icon-arrow-right">
                <span class="float-left text-6">当前位置：</span>
                <el-breadcrumb-item :to="{ path: '/' }">陕西建材商城</el-breadcrumb-item>
                <el-breadcrumb-item :to="{ path: '/demand' }">求购信息</el-breadcrumb-item>
                <el-breadcrumb-item>文章正文</el-breadcrumb-item>
            </el-breadcrumb>
            <DemandNews :dataTransfer="data" :pevdata="pevdata" :nextdata="nextdata" :key="id"></DemandNews>
            <DemandMore :information="information"></DemandMore>
        </div>
    </div>
</template>

<script>
    import DemandMore from '@/components/demand/demandMore'
    import DemandNews from '@/components/demand/demandNews'
    import SearchTop from '@/components/search/top'
    export default {
        name: "DemandMain",
        components:{
            'SearchTop':SearchTop,
            'DemandMore':DemandMore,
            'DemandNews':DemandNews
        },
        data(){
            return{
                actvite: 9,
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
                this.JCService.indexService.Details_requirement(obj).then(e=>{
                    let time = e.info.create_time * 1000
                    e.info.time = this.JCutils.Format(time)
                    if (e.info.img){
                        let pic = e.info.img.split(',')
                        pic.forEach((e,index)=>{
                            pic[index] = this.JCconfig.filePath + 'public/' + e
                        })
                        e.info.img = pic
                    }
                    this.data = e.info
                })
                this.JCService.indexService.Upper_requirement(obj).then(e=>{
                    if (e.info){
                        this.pevdata = e.info
                    } else {
                        this.pevdata.content = ''
                    }
                })
                this.JCService.indexService.Lower_requirement(obj).then(e=>{
                    if (e.info){
                        this.nextdata = e.info
                    } else {
                        this.nextdata.content = ''
                    }
                })
                this.JCService.indexService.More_requirement().then(e=>{
                    e.info.forEach(item=>{
                        if (item.img){
                            let pic = item.img.split(',')
                            pic.forEach((e,index)=>{
                                pic[index] = this.JCconfig.filePath + 'public/' + e
                            })
                            item.img = pic[0]
                        }
                        let time = item.create_time * 1000
                        item.create_time = this.JCutils.Format(time)
                    })
                    this.information = e.info
                })
            }
        }
    }
</script>

<style scoped lang="scss">
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