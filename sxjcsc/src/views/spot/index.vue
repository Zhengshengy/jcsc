<template>
    <div>
        <SearchTop :dataTransfer="actvite"></SearchTop>
        <Spot></Spot>
    </div>
</template>

<script>
    import SearchTop  from '@/components/search/top'
    import Spot  from '@/components/spot/spot'
    export default {
        name:'SpotIndex',
        components:{
            'SearchTop': SearchTop,
            'Spot': Spot
        },
        data(){
            return{
                actvite:1,
            }
        },
    }
</script>