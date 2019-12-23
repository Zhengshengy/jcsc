<template>
    <Orders :numJudge="numJudge"></Orders>
</template>

<script>
    import Orders from '@/components/personal/orders'
    export default {
        name: "MyOrders",
        props:{
            numJudge:{
                type:Number,
                default:1
            }
        },
        components:{
            'Orders':Orders,
        },
    }
</script>

<style lang='scss' scoped>

</style>