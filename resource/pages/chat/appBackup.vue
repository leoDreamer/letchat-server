<template>
    <div class="chat_out_content">
        <comp-login ref="login"></comp-login>
        <comp-cover></comp-cover>
        <div class="chat_mian_content">
            <div class="header">
                <span @click="friendsList" v-show="showChat">好友</span>
                <Icon type="chevron-left" @click.native="friendsList"
                    v-show="!showChat" class="back">
                </Icon>
                <span style="font-size:20px">ChatRoom</span>
                <span >{{user.name}}</span>
            </div>
            <div class="chat_content" id="chat_conent"  v-show="showChat">
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
            <div class="chat_content firends_content" v-show="!showChat">
                <ul>
                    <li>在线总人数: {{onlineUsers.length}} 人</li>
                    <li v-for="u in onlineUsers">{{u.name}}</li>
                </ul>
            </div>
            <Input
                v-model="msg" @on-click="sendMsg" @on-enter="sendMsg"
                icon="ios-paperplane" placeholder="输入信息"
                class="input" size="large" v-show="showChat">
            </Input>
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
                msg: ""
            }
        },
        computed: mapState({
            user: state => state.user,
            showChat: state => state.show.chat,
            onlineUsers: state => state.chat.onlineUsers,
            msgs: state => state.chat.msgs
        }),
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
                    value: true
                });
                this.$store.commit("SHOW_PATCH", {
                    key: "cover",
                    value: true
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
<style rel="stylesheet/scss" lang="scss">
    .chat_out_content {
        width: 100%;
        height: 100%;
        background-color: #f1f1f1;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .chat_mian_content {
        max-width: 450px;
        max-height: 800px;
        width: 100%;
        height: 99%;
        background-color: #ecebeb;
        overflow: hidden;
        display: flex;
        flex-direction: column;
        .header{
            width: 100%;
            padding: 10px 10px;
            background-color: #3a3838;
            color: #ffffff;
            display: flex;
            justify-content: space-between;
            user-select: none;
            span {
                line-height: 20px;
            }
            .back {
                line-height: 20px;
                width: 20px;
            }
        }
        .firends_content{
            text-align: center;
            li {
                line-height: 30px;
                border-bottom: 1px solid #dad4d4;
            }
        }
        .chat_content {
            width: 100%;
            flex-grow: 1;
            padding: 20px 20px 20px 0px;
            background-color: #ecebeb;
            overflow-y: scroll;
            margin-left: 20px;
            .avatar {
                margin-right: 10px;
            }
            .content_right {
                display: inline-block;
            }
            .content_left {
                display: inline-block;
            }
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
    }
</style>