<template>
    <div class="box">
        <Pay :txt="'订单结算页'" :typeTxt="'应付金额'" :hasDetail="true" :isSuccess="true"></Pay>
    </div>
</template>

<script>
    import Pay from '@/components/personal/pay'
    export default {
        name: "successOrder",
        components:{
            'Pay':Pay
        },
    }
</script>

<style lang='scss' scoped>

</style>