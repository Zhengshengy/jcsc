<template>
    <div class="spotBox bg-white pl-30 float-left mt-20 pb-10">
        <div class="title py-35">
            <div class="shu"></div>
            <span class="text-3 font-18">相关物流信息</span>
        </div>
        <div class="item pr-50 w-50 pb-30 float-left pointer" v-for="item in information" :key="item.id" @click="jump(item.id)">
            <div class="pic float-left">
                <el-image :src="item.img" v-if="item.img" class="w-100 h-100">
                    <div slot="error" class="image-slot w-100 h-100" >
                        <img src="@/assets/image/public/nopic.png" alt="" class="w-100 h-100">
                    </div>
                </el-image>
                <img src="@/assets/image/public/nopic.png" alt="" v-else class="w-100 h-100">
            </div>
            <div class="right float-left ml-20">
                <p class="info font-14 w-100 singlerow">{{ item.name }}</p>
                <p class="text-6 font-12 mt-10 row2">{{ item.line }}</p>
            </div>
            <div class="clearfloat"></div>
        </div>
    </div>
</template>
<script>
    export default {
        name: 'Related',
        props:['information'],
        methods:{
            jump(id){
                this.$router.push({path:'/logistics/detail',query:{id:id}})
            }
        }
    }
</script>
<style lang="scss" scoped>
    .spotBox{
        width: 840px;
        .title{
            .shu{
                width: 5px;
                height: 18px;
                background:rgba(102,102,102,1);
                display: inline-block;
                vertical-align: text-bottom;
                margin-right: 10px;
            }
        }
        .item{
            .pic{
                width: 100px;
                height: 70px;
            }
            .right{
                width: 250px;
                .info{
                    color: #010101;
                }
                .row2{
                    max-width: 256px;
                }
            }
        }
    }
</style>