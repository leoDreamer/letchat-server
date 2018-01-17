<template>
    <div class="nav_content">
        <!-- 导航栏 -->
        <Menu mode="horizontal" :theme="theme1" active-name="1" class="index_nav">
            <span class="logoSpan"  @click="navChange('/')">
                {{user.name}}
            </span>
            <Icon type="android-arrow-dropdown" style="color:#fff;z-index:101" @click.native="converLoginShow"></Icon>
            <MenuItem name="1" class="index_nav_item">
                <span class="link_font" @click="navChange('/introduce')">
                    <Icon type="ios-paper"></Icon>
                    关于我
                </span>
            </MenuItem>
            <MenuItem name="2">
                <span @click="navChange('/project')">
                    <Icon type="ios-people"></Icon>
                    实验室
                </span>
            </MenuItem>
            <MenuItem name="3">
                <span @click="navChange('/blog')">
                    <Icon type="ios-people"></Icon>
                    博客
                </span>
            </MenuItem>
            <ul v-show="loginTip" class="login_tip">
                <li @click="login('in')">登录</li>
                <li @click="login('out')">退出</li>
            </ul>
        </Menu>
        <comp-cover></comp-cover>
        <comp-login></comp-login>
    </div>
</template>
<script>
    import Login from "./login";
    import Cover from "./cover"
    export default {
        name: "PageNav",
        data () {
            return {
                theme1: 'dark'
            }
        },
        components: {
            "comp-login": Login,
            "comp-cover": Cover
        },
        methods: {
            converLoginShow: function() {
                if (this.$store.state.show.loginTip) {
                    this.$store.commit("SHOW_PATCH", { key: "cover", value: false })
                    this.$store.commit("SHOW_PATCH", { key: "loginTip", value: false })
                } else {
                    this.$store.commit("SHOW_PATCH", { key: "cover", value: true })
                    this.$store.commit("SHOW_PATCH", { key: "loginTip", value: true })
                }
            },
            login: function(type) {
                this.loginTipShow = false;
                if (type === "in") {
                    if (this.$store.state.user.id) {
                        this.$Message.info('您已登录,请先退出登录');
                        return;
                    }
                    this.$store.commit("SHOW_PATCH", { key: "cover", value: true })
                    this.$store.commit("SHOW_PATCH", { key: "loginContent", value: true })
                    this.$store.commit("SHOW_PATCH", { key: "loginTip", value: false })
                } else {
                    this.axios.post("/auth/logout");
                    this.$store.dispatch("deleteUser");
                    this.$store.commit("SHOW_PATCH", { key: "cover", value: false })
                    this.$store.commit("SHOW_PATCH", { key: "loginTip", value: false })
                }
            },
            navChange: function(path) {
                window.location.href = "http://" + window.location.host + `/index#${path}`
            }
        },
        computed: {
            user: function () {
                return this.$store.state.user;
            },
            loginTip () {
                return this.$store.state.show.loginTip;
            }
        }
    }
</script>
<style rel="stylesheet/scss" lang="scss">
    @import "../assets/common";
    .nav_content {
        width: 100%;
    }
    .index_nav {
        width: 100%;
        user-select: none;
        .logoSpan {
            padding: 0px 20px;
            font-size: 30px;
            color: #ffffff;
        }
        span {
            color: #ffffff;
        }
    }
    .ivu-menu-item {
        float: right !important;
    }
    .login_tip{
        width: 100px;
        background-color: #ffffff;
        color: $gray;
        z-index: 101;
        text-align: center;
        padding: 10px 10px;
        border-radius: 5px;
        margin-left: 10px;
        li {
            border-bottom: 1px solid $gray;
            height: 30px;
            line-height: 30px;
        }
        li:hover {
            font-size: 16px;
        }
    }
</style>