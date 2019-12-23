<template>
    <div class="setbox">
        <div class="title px-20 font-16 text-3">
            品牌列表
            <div class="float-right">
                <div class="item text-3 font-12 float-left  pointer"><i class="el-icon-delete mr-5"></i>批量删除</div>
                <div class="item text-3 font-12 float-left ml-10 pointer" @click="showAdd"><img src="@/assets/image/index/brand.png" alt="" class="iconB mr-5">添加品牌</div>
            </div>
        </div>
        <div class="content px-20 pt-30">
            <el-table
                    :header-cell-style="{background:'#F5F5F5',color:'#333333',fontWeight:'bold'}"
                    ref="multipleTable"
                    :data="tableData"
                    tooltip-effect="dark"
                    style="width: 100%"
                    @selection-change="handleSelectionChange">
                <el-table-column
                        type="selection"
                        width="55">
                </el-table-column>
                <el-table-column
                        label="品牌logo"
                        width="120">
                    <template >
                        <img src="@/assets/image/public/transfer.svg" alt="" width="60" height="60">
                    </template>
                </el-table-column>
                <el-table-column
                        prop="name"
                        label="商品名称"
                        width="120">
                </el-table-column>
                <el-table-column
                        prop="classify"
                        label="所属分类">
                </el-table-column>
                <el-table-column
                        prop="date"
                        label="添加时间">
                </el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button
                                class="edit"
                                size="mini"
                                @click="handleEdit(scope.$index, scope.row)">修改</el-button>
                        <el-button
                                class="shelves"
                                size="mini"
                                @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="page">
                <el-pagination background
                               @current-change="handleCurrentChange"
                               :current-page.sync="currentPage" :page-size="pageSize"
                               layout="prev, pager, next, jumper" :total="total"
                               prev-text="上一页" next-text="下一页">
                </el-pagination>
            </div>
        </div>
        <Del :showDel="showDel" @closeDel="closeDel" :delTxt="'您确定要删除该品牌信息？'" @delete="delBrand"></Del>
        <div class="shadow" v-show="isAdd">
            <div class="addBox">
                <div class="title" v-show="!isEdit">新增商铺品牌</div>
                <div class="title" v-show="isEdit">修改商铺品牌</div>
                <div class="form">
                    <div class="tit">选择分类：</div>
                    <div class="flex">
                        <el-select v-model="ruleForm.region" placeholder="-请选择-" ref="sel"  class="select">
                            <el-option label="分类1" value="1"></el-option>
                            <el-option label="分类2" value="2"></el-option>
                        </el-select>
                    </div>
                    <div class="tit">选择品牌：</div>
                    <div class="flex">
                        <el-select v-model="ruleForm.region" placeholder="-请选择-" ref="sel" class="select">
                            <el-option label="brand1" value="1"></el-option>
                            <el-option label="brand2" value="2"></el-option>
                        </el-select>
                    </div>
                    <img src="@/assets/image/index/prod1.jpg" class="brandImg" alt="">
                    <div class="submit" @click="submit" v-show="!isEdit">保存品牌数据</div>
                    <div class="submit" @click="submitEdit" v-show="isEdit">保存品牌数据</div>
                </div>
                <div class="close" @click="close"><img src="@/assets/image/personal/addressClose.png" alt=""></div>
            </div>
        </div>
    </div>
