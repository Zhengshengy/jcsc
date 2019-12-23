<template>
    <div class="box">
        <div class="tit">
            价格表
            <div class="add pointer" @click="addImg"><span class="el-icon-plus"></span>添加价格表</div>
            <div class="batch pointer" @click="batch"><span class="el-icon-delete"></span>批量删除</div>
        </div>
        <div class="priceList">
            <div class="item">
                <div class="imgBox">
                    <img src="@/assets/image/index/prod1.jpg" alt="">
                    <div class="btns">
                        <div class="rotate" @click="rotate(1)">旋转</div>
                        <div class="delImg" @click="delImg(1)">删除</div>
                    </div>
                </div>
                <div class="sel pointer" @click="select(1)"><span class="el-icon-check" v-show="true"></span></div>
            </div>
            <div class="item">
                <div class="imgBox">
                    <img src="@/assets/image/index/prod1.jpg" alt="">
                    <div class="btns">
                        <div class="rotate" @click="rotate(2)">旋转</div>
                        <div class="delImg" @click="delImg(2)">删除</div>
                    </div>
                </div>
                <div class="sel" @click="select(2)"><span class="el-icon-check" v-show="false"></span></div>
            </div>
            <div class="item">
                <div class="imgBox">
                    <img src="@/assets/image/index/prod1.jpg" alt="">
                    <div class="btns">
                        <div class="rotate" @click="rotate(3)">旋转</div>
                        <div class="delImg" @click="delImg(3)">删除</div>
                    </div>
                </div>
                <div class="sel" @click="select(3)"><span class="el-icon-check" v-show="false"></span></div>
            </div>
            <div class="item">
                <div class="imgBox">
                    <img src="@/assets/image/index/prod1.jpg" alt="">
                    <div class="btns">
                        <div class="rotate">旋转</div>
                        <div class="delImg">删除</div>
                    </div>
                </div>
                <div class="sel"><span class="el-icon-check" v-show="false"></span></div>
            </div>
            <div class="item">
                <div class="imgBox">
                    <img src="@/assets/image/index/prod1.jpg" alt="">
                    <div class="btns">
                        <div class="rotate">旋转</div>
                        <div class="delImg">删除</div>
                    </div>
                </div>
                <div class="sel"><span class="el-icon-check" v-show="false"></span></div>
            </div>
            <div class="item">
                <div class="imgBox">
                    <img src="@/assets/image/index/prod1.jpg" alt="">
                    <div class="btns">
                        <div class="rotate">旋转</div>
                        <div class="delImg">删除</div>
                    </div>
                </div>
                <div class="sel"><span class="el-icon-check" v-show="false"></span></div>
            </div>
            <div class="item">
                <div class="imgBox">
                    <img src="@/assets/image/index/prod1.jpg" alt="">
                    <div class="btns">
                        <div class="rotate">旋转</div>
                        <div class="delImg">删除</div>
                    </div>
                </div>
                <div class="sel"><span class="el-icon-check" v-show="false"></span></div>
            </div>
            <div class="item">
                <div class="imgBox">
                    <img src="@/assets/image/index/prod1.jpg" alt="">
                    <div class="btns">
                        <div class="rotate">旋转</div>
                        <div class="delImg">删除</div>
                    </div>
                </div>
                <div class="sel"><span class="el-icon-check" v-show="false"></span></div>
            </div>
        </div>
        <div class="shadow" v-show="isAdd">
            <div class="addBox">
                <div class="title">添加价格表</div>
                <div class="upload scroll">
                    <p>选择图片：</p>
                    <el-upload action="#" list-type="picture-card" :auto-upload="false" multiple>
                        <i slot="default" class="el-icon-plus"></i>
                        <div slot="file" slot-scope="{file}">
                            <img class="el-upload-list__item-thumbnail" :src="file.url" alt=""  >
                            <span class="el-upload-list__item-actions">
                            <span class="el-upload-list__item-preview" @click="handlePictureCardPreview(file)" >
                                <i class="el-icon-zoom-in"></i>
                            </span>
                            <span v-if="!disabled" class="el-upload-list__item-delete" @click="handleDownload(file)"  >
                              <i class="el-icon-download"></i>
                            </span>
                            <span v-if="!disabled" class="el-upload-list__item-delete" @click="handleRemove(file)" >
                              <i class="el-icon-delete"></i>
                            </span>
                        </span>
                        </div>
                    </el-upload>
                    <el-dialog :visible.sync="dialogVisible">
                        <img width="100%" :src="dialogImageUrl" alt="">
                    </el-dialog>
                </div>
                <div class="close" @click="closeAdd"><img src="@/assets/image/personal/addressClose.png" alt=""></div>
            </div>
        </div>
        <Del :showDel="showDel" @closeDel="closeDel" :delTxt="'您确定要删除该价格表吗？'" @delete="confirmDel"></Del>
    </div>
