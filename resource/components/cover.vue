<template>
  <div class="cover" @click="coverClick"  v-show="coverShow"></div>
</template>
<script>
    export default {
        name: "Cover",
        data () {
            return {
                coverShow: false,
            }
        },
        mounted () {
            this.$root.$on("COVER_SHOW", () => {
                this.coverShow = true;
            })
            this.$root.$on("COVER_CLOSE", () => {
                this.coverShow = false;
            })
        },
        methods: {
            coverClick: function() {
                this.$root.$emit("COVER_CLOSE")
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