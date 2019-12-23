<template>
    <div class="cont">
            <div class="banner">
                <el-carousel :interval="3000" arrow="never">
                    <el-carousel-item>
                        <img src="@/assets/image/subwebsite/banner.jpg" alt="">
                    </el-carousel-item>
                </el-carousel>
            </div>
            <div class="synopsis">
                <div class="tit">
                    <span>公司介绍</span>
                </div>
                <div class="txt" v-html="introduce"></div>
            </div>
        </div>
</template>

<script>
    export default {
        name: "introduce",
        props:['introduce']
    }
</script>

<style lang='scss' scoped>
    .cont{
            width: 960px;
            padding-bottom: 40px;
            .banner{
                width: 100%;
                height: 300px;
                background: #999999;
                margin-bottom: 15px;
                .el-carousel__item h3 {
                    color: #475669;
                    font-size: 18px;
                    opacity: 0.75;
                    line-height: 300px;
                    text-align: center;
                    margin: 0;
                }
                .el-carousel__item:nth-child(2n) {
                    background-color: #99a9bf;
                }
                .el-carousel__item:nth-child(2n+1) {
                    background-color: #d3dce6;
                }
            }
            .synopsis{
                background:#fff;
                margin-bottom: 20px;
                .tit{
                    display: flex;
                    height: 40px;
                    border-bottom: 1px solid #E0E0E0;
                    justify-content: space-between;
                    line-height:40px;
                    span{
                        display: block;
                        margin-left: 20px;
                        color: #000;
                        font-weight: bold;
                    }
                }
                .txt{
                    padding: 24px 22px 22px;
                    line-height: 21px;
                    p{
                        text-indent: 28px;
                        margin-bottom: 10px;
                        color: #666;
                    }
                }
            }
        }
</style>