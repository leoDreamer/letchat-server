<template>
    <div>
        <!-- 导航栏 -->
        <Menu mode="horizontal" :theme="theme1" active-name="1" class="index_nav">
            <span>
                <router-link to="/" class="link_font">
                    {{$store.state.user.name}}
                </router-link>
            </span>
            <Icon type="android-arrow-dropdown" style="color:#fff;z-index:101" @click.native="converLoginShow"></Icon>
            <MenuItem name="1" class="index_nav_item">
                <router-link to="/introduce" class="link_font">
                    <Icon type="ios-paper"></Icon>
                    关于我
                </router-link>
            </MenuItem>
            <MenuItem name="2">
                <router-link to="/project" class="link_font">
                    <Icon type="ios-people"></Icon>
                    实验室
                </router-link>
            </MenuItem>
            <MenuItem name="3">
                <router-link to="/blog" class="link_font">
                    <Icon type="ios-people"></Icon>
                    博客
                </router-link>
            </MenuItem>
            <ul v-show="loginTipShow" class="login_tip">
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
                theme1: 'dark',
                loginTipShow: false
            }
        },
        components: {
            "comp-login": Login,
            "comp-cover": Cover
        },
        mounted () {
            if(global.user) this.$store.commit("setUser", global.user);
            this.$on("COVER_CLOSE", () => {
                this.loginTipShow = false;
                this.$root.$emit("LOGIN_CLOSE")
            })
        },
        methods: {
            converLoginShow: function() {
                this.loginTipShow = !this.loginTipShow;
                this.$root.$emit("COVER_SHOW")
            },
            coverClick: function() {
                this.$root.$emit("COVER_CLOSE")
            },
            login: function(type) {
                this.loginTipShow = false;
                if (type === "in") {
                    if (this.$store.state.user.id) {
                        this.$Message.info('您已登录,请先退出登录');
                        return;
                    }
                    this.$root.$emit("LOGIN_SHOW")
                } else {
                    this.axios.post("/auth/logout");
                    this.$store.commit("setUser", { name: "Leo" });
                    this.$root.$emit("COVER_CLOSE")
                }
            }
        }
    }
</script>
<style rel="stylesheet/scss" lang="scss">
    @import "../assets/common";
    .index_nav {
        width: 100%;
        user-select: none;
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