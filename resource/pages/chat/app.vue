<template>
    <!-- 页面body -->
    <router-view class="router_view"></router-view>
</template>
<script>
    export default {
        name: "App"
    }
</script>
<style rel="stylesheet/scss" lang="scss">
    * {
        border: 0px;
        padding: 0px;
        margin: 0px;
    };
    .router_view {
        width: 100%;
        min-height: 100%;
        display: flex;
        flex-direction: column;
    }
</style>