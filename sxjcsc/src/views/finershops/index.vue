<template>
    <div>
        <SearchTop :dataTransfer="actvite"></SearchTop>
        <FinerMain></FinerMain>
    </div>
</template>

<script>
    import SearchTop  from '@/components/search/top'
    import FinerMain  from '@/components/finershops/finerMain'
    export default {
        name: "Finershops",
        components: {
            'SearchTop': SearchTop,
            'FinerMain': FinerMain
        },
        data(){
            return{
                actvite:3,
            }
        },
    }
</script>

<style scoped lang="scss">

</style>