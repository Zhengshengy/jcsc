<template>
    <div class="setbox">
        <div class="title w-100 pl-20 font-16 text-3">发布出租转让</div>
        <div class="content pl-40 pt-30">
            <el-row class="w-100" >
                <el-col :span="24">
                    <div class="float-left mr-15 mt-10 text-3">上传图片</div>
                    <div class="float-left">
                        <el-upload
                                action="https://jsonplaceholder.typicode.com/posts/"
                                list-type="picture-card"
                                :on-preview="handlePictureCardPreview"
                                :on-remove="handleRemove">
                            <i class="el-icon-plus"></i>
                        </el-upload>
                        <el-dialog :visible.sync="dialogVisible">
                            <img width="100%" :src="dialogImageUrl" alt="">
                        </el-dialog>
                        <p class="text-9 font-12 mt-20">提示：最多上传5张展示图片，图片大小不能超过2M</p>
                    </div>
                </el-col>
            </el-row>
            <el-row class="mt-30">
                <el-col :span="24">
                    <div class="float-left mr-15 mt-10 text-3" style="margin-left: 32px">标题</div>
                    <div class="shu float-left">
                        <el-input
                                placeholder="请输入内容"
                                v-model="input"
                                clearable>
                        </el-input>
                    </div>
                </el-col>
            </el-row>
            <el-row class="mt-30">
                <el-col :span="24">
                    <div class="float-left mr-15 mt-10 text-3">联系电话</div>
                    <div class="shu float-left">
                        <el-input
                                placeholder="请输入内容"
                                v-model="input"
                                clearable>
                        </el-input>
                    </div>
                </el-col>
            </el-row>
            <el-row class="mt-30">
                <el-col :span="24">
                    <div class="float-left mr-15 mt-10 text-3">详细描述</div>
                    <div class="wid float-left">
                        <el-input
                                type="textarea"
                                :rows="7"
                                placeholder="请输入内容"
                                v-model="textarea">
                        </el-input>
                    </div>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="24">
                    <el-button  type="danger" class="bg-red btn">确认发布</el-button>
                </el-col>
            </el-row>
        </div>
    </div>
</template>
<script>
    export default {
        name: 'AddLease',
        data() {
            return {
                dialogImageUrl: '',
                dialogVisible: false
            };
        },
        methods: {
            handleRemove(file, fileList) {
                console.log(file, fileList);
            },
            handlePictureCardPreview(file) {
                this.dialogImageUrl = file.url;
                this.dialogVisible = true;
            }
        }
    }
</script>
<style scoped lang="scss">
    .setbox{
        width: 1000px;
        height: 970px;
        margin: 30px 0 0 30px;
        background: #ffffff;
        .title{
            height: 50px;
            border: 1px solid #F5F5F5;
            line-height: 50px;
        }
        .shu{
            width: 715px;
        }
        .wid{
            width: 850px;
        }
        .btn{
            display: block;
            width: 450px;
            height: 50px;
            margin: 80px auto;
            background: red;
            font-size: 18px;
            font-weight:bold;
        }
    }
</style>
<style scoped>
    /deep/ .el-upload-list--picture-card .el-upload-list__item{width: 122px;height: 122px}
    /deep/ .el-upload--picture-card {
        font-size: 28px;
        color: #8c939d;
        width: 122px;
        height: 122px;
        line-height: 122px;
        text-align: center;
        border:1px solid rgba(204, 204, 204, 1);
    }
</style>