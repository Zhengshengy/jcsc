<template>
    <div class="title">
        <div class="mt-30">
            <div class="classify user-select text-center  float-left pointer" v-if="dataTransfer==0" @click="show = !show" >
                <span class="text-white">全部服务分类<i class="el-icon-arrow-down ml-10"></i></span>
                <el-collapse-transition>
                    <div class="list" v-show="show">
                        <div class="text-3" v-for="item in classification" :key="item.id" @click="switchClass({id:item.id,name:item.catename})">{{ item.catename }}</div>
                    </div>
                </el-collapse-transition>
            </div>
            <router-link to="/" class="mr-30 float-left item" :class="{'text-red':dataTransfer==0}">首页</router-link>
            <router-link to="/demand" class="mr-30 float-left item" :class="{'text-red':dataTransfer==9}">求购信息</router-link>
            <router-link to="/spot" class="mr-30 float-left item" :class="{'text-red':dataTransfer==1}">今日现货</router-link>
            <router-link to="/bargain" class="mr-30 float-left item" :class="{'text-red':dataTransfer==2}">特价商品</router-link>
            <router-link to="/finershops" class="mr-30 float-left item" :class="{'text-red':dataTransfer==3}">推荐商铺</router-link>
            <router-link to="/snapshot" class="mr-30 float-left item" :class="{'text-red':dataTransfer==4}">随手拍</router-link>
            <router-link to="/tariff" class="mr-30 float-left item" :class="{'text-red':dataTransfer==5}">价格表</router-link>
            <router-link to="/logistics" class="mr-30 float-left item" :class="{'text-red':dataTransfer==6}">物流信息</router-link>
            <router-link to="/market" class="mr-30 float-left item" :class="{'text-red':dataTransfer==7}">建材市场</router-link>
            <router-link to="/lease" class="mr-30 float-left item" :class="{'text-red':dataTransfer==8}">出租转让</router-link>
            <div class="clearfloat"></div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Title",
        props: {
            dataTransfer: {
                type: Number,
                default:0
            }
        },
        data(){
            return{
                classification:[],
                show: false,
                keyword:''
            }
        },
        created() {
            // this.keyword = this.$route.query.keyword ? this.$route.query.keyword : ''
            if (this.dataTransfer == 0){
                this.JCService.indexService.Classification().then(e=>{
                    this.classification =  e.data.sort((a,b)=>{return a.id-b.id})
                })
            }
        },
        methods:{
            switchClass(item){
                this.$router.push({path:'/search',query:{id:item.id,name:item.name}})
            },
        }
    }
</script>

<style scoped  lang="scss">
    .title{
        .classify{
            width: 210px;
            height: 40px;
            border-radius: 2px;
            background: red;
            line-height: 40px;
            font-size: 16px;
            margin-right: 95px;
            position: relative;
        }
        .item{
            line-height: 40px;
            font-size: 16px;
        }
        .list{position: absolute;left: 0;top: 42px;width: 210px;height: 400px;background: #ffffff;overflow-y: auto;z-index: 999}
        .list div:hover{color: red;background: rgba(255,0,0,.1) }
    }
</style>