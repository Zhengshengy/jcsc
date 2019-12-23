<template>
    <div class="bg">
        <div class="wrap">
            <div class="publicTitle">
                <router-link to="/personal/feedback" class="link">帮助反馈</router-link>
                <span class="el-icon-arrow-right"></span>
                <span class="txt">热门问题详情</span>
            </div>
            <div class="content">
                <div class="title">{{info.title}}</div>
                <div class="time">{{info.time}}</div>
                <div class="cont" v-html="info.content"></div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "questionDetail",
        data(){
            return {
                info:{}
            }
        },
        created() {
            this.JCService.PersonalServer.Question_detail({id:this.$route.query.id}).then(e=>{
                if(e.status == 1){
                    this.info = e.info;
                    this.info.time = this.JCutils.Format(this.info.time*1000);
                    let val = this.info.content.indexOf('src="/ueditor');
                    for(let i=0;i<50;i++){
                        if(val == -1){
                            break;
                        }
                        this.info.content = this.info.content.replace('src="/ueditor','src="https://029jcsc.com/ueditor');
                    }
                }
            });
        },
    }
</script>

<style lang='scss' scoped>
    .wrap{
        background: #fff;
        margin-bottom: 30px;
        width: 999px;
        .publicTitle{
            height: 52px;
            padding: 0 50px 0 20px;
            justify-content: space-between;
            line-height: 52px;
            font-size: 16px;
            color: #000;
            border-bottom: 1px solid #9393A1;
            .link:hover{
                color: red;
            }
            .el-icon-arrow-right{
                margin: 0 3px;
            }
            .txt{
                color: #999;
                font-size: 14px;
            }
        }
        .content{
            padding: 30px;
            .title{
                font-size: 18px;
                font-weight: bold;
                line-height: 50px;
                text-align: center;
            }
            .time{
                font-size: 12px;
                color: #999;
                text-align: center;
                margin-bottom: 15px;
            }
        }
    }
</style>