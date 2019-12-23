<template>
    <div>
        <div class="popular my-20  bg-white">
            <div class="tit px-25">
                <img src="@/assets/image/spot/hot.png" alt=""><span class="font-16 fw-blod ml-10">推荐物流公司</span>
            </div>
            <div class="item px-25 font-14 pt-25 pb-20" v-for="item in data">
                <div class="name singlerow w-100">{{ item.name }}</div>
                <div class="text-red mt-15"  v-if="item.line">物流范围</div>
                <p class="text-6 mt-15 singlerow" v-if="item.line">{{ item.line }}</p>
                <div class="btn text-red text-center mt-10 pointer" @click="jump(item.id)">查看物流详情</div>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        name: 'Recommend',
        created() {
            this.JCService.indexService.Recommend_logistics().then(e=>{
                this.data = e.info
            })
        },
        data(){
            return{
                data:[]
            }
        },
        methods:{
            jump(id){
                this.$router.push({path:'/logistics/detail',query:{id:id}})
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
            }
        }
    }
</style>