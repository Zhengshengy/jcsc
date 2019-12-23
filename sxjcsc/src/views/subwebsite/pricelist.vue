<template>
    <div class="cont">
        <div class="banner">
            <el-carousel :interval="3000" arrow="never">
                <el-carousel-item>
                    <img src="@/assets/image/subwebsite/banner.jpg" alt="">
                </el-carousel-item>
            </el-carousel>
        </div>
        <div class="prodtit">
            <span>价格表</span>
        </div>
        <div class="sort_wrap">
            <span>排序：</span>
            <span class="txt time" @click="sortType(1)">
                发布时间
                <img v-if="sortOrder != 1" src="@/assets/image/subwebsite/sort.png"/>
                <img v-if="sortOrder == 1" src="@/assets/image/subwebsite/sortA.png"/>
            </span>
            <span class="txt all" @click="sortType(2)">
                推荐
                <img v-if="sortOrder != 2" src="@/assets/image/subwebsite/sort.png"/>
                <img v-if="sortOrder == 2" src="@/assets/image/subwebsite/sortA.png"/>
            </span>
            <el-date-picker
                    v-model="value1"
                    type="date"
                    placeholder="选择开始时间">
            </el-date-picker>
            -
            <el-date-picker
                    v-model="value2"
                    type="date"
                    placeholder="选择结束时间">
            </el-date-picker>
            <div class="search">
                <img src="@/assets/image/search/icon.png" alt="">
                <input type="text" placeholder="请输入关键字" v-model="keyword" class="search">
            </div>
            <button @click="serch">确定</button>
        </div>
        <ul class="pricelist" v-if="priceList.length != 0">
            <li v-for="(item,index) in priceList" :key="index">
                <el-image
                        class="img"
                        :src="item.img"
                        :preview-src-list="srcList">
                </el-image>
                <p class="singlerow">{{item.pname}}</p>
            </li>
        </ul>
        <div class="pricelist" v-if="priceList.length == 0">
            <h3>该商铺暂无价格表</h3>
        </div>
        <div class="page">
            <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange"
                           :current-page.sync="currentPage" :page-size="8" layout="prev, pager, next, jumper" :total="total"
                           prev-text="上一页" next-text="下一页">
            </el-pagination>
        </div>
    </div>
</template>

