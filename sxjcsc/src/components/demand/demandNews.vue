<template>
    <div class="newsBox">
        <div class="content  text-6 font-12">
            <div class="title mb-35">
                <div class="contact float-right text-red pointer" v-if="dataTransfer.mob" @click="open(dataTransfer.mob)">
                    <div class="left float-left">
                        <img src="@/assets/image/search/phone.png" alt="">
                    </div>
                    <div class="right float-left font-16 text-center">联系卖家</div>
                </div>
                <p class="font-24 fw-blod text-0 text-center">陕西建材商城最新需求文章</p>
                <p class="text-6 mt-30 font-12 mb-35 text-center">
                <span class="text-9">
                    <i class="el-icon-view text-9 font-14 icon" style="vertical-align: text-top"></i>
                    <span class="ml-5">{{ dataTransfer.browse }}</span>
                    <i class="el-icon-time text-9 font-14 icon ml-30" style="vertical-align: text-top"></i>
                    发表于：{{ dataTransfer.time }}</span>
                </p>
            </div>
            <div>
                <p>{{ dataTransfer.content }}</p>
                <el-image :src="item" :preview-src-list="dataTransfer.img" class="pic" v-for="(item,index) in dataTransfer.img" :key="index">
                    <div slot="error" class="image-slot">
                        <img src="@/assets/image/public/nopic.png" alt="" class="w-100 h-100">
                    </div>
                </el-image>
            </div>
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
            <div class="status text-center text-white bg-red" v-if="dataTransfer.type==2">已完成</div>
            <div class="status text-center text-white" style="background: #006DFF;" v-if="dataTransfer.type==3">已过期</div>
        </div>
        <div class="bottom  py-25 pointer">
            <p class="text-3 font-14 " @click="jump(pevdata.id)" v-if="pevdata.content">
                <span>上一篇：</span>
                <span>{{ pevdata.content }}</span>
            </p>
            <p class="text-3 font-14 mt-15" @click="jump(nextdata.id)" v-if="nextdata.content">
                <span>下一篇：</span>
                <span>{{ nextdata.content }}</span>
            </p>
        </div>
    </div>
</template>
<script>
    export default {
        name:'DemandNews',
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
        data(){
            return{
                pic: []
            }
        },
        methods:{
            jump(id){
                this.$router.push({path:'/demand/main',query:{id:id}})
            },
            open(mob) {
                this.$alert(mob,'这是手机号');
            },
        }
    }
</script>
<style scoped lang="scss">
    .newsBox{
        width: 1200px;
        padding: 35px 30px 0 30px;
        background: #ffffff;
        float: left;
        overflow: hidden;
        .top{
            border-bottom: 1px solid #F5F5F5;
        }
        .icon{
            vertical-align: bottom;
        }
        .content{
            position: relative;
            .title{
                position: relative;
                border-bottom: 1px solid #F5F5F5;
                .contact{
                    position: absolute;
                    right: 0;
                    top: -5px;
                    width: 155px;
                    height: 35px;
                    border: 1px solid #E71F19;
                    border-radius:2px;
                    .left{
                        width: 65px;
                        height: 100%;
                        background: #E71F19;
                        img{
                            display: block;
                            margin: 6px auto;
                        }
                    }
                    .right{
                        width: 90px;
                        line-height: 35px;
                    }
                }
            }
            p{
                line-height: 30px;
                margin-top: 35px;
            }
            .pic{
                width: 1064px;
                height: 327px;
                margin: 37px auto;
                display: block;
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
            .status{
                width: 150px;
                height: 23px;
                position: absolute;
                top: -55px;
                left: -80px;
                transform: rotate(-45deg);
                font-size: 14px;
                line-height: 25px;
            }
        }
        .bottom{
            border-top: 1px solid #F5F5F5;
        }
    }
</style>