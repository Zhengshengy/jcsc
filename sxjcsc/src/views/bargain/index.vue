<template>
    <div>
        <SearchTop :dataTransfer="actvite"></SearchTop>
        <bargain></bargain>
    </div>
</template>
<script>
    import SearchTop  from '@/components/search/top'
    import bargain  from '@/components/bargain/bargain'
    export default {
        name: 'Bargain',
        components:{
            'SearchTop': SearchTop,
            'bargain': bargain
        },
        data(){
            return{
                actvite:2,
            }
        },
    }
</script>