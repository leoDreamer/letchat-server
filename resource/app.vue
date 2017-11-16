<template>
    <span>{{msg}} </span>
</template>
<script>
    export default {
        name: "App",
        data () {
            return {
                msg: "Hello Leo"
            }
        }
    }
</script>
<style rel="stylesheet/scss" lang="scss">
    $test-color: red;
    span {
        color: $test-color
    }
</style>