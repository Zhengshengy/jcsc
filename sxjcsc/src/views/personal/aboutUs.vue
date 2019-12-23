<template>
    <div class="bg">
        <div class="wrap">
            <div class="tit">关于我们</div>
            <div class="cont" v-html="cont"></div>
            <img src="@/assets/image/personal/public.png" alt="" class="publicImg">
            <p class="wechatPublic">微信公众号</p>
        </div>
        <div class="wrap wrap2">
            <div class="tit tit2">联系我们</div>
            <div class="contact">
                <div class="info">
                    <p>公司：陕西双能网络科技有限公司</p>
                    <p>地址：陕西省西安市未央区太华北路华远好天地1803室</p>
                    <p>电话：400-029-2889<span class="url">网址：www.sxbmm.cn</span></p>
                </div>
                <div class="code">
                    <div class="code1">
                        <img src="@/assets/image/personal/customer1.png" alt="">
                        <p>客服专员1</p>
                    </div>
                    <div class="code1">
                        <img src="@/assets/image/personal/customer2.png" alt="">
                        <p>客服专员2</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "AboutUs",
        data(){
            return {
                cont:''
            }
        },
        created(){
            this.JCService.PersonalServer.About_us().then(e=>{
                this.cont = e.info[0].content;
                let val = this.cont.indexOf('src="/ueditor');
                for(let i=0;i<10;i++){
                    if(val == -1){
                        break;
                    }
                    this.cont = this.cont.replace('src="/ueditor','src="https://029jcsc.com/ueditor');
                }
            });
        },
    }
</script>

<style lang='scss' scoped>
    .wrap{
        background: #fff;
        margin-bottom: 30px;
        padding-bottom: 60px;
        .tit{
            font-size: 16px;
            color: #000;
            height: 53px;
            line-height: 53px;
            text-indent: 18px;
            border-bottom: 1px solid #f5f5f5;
            margin-bottom: 30px;
        }
        .cont{
            font-size: 14px!important;
            color: #666!important;
            line-height: 26px!important;
            margin-bottom: 25px!important;
            padding: 0 20px!important;
        }
        .publicImg{
            display: block;
            width: 190px;
            height: 190px;
            margin: 23px auto 5px;
        }
        .wechatPublic{
            font-size: 16px;
            color: #333;
            text-align: center;
        }
    }
    .wrap2{
        padding-bottom: 200px;
        .tit2{
            margin-bottom: 25px;
        }
        .contact{
            display: flex;
            padding: 0 50px;
            p{
                padding: 0;
                font-size: 14px;
                color: #666;
                line-height: 26px;
                margin-bottom: 25px;
            }
            .info{
                margin-top: 40px;
                font-size: 14px;
                color: #333;
                margin-bottom: 25px;
                .url{
                    margin-left: 68px;
                }
            }
            .code{
                display: flex;
                margin-left: 150px;
                img{
                    width: 176px;
                    height: 176px;
                    margin-bottom: 7px;
                }
                p{
                    font-size: 16px;
                    color: #333;
                    text-align: center;
                }
                .code1{
                    margin-right: 27px;
                }
            }
        }
    }
</style>