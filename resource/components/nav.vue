<template>
  <!-- 导航栏 -->
  <Menu mode="horizontal" :theme="theme1" active-name="1" class="index_nav">
      <span>
          <router-link to="/" class="link_font">Leo</router-link>
      </span>
      <MenuItem name="1" class="index_nav_item">
          <router-link to="/introduce" class="link_font">
            <Icon type="ios-paper"></Icon>
            关于我
          </router-link>
      </MenuItem>
      <MenuItem name="2">
          <router-link to="/introduce" class="link_font">
            <Icon type="ios-people"></Icon>
            实验室
          </router-link>
      </MenuItem>
      <MenuItem name="2">
          <router-link to="/introduce" class="link_font">
            <Icon type="ios-people"></Icon>
            博客
          </router-link>
      </MenuItem>
  </Menu>
</template>
<script>
    export default {
        name: "PageNav",
        data () {
            return {
                theme1: 'dark',
                value: [20, 50]
            }
        },
        methods: {
            add: function () {
                this.$store.commit('increment')
            }
        }
    }
</script>
<style rel="stylesheet/scss" lang="scss">
.index_nav {
    width: 100%;
    span {
        padding: 0px 20px;
        font-size: 30px;
        color: #ffffff;
    }
}
.ivu-menu-item {
    float: right !important;
}
.link_font {
    color: #ffffff
}
</style>