<script>
    export default {
        name: "pricelist",
        data() {
            return {
                pickerOptions: {
                    disabledDate(time) {
                        return time.getTime() > Date.now();
                    },
                    shortcuts: [{
                        text: '今天',
                        onClick(picker) {
                            picker.$emit('pick', new Date());
                        }
                    }, {
                        text: '昨天',
                        onClick(picker) {
                            const date = new Date();
                            date.setTime(date.getTime() - 3600 * 1000 * 24);
                            picker.$emit('pick', date);
                        }
                    }, {
                        text: '一周前',
                        onClick(picker) {
                            const date = new Date();
                            date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
                            picker.$emit('pick', date);
                        }
                    }]
                },
                value1: '',
                value2: '',
                currentPage:1,
                total:0,
                priceList:[],
                keyword:'',
                sortOrder:1,
                up:0,
                srcList:[]
            };
        },
        created(){
            this.getList();
        },
        methods:{
            getList(){
                this.srcList = [];
                let sendData = {
                    'shopid':this.$route.query.shop_id,
                    'type':3,
                    'pag':this.currentPage,
                    'keyword':this.keyword,
                    'starttime':this.JCutils.Format1(this.JCutils.Format2(this.value1)),
                    'endtime':this.JCutils.Format1(this.JCutils.Format2(this.value2)),
                    'otype':this.sortOrder,
                    'up':this.up
                }
                if(this.value1 == ""){
                    delete  sendData.starttime;
                }
                if(this.value2 == ''){
                    delete  sendData.endtime;
                }
                this.JCService.SubWebsiteServer.product(sendData).then(e=>{
                    this.total = e.info.total;
                    this.priceList = e.info.data;
                    for(let i in this.priceList){
                        this.priceList[i].img = this.JCconfig.filePath +'public/'+ this.priceList[i].img;
                        this.srcList.push(this.priceList[i].img);
                    }
                })
            },
            handleSizeChange() {
            },
            handleCurrentChange() {
                this.getList();
            },
            sortType(type){
                if(this.sortOrder == type){
                    if(this.up == 0){
                        this.up = 1;
                    }else {
                        this.up = 0;
                    }
                }else{
                    this.sortOrder = type;
                    this.up = 0;
                }
                this.getList();
            },
            serch(){
                let start = this.JCutils.Format2(this.value1);
                let end = this.JCutils.Format2(this.value2);
                let now = this.JCutils.Format2(new Date());
                if(start>now){
                    this.$message({
                        message: '开始时间不能大于当前日期，请重新选择',
                        type: 'warning'
                    });
                    this.value1 = ''
                    return ;
                }else if(end < start){
                    this.$message({
                        message: '结束时间不能小于开始时间，请重新选择',
                        type: 'warning'
                    });
                    this.value2 = ''
                    return ;
                }else if(this.value2 != '' && this.value1 == ''){
                    this.$message({
                        message: '请选择开始时间',
                        type: 'warning'
                    });
                    return ;
                }
                this.getList();
            }
        }
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
        .sort_wrap{
            padding: 7px 15px;
            background: #fff;
            margin-top: 20px;
            margin-bottom: 10px;
            .txt{
                color: #000;
                cursor: pointer;
                img{
                    margin-left: 8px;
                    margin-right: 30px;
                    vertical-align: middle;
                }
            }
            .txt.active{
                color: #FF0000;
            }
            .search{
                display: inline-block;
                position: relative;
                img{
                    position: absolute;
                    left: 16px;
                    top: 5px;
                    z-index: 100;
                }
                input{
                    width: 150px;
                    height: 24px;
                    border: 1px solid #CCC;
                    padding: 0 5px 0 25px;
                    border-radius: 4px;
                    margin-left: 10px;
                    font-size: 12px;
                }
            }
            button{
                width: 60px;
                height: 26px;
                background: #FF0026;
                border: none;
                color: #fff;
                margin-left: 10px;
            }
        }
    }
    .prodtit{
        display: flex;
        justify-content: space-between;
        margin-bottom: 15px;
        span{
            display: block;
            text-indent: 15px;
            position: relative;
            font-size: 16px;
            color: #000;
        }
        span:before{
            content: '';
            display: block;
            width: 4px;
            height: 16px;
            background: #FF2100;
            position: absolute;
            left: 0;
            top: 3px;
        }
        .more{
            display: block;
            color: #333;
            line-height: 20px;
            img{
                width: 12px;
                height: 10px;
                margin-left: 6px;
                margin-right: 20px;
                vertical-align: baseline;
            }
        }
    }
    .pricelist{
        margin-top: 5px;
        margin-bottom: 60px;
        padding: 20px 20px 0;
        background: #fff;
        display: flex;
        flex-wrap: wrap;
        li{
            width: 210px;
            margin-right:26px;
            .img{
                width: 210px;
                height: 285px;
            }
            p{
                padding: 13px 10px;
                text-align: center;
            }
        }
        li:nth-of-type(4n){
            margin-right: 0;
        }
    }
    .page{
        width: 630px;
        margin: 30px auto;
        height: 30px;
        text-align: center;
    }
</style>
<style>
    .el-date-editor.el-input, .el-date-editor.el-input__inner{
        width: 150px;
    }
    .el-input--prefix .el-input__inner{
        height: 24px;
        border: 1px solid #CCC;
        line-height: 24px;
        padding-right: 5px;
    }
    .el-input__icon{
        line-height: 24px;
    }
</style>