</template>
<script>
    import Del from '@/components/personal/delDialog'
    export default {
        name: 'PriceList',
        data() {
            return {
                isAdd:false,
                dialogImageUrl: '',
                dialogVisible: false,
                disabled: false,
                showDel:false,
            };
        },
        components:{
            'Del':Del
        },
        methods: {
            handleRemove(file) {
                console.log(file);
            },
            handlePictureCardPreview(file) {
                this.dialogImageUrl = file.url;
                this.dialogVisible = true;
            },
            handleDownload(file) {
                console.log(file);
            },
            select(index){
                console.log(index);
            },
            delImg(index){
                this.showDel = true;
                console.log(index);
            },
            batch(){
                alert('批量删除')
            },
            addImg(){
                this.isAdd = true;
            },
            closeAdd(){
                this.isAdd = false;
            },
            closeDel(){
                this.showDel = false;
            },
            confirmDel(){
                alert('delete img');
            },
            rotate(index){
                console.log(index);
                alert('rotate img');
            }
        }
    }
</script>
<style lang='scss' scoped>
    .box{
        width: 999px;
        background: #fff;
        padding-bottom: 30px;
        margin-top: 30px;
        .tit{
            position: relative;
            font-size: 16px;
            color: #000;
            height: 53px;
            line-height: 53px;
            border-bottom: 1px solid #f5f5f5;
            padding-left: 18px;
            .batch,.add{
                position: absolute;
                top: 12px;
                right: 20px;
                width: 105px;
                height: 29px;
                border: 1px solid #ddd;
                line-height: 29px;
                font-size: 12px;
                color: #333;
                text-align: center;
                span{
                    display: inline;
                    margin-right: 7px;
                }
            }
            .add{
                right: 145px;
            }
        }
        .priceList{
            padding: 40px;
            display: flex;
            flex-wrap: wrap;
            .item{
              width: 122px;
              margin-right: 19px;
              margin-bottom: 20px;
                .imgBox{
                    position: relative;
                    img{
                        display: block;
                        width: 122px;
                        height: 122px;
                        border-radius: 5px;
                        margin-bottom: 20px;
                    }
                    .btns{
                        position: absolute;
                        top: 0;
                        left: 0;
                        width: 122px;
                        height: 122px;
                        border-radius: 5px;
                        background: rgba(0,0,0,.5);
                        color: #fff;
                        font-size: 14px;
                        text-align: center;
                        line-height: 30px;
                        transition: all .3s ease-in-out;
                        display: none;
                        .rotate,.delImg{
                            width: 60px;
                            height: 30px;
                            margin: 27px auto 10px;
                            background: #006dff;
                            border-radius: 5px;
                            cursor: pointer;
                        }
                        .delImg{
                            margin: 0 auto;
                            background: #FF0000;
                        }
                    }
                }
                .imgBox:hover .btns{
                    display: block;
                }
                .sel{
                    width: 18px;
                    height: 18px;
                    border: 1px solid #ccc;
                    margin: 0 auto;
                    line-height: 18px;
                    text-align: center;
                }
            }
        }
    }
    .shadow{
        position: fixed;
        top: 0;
        left: 0;
        z-index: 100;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,.3);
    }
    .addBox{
        position: absolute;
        top: 50%;
        left: 50%;
        width: 760px;
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
        }
        .upload{
            padding: 30px 30px 60px;
            max-height: 355px;
            p{
                font-size: 18px;
                color: #666;
                margin-bottom: 8px;
            }
        }
        .upload.scroll{
            overflow-y: scroll;
        }
        .close{
            position: absolute;
            top:11px;
            right: 11px;
            cursor: pointer;
        }
    }
</style>