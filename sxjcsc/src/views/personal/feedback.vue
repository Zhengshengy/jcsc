<template>
    <div class="bg">
        <div class="wrap">
            <div class="publicTitle">
                <span>帮助反馈</span>
            </div>
            <div class="mTit">热门问题</div>
            <div class="questions">
                <div class="item" v-for="(item,index) in questionList" :key="index" @click="toDetail(item.id)">{{item.title}}</div>
            </div>
        </div>
        <div class="wrap">
            <div class="publicTitle">
                <span>反馈建议</span>
                <div class="release" @click="addFeedback"><img src="@/assets/image/personal/feedback.png" alt="">发布反馈意见</div>
            </div>
            <div class="mTit">我的建议</div>
            <div class="advise">
                <div class="item" v-for="(item,index) in list" :key="index">
                    <div class="cont">
                        <div class="txt">{{index+1}}、{{item.content}}<span class="time">{{item.create_time}}</span></div>
                        <div class="imgs">
                            <el-image v-for="(img,index) in item.img" class="img"
                                      :key="index"
                                      :src="img"
                                      :preview-src-list="srcList" @click="previewList(item.img)">
                            </el-image>
                        </div>
                        <div class="reply_wrap" v-show="item.reply!=''">
                            <div class="reply">{{item.reply}}</div>
                            <div class="time">{{ item.update_time}}</div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="page">
                <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange"
                               :current-page.sync="currentPage" :page-size="6" layout="prev, pager, next, jumper" :total="total"
                               prev-text="上一页" next-text="下一页">
                </el-pagination>
            </div>
        </div>
        <div class="shadow" v-show="showForm">
            <div class="addBox">
                <div class="title">填写反馈意见</div>
                <div class="form">
                    <div class="upload">
                        <el-upload  list-type="picture-card"  multiple action=""
                                    :http-request="upload"
                                    :on-change="organizeFile"
                                    :on-remove="handleRemove"
                                    :limit="4"
                                    :on-exceed="exceedImg"
                                    accept="image/*"
                                    ref="upload"
                        >
                            <i slot="default" class="el-icon-plus"></i>

                        </el-upload>
                        <el-dialog :visible.sync="dialogVisible">
                            <img width="100%" :src="dialogImageUrl" alt="">
                        </el-dialog>
                    </div>
                    <div class="tooltip">温馨提示：最多上传4张图</div>
                    <div class="tit">反馈意见：</div>
                    <div class="flex"><textarea name="" id="" cols="30" rows="10" @blur="txtReg" v-model="opinion"></textarea><span class="must">*</span></div>
                    <div class="submit" @click="submit">保存反馈意见</div>
                </div>
                <div class="close" @click="hideForm"><img src="@/assets/image/personal/addressClose.png" alt=""></div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Feedback",
        data(){
            return {
                currentPage: 1,
                srcList:[],
                questionList:[],
                showForm:false,
                dialogImageUrl: '',
                dialogVisible: false,
                disabled: false,
                opinion:'',
                form: new FormData(),
                list:[],
                total:0
            }
        },
        created(){
            this.JCService.PersonalServer.Feedback_help().then(e=>{
                if(e.info.length > 12){
                    let delLen = e.info.length - 12;
                    e.info.splice(12,delLen);
                    this.questionList = e.info;
                }
            });
            this.getList();
        },
        methods:{
            getList(){
                this.JCService.PersonalServer.Feedback({'user_id':'659156','pag':this.currentPage}).then(e=>{
                    this.list = e.info.data;
                    this.total = e.info.total;
                    for(let i in this.list){
                        this.list[i].img = this.list[i].img.split(',');
                        this.list[i].create_time = this.JCutils.Format(this.list[i].create_time*1000);
                        this.list[i].update_time = this.JCutils.Format(this.list[i].update_time*1000);
                        for(let j in this.list[i].img){
                            this.list[i].img[j] = this.JCconfig.filePath+this.list[i].img[j];
                        }
                    }
                })
            },
            handleSizeChange() {
            },
            handleCurrentChange() {
                this.getList();
            },
            addFeedback(){
                this.showForm = true;
            },
            hideForm(){
                this.showForm = false;
            },
            //热门问题详情跳转
            toDetail(id){
                this.$router.push('/personal/questionDetail?id='+id);
            },
            handleRemove(file,fileList) {
                this.initialList = fileList;
            },
            handlePictureCardPreview(file) {
                this.dialogImageUrl = file.url;
                this.dialogVisible = true;
            },
            upload(params) {
                this.form.append('img[]',params.file)
            },
            organizeFile(file,fileList){
                this.initialList = fileList;
            },
            exceedImg(){
                this.$message({
                    message: '最多只能上传4张图片，请您重新选择',
                    type: 'warning'
                });
            },
            txtReg(){
                var specialKey = new RegExp("[`~@#$^&*=|{}\\[\\]<>《》/@#￥……&*|{}【】]");
                if(this.opinion == "" || specialKey.test(this.opinion)){
                    this.$message({
                        message: '反馈意见为空或包含特殊字符,请重新输入',
                        type: 'warning'
                    });
                    this.opinion = "";
                }
            },
            submit(){
                if(this.initialList.length==0 || this.opinion == ''){
                    this.$message({
                        message: '请完善反馈信息后再提交',
                        type: 'warning'
                    });
                }
                this.form.append('content',this.opinion);
                this.form.append('userid','659156');
                this.JCService.PersonalServer.Feedback_add(this.form).then(e=>{
                    console.log(e);
                    if(e.info){
                        this.showForm = false;
                        this.$message({
                            message: '添加反馈成功',
                            type: 'success'
                        });
                        this.getList();
                        this.opinion = '';
                        this.$refs['upload'].clearFiles();
                    }
                });
            },
            //点击图片预览
            previewList(imgs){
                this.srcList = imgs;
            }
        }
    }
