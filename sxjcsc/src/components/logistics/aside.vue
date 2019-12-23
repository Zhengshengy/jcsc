<template>
    <div class="float-right manuBox">
        <div class="title text-center text-white font-30">公司信息</div>
        <div class="manuInfo mt-20 bg-white px-25 py-30 font-14">
            <div class="name ">{{ dataTransfer.name }}</div>
            <p class="mt-20">
                <span class="text-9">联系人：</span>
                <span class="text-3">{{ dataTransfer.contacts }}</span>
            </p>
            <p class="mt-15">
                <span class="text-9">电   话：</span>
                <span class="text-3">{{ dataTransfer.mob }}</span>
            </p>
            <p class="mt-15">
                <span class="text-9">手   机：</span>
                <span class="text-3">{{ dataTransfer.tel }}</span>
            </p>
            <p class="mt-15">
                <span class="text-9">地   区：</span>
                <span class="text-3">{{ dataTransfer.address }}</span>
            </p>
            <div class="btn pointer">
                <div class="left float-left">
                    <img src="@/assets/image/spot/pos.png" alt="">
                </div>
                <div class="right float-right text-center text-red " @click="map(dataTransfer.lng_lat,dataTransfer.address)">到这里去</div>
            </div>
        </div>
        <Recommend></Recommend>
    </div>
</template>
<script>
    import Recommend from '@/components/logistics/recommend'
    export default {
        name: 'Aside',
        props:['dataTransfer'],
        components: {
            'Recommend': Recommend
        },
        methods:{
            map(lng_lat,address){
                if (lng_lat){
                    let data = lng_lat.split(',')
                    let lng = data[0]
                    let lat = data[1]
                    let url = this.$router.resolve({
                        name: "Map",
                        query: {lng:lng,lat:lat,address:address}
                    })
                    window.open(url.href,'_blank')
                } else {
                    this.$alert('暂无地址','消息');
                }

            }
        }
    }
</script>
<style lang="scss" scoped>
    $width:300px;
    $red:#FF0000;
    .manuBox{
        width: $width;
        .title{
            height: 60px;
            background: #FF0000;
            line-height: 60px;
        }
        .btn{
            width: 160px;
            height: 36px;
            border:1px solid $red;
            border-radius:5px;
            margin: 30px auto 0;
            .left{
                background: $red;
                width: 65px;
                height: 36px;
                img{
                    display: block;
                    margin: 6px auto;
                }
            }
            .right{
                width: 95px;
                height: 36px;
                line-height: 36px;
            }
        }

        .recommend{
            .tit{
                line-height: 50px;
                border-bottom: 1px solid #F5F5F5;
                img{
                    vertical-align: text-top;
                }
            }
            ul li{
                margin-top: 15px;
            }
        }
    }
</style>