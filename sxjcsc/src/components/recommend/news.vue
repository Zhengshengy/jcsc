<template>
    <div>
        <div class="news mb-20">
            <div class="title bg-white w-100">
                <div class="float-left font-18 ml-20">建材资讯</div>
                <router-link to="/trends" class="float-right font-12 text-6 mr-20">更多</router-link>
            </div>
            <router-link :to="'/trends/main?id='+item.id" class="bg-white item" v-for="(item,index) in news" :key="index">
                <div class="pic">
                    <img :src="item.img" alt="" width="370" height="200">
                </div>
                <div class="pt-15 px-35 pb-25 content">
                    <div class="font-16 fw-blod text-6 mt-15 singlerow">{{item.title}}</div>
                    <div class="font-14 text-6 mt-15 content1" v-text="item.desc"></div>
                </div>
            </router-link>
            <div class="clearfloat"></div>
        </div>
    </div>
</template>
<script>
    export default {
        name: 'News',
        data(){
            return{
                news:[],
            }
        },
        created() {
            this.JCService.indexService.Information().then(e=>{
                e.info.forEach((item,index)=>{
                    e.info[index].img = this.JCconfig.filePath +'public/' + item.img
                })
                this.news = e.info
            })
        }
    }
</script>