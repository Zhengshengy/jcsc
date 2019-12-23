<template>
    <div class="box">
        <Top></Top>
        <div class="mid">
            <div class="main">
                <Aside></Aside>
                <div class="right">
                    <router-view></router-view>
                </div>
                <div class="clearfloat"></div>
            </div>
        </div>
    </div>
</template>

<script>
    import Top from '@/components/personal/top'
    import Aside from '@/components/personal/asides'
    export default {
        name: "PersonalIndex",
        components:{
            'Top' :Top,
            'Aside':Aside,
        },
    }
</script>

<style lang='scss' scoped>
    .mid{
        width: 100%;
        background: #f5f5f5;
        .main{
            width: 1200px;
            margin: 0 auto;
            .right{
                width: 999px;
                float: right;
                margin-top: 30px;
                padding-bottom: 30px;
            }
        }
    }
</style>