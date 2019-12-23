<template>
    <div class="w-100">
        <div class="wrap">
        <section class="part1">
            <aside class="classify">
                <div class="logo"><img src="../assets/image/index/logo.png" alt=""></div>
                <ul>
                    <li v-for="item in classification" :key="item.id" @click="tosearch(item.id,item.catename)">
                        <!--<span :class="item.name" class="mr-15"></span>-->
                        <span class="font-14 name">{{ item.catename }}</span>
                    </li>
                </ul>
            </aside>
            <div class="right">
                <div class="search_wrap">
                    <div class="searchBox">
                        <el-input placeholder="请输入内容" v-model="keyword" class="input-with-select" @keyup.enter.native="search">
                            <el-select v-model="sType" slot="prepend" placeholder="请选择">
                                <el-option :label="item.name" :value="item.url" v-for="(item,index) in type" :key="index"></el-option>
                            </el-select>
                            <el-button slot="append" @click="search">搜索</el-button>
                        </el-input>
                    </div>
                    <router-link to="/enquiry" class="pricelist position"><img src="@/assets/image/index/pricelist.png" alt="">全网询价</router-link>
                </div>
                <div class="nav_wrap">
                    <ul>
                        <li><router-link to="/spot">今日现货</router-link></li>
                        <li><router-link to="/bargain">特价商品</router-link></li>
                        <li><router-link to="/finershops">推荐商铺</router-link></li>
                        <li><router-link to="/snapshot">随手拍</router-link></li>
                        <li><router-link to="/tariff">价格表</router-link></li>
                        <li><router-link to="/logistics">物流信息</router-link></li>
                        <li><router-link to="/market">建材市场</router-link></li>
                        <li><router-link to="/lease">出租转让</router-link></li>
                        <li><router-link to="/demand" style="margin-right: 0">求购信息</router-link></li>
                    </ul>
                    <router-link :to="{path:'trends/main',query:{id:107}}" tag="button"><img src="@/assets/image/index/hornWhite.png">徒步丈量西安市场每一寸土地</router-link>
                </div>
                <div class="banner_wrap">
                    <div class="banBox">
                        <el-carousel height="300px">
                            <el-carousel-item v-for="(item,index) in slideshow" :key="index">
                                <img :src="item" alt="" class="w-100 h-100">
                            </el-carousel-item>
                        </el-carousel>
                    </div>
                    <div class="loginBox" >
                        <div v-if="isLogin==false" class="w-100" style="margin: 50px auto">
                            <img src="@/assets/image/index/headimg.png" alt="">
                            <p class="name">HI,<span>您好</span></p>
                            <p class="welcome">欢迎来到陕西建材商城</p>
                            <div class="btn">
                                <router-link to="/login" class="login">登录</router-link>
                                <router-link to="/register">注册</router-link>
                            </div>
                        </div>
                        <div v-if="isLogin" style="margin: 50px auto">
                            <img :src="info.headimgurl" alt="">
                            <p class="name">{{ info.nickname }}</p>
                            <p class="welcome pointer" @click="exit">
                                <span>【</span><span class="text-red"> 安全退出 </span><span>】</span>
                            </p>
                            <!--<div class="btn">-->
                                <!--<router-link to="/merchant" class="into" tag="div">进入我的商铺</router-link>-->
                            <!--</div>-->
                            <div class="btn">
                            <router-link to="/personal" class="into" tag="div">个人中心</router-link>
                            </div>
                        </div>
                        <!--<p class="txt">尽享专属资源、一手价格、个性服务</p>-->
                        <!--<p class="credit">赊账买建材，月利率1%</p>-->
                        <!--<ul class="service">-->
                            <!--<li><img src="@/assets/image/index/service1.png" alt="" height="27"><p>急速采购</p></li>-->
                            <!--<li><img src="@/assets/image/index/service2.png" alt="" height="22" style="margin: 8px auto 11px;"><p>代办服务</p></li>-->
                            <!--<li><img src="@/assets/image/index/service3.png" alt="" height="27"><p>天天优惠</p></li>-->
                            <!--<li><img src="@/assets/image/index/service4.png" alt="" height="24" style="margin: 8px auto 10px;"><p>收银台</p></li>-->
                        <!--</ul>-->
                    </div>
                </div>
                <div class="prod_wrap">
                    <div class="prodBox">
                        <router-link to="/demand" tag="a"><img src="@/assets/image/index/img1.png"></router-link>
                        <router-link to="/spot" tag="a"><img src="@/assets/image/index/img2.png"></router-link>
                        <router-link to="/tariff" tag="a"><img src="@/assets/image/index/img3.png"></router-link>
                        <router-link to="/" tag="a"><img src="@/assets/image/index/img.png"></router-link>
                    </div>
                    <div class="noticeBox">
                        <div class="tab">
                            <div class="active">公告</div>
                            <!--<div>交易额</div>-->
                            <!---->
                            <!--<div>买家服务</div>-->
                            <!--<div>卖家服务</div>-->
                        </div>
                        <div class="cont">
                            <el-carousel height="100px" direction="vertical" indicator-position="none">
                                <el-carousel-item v-for="(data,index) in notice" :key="index" >
                                    <div class="singlerow pointer nitem" v-for="(item,index) in data" :key="index" @click="toNews(item.id)">{{item.title}}</div>
                                </el-carousel-item>
                            </el-carousel>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <div class="slogan">
            <img src="../assets/image/index/hornRed.png" alt="">
            <el-carousel height="44px" direction="vertical" indicator-position="none">
                <el-carousel-item v-for="item in slogan" :key="item.id">
                    <p class="medium pointer text-3 font-14 singlerow fw-500" @click="toNews(item.id)">{{ item.title }}</p>
                </el-carousel-item>
            </el-carousel>
        </div>
        <div class="ban2">
            <!--<router-link :to="top.url" v-if="top.url">-->
                <!--<img class="w-100 h-100" :src="top.name"/>-->
            <!--</router-link>-->
            <img class="w-100 h-100" src="@/assets/image/index/ban2.jpg" />
        </div>
        <Today></Today>
        <!-- 推荐商品 -->
        <Goods></Goods>
        <div class="ban3 mb-20">
            <!--<router-link :to="centre.url" v-if="centre.url">-->
                <!--<img class="w-100 h-100" :src="centre.name"/>-->
            <!--</router-link>-->
            <img class="w-100 h-100" src="@/assets/image/index/ban3.png" />
        </div>
        <Shops></Shops>
        <Brand></Brand>
        <div class="ban3 mb-20 mt-20">
            <!--<router-link :to="bottom.url" v-if="bottom.url">-->
                <!--<img class="w-100 h-100" :src="bottom.name"/>-->
            <!--</router-link>-->
            <img class="w-100 h-100" src="@/assets/image/index/ban4.png" />
        </div>
        <News></News>
        <!--<div class="kong mb-20">-->
            <!--<div class="item mr-20"></div>-->
            <!--<div class="item"></div>-->
            <!--<div class="clearfloat"></div>-->
        <!--</div>-->
    </div>
        <Advertising></Advertising>
        <Suspension></Suspension>
    </div>
