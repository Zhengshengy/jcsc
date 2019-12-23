<template>
    <div class="float-left manuBox">
        <div class="title text-center text-white font-30">行业资讯</div>
        <PopularShops></PopularShops>
        <div class="recommend bg-white mb-20">
            <div class="tit px-25">
               <img src="@/assets/image/spot/recommend.png" alt=""><span class="font-16 fw-blod ml-10">热门资讯</span>
            </div>
            <ul class="px-25 font-14 pt-5 pb-20 ">
                <li v-for="item in article" class="singlerow pointer" :key="item.id" @click="toTrends(item.id)">{{ item.title }}</li>
            </ul>
        </div>
    </div>
</template>
<script>
    import PopularShops from '@/components/spot/popularShops'
    export default {
        name: 'TrendsLeft',
        components: {
            'PopularShops': PopularShops
        },
        created(){
            this.JCService.indexService.Heat_article().then(e=>{
                this.article = e
            })
        },
        data(){
            return{
                data:[],
                article:[]
            }
        },
        methods:{
            toTrends(id){
                this.$router.push({path:'/trends/main',query:{id:id}})
            }
        }
    }
</script>
<style lang="scss" scoped>
    $width:300px;
    $red:#FF0000;
    .manuBox{
        width: $width;
        .title{
            height: 60px;
            background: #FF0000;
            line-height: 60px;
        }
        .btn{
            width: 160px;
            height: 36px;
            border:1px solid $red;
            border-radius:5px;
            margin: 30px auto 0;
            .left{
                background: $red;
                width: 65px;
                height: 36px;
                img{
                    display: block;
                    margin: 6px auto;
                }
            }
            .right{
                width: 95px;
                height: 36px;
                line-height: 36px;
            }
        }
        ul li{
            margin-top: 15px;
        }
        .recommend{
            width: $width;
            .tit{
                line-height: 50px;
                border-bottom: 1px solid #F5F5F5;
                img{
                    vertical-align: text-top;
                }
            }

        }
    }
</style>