</template>
<script>
    import Del from '@/components/personal/delDialog'
    export default {
        name: 'BrandManag',
        components:{
            'Del':Del
        },
        data() {
            return {
                tableData: [{
                    date: '2019-11-06 15:48:45',
                    name: '王小虎',
                    classify: '阀门管件'
                }, {
                    date: '2019-11-06 15:48:45',
                    name: '王小虎',
                    classify: '阀门管件'
                }, {
                    date: '2019-11-06 15:48:45',
                    name: '王小虎',
                    classify: '阀门管件'
                }, {
                    date: '2019-11-06 15:48:45',
                    name: '王小虎',
                    classify: '阀门管件'
                },{
                    date: '2019-11-06 15:48:45',
                    name: '王小虎',
                    classify: '1000'
                },{
                    date: '2019-11-06 15:48:45',
                    name: '王小虎',
                    classify: '阀门管件'
                }, {
                    date: '2019-11-06 15:48:45',
                    name: '王小虎',
                    classify: '阀门管件'
                }, {
                    date: '2019-11-06 15:48:45',
                    name: '王小虎',
                    classify: '阀门管件'
                }, {
                    date: '2016-05-07',
                    name: '王小虎',
                    classify: '阀门管件'
                }],
                multipleSelection: [],
                currentPage: 1,
                pageSize:0,
                total:0,
                value:1,
                isAdd:false,
                isEdit:false,
                showDel:false,
                ruleForm: {
                    region: '',
                },
                rules: {
                    region: [
                        { required: true, message: '-请选择-', trigger: 'change' }
                    ]
                },
            }
        },
        methods: {
            toggleSelection(rows) {
                if (rows) {
                    rows.forEach(row => {
                        this.$refs.multipleTable.toggleRowSelection(row);
                    });
                } else {
                    this.$refs.multipleTable.clearSelection();
                }
            },
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },
            handleEdit(index, row) {
                console.log(index, row);
                this.isEdit = true;
                this.isAdd = true;
            },
            //点击删除
            handleDelete(index, row) {
                console.log(index, row);
                this.showDel = true;
            },
            handleCurrentChange(val) {
                console.log(val);
            },
            //添加品牌弹框
            showAdd(){
                this.isAdd = true;
                this.isEdit = false;
            },
            //关闭添加弹框
            close(){
                this.isAdd = false;
            },
            //添加品牌
            submit(){

            },
            //修改品牌
            submitEdit(){

            },
            //关闭删除框
            closeDel(){
                this.showDel = false;
            },
            //删除品牌
            delBrand(){
                alert('delete brand');
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
            .item{width:105px;height:29px;border:1px solid rgba(221, 221, 221, 1);margin-top:12px;border-radius:5px;line-height: 30px;text-align: center}
            .el-icon-delete{color: #8a8a8a;font-size: 15px;}
            .iconB{width: 19px;height: 15px;vertical-align: middle;}
        }
        .edit{background: red;color: #ffffff}
        .shelves{background: #AEAEAE;color: #ffffff}
        .page{
            width: 630px;
            margin: 30px auto;
            height: 30px;
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
            margin-bottom: 30px;
        }
        .form{
            position: relative;
            padding:0 30px;
            .tit{
                font-size: 12px;
                color: #666;
                margin-bottom: 8px;
            }
            .flex{
                display: flex;
                align-items: center;
                margin-bottom: 15px;
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
                color: #333;
                cursor: pointer;
                margin-bottom: 80px;
            }
            .brandImg{
                display: block;
                width: 94px;
                height: 99px;
                border: 1px solid #ccc;
                position: absolute;
                top: 23px;
                right: 243px;
                border-radius: 5px;
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
<style scoped>
    /deep/.el-table .cell{text-align: center}
    /deep/.el-checkbox__input.is-checked .el-checkbox__inner, .el-checkbox__input.is-indeterminate .el-checkbox__inner{background: red;border-color: red}
    /deep/.el-checkbox__input.is-focus .el-checkbox__inner{border-color: red}
    /deep/.el-checkbox__inner:hover{border-color: red}

    /deep/.el-checkbox__input.is-disabled .el-checkbox__inner:after{
        border-color:white
    }

    /deep/ .el-checkbox__input .el-checkbox__inner, .el-checkbox__input.is-indeterminate .el-checkbox__inner {
        /*background-color: rgba(181, 190, 222, 1);*/
        background-color: white;
        border-color: rgba(181, 190, 222, 1);
    }

    /deep/ .el-checkbox__input.is-checked .el-checkbox__inner, .el-checkbox__input.is-indeterminate .el-checkbox__inner {
        background: red;border-color: red
    }

    /deep/ .el-checkbox__input .el-checkbox__inner::after {
        transform: rotate(45deg) scaleY(1);
    }
    /deep/ .el-select{width: 314px;}
    /deep/ .el-input__inner{height: 32px;line-height: 32px;border-color: #ccc;}
    /deep/ .el-input__icon{line-height: 32px;}
</style>