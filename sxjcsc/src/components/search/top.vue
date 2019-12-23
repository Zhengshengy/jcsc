<template>
    <div class="w-100 bigbox">
        <div class="box">
            <router-link to="/" class="left float-left mt-35" >
                <img src="@/assets/image/search/logo.png" alt="">
            </router-link>
            <div class="right float-left mt-40">
                <div class="top">
                    <div class="float-left shu">
                        <input type="text" class="search" v-model="keyword" @keyup.enter="searchGoods">
                        <img src="@/assets/image/search/icon.png" alt="" class="icon">
                    </div>
                    <div class="btn float-left" @click="searchGoods">搜产品</div>
                    <div class="btn float-left ml-20" @click="searchShops">搜商家</div>
                    <router-link to="/enquiry" class="btn xun float-left ml-20">全网询价</router-link>
                </div>
                <div class="keywords font-12 mt-15">
                    <span class="mr-10">热门搜索：</span>
                    <span class="text-9 mr-20" v-for="(item,index) in topSearch" :key="index" @click="searchTop(item.name)">{{ item.name }}</span>
                </div>
            </div>
            <div class="clearfloat"></div>
            <Title :dataTransfer="dataTransfer"></Title>
        </div>
    </div>
</template>
<script>
    import Title from '@/components/public/title'
    export default {
        name:'SearchTop',
        components:{
            'Title' :Title
        },
        props: {
            dataTransfer: {
              type: Number,
              default:0
            }
        },
        data(){
            return {
                keyword: '',
                topSearch: ''
            }
        },
        watch:{
            '$route':function(newUrl,oldUrl){
                if(newUrl.query.keyword!=oldUrl.query.keyword){
                    this.keyword = this.$route.query.keyword ? this.$route.query.keyword : ''
                }
            }
        },
        created(){
            this.keyword = this.$route.query.keyword ? this.$route.query.keyword : ''
            this.JCService.indexService.Popular().then(e=>{
                this.topSearch = e.info
            })
        },
        methods:{
            searchGoods(){
                if (this.keyword){
                    this.$router.push({path:'/search',query:{keyword:this.keyword}})
                }
            },
            searchShops(){
                if (this.keyword){
                    this.$router.push({path:'/search_shops',query:{keyword:this.keyword}})
                }
            },
            searchTop(name){
                this.keyword = name
                this.searchGoods()
            }
        },

    }
</script>
<style lang="scss" scoped>
    $height:30px;
    $red:#FF0000;
    .bigbox{border-bottom: 2px solid $red}
    .box{
        width: 1200px;
        margin: 0 auto;

        .left{
            width: 270px;
            height: 60px;
            margin-right: 315px;
        }
        .right{
            .top{height: 34px}
            .shu{
                position: relative;
                .icon{
                    position: absolute;
                    left: 10px;
                    bottom: 0;
                    top: 0;
                    margin: auto;
                }
            }
            .btn{
                width: 80px;
                height: 34px;
                background: $red;
                text-align: center;
                color: #ffffff;
                line-height: 34px;
                font-size: 16px;
                cursor: pointer;
            }
            .xun{
                background: #FFB873;
            }
            .search{
                padding: 0 15px 0 35px;
                width: 255px;
                height: $height;
                border: 2px solid #FF0000;
                border-radius: 0px;
                overflow: hidden;
                color: #000000;
                outline: none;

            }
        }
    }
</style>