<template>
    <div class="newsBox">
        <div class="top pb-30">
            <div class="title text-3 font-24 text-center fw-blod">{{ dataTransfer.name }}</div>
        </div>
        <div class="content pt-35 text-6 font-12">
            <p>{{ dataTransfer.line }}</p>
            <div class="share">
                <div class="weibo item mr-20">
                    <img src="@/assets/image/spot/weibo.png" alt="">
                </div>
                <div class="weixin item mr-20">
                    <img src="@/assets/image/spot/weixin.png" alt="">
                </div>
                <div class="qzone item">
                    <img src="@/assets/image/spot/qzone.png" alt="">
                </div>
            </div>
        </div>
        <div class="bottom py-25 mt-50">
            <p class="text-3 font-14 pointer" @click="jump(pevdata.id)" v-if="pevdata.name">
                <span>上一篇：</span>
                <span>{{ pevdata.name }}</span>
            </p>
            <p class="text-3 font-14 mt-15 pointer" @click="jump(nextdata.id)" v-if="nextdata.name">
                <span>下一篇：</span>
                <span>{{ nextdata.name }}</span>
            </p>
        </div>
    </div>
</template>
<script>
    export default {
        name:'Article',
        props:['dataTransfer','pevdata','nextdata'],
        methods:{
            jump(id){
                this.$router.push({path:'/logistics/detail',query:{id:id}})
            }
        }
    }
</script>
<style scoped lang="scss">
    .newsBox{
        width: 810px;
        padding: 35px 30px 0 30px;
        background: #ffffff;
        float: left;
        .top{
            border-bottom: 1px solid #F5F5F5;
        }
        .icon{
            vertical-align: bottom;
        }
        .content{
            p{
                line-height: 30px;
                margin-top: 35px;
                font-size: 14px;
                color: #666;
            }
            img{
                display: block;
                max-width: 735px;
                margin: 35px auto 0;
            }
            .share{
                width: 88px;
                height: 16px;
                margin: 40px auto 36px;
                .item{
                    width: 16px;
                    height: 16px;
                    float: left;
                }
            }
        }
        .bottom{
            border-top: 1px solid #F5F5F5;
        }
    }
</style>