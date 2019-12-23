<template>
    <div>
        <div class="publicTit">
            <div class="tit">推荐商品<span>挑选优质产品，方便您的采购！</span></div>
            <ul>
                <li :class="{'active':cActive==item.id}" class="pointer" v-for="item in classification.start" :key="item.id" @click="switchClass(item.id)"><span>{{item.catename}}</span></li>
                <el-dropdown @command="switchClass">
                    <span class="el-dropdown-link pointer">更多分类</span>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item v-for="item in classification.end" :key="item.id" :command="item.id">{{item.catename}}</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </ul>
        </div>
        <div class="prodTj">
            <div class="Tjitems p-20  mb-20 float-left" v-for="(data,index) in goods" :class="{'mr-20':index%2==0}" :key="index">
                <el-row :gutter="20">
                    <el-col :span="8" v-for="(item,index) of data" :key="index">
                        <router-link :to="{name:'productdetail',query:{id:item.id,shop_id:item.shopid}}">
                            <img :src=item.img alt="" width="168" height="168">
                            <div class="fl-a mt-20">
                                <span class="text-red font-14" v-if="item.price">￥{{item.price}}</span>
                                <span class="text-red font-14" v-else>面议</span>
                                <span class="text-white bg-red font-12 p-5 zi">推荐</span>
                            </div>
                            <p class="singlerow font-12 mt-15 text-3">{{item.name}}</p>
                        </router-link>
                    </el-col>
                </el-row>
            </div>
            <div class="clearfloat"></div>
        </div>
    </div>
</template>
<script>
    export default {
        name: 'Goods',
        data(){
            return{
                goods:[],
                cActive:89,
                classification:{},
                data:null
            }
        },
        created() {
            this.JCService.indexService.Classification().then(e=>{
                let classification =  e.data.sort((a,b)=>{return a.id-b.id})
                let obj = {}
                obj.start = classification.slice(0,7)
                obj.end = classification.slice(8)
                this.classification = obj
            })
            this.JCService.indexService.Goods().then(e=>{
                let arr = [];
                for(var i=0;i<e.length;i+=1){
                    let pic = e[i].img.split(',')[0]
                    let img = this.JCconfig.filePath +'public/'+pic
                    e[i].img = img
                    let temp = i%3;
                    if(temp == 0){
                        arr.push(e.slice(i,i+3));
                    }
                }
                this.goods = arr
            })
        },
        methods:{
            switchClass(id){
                this.cActive = id
                this.JCService.indexService.Goods({param:id}).then(e=>{
                    let arr = [];
                    for(var i=0;i<e.length;i+=1){
                        let pic = e[i].img.split(',')[0]
                        let img = this.JCconfig.filePath+'public/'+pic
                        e[i].img = img
                        let temp = i%3;
                        if(temp == 0){
                            arr.push(e.slice(i,i+3));
                        }
                    }
                    this.goods = arr
                })
            },
        }
    }
</script>
<style scoped lang="scss">
    .el-dropdown-menu__item:focus, .el-dropdown-menu__item:not(.is-disabled):hover{background: red;color: #ffffff}
</style>