<template>
    <div class="newsBox">
        <div class="content  text-6 font-12">
            <div class="title mb-35">
                <p class="font-24 fw-blod text-0 text-center">{{ dataTransfer.title }}</p>
                <p class="text-6 mt-30 font-12 mb-35 text-center">
                <span class="text-9"><i class="el-icon-time text-9 font-14 icon" style="vertical-align: text-top"></i>
                    发表于：{{ dataTransfer.time }}</span>
                    <span class="text-9 ml-30">来源：{{ dataTransfer.author }}</span>
                </p>
            </div>
            <div v-html="dataTransfer.content"></div>
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
        <div class="bottom  py-25 pointer">
            <p class="text-3 font-14 " @click="jump(pevdata.id)" v-if="pevdata.title">
                <span>上一篇：</span>
                <span>{{ pevdata.title }}</span>
            </p>
            <p class="text-3 font-14 mt-15" @click="jump(nextdata.id)" v-if="nextdata.title">
                <span>下一篇：</span>
                <span>{{ nextdata.title }}</span>
            </p>
        </div>
    </div>
</template>
<script>
    export default {
        name:'News',
        props:{
            dataTransfer:{
                type:Object,
            },
            pevdata:{
                type:Object,
            },
            nextdata:{
                type:Object,
            },
        },
        methods:{
            jump(id){
                if (this.$route.name == 'SpotMain') {
                    this.$router.push({path:'/spot/main',query:{id:id}})
                }else if (this.$route.name == 'TrendsMain') {
                    this.$router.push({path:'/trends/main',query:{id:id}})
                }
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
            .title{
                border-bottom: 1px solid #F5F5F5;
            }
            p{
                line-height: 30px;
                margin-top: 35px;
            }
            .share{
                width: 88px;
                height: 16px;
                margin: 90px auto 36px;
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