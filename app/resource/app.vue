<template>
    <div>
        <span class="test-msg">{{msg}} </span>
    </div>
</template>
<script>
    export default {
        data () {
            return {
                msg: "Hello Leo"
            }
        }
    }
</script>
<style lang="scss">
    .test-msg{
        color: red
    }
</style>