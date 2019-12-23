<template>
    <div>
        <SearchTop :dataTransfer="actvite"></SearchTop>
        <demand></demand>
    </div>
</template>
<script>
    import SearchTop  from '@/components/search/top'
    import Demand  from '@/components/demand/demand'
    export default {
        name: 'Demand',
        components:{
            'SearchTop': SearchTop,
            'demand': Demand
        },
        data(){
            return{
                actvite:9,
            }
        },
    }
</script>