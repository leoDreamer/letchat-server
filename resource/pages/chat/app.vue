<template>
    <div class="chat_wrap">
        <comp-login ref="login"></comp-login>
        <comp-cover></comp-cover>
        <div class="chat_wrapper">
            <Icon
                type="navicon-round"
                class="CWS_hidden_icon"
                @click.native="sider"
            />
            <div
                class="chat_wrapper_sider"
                v-show="siderShow"
                @click="sider"
            ></div>
            <div class="chat_wrapper_content">
                <div class="header">
                    <span style="font-size:20px">ChatRoom</span>
                </div>
                <div class="msg_content">
                    <div class="content" v-for="(msg, index) in msgs" key="msg + index">
                        <div v-if="msg.type === 'u'" class="words_content">
                            <Avatar shape="square" icon="person" size="large" class="avatar"/>
                            <div class="content_right">
                                <p v-bind:class="{'user_self': msg.user === user.name}">{{msg.user}} :</p>
                                <span class="msg_content">{{msg.msg}}</span>
                            </div>
                        </div>
                        <div v-if="msg.type === 's'" class="system_msg">
                            <span>系统消息: {{msg.msg}}</span>
                        </div>
                    </div>
                </div>
                <div class="input_content">
                    <div class="tool">
                        <Icon type="happy-outline"></Icon>
                        <Icon type="ios-folder-outline"></Icon>
                    </div>
                    <textarea
                        v-model="msg"
                        @on-click="sendMsg"
                        @on-enter="sendMsg"
                        icon="ios-paperplane"
                        placeholder="输入信息"
                        class="input"
                        size="large"
                        type="textarea"
                    />
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import Login from "components/login";
    import Cover from "components/cover";
    import { mapState } from 'vuex'

    export default {
        name: "App",
        data() {
            return {
                msg: "",
                siderShow: window.screen.width > 420
            }
        },
        computed: Object.assign({},
            mapState({
                user: state => state.user,
                showChat: state => state.show.chat,
                onlineUsers: state => state.chat.onlineUsers,
                msgs: state => state.chat.msgs
            }), {}),
        components: {
            "comp-login": Login,
            "comp-cover": Cover
        },
        mounted () {
            this.$store.dispatch("createUser", {});

            // 未登录用户必须先登录
            if (!this.user.id) {
                this.$store.commit("SHOW_PATCH", {
                    key: "loginContent",
                    value: false
                });
                this.$store.commit("SHOW_PATCH", {
                    key: "cover",
                    value: false
                })
            }

            // 监听消息推送 - 新消息
            this.$store.dispatch("patchMsgs");

            // 监听消息推送 - 新用户
            this.$store.dispatch("userJoin");

            // 监听消息推送 - 在线好友
            this.$store.dispatch("patchOnlineUser");
        },
        methods: {
            sider: function() {
                this.siderShow = !this.siderShow
            },
            friendsList: function() {
                this.$store.commit("SHOW_PATCH", {
                    key: "chat",
                    value: !this.showChat
                });
            },
            sendMsg: function () {
                this.$store.dispatch("createMsg", this.msg);
                this.msg = "";
            }
        },
        watch: {
            "$store.state.user": {
                handler: function (val, oldVal) {
                    this.$store.dispatch("userLogin", val);
                },
                deep: true
            },
            msgs: function(msgs) {
                this.$nextTick(() => {
                    document.getElementById('chat_conent').scrollTop = document.getElementById('chat_conent').scrollHeight;
                })
            }
        }
    }
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.chat_wrap {
    width: 100%;
    height: 100%;
    background-color: #c4c5c5;
    display: flex;
    justify-content: center;
    align-items: center;
    .CWS_hidden_icon {
        position: absolute;
        left: 10px;
        top: 10px;
        font-size: 30px;
    }
}
.chat_wrapper {
    max-width: 1200px;
    max-height: 800px;
    width: 100%;
    height: 100%;
    background-color: #333;
}
.chat_wrapper_sider {
    width: 300px;
    height: 100%;
    background-color: #2e3238;
    float: left;
}
.chat_wrapper_content {
    display: flex;
    flex-direction: column;
    height: 100%;
    .header {
        height: 50px;
        line-height: 50px;
        width: 100%;
        background-color: #f1f1f1;
        text-align: center;
    }
    .msg_content {
        background-color: #eeeeee;
        flex-grow: 1;
        width: 100%;
        border-top: 1px solid #d6d6d6;
        border-bottom: 1px solid #d6d6d6;
        .content {
            margin: 10px 0px;
        }
        .words_content {
            vertical-align: top;
        }
        .msg_content {
            display: inline-block;
            padding: 4px 6px;
            background-color: #ffffff;
        }
        .user_self {
            color: blue
        }
        .system_msg {
            text-align: center;
            color: red;
        }
    }
    .input_content {
        width: 100%;
        background-color: aqua;
        display: flex;
        flex-direction: column;
        .tool {
            background-color: #fff;
            width: 100%;
            padding-left: 20px;
            i {
                margin-right: 6px;
            }

        }
        .input {
            width: 100%;
            flex-grow: 1;
            border: 0px;
            padding: 10px
        }
    }
}
@media (min-width: 420px) {
    .CWS_hidden_icon {
        display: none;
    }
    .input_content {
        height: 100px;
    }
    .input_content.input {
        height: 40px;
        font-size: 30px;
        line-height: 40px;
    }
}
@media (max-width: 420px) {
    .CWS_hidden_icon {
        display: inline-block;
    }
    .input_content {
        height: 100px;
    }
    .input_content.input {
        height: 20px;
        line-height: 20px;
        font-size: 16px;
    }
}
</style>