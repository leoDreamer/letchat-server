<template>
    <span>{{msg}}</span>
</template>
<script>
    export default {
        name: "Pagea",
        data () {
            return {
                msg: "In Router View This is Page A"
            }
        }
    }
</script>
<style rel="stylesheet/scss" lang="scss">
    $test-color: red;
    p {
        color: $test-color
    }
</style>