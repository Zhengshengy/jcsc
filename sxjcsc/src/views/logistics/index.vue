<template>
    <div >
        <SearchTop :dataTransfer="actvite"></SearchTop>
        <LogisticsMain></LogisticsMain>
    </div>
</template>

<script>
    import SearchTop  from '@/components/search/top'
    import LogisticsMain  from '@/components/logistics/logMain'
    export default {
        name: "Logistics",
        components:{
            'SearchTop': SearchTop,
            'LogisticsMain': LogisticsMain
        },
        data(){
            return{
                actvite: 6
            }
        }
    }
</script>

<style scoped>

</style>