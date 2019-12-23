<template>
    <div class="couponBox" v-show="couponShow">
        <div class="head">
            <img src="@/assets/image/shoppingcart/horn.png" alt="">
            <span>您已领取一张优惠券，有新的优惠券可领取。</span>
        </div>
        <div class="couponList" :class="{'scroll':false}">
            <div class="item">
                <div class="reduce">￥10</div>
                <div class="ruleBox">
                    <div class="rule">满100可用</div>
                    <div class="time">2019.11.11-2019.12.11</div>
                </div>
                <div class="receive">领取</div>
            </div>
            <div class="item">
                <div class="reduce red">包邮</div>
                <div class="ruleBox">
                    <div class="rule">满100可用</div>
                    <div class="time">2019.11.11-2019.12.11</div>
                </div>
                <div class="receive">领取</div>
            </div>
            <div class="item">
                <div class="reduce">￥10</div>
                <div class="ruleBox">
                    <div class="rule">满100可用</div>
                    <div class="time">2019.11.11-2019.12.11</div>
                </div>
                <div class="receive get">已领取</div>
            </div>
        </div>
        <img src="@/assets/image/personal/close.png" alt="" class="close" @click="closeCoupon">
    </div>
</template>

<script>
    export default {
        name: "coupon",
        props:['couponShow'],
        methods:{
            closeCoupon(){
                this.$emit('close');
            },
        }
    }
</script>

<style lang='scss' scoped>
    .couponBox{
        position: absolute;
        left: 0;
        top: 35px;
        width: 336px;
        border: 1px solid #ff4400;
        padding: 10px 7px 12px 8px;
        background: #fff;
        z-index:100;
        .head{
            height: 33px;
            border-bottom: 1px solid #ddd;
            line-height: 33px;
            color: #666;
            img{
                width: 11px;
                height: 11px;
                margin-right: 7px;
                vertical-align: middle;
            }
        }
        .couponList{
            margin-top: 17px;
            padding: 0 22px 0 8px;
            .item{
                margin-bottom: 20px;
                height: 28px;
                display: flex;
                align-items: center;
                .reduce{
                    width: 53px;
                    height: 28px;
                    line-height: 28px;
                    background: #66A7FF;
                    text-align: center;
                    font-size: 14px;
                    color: #fff;
                    font-weight: bold;
                    margin-right: 12px;
                }
                .reduce.red{
                    background: #F06671;
                }
                .ruleBox{
                    width: 178px;
                    font-size: 12px;
                    line-height: 1;
                    color: #333;
                    .time{
                        color: #999;
                        margin-top: 1px;
                    }
                }
                .receive{
                    width:49px;
                    height:25px;
                    border:1px solid #c5c5c5;
                    text-align: center;
                    color: #666;
                    cursor: pointer;
                }
                .receive.get{
                    border-color: transparent;
                }
            }
            .item:last-of-type{
                margin-bottom: 0;
            }
        }
        .couponList.scroll{
            max-height: 175px;
            overflow-y: scroll;
        }
        .close{
            position: absolute;
            width: 12px;
            height: 12px;
            top: 10px;
            right: 10px;
            cursor: pointer;
        }
    }
    .couponBox:before,.couponBox:after{
        position: absolute;
        display: block;
        content: '';
        width: 0;
        height: 0;
        border: 5px solid transparent;
        border-bottom-color:#ff4400;
        left: 37px;
        top:-11px;
    }
    .couponBox:after{
        border-bottom-color:#fff;
        top: -10px;
    }
</style>