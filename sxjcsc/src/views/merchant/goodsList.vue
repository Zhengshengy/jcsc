<template>
    <div class="setbox">
        <div class="title px-20 font-16 text-3">
            商品列表
            <div class="float-right">
                <div class="item text-3 font-12 float-left"><i class="el-icon-heavy-rain"></i>批量下架</div>
                <div class="item text-3 font-12 float-left ml-10"><i class="el-icon-heavy-rain"></i>发布新商品</div>
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
                        label="商品主图"
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
                        prop="price"
                        label="价格">
                </el-table-column>
                <el-table-column
                        prop="date"
                        label="发布时间">
                </el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button
                                class="edit"
                                size="mini"
                                @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                        <el-button
                                class="shelves"
                                size="mini"
                                @click="handleDelete(scope.$index, scope.row)">下架</el-button>
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
        <Del :showDel="showDel" @closeDel="closeDel" :delTxt="'您确定要下架该商品？'" @delete="delGoods"></Del>
    </div>
</template>
<script>
    import Del from '@/components/personal/delDialog'
    export default {
        name: 'GoodsList',
        components:{
            'Del':Del
        },
        data() {
            return {
                tableData: [{
                    date: '2019-11-06 15:48:45',
                    name: '王小虎',
                    price: '1000'
                }, {
                    date: '2019-11-06 15:48:45',
                    name: '王小虎',
                    price: '1000'
                }, {
                    date: '2019-11-06 15:48:45',
                    name: '王小虎',
                    price: '1000'
                }, {
                    date: '2019-11-06 15:48:45',
                    name: '王小虎',
                    price: '1000'
                },{
                    date: '2019-11-06 15:48:45',
                    name: '王小虎',
                    price: '1000'
                },{
                    date: '2019-11-06 15:48:45',
                    name: '王小虎',
                    price: '1000'
                }, {
                    date: '2019-11-06 15:48:45',
                    name: '王小虎',
                    price: '1000'
                }, {
                    date: '2019-11-06 15:48:45',
                    name: '王小虎',
                    price: '1000'
                }, {
                    date: '2016-05-07',
                    name: '王小虎',
                    price: '1000'
                }],
                multipleSelection: [],
                currentPage: 1,
                pageSize:0,
                total:0,
                value:1,
                showDel:false,
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
            },
            handleDelete(index, row) {
                console.log(index, row);
                this.showDel = true;
            },
            handleCurrentChange(val) {
                console.log(val);
            },
            //关闭下架弹框
            closeDel(){
                this.showDel = false;
            },
            //下架商品
            delGoods(){
                alert('请求下架商品中');
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
        }
        .edit{background: red;color: #ffffff}
        .shelves{background: #AEAEAE;color: #ffffff}
        .page{
            width: 630px;
            margin: 30px auto;
            height: 30px;
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
</style>