</script>

<style lang='scss' scoped>
    .wrap{
        width: 999px;
        background: #fff;
        margin-bottom: 30px;
        .publicTitle{
            display: flex;
            height: 52px;
            padding: 0 50px 0 20px;
            justify-content: space-between;
            align-items: center;
            font-size: 16px;
            color: #000;
            border-bottom: 1px solid #9393A1;
            .release{
                width:114px;
                height:30px;
                background:#FFD2D2;
                border:1px solid #FF7C7C;
                border-radius:2px;
                text-align: center;
                color: #333;
                line-height: 30px;
                font-size: 12px;
                cursor: pointer;
                img{
                    vertical-align: sub;
                    margin-right: 3px;
                }
            }
        }
        .mTit{
            font-size:16px;
            color: #fff;
            font-weight: bold;
            background: url("../../assets/image/personal/feedbackBg.png") no-repeat center;
            height: 34px;
            line-height: 34px;
            text-align: center;
        }
        .questions{
            padding: 0 50px 50px;
            display: flex;
            justify-content: space-between;
            flex-wrap: wrap;
            .item{
                width: 50%;
                font-size: 14px;
                line-height: 1;
                color: #333;
                margin-top: 25px;
                text-indent: 5px;
                position: relative;
                cursor: pointer;
            }
            .item:before{
                display: block;
                content: '';
                width: 2px;
                height: 2px;
                background: #666;
                position: absolute;
                left: 0;
                top: 6px;
            }
            .item:hover{
                color: #FF0000;
            }
        }
        .advise{
            margin-top: 25px;
            padding: 0 50px;
            .item{
                margin-bottom: 30px;
                .txt{
                    font-size: 14px;
                    color: #333;
                    line-height: 28px;
                    position: relative;
                    .time{
                        color: #666;
                        position: absolute;
                        right: 0;
                        bottom: 0;
                        line-height: 28px;
                    }
                }
                .imgs{
                    margin: 15px 0 20px 23px;
                    .img{
                        width:70px;
                        height:70px;
                        border-radius:5px;
                        margin-right: 10px;
                        cursor: pointer;
                        display: inline-block;
                    }
                }
                .reply_wrap{
                    width: 881px;
                    margin-left: 16px;
                    background: #f5f5f5;
                    border-radius: 5px;
                    padding: 19px 0;
                    font-size: 14px;
                    color: #666;
                    .reply{
                        margin-left: 17px;
                        margin-bottom: 10px;
                    }
                    .time{
                        margin-left: 17px;
                    }
                }
            }
        }
        .page{
            width: 630px;
            margin: 30px auto;
            height: 30px;
            padding-bottom: 30px;
        }
    }
    .shadow{
        position: fixed;
        top: 0;
        left: 0;
        z-index: 5000;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,.3);
    }
    .addBox{
        position: absolute;
        top: 50%;
        left: 50%;
        width: 760px;
        max-height: 600px;
        background:#fff;
        transform: translate(-50%,-50%);
        border-radius: 5px;
        box-shadow:0 0 5px rgba(0,0,0,.3);
        .title{
            height: 28px;
            background: #F3F3F3;
            border-bottom: 1px solid #C4C4C4;
            padding-left: 12px;
            font-size: 14px;
            color: #333;
            line-height: 28px;
            border-radius: 5px 5px 0 0;
            margin-bottom: 25px;
        }
        .form{
            padding:0 22px 30px 28px;
            .upload{
                margin-bottom: 12px;
                max-height: 200px;
                overflow-y: scroll;
            }
            .upload::-webkit-scrollbar {display:none}
            .tooltip{
                font-size: 12px;
                color: #FF0000;
                margin-bottom: 20px;
            }
            .tit{
                font-size: 12px;
                color: #666;
                margin-bottom: 8px;
            }
            .flex{
                display: flex;
                align-items: center;
                margin-bottom: 15px;
                textarea{
                    width: 688px;
                    height: 87px;
                    resize: none;
                    border: 1px solid #ccc;
                }
                .must{
                    display: block;
                    color: #FF0000;
                    font-weight: bold;
                    font-size: 24px;
                    margin-left: 14px;
                    margin-right: 15px;
                }
            }
            .submit{
                width:114px;
                height:30px;
                background:#F6F6F6;
                border:1px solid rgba(0,0,0,.15);
                border-radius:4px;
                text-align: center;
                font-size: 14px;
                line-height: 30px;
                cursor: pointer;
                margin-bottom: 80px;
            }
        }
        .close{
            position: absolute;
            top:11px;
            right: 11px;
            cursor: pointer;
        }
    }
</style>
<style>
    .el-upload-list--picture-card .el-upload-list__item-thumbnail{
        height: 148px;
    }
    .el-message--warning{z-index: 6500!important;}
</style>