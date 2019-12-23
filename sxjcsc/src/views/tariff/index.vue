<template>
    <div>
        <SearchTop :dataTransfer="actvite"></SearchTop>
        <TariffMain></TariffMain>
    </div>
</template>

<script>
    import SearchTop  from '@/components/search/top'
    import TariffMain  from '@/components/tariff/tariffMain'
    export default {
        name: "Tariff",
        components: {
            'SearchTop': SearchTop,
            'TariffMain': TariffMain,
        },
        data(){
            return{
                actvite:5,
            }
        },
    }
</script>

<style lang="scss" scoped>

</style>