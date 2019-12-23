<template>
    <div class="bigbox">
        <SearchTop :dataTransfer="actvite"></SearchTop>
        <div class="box m-0-auo">
            <el-breadcrumb class="my-20" separator-class="el-icon-arrow-right">
                <span class="float-left text-6">当前位置：</span>
                <el-breadcrumb-item :to="{ path: '/' }">陕西建材商城</el-breadcrumb-item>
                <el-breadcrumb-item>行业资讯</el-breadcrumb-item>
            </el-breadcrumb>
            <TrendsMain></TrendsMain>
            <TrendsLeft></TrendsLeft>
        </div>
    </div>
</template>
<script>
    import SearchTop  from '@/components/search/top'
    import TrendsMain  from '@/components/trends/trendsMain'
    import TrendsLeft  from '@/components/trends/left'
    export default {
        name: 'Trends',
        components: {
            'SearchTop': SearchTop,
            'TrendsMain': TrendsMain,
            'TrendsLeft': TrendsLeft
        },
        created(){

        },
        data(){
            return{
                actvite: 10
            }
        }
    }
</script>
<style lang="scss" scoped>
.bigbox{
    background: #F5F5F5;
    overflow: hidden;
    .box{
        width: 1200px;
    }
}
</style>