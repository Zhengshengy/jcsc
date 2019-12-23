<template>
    <div class="recommends">
        <router-link :to="{name:'productdetail',query:{id:today_goods.id,shop_id:today_goods.shopid,type:1}}" tag="div">
            <img :src="today_goods.img" alt="">
            <div class="txt">
                <div class="tit"><img src="@/assets/image/index/todaytj.png" alt=""> · <span>{{today_goods.catename}}</span></div>
                <p class="singlerow w-90">{{today_goods.name}}</p>
                <p><span class="price">￥{{today_goods.price}}</span><span class="unit" v-if="today_goods.company">/{{today_goods.company}}</span></p>
            </div>
        </router-link>
        <router-link :to="{name:'subwebsiteIndex',query:{shop_id:today_shops.id}}" tag="div">
            <img :src="today_shops.img" alt="">
            <div class="txt">
                <div class="tit"><img src="@/assets/image/index/shoptj.png" alt=""><span></span></div>
                <p class="singlerow w-90">{{today_shops.name}}</p>
                <p class="spec singlerow w-90">{{today_shops.major}}</p>
            </div>
        </router-link>
        <router-link :to="{name:'productdetail',query:{id:tpecial_goods.id,shop_id:tpecial_goods.shopid,type:2}}" tag="div">
            <img :src="tpecial_goods.img" alt="">
            <div class="txt">
                <div class="tit"><img src="@/assets/image/index/specialtj.png" alt=""> · <span>{{tpecial_goods.catename}}</span></div>
                <p class="singlerow w-90">{{tpecial_goods.name}}</p>
                <p><span class="price">￥{{tpecial_goods.price}}</span></p>
            </div>
        </router-link>
    </div>
</template>
<script>
    export default {
        name: 'Today',
        data(){
            return{
                today_goods:{},
                today_shops:{},
                tpecial_goods:{},
            }
        },
        created() {
            this.JCService.indexService.Today_goods().then(e=>{
                e.info.img = this.JCconfig.filePath +'public/' + e.info.img
                this.today_goods = e.info
            })
            this.JCService.indexService.Today_shops().then(e=>{
                e.info.img = this.JCconfig.filePath +'public/' + e.info.img
                this.today_shops = e.info
            })
            this.JCService.indexService.Tpecial_goods().then(e=>{
                e.info.img = this.JCconfig.filePath +'public/' + e.info.img
                this.tpecial_goods = e.info
            })
        }
    }
</script>