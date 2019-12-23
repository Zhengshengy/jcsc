<template>
    <div class="box">
        <Head :name="name" :follow="follow" @collect="collect" @cancelCollect="cancelCollect"></Head>
        <Nav :shopid="shopId"></Nav>
        <div class="main" v-show="!isDetail">
            <Aside :shopId="shopId" :info="info" :recommend="recommend" :hasRecommend="hasRecommend" v-show="!isDetail" @collect="collect" @cancelCollect="cancelCollect"></Aside>
            <router-view :introduce="info.introduction" :contactList="contactList" v-if="!isDetail"></router-view>
        </div>
        <router-view v-if="isDetail" :Info="info" :contactList="contactList" :recommend="recommend" :hasRecommend="hasRecommend"></router-view>
        <Suspension></Suspension>
    </div>
</template>

<script>
    import Head from '@/components/subwebsite/header'
    import Nav from '@/components/subwebsite/nav'
    import Aside from '@/components/subwebsite/aside'
    import Suspension from '@/components/public/suspension'
    export default {
        name: "index",
        components:{
            'Head':Head,
            'Nav':Nav,
            'Aside':Aside,
            'Suspension':Suspension,
        },
        data(){
            return {
                name:'',
                shopId:'',
                info:{},
                isDetail:false,
                contactList:[],
                recommend:[],
                hasRecommend:true,
                follow:0
            }
        },
        watch:{
            $route(newVal) {
              if(newVal.path == '/subwebsite/productdetail'){
                  this.isDetail = true;
              }else{
                  this.isDetail  = false;
              }
            }
        },
        created(){
            this.shopId = this.$route.query.shop_id;
            if(this.$route.path == '/subwebsite/productdetail'){
                this.isDetail = true;
            }else{
                this.isDetail  = false;
            }
            this.getShopInfo();
            this.getRecommend();
            this.getShopPhone();
        },
        methods:{
            collect(){
                this.JCService.SubWebsiteServer.setCollect({
                    'id':this.shopId,
                }).then(e=>{
                    let message = '收藏成功';
                    if(e.status == 1){
                        this.info.guanzhu = 1;
                        this.follow = 1;
                    }else{
                        message = e.info;
                    }
                    this.$message({
                        message: message,
                        type: 'success'
                    });
                })
            },
            cancelCollect(){
                this.JCService.SubWebsiteServer.setCollect({
                    'id':this.shopId,
                }).then(e=>{
                    let message = '取消收藏成功';
                    if(e.status == 1){
                        this.info.guanzhu = 0;
                        this.follow = 0;
                    }else{
                        message = e.info;
                    }
                    this.$message({
                        message: message,
                        type: 'success'
                    });
                })
            },
            //商铺信息
            getShopInfo(){
                this.JCService.SubWebsiteServer.getShops({
                    'shopid':this.$route.query.shop_id
                }).then(e=>{
                    this.info = e.info;
                    this.name = e.info.name;
                    this.follow = e.info.guanzhu;
                    if(this.info.introduction == ''){
                        this.info.introduction = '该商铺暂无介绍'
                    }
                })
            },
            //商品推荐
            getRecommend(){
                this.JCService.SubWebsiteServer.getRecProduct({
                    'shopid':this.$route.query.shop_id,
                    'type':1
                }).then(e=>{
                    if(e.info.data.length > 0){
                        this.recommend = e.info.data;
                        for(let i of this.recommend){
                            i.img = this.JCconfig.filePath +'public/'+ i.img;
                        }
                    }else{
                        this.hasRecommend = false;
                    }

                })
            },
            //商铺联系方式
            getShopPhone(){
                this.JCService.SubWebsiteServer.getShopsPhone({
                    'shopid':this.$route.query.shop_id,
                }).then(e=>{
                    this.contactList = e.info;
                    for(let i in this.contactList){
                        if(this.contactList[i].tel != null){
                            this.contactList[i].tel = this.contactList[i].tel.split('/');
                        }else{
                            this.contactList[i].tel = [];
                        }
                        if(this.contactList[i].mob != null){
                            this.contactList[i].mob = this.contactList[i].mob.split('/');
                        }else{
                            this.contactList[i].mob = [];
                        }
                    }
                });
            }
        }
    }
</script>

<style lang='scss' scoped>
    .box{
        background: #ededed;
        .main{
            display: flex;
            justify-content: space-between;
            width: 1200px;
            margin: 20px auto 0;
            font-size: 12px;
        }
    }
</style>