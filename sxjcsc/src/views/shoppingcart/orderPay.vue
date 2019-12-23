<template>
    <div class="box">
        <Pay :txt="'订单结算页'" :typeTxt="'应付金额'" :hasDetail="true"></Pay>
    </div>
</template>

<script>
    import Pay from '@/components/personal/pay'
    export default {
        name: "orderPay",
        data () {
            return {

            }
        },
        components:{
            'Pay':Pay
        },
    }
</script>

<style lang='scss' scoped>

</style>