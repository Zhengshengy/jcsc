<template>
    <div class="box">
        <div class="wrap">
            <div class="publicPos">
                <div class="pos">
                    <router-link to="/" class="index">首页</router-link>
                    <img src="@/assets/image/subwebsite/right.png" alt="" srcset="">
                    <span>{{catename}}</span>
                    <img src="@/assets/image/subwebsite/right.png" alt="" srcset="">
                    <span>{{name}}</span>
                </div>
            </div>
            <div class="detail_top">
                <div class="magnifier" ref="box">
                    <div class="gallery-top" @mouseover="mouseOver" @mouseout="mouseOut" @mousemove="mouseMove($event)" ref="min">
                        <img :src="srcList[imgActive]"/>
                        <div class="fd" ref="fd"></div>
                    </div>
                    <div class="gallery-thumbs">
                        <div class="slide pointer" :class="{'active':index == imgActive}" v-for="(item,index) of srcList" :key="index" @click="slide(index)">
                            <img :src="item">
                        </div>
                        <div class="el-icon-arrow-left pointer prev" @click="prev(srcList.length)"></div>
                        <div class="el-icon-arrow-right pointer next" @click="next(srcList.length)"></div>
                    </div>
                    <div class="max" ref="max">
                        <img :src="srcList[imgActive]" alt="" ref="bigImg">
                    </div>
                </div>
                <div class="right">
                    <div class="name">
                    <!--<span class="type">-->
                        <!--<img src="/minor/public/common/images/factory.png" alt="" srcset="">-->
                        <!--厂家销售-->
                    <!--</span>-->
                        {{name}}
                    </div>
                    <div class="tooltxt">
                        <p>若您的需求未得到解决，请联系陕西建材商城客服：029-289-2889</p>
                        <p>若您没有找到合适的商品，请联系陕西建材商城客服：029-289-2889  微信：sxjcsc  sxjcsc1</p>
                    </div>
                    <div class="freight">
                        <p class="variety">品种：<span>{{catename}}</span></p>
                        <p id="freight">运费：与卖家协商</p>
                    </div>
                    <div class="infoD">
                        <p>规格：</p>
                        <p class="spec">
                            <el-dropdown @command="handleCommand">
                                <span class="el-dropdown-link">
                                    {{spec}}<i class="el-icon-arrow-down el-icon--right"></i>
                                </span>
                                <el-dropdown-menu slot="dropdown">
                                    <el-dropdown-item :command="index" v-for="(item,index) in info" :key="index">{{item.spec}}</el-dropdown-item>
                                </el-dropdown-menu>
                            </el-dropdown>
                        </p>
                        <p class="price">{{price}}</p>
                        <!--<p class="stock">50000</p>-->
                        <p class="unit" v-if="unit != ''">/{{unit}}</p>
                        <p class="buyNum" v-if="type == 1">
                            <el-input-number v-model="num" @change="handleChange" :min="1" :max="10000" label="描述文字"></el-input-number>
                        </p>
                    </div>
                    <div class="btns" v-if="type == 1">
                        <!--<div class="upload">上传询价单</div>-->
                        <div class="cart cursor" @click="addCart"><img src="@/assets/image/subwebsite/cart.png"/>加入购物车</div>
                        <!--<div class="buy">立即购买</div>-->
                    </div>
                </div>
            </div>
        </div>
        <div class="wrap main">
            <aside>
                <!-- info -->
                <div class="info_wrap">
                    <div class="tit">卖家信息</div>
                    <div class="name singlerow">{{Info.name}}</div>
                    <!--<div class="type p">-->
                        <!--<span>卖家类型：</span>-->
                        <!--厂家销售-->
                    <!--</div>-->
                    <div class="major p">
                        <span>主营产品：</span>
                        {{Info.major}}
                    </div>
                    <div class="address p">
                        <span>所在地区：</span>
                        {{Info.position}}
                    </div>
                    <div class="contactshop p">
                        <span>联系卖家：</span>
                        {{Info.name}}
                    </div>
                    <!--<div class="callShop cursor">-->
                        <!--<img src="@/assets/image/subwebsite/call.png" alt="" srcset="">-->
                        <!--电话咨询-->
                    <!--</div>-->
                    <div class="collectShop intoShop cursor" @click="inShop">
                        <img src="@/assets/image/subwebsite/shop.png" alt="">
                        进入店铺
                    </div>
                </div>
                <!-- sale volume -->
                <div class="customer_wrap">
                    <div class="tit">客服在线</div>
                    <div class="txt" v-for="(item,index) in contactList" :key="index">
                        <p><span>联系卖家：</span>{{item.contacts}}</p>
                        <p><span>手 机：</span>{{item.mob[0]}}</p>
                        <p><span>座 机：</span>{{item.tel[0]}}</p>
                        <!--<p><span>联 系：</span><img src="@/assets/image/subwebsite/qq.png"/><span class="online cursor">在线联系</span></p>-->
                    </div>
                </div>
            </aside>
            <!-- cont -->
            <div class="cont" v-if="hasRecommend">
                <!-- 店铺热销商品 -->
                <div class="titBox">
                    <div class="prodtit">
                        <span>店铺商品推荐</span>
                    </div>
                </div>
                <!-- prod -->
                <ul class="prodList">
                    <li class="pointer" v-for="(item,index) in recommend" :key="index" @click="detail(item.id)">
                        <img :src="item.img" alt="">
                        <p class="price" v-if="item.minprice != null">￥{{item.minprice}}元</p>
                        <p class="price" v-if="item.minprice == null">暂无价格</p>
                        <p class="name row2">{{item.pname}}</p>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "productdetail",
        props:['Info','contactList','recommend','hasRecommend'],
        data(){
            return {
                srcList:[],
                imgActive:0,
                num:1,
                info:[],
                catename:'',
                name:'',
                spec:'',
                price:'',
                unit:'',
                cid:'',
                truePrice:'',
                type:1
            }
        },
        created(){
            if(this.$route.query.type != undefined){
                this.type = this.$route.query.type;
            }
            this.JCService.SubWebsiteServer.getProductDetail({
                'type':this.type,
                'id':this.$route.query.id,
            }).then(e=>{
                this.info = e.info;
                let info = this.info[0];
                this.catename = info.catename;
                this.name = info.pname;
                if(info.price != null){
                    this.price = info.price+'元';
                }else{
                    this.price = ''
                }
                if(this.type == 1){
                    this.unit = info.company;
                }else{
                    this.name = info.name;
                }
                this.truePrice = info.price;
                this.spec = info.spec;
                this.cid = info.cid;
                this.srcList = info.img.split(',');
                for(let i in this.srcList){
                    this.srcList[i] = this.JCconfig.filePath +'public/'+ this.srcList[i];
                }
            });
        },
        methods:{
            prev(len){
                if(this.imgActive == 0){
                    this.imgActive = len;
                }
                this.imgActive-- ;
            },
            next(len){
                if(this.imgActive == len-1){
                    this.imgActive = -1;
                }
                this.imgActive++;
            },
            slide(index){
                this.imgActive = index;
            },
            mouseOver(){
                this.$refs.max.style.display = 'block';
                this.$refs.fd.style.display = 'block';
            },
            mouseOut(){
                this.$refs.max.style.display = 'none';
                this.$refs.fd.style.display = 'none';
            },
            mouseMove(e){
                let box = this.$refs.box;
                let fd = this.$refs.fd;
                let min = this.$refs.min;
                let max = this.$refs.max;
                let bigImg = this.$refs.bigImg
                //鼠标触摸的点
                let x = e.clientX-box.offsetLeft-fd.offsetWidth/2;
                let y = e.clientY-box.offsetTop-fd.offsetHeight/2+document.documentElement.scrollTop;
                //最大移动距离
                var maxX = min.clientWidth-fd.offsetWidth;
                var maxY = min.clientHeight-fd.offsetHeight;
                //边界判断
                if (x <= 0) {
                    x = 0;
                }else if (x >= maxX) {
                    x = maxX;
                }
                if (y <= 0) {
                    y = 0;
                }else if (y >= maxY) {
                    y = maxY;
                }
                //fd的位置
                fd.style.left = x+'px';
                fd.style.top = y+'px';
                //fd/min = max/img
                //移动比例
                var moveX = x/maxX;
                var moveY = y/maxY;
                // 移动
                // max的对应显示
                //对于大图而言,放大镜在小图上移动的比例相当于img在可显示区域上移动的比例
                //放大镜右移等于图片左移
                //也就是本质上为img-max 然而而需要负值,则*-1简化后为max-img
                bigImg.style.left = moveX*(max.clientWidth - bigImg.offsetWidth) + 'px';
                bigImg.style.top = moveY*(max.clientHeight - bigImg.offsetHeight) + 'px';
            },
            handleChange(){

            },
            //规格选择
            handleCommand(command) {
                let info = this.info[command];
                this.price = info.price+'元';
                this.cid = info.cid;
                this.spec = info.spec;
            },
            //进入商铺
            inShop(){
                this.$router.push('/subwebsite?id='+this.Info.id);
            },
            //商品详情
            detail(id){
                this.$router.push('/subwebsite/productdetail?id='+id+'&type=1'+'&shop_id='+this.$route.query.shop_id);
            },
            //加入购物车
            addCart(){
                let reg = /(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/;
                if (reg.test(this.truePrice)) {
                    this.JCService.cartServer.addCate({
                        'id':this.cid,
                        'num':this.num
                    }).then(e=>{
                        let type = 'warning';
                        if(e.status == 1){
                            type = 'success';
                        }
                        this.$message({
                            message: e.info,
                            type: type
                        });
                    });
                }else{
                    this.$message({
                        message: '该商品暂不支持购买',
                        type: 'warning'
                    });
                }

            }
            // collect(){
            //     this.JCService.SubWebsiteServer.setCollect({
            //         'id':this.Info.id,
            //     }).then(e=>{
            //         let message = '收藏成功';
            //         if(e.status == 1){
            //             this.Info.guanzhu = 1;
            //         }else{
            //             message = e.info;
            //         }
            //         this.$message({
            //             message: message,
            //             type: 'success'
            //         });
            //     })
            // },
            // cancelCollect(){
            //     this.JCService.SubWebsiteServer.setCollect({
            //         'id':this.Info.id,
            //     }).then(e=>{
            //         let message = '取消收藏成功';
            //         if(e.status == 1){
            //             this.Info.guanzhu = 0;
            //         }else{
            //             message = e.info;
            //         }
            //         this.$message({
            //             message: message,
            //             type: 'success'
            //         });
            //     })
            // },
        }
    }
</script>

<style lang='scss' scoped>
    .box{
        background: #fff;
        font-size:12px;
        img{vertical-align: middle;}
        .wrap{
            width: 1200px;
            margin: 0 auto;
            .publicPos{
                display: flex;
                justify-content: space-between;
                padding: 29px 0;
                line-height: 21px;
                .index{
                    color: #333;
                }
                img{
                    vertical-align: initial;
                    margin: 0 5px;
                }
            }
            .detail_top{
                display: flex;
                justify-content: space-between;
                .magnifier{
                    width: 400px;
                    position: relative;
                    .gallery-top{
                        width: 400px;
                        height: 400px;
                        margin-bottom: 20px;
                        img{
                            width: 400px;
                            height: 400px;
                        }
                        .fd{
                            width: 200px;
                            height: 200px;
                            background-color: skyblue;
                            opacity: 0.3;
                            position: absolute;
                            top: 0;
                            left: 0;
                            display: none;
                            z-index: 100;
                        }
                    }
                    .gallery-thumbs{
                        width: 340px;
                        height: 59px;
                        padding: 0 30px;
                        display: flex;
                        position: relative;
                        .slide{
                            width: 51px;
                            height: 51px;
                            padding: 2px;
                            border: 2px solid transparent;
                            img{width: 51px;height: 51px;}
                        }
                        .slide.active{border-color: #999;}
                        .next,.prev{position: absolute;;width: 12px;height: 22px;top: 14px;font-size: 26px;color: #666;}
                        .prev{left: 0}
                        .next{right: 0;}
                    }
                    .max{
                        position: absolute;
                        width: 400px;
                        height: 400px;
                        left:100%;
                        top: 0;
                        z-index: 100;
                        margin-left: 12px;
                        overflow: hidden;
                        display: none;
                        img{position: absolute;}
                    }
                }
                .right{
                    width: 780px;
                    .name{
                        height: 30px;
                        line-height: 30px;
                        color: #000;
                        font-size: 18px;
                        font-weight: bold;
                        margin-bottom: 22px;
                        .type{
                            display: inline-block;
                            width:81px;
                            height:30px;
                            background:#006DFF;
                            border-radius:5px;
                            text-align: center;
                            font-size: 12px;
                            line-height: 30px;
                            color: #fff;
                            img{vertical-align: sub;}
                        }
                    }
                    .tooltxt{
                        padding: 15px 20px 11px;
                        background: #FFF8F8;
                        border-top: 1px solid #FF9B9B;
                        border-bottom: 1px solid #FF9B9B;
                        p{font-size: 12px;color: #000;margin-bottom: 7px;}
                        p:last-child{margin-bottom: 0;}
                    }
                    .freight{
                        border-bottom: 1px dashed #999;
                        padding: 0 20px;
                        p{font-size: 14px;color: #666;}
                        .variety{margin: 38px 0 25px;}
                        #freight{margin-bottom: 12px;}
                    }
                    .infoD{
                        display: flex;
                        padding: 18px 20px 43px;
                        border-bottom: 1px dashed #999;
                        font-size: 14px;
                        color: #666;
                        line-height: 26px;
                        .price{margin-left: 200px;}
                        .stock{margin-left: 70px;}
                        .buyNum{
                            margin-left: 20px;
                            position: relative;

                        }
                    }
                    .btns{
                        display: flex;
                        justify-content: flex-end;
                        padding-right: 16px;
                        margin-top: 20px;
                        div{
                            width:140px;
                            height:50px;
                            background:#FFFBF8;
                            border:1px solid #ff2100;
                            border-radius:2px;
                            text-align: center;
                            line-height: 50px;
                            font-size: 16px;
                            color: #FF0000;
                            margin-right: 20px;
                            font-weight: bold;
                        }
                        .cart{
                            background: #FF0000;
                            color: #fff;
                            font-weight: normal;
                            img{
                                width: 20px;
                                height: 17px;
                                margin-right: 7px;
                                vertical-align: middle;
                            }
                        }
                    }
                }
            }
            aside{
                width: 220px;
                margin-bottom: 60px;
                .tit{
                    width: 100%;
                    height: 37px;
                    line-height: 37px;
                    background: #C5C5C5;
                    color: #fff;
                    font-size: 16px;
                    font-weight: bold;
                    text-align: center;
                }
                .name{padding: 0 10px;color: #000;text-align: center;margin: 34px 0 26px;}
                .major,.address{
                    padding: 0 10px;
                    line-height: 21px;
                    margin-bottom: 16px;
                    span{color: #999;}
                }
                .collectShop{
                    width: 124px;
                    height: 30px;
                    border: 1px solid #E0E0E0;
                    border-radius: 15px;
                    margin: 0 auto;
                    line-height: 30px;
                    text-align: center;
                }
            }
            .info_wrap{
                height: auto;
                width: 100%;
                border: 1px solid #E0E0E0;
                margin-bottom: 20px;
                background: #fff;
                .name{margin: 25px 0;}
                .p{margin-bottom: 11px;line-height: 18px;}
                .type,.contactshop {
                    padding: 0 10px;
                    span{color: #999;}
                }
                .collectShop{margin-bottom: 20px;}
                .intoShop{background: #FF0000;border-color: #FF0000;color: #fff;}
                .callShop{width: 120px;height: 28px;line-height: 28px;color: #010101;border: 1px solid #ff0000;margin: 0 auto 20px;text-align: center;}
            }
            .customer_wrap{
                width: 100%;
                border: 1px solid #E0E0E0;
                margin-bottom: 20px;
                background: #fff;
                .tit{
                    width: 100%;
                    height: 37px;
                    line-height: 37px;
                    background: #C5C5C5;
                    color: #fff;
                    font-size: 16px;
                    font-weight: bold;
                    text-align: center;
                }
                .txt{
                    padding: 0 10px;
                    margin-top: 25px;
                    p{
                        font-size: 12px;
                        color: #000;
                        line-height: 18px;
                        margin-bottom: 12px;
                        span{color: #999;}
                        img{margin-left: 5px;}
                        .online{color: #FF0000;margin-left: 5px;}
                    }
                }
            }
            .cont {
                width: 960px;
                .titBox{height: 28px;padding: 12px 20px 0;background: #FFF8F8;}
                .titBox .prodtit{margin-bottom: 0;}
                .prodtit{
                    display: flex;
                    justify-content: space-between;
                    margin-bottom: 15px;
                    span{display: block;text-indent: 15px;position: relative;font-size: 16px;color: #000;}
                    span:before{content: '';display: block;width: 4px;height: 16px;background: #FF2100;position: absolute;left: 0;}
                }
                .prodList{
                    background: #fff;
                    padding: 15px;
                    display: flex;
                    flex-wrap: wrap;
                    margin-bottom: 25px;
                    li{
                        display: block;
                        width: 220px;
                        border:1px solid #E1E1E1;
                        margin-bottom: 16px;
                        position: relative;
                        margin-right: 14px;
                        img{
                            display: block;
                            width: 220px;
                            height: 220px;
                            background: #999;
                        }
                        .price{
                            font-size: 16px;
                            color: #FF0000;
                            margin: 20px 13px 13px;
                            font-weight: bold;
                            position: relative;
                            line-height: 18px;
                            span{
                                display: block;
                                position: absolute;
                                width: 32px;
                                height: 18px;
                                color: #fff;
                                background: #FF0000;
                                font-size: 12px;
                                line-height: 18px;
                                text-align: center;
                                border-radius: 5px;
                                right: 0;
                                top: 0;
                            }
                        }
                        .name{
                            padding: 0 13px;
                            color: #333;
                            line-height: 21px;
                            margin-bottom: 20px;
                        }
                        .label{position: absolute;right: 0;top: 0;display: block;width: 24px;height: 24px;text-align: center;line-height: 24px;background: #E2203D;color: #fff;border-radius: 50%;transform: translate(50%,-50%);}
                    }
                    li:nth-child(4n){margin-right: 0;}
                }
            }
        }
        .main{
            display: flex;
            justify-content: space-between;
            margin-top: 20px;
        }
    }
</style>
<style>
    .el-input-number{
        width: 130px;
        line-height: 24px;
    }
    .el-input-number__decrease, .el-input-number__increase{
        width: 24px;
        height: 24px;
    }
    .el-input-number .el-input__inner{
        padding-left: 24px;
        padding-right: 24px;
        height: 26px;
        line-height: 26px;
    }
    .el-dropdown-link {
        cursor: pointer;
    }
    .el-icon-arrow-down {
        font-size: 12px;
    }
</style>