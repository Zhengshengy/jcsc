<template>
    <div class="bigbox w-100">
        <SearchTop></SearchTop>
        <Goods :dataTransfer="actvite"></Goods>
    </div>
</template>
<script>
    import SearchTop  from '@/components/search/top'
    import Goods  from '@/components/search/goods'
    export default {
        name:'SearchIndex',
        components:{
            'SearchTop': SearchTop,
            'Goods':Goods
        },
        data(){
            return{
                actvite:0,
            }
        },

    }
</script>