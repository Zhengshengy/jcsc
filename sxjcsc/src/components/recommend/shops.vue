<template>
    <div>
        <div class="publicTit">
            <div class="tit">推荐商铺<span>精选好商、品质货源</span></div>
            <ul>
                <li><router-link to="/finershops" class="mores">更多</router-link></li>
            </ul>
        </div>
        <div class="shopTj">
            <router-link :to="{name:'subwebsiteIndex',query:{shop_id:data.id}}" tag="div" class="Tjitems shopTjitem mb-20 float-left" v-for="(data,index) in shops" :class="{'mr-20':index%2==0}" :key="index">
                <div class="san  text-white font-14"><span class="text">推荐</span></div>
                <div class="p-20 item">
                    <span class="font-16 fw-500 singlerow w-90" style="display: inline-block">{{ data.name }}</span>
                    <el-row :gutter="18" class="mt-30 font-12 pr-30">
                        <el-col :span="7" v-if="data.addresss">
                            <p class="singlerow">所在地：{{ data.addresss }}</p>
                        </el-col>
                        <el-col :span="10" class="singlerow">
                            主营类目：<span class="singlerow">{{ data.major }}</span>
                        </el-col>
                        <el-col :span="7">
                            <span>公司类型：</span><span class="text-red">批发商</span>
                        </el-col>
                    </el-row>
                </div>
                <el-row type="flex"  class="p-20" v-if="data.img">
                    <div class="box" style="width: 19%" v-for="(item,index) of data.img" :key="index">
                        <img :src="item" alt="" class="w-100" height="100">
                    </div>
                </el-row>
                <el-row v-else class="p-20">
                    <span>暂无商品</span>
                </el-row>
            </router-link>
            <div class="clearfloat"></div>
        </div>
    </div>
</template>
<script>
    export default {
        name: 'Shops',
        data(){
            return{
                shops:[],
            }
        },
        created() {
            this.JCService.indexService.Shops().then(e=>{
                e.info.forEach((item)=>{
                    let img = item.img
                    if (img){
                        img.forEach((data,index)=>{
                            let pic = data.split(',')
                            img[index] = this.JCconfig.filePath +'public/' +pic[0]
                        })
                    }
                })
                this.shops = e.info
            })
        }
    }
</script>