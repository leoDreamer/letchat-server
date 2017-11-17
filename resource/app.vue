<template>
    <div>
        <p>This is App Component Msg: {{msg}}</p>
        <h5>Router-link :</h5>
        <p><router-link to="/pagea">Go A</router-link></p>
        <p><router-link to="/pageb">Go B</router-link></p>
        <h5>Router-view :</h5>
        <router-view></router-view>
    </div>
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
</style>