<template>
    <div class="box">
        <div class="item text-center font-12 text-white contact">
            <!--<div class="">帮助<br>中心</div>-->
            <img src="@/assets/image/suspension/call.png" alt="" >
            <div class="info">
                <div><span>电话:</span>400-029-2889</div>
                <div><span>QQ:</span>2829994729</div>
                <div><span>微信:</span>sxjcsc</div>
            </div>
        </div>
        <div class="item text-center font-12 text-white">
            <div class="">商家<br>入驻</div>
        </div>
        <div class="item text-center font-12 text-white " @click="topersonal">
            <img src="@/assets/image/suspension/icon2.png" alt="" class="w-100">
        </div>
        <div class="item text-center font-12 text-white" @click="backToTop">
            <img src="@/assets/image/suspension/icon3.png" alt="" class="mt-10">
        </div>
    </div>
</template>
<script>
    export default {
        name:"Suspension",
        data(){
            return{
                backPosition:0
            }
        },
        mounted() {
            window.addEventListener('scroll', this.handleScroll)
        },
        beforeDestroy() {
            window.removeEventListener('scroll', this.handleScroll)
            if(this.interval) {
                clearInterval(this.interval)
            }
        },
        methods:{
            topersonal(){
                this.$router.push('/personal')
            },
            backToTop() {
                let distanceY = window.pageYOffset
                let i = 0
                this.interval = setInterval(() => {
                    let next = Math.floor(this.easeInOutQuad(10 * i, distanceY, -distanceY, 500))
                    if(next <= this.backPosition) {
                        window.scrollTo(0, this.backPosition)
                        clearInterval(this.interval)
                    } else{
                        window.scrollTo(0, next)
                    }
                    i++
                }, 17)
            },
            easeInOutQuad(t, b, c, d) {
                // 判断当前时间是否总在总时间的一半以内，是的话执行缓入函数，否则的话执行缓出函数
                if ((t /= d / 2) < 1) {
                    return c / 2 * t * t + b
                } else {
                    // 将总长度设置为一半，并且时间从当前开始递减，对图像进行垂直向上平移
                    return -c / 2 * (--t * (t - 2) - 1) + b
                }
            }
        }
    }
</script>
<style lang="scss" scoped>
$width:30px;
.box{width: $width;
    position: fixed;
    right: 279px;
    bottom: 107px;
    .item{
        width: $width;
        height: $width;
        background: #cccccc;
        padding: 10px;
        margin-bottom: 2px;
        cursor: pointer;
    }
    .item:nth-child(2){
        background: red;
    }
    .contact{
        position: relative;
        .info{
            position: absolute;
            top: 50%;
            left: 65px;
            background: #fff;
            color: #666;
            font-size: 14px;
            line-height: 22px;
            transform: translate(0,-50%);
            padding:10px;
            transition: all .3s ease-in-out;
            display: none;
            div{
                white-space: nowrap;
                color: #666;
                text-align: left;
                span{
                    display: inline-block;
                    width: 35px;
                    text-align: right;
                    margin-right: 5px;
                }
            }
        }
        .info:before{
            content: '';
            display: block;
            position: absolute;
            left: -12px;
            top: calc(50% - 3px);
            width: 0;
            height: 0;
            border: 6px solid transparent;
            border-right-color: #fff;
        }
    }
    .contact:hover .info{
        display: block;
    }
}
</style>