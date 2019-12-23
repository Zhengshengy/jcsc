<template>
    <div>
        <div class="popular my-20  bg-white">
            <div class="tit px-25">
                <img src="@/assets/image/spot/hot.png" alt=""><span class="font-16 fw-blod ml-10">热门商家</span>
            </div>
            <div class="item px-25 font-14 pt-25 pb-20" v-for="item in data" :key="item.id">
                <div class="name">{{ item.name }}</div>
                <div class="text-red mt-15">主营产品</div>
                <p class="text-6 mt-15 row2">{{ item.major }}</p>
                <router-link tag="div" :to="{name:'subwebsiteIndex',query:{shop_id:item.id}}" class="btn pointer text-red text-center">进入商家店铺</router-link>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        name: 'PopularShops',
        created(){
            this.JCService.indexService.Heat_shops().then(e=>{
                this.data = e
            })
        },
        data(){
            return{
                data:[]
            }
        }
    }
</script>
<style lang="scss" scoped>
     $red:#FF0000;
    .popular{
            .tit{
                line-height: 50px;
                img{
                    vertical-align: text-bottom;
                }
            }
            .item{
                border-top: 1px solid #F5F5F5;
                .btn{
                    width: 160px;
                    height:36px;
                    border:1px solid $red;
                    border-radius:5px;
                    line-height: 36px;
                    margin: 15px auto 0;
                }
            }
        }
</style>