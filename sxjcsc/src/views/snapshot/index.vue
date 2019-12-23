<template>
    <div>
        <SearchTop :dataTransfer="actvite"></SearchTop>
        <SnapMain></SnapMain>
    </div>
</template>
<script>
    import SearchTop  from '@/components/search/top'
    import SnapMain  from '@/components/snapshot/snapMain'
    export default {
        name: 'Snapshot',
        components: {
            'SearchTop': SearchTop,
            'SnapMain': SnapMain,
        },
        data(){
            return{
                actvite:4,
            }
        },

    }
</script>
<style lang="scss" scoped>

</style>