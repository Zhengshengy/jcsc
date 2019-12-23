<template>
    <div>
        <SearchTop :dataTransfer="actvite"></SearchTop>
        <MarketMain></MarketMain>
    </div>
</template>

<script>
    import SearchTop  from '@/components/search/top'
    import MarketMain  from '@/components/market/marketMain'
    export default {
        name: "Market",
        components: {
            'SearchTop': SearchTop,
            'MarketMain': MarketMain
        },
        data(){
            return{
                actvite:7,
            }
        },
    }
</script>

<style scoped lang="scss">

</style>