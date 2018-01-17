<template>
    <!-- 页面body -->
    <router-view class="router_view"></router-view>
</template>
<script>
    export default {
        name: "App",
        beforeCreate () {
            this.$store.dispatch("createUser", {})
            this.$store.dispatch("createInformation")
        }
    }
</script>
<style rel="stylesheet/scss" lang="scss">
    @import "../../assets/common";
    * {
        border: 0px;
        padding: 0px;
        margin: 0px;
    };
    body {
        height: 100%;
        width: 100%;
        position: absolute;
    }
    .router_view {
        width: 100%;
        min-height: 100%;
        min-width: 1000px;
        display: flex;
        flex-direction: column;
        background-color: $gray;
    }
</style>