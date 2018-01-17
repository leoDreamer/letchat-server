<template>
  <div class="cover" @click="coverClick"  v-show="cover"></div>
</template>
<script>
    export default {
        name: "Cover",
        computed: {
            cover () {
                return this.$store.state.show.cover;
            }
        },
        methods: {
            coverClick: function() {
                this.$store.commit("SHOW_PATCH", { key: "cover", value: false })
                this.$store.commit("SHOW_PATCH", { key: "loginTip", value: false })
                this.$store.commit("SHOW_PATCH", { key: "loginContent", value: false })
            }
        }
    }
</script>
<style rel="stylesheet/scss" lang="scss">
    .cover {
        position: absolute;
        width: 100%;
        height: 100%;
        opacity: 0.5;
        background-color: #333333;
        z-index: 100;
        top: 0;
    }
</style>