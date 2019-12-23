<template>
    <div class="box">
        <Pay :txt="'赞助结算页'" :typeTxt="'赞助金额'"></Pay>
    </div>
</template>

<script>
    import Pay from '@/components/personal/pay'
    export default {
        name: "supportPay",
        data () {
            return {
                msg:'',
                msgLength:0,
                isFocus:false,
            }
        },
        components:{
            'Pay':Pay
        },
    }
</script>

<style lang='scss' scoped>

</style>