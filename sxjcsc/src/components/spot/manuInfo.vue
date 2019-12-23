<template>
    <div class="float-right manuBox">
        <div class="title text-center text-white font-30">厂家信息</div>
        <div class="manuInfo mt-20 bg-white px-25 py-30 font-14">
            <div class="name singlerow w-100">{{ dataTransfer.author }}</div>
            <p class="mt-20" v-if="dataTransfer.title">
                <span class="text-9">主营项目：</span>
                <span class="text-3">{{ dataTransfer.title }}</span>
            </p>
            <div class="btn pointer">
                <div class="left float-left">
                    <img src="@/assets/image/search/phone.png" alt="">
                </div>
                <div class="right float-right text-center text-red " @click="open(dataTransfer.mob)">联系卖家</div>
            </div>
        </div>
        <PopularShops></PopularShops>
        <div class="recommend bg-white mb-20">
            <div class="tit px-25">
               <img src="@/assets/image/spot/recommend.png" alt=""><span class="font-16 fw-blod ml-10">今日现货</span>
            </div>
            <ul class="px-25 font-14 pt-5 pb-20">
                <li v-for="item in data" :key="item.id" @click="toSpot(item.id)" class="pointer">{{ item.title }}</li>
            </ul>
        </div>
    </div>
</template>
<script>
    import PopularShops from '@/components/spot/popularShops'
    export default {
        name: 'ManuInfo',
        props:['dataTransfer'],
        components: {
            'PopularShops': PopularShops
        },
        data(){
            return{
                data:[]
            }
        },
        created() {
            this.JCService.indexService.Recommend_goods().then(e=>{
                this.data = e.info
            })
        },
        methods:{
            toSpot(id){
                this.$router.push({path:'/spot/main',query:{id:id}})
            },
            open(mob) {
                this.$alert(mob,'这是手机号');
            },
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

        .recommend{
            .tit{
                line-height: 50px;
                border-bottom: 1px solid #F5F5F5;
                img{
                    vertical-align: text-top;
                }
            }
            ul li{
                margin-top: 15px;
            }
        }
    }
</style>