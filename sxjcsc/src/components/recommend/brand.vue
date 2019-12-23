<template>
    <div>
        <div class="publicTit">
            <div class="tit">热门品牌推荐<span>大品牌优质商家推荐</span></div>
        </div>
        <div class="brand mt-15">
            <div class="item" v-for="(item,index) in brand" :key="index">
                <img :src="item.img" alt="" class="w-100 h-100">
            </div>
            <div class="clearfloat"></div>
        </div>
    </div>
</template>
<script>
    export default {
        name: 'Brand',
        data(){
            return{
                brand:[],
            }
        },
        created() {
            this.JCService.indexService.Brand().then(e=>{
                e.info.forEach(item=>{
                    item.img = this.JCconfig.filePath +'public/'+ item.img
                })
                this.brand = e.info
            })
        }
    }
</script>