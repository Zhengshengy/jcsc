<template>
    <div class="bigbox w-100">
        <SearchTop></SearchTop>
        <Shops></Shops>
    </div>
</template>
<script>
    import SearchTop  from '@/components/search/top'
    import Shops  from '@/components/search/shops'
    export default {
        name:'SearchShops',
        components:{
            'SearchTop': SearchTop,
            'Shops': Shops
        }
    }
</script>
<style lang="scss" scoped>

</style>