<template>
    <div class="spotBox bg-white pl-30 float-left mt-20 pb-10">
        <div class="title py-35">
            <div class="shu"></div>
            <span class="text-3 font-18">更多今日现货</span>
        </div>
        <router-link tag="div" :to="{path:'/spot/main',query:{id:item.id}}" class="item pr-50 w-50 pb-30 float-left" v-for="item in information" :key="item.id">
            <div class="pic float-left">
                <el-image :src="item.img" v-if="item.img" class="w-100 h-100">
                    <div slot="error" class="image-slot w-100 h-100" >
                        <img src="@/assets/image/public/nopic.png" alt="" class="w-100 h-100">
                    </div>
                </el-image>
                <img src="@/assets/image/public/nopic.png" alt="" v-else class="w-100 h-100">
            </div>
            <div class="right float-left ml-20">
                <p class="info font-14 singlerow">{{ item.title }}</p>
                <p class="text-6 font-12 mt-10 singlerow">{{ item.author }}</p>
                <p class="text-6 mt-10 font-12">
                    <i class="el-icon-view font-14 icon"></i><span class="ml-5">{{ item.click }}</span>
                    <i class="el-icon-time ml-25 text-9 font-14 icon"></i><span class="text-9 ml-5">发表于：{{ item.time }}</span>
                </p>
            </div>
            <div class="clearfloat"></div>
        </router-link>
    </div>
</template>
<script>
    export default {
        name: 'MoreSpot',
        props:['information'],
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
                width: 280px;
                .info{
                    color: #010101;

                }
            }
        }
    }
</style>