</template>
<script>
    import Advertising from '@/components/public/advertising'
    import Suspension from '@/components/public/suspension'
    import Shops from '@/components/recommend/shops'
    import Goods from '@/components/recommend/goods'
    import Brand from '@/components/recommend/brand'
    import News from '@/components/recommend/news'
    import Today from '@/components/recommend/today'
    import '@/assets/icon/iconfont.css'
    import axios from "../servers/axios";
    import { getCookies } from "../utils/cookies";
    import { mapMutations,mapGetters } from  'vuex'
    export default {
        name:"Index",
        components: {
            'Advertising':Advertising,
            'Suspension':Suspension,
            'Shops':Shops,
            'Goods':Goods,
            'Brand':Brand,
            'News':News,
            'Today':Today,
        },
        data(){
            return{
                slogan:[],
                notice:[],
                top:{},
                centre:{},
                bottom:{},
                slideshow:[],
                classification:[],
                sType: '/search',
                type:[
                    {name:'产品',url:'/search'},
                    {name:'商铺',url:'/search_shops'},
                    {name:'价格表',url:'/tariff'},
                    {name:'随手拍',url:'/snapshot'},
                    {name:'物流信息',url:'/logistics'},
                    {name:'建材市场',url:'/market'},
                    {name:'特价商品',url:'/bargain'},
                    {name:'今日现货',url:'/spot'},
                ],
                keyword:'',
                isLogin:false,
                info:{}
            }
        },
        computed:{
            ...mapGetters('user',[
                'getIsLogin'
            ])
        },
        watch:{
            getIsLogin(){
                this.gudgeLogin()
            }
        },
        created() {
            this.gudgeLogin()
            let url = this.JCconfig.localFile + '/js/classification.json'
            axios.get(url).then(e=>{
                this.classification = e.data.data
            })
            this.JCService.indexService.Mall_express().then(e=>{
                this.slogan = e.info[0].data
                let data = e.info[0].data
                let arr = []
                for(var i=0;i<data.length;i+=3){
                    arr.push(data.slice(i,i+3));
                }
                this.notice = arr
            })
            this.JCService.indexService.Rotation_chart().then(e=>{
                let pic = e.info[0].data[0].img.split(',')
                pic.forEach((item,index)=>{
                    pic[index] = this.JCconfig.filePath +'public/' + item
                })
                this.slideshow = pic
            })
            // this.JCService.indexService.Advert({param:1}).then(e=>{
            //     e.info[0].name = this.JCconfig.filePath +'public/' + e.info[0].name
            //     this.top = e.info[0]
            // })
            // this.JCService.indexService.Advert({param:2}).then(e=>{
            //     e.info[0].name = this.JCconfig.filePath +'public/' + e.info[0].name
            //     this.centre = e.info[0]
            // })
            // this.JCService.indexService.Advert({param:3}).then(e=>{
            //     e.info[0].name = this.JCconfig.filePath +'public/' + e.info[0].name
            //     this.bottom = e.info[0]
            // })
        },
        methods:{
            ...mapMutations('user',[
                'del_token'
            ]),
            search(){
                if (this.keyword){
                    this.$router.push({path:this.sType,query:{keyword:this.keyword}})
                }
            },
            tosearch(id,name){
                this.$router.push({path:'/search',query:{id:id,name:name}})
            },
            toNews(id){
                this.$router.push({path:'/trends/main',query:{id:id}})
            },
            exit(){
                this.$confirm('您确认要退出吗？')
                    .then(()=> {
                        this.del_token()
                        this.isLogin = false
                        window.location.href = '/'
                        this.$emit('loginHeader',false)
                    })
                    .catch(()=> {});
            },
            gudgeLogin(){
                let token = getCookies('token')
                if (token){
                    this.isLogin = true
                    this.JCService.UserServer.User_information().then(e=>{
                        let str = e.value.headimgurl
                        if(str.substr(0,1) != "h"){
                            e.value.headimgurl = this.JCconfig.filePath + e.value.headimgurl
                        }
                        this.info = e.value
                    })
                }else {
                    this.isLogin = false
                }
            }
        }
    }
</script>
<style lang="scss" scoped>
    @import "../assets/css/index/index.css";
    @import "../assets/css/index/common.css";

</style>
<style scoped>
    /deep/.el-select{
        width: 95px;
        border-right: 1px solid #E5E5E5;
        background: #ffffff;
        color: #333333;
    }
    /deep/.el-input--suffix .el-input__inner{width: 95px;text-align: center}
    /deep/.input-with-select .el-input-group__prepend {
        background-color: #fff;
    }
    /deep/.el-input-group__append{background: #006DFF;color: #ffffff;border: 1px solid #006DFF;border-radius: 0}
</style>