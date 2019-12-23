<template>
    <div class="ele-container">
        <div class="ele-wrapper">
            <div class="ele-tail"></div>
            <div class="ele-body">
                <div class="ele-head">
                    <div class="ele-eyebrows"></div>
                    <div class="ele-eyes"></div>
                    <div class="ele-mouth"></div>
                    <div class="ele-fang-front"></div>
                    <div class="ele-fang-back"></div>
                    <div class="ele-ear"></div>
                </div>
            </div>
            <div class="ele-leg-1 ele-leg-back">
                <div class="ele-foot"></div>
            </div>
            <div class="ele-leg-2 ele-leg-front">
                <div class="ele-foot"></div>
            </div>
            <div class="ele-leg-3 ele-leg-back">
                <div class="ele-foot"></div>
            </div>
            <div class="ele-leg-4 ele-leg-front">
                <div class="ele-foot"></div>
            </div>
        </div>
        <div class="title">页面找不到了</div>
    </div>
</template>
<script>
    export default {
        name: 'NoFind',
        created:function () {
            this.$emit('header', false);
            this.$emit('footer', false);
        }
    }
</script>
<style scoped>
    @import "../../assets/css/index/404.css";
    .title{
        position: absolute;
        top: 70%;
        left: 50%;
        font-size: 20px;
        font-weight: bold;
    }
</style>