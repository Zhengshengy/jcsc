<template>
    <div >
        <SearchTop :dataTransfer="actvite"></SearchTop>
        <LeaseIndex></LeaseIndex>
    </div>
</template>

<script>
    import SearchTop  from '@/components/search/top'
    import LeaseIndex  from '@/components/lease/lease'
    export default {
        name: "Lease",
        components:{
            'SearchTop': SearchTop,
            'LeaseIndex': LeaseIndex
        },
        data(){
            return{
                actvite: 8
            }
        }
    }
</script>

<style scoped>

</style>