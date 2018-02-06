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
            >
                <div class="CWS_avator">
                    <Avatar shape="square" icon="person" size="large" />
                    <span>Leo_李川</span>
                </div>
                <Input
                    v-model="search"
                    icon="android-search"
                    placeholder="搜索"
                    class="search"
                />
                <div class="feature">
                    <Badge :dot="feature.dot.indexOf('chat') > -1">
                        <Icon
                            type="chatbox-working"
                            @click.native.stop="featureChange('feature', 'chat')"
                            :class="['sepreat_line', feature.type === 'chat' ? 'is_feature_select' : '']"
                        />
                    </Badge>
                    <Badge :dot="feature.dot.indexOf('firend') > -1">
                        <Icon
                            type="person-stalker"
                            @click.native.stop="featureChange('feature', 'firend')"
                            :class="['sepreat_line', feature.type === 'firend' ? 'is_feature_select' : '']"
                        />
                    </Badge>
                    <Icon
                        type="android-settings"
                        @click.native.stop="featureChange('feature', 'set')"
                        :class="['sepreat_line', feature==='set' ? 'is_feature_select' : '']"
                    />
                </div>
                <div v-if="feature.type === 'chat'">
                    <div 
                        v-for="(msg, index) in msgs"
                        @click.stop="featureChange('chat', index)"
                        :class="['chats', index === selectChatIndex ? 'is_chat_select' : '']"
                    >
                        <Badge :dot='msg.dot'>
                            <Avatar shape="square" icon="person" size="large" />
                        </Badge>
                        <div class="chat_intro">
                            <p>
                                <span class="name">{{msg.name}}</span>
                                <span class="time">{{msg.time}}</span>
                            </p>
                            <span class="msg">{{msg.name}}: {{msg.msg.slice(0, 10)}}</span>
                        </div>
                    </div>
                </div>
                <div v-if="feature.type === 'firend'">
                    <div
                        v-for="(firend, index) in firends"
                        @click.stop="featureChange('firend', index)"
                        :class="['firends', index === selectFirendIndex ? 'is_firend_select' : '']"
                    >
                        <Avatar shape="square" icon="person"/>
                        <span>{{firend.name}}</span>
                    </div>
                </div>
                <div class="set"></div>
            </div>
            <div class="chat_wrapper_content">
                <div class="header">
                    <span style="font-size:20px">ChatRoom</span>
                </div>
                <div class="msg_warp">
                    <div class="msg_warpper"  v-for="(msg, index) in msgs" key="msg + index">
                        <Avatar shape="square" icon="person" size="large" class="avatar"/>
                        <div class="msg_content">
                            <p v-if="msg.chatMember > 2">{{user.name}}</p>
                            <span :class="['msg', msg.name === user.name ? 'self_msg' : '']">{{msg.msg}}</span>
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
                    ></textarea>
                    <Button
                        type="ghost"
                        shape="circle"
                        size="small"
                        class="send_button"
                    >发送</Button>
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
                search: "",
                siderShow: window.screen.width > 420,
                feature: {
                    type: 'chat',
                    dot: []
                },
                selectChatIndex: '',
                selectFirendIndex: '',
                firends: [
                    {
                        name: "Leo_李川"
                    }, {
                        name: "鑫儿"
                    }, {
                        name: "喜悦"
                    }
                ]
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
                    value: true
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
                if (window.screen.width > 420) return;
                this.siderShow = !this.siderShow
            },
            featureChange: function (type, val) {
                debugger
                switch (type) {
                    case "feature":
                        this.feature.type = val;
                        break;
                    case "chat":
                        this.selectChatIndex = val;
                        break;
                    case "firend":
                        this.selectFirendIndex = val;
                        break;
                    default:
                        break;
                }
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
    text-align: center;
    .CWS_avator {
        text-align: left;
        padding: 20px;
        color: #ffffff;
        font-size: 20px;
        span {
            margin-left: 10px;
        }
    }
    .search {
        width: 90%;
        /deep/ .ivu-input {
            background-color: #26292e;
            outline: none;
            border: 0px;
            padding-left: 20px;
            color: #fff;
        }
    }
    .feature {
        color: #ffffff;
        font-size: 30px;
        display: flex;
        padding: 10px 20px;
        justify-content: space-around;
        border-bottom: 1px solid #26292e;
        i {
            width: 30%;
        }
        .sepreat_line {
            border-right: 1px solid #26292e;
        }
        .is_feature_select {
            color: green;
        }
    }
    .chats {
        text-align: left;
        color: #ffffff;
        padding: 10px;
        height: 70px;
    }
    .chat_intro {
        display: inline-block;
        vertical-align: middle;
        height: 50px;
        width: 200px;
        margin-left: 10px;
        p {
            line-height: 20px;
            font-size: 14px;
            padding-bottom: 10px;
        }
        .time {
            display: inline-block;
            float: right;
        }
        .msg {
            color: #888;
        }
    }
    .firends {
        text-align: left;
        padding: 10px 20px;
        color: #fff;
        font-size: 14px;
        span {
            margin-left: 10px;
        }
    }
    .is_chat_select {
        background-color: rgba(99, 95, 95, 0.3);
        .msg {
            color: #fff;
        }
    }
    .is_firend_select {
        background-color: rgba(99, 95, 95, 0.3);
    }
}
.chat_wrapper_content {
    display: flex;
    overflow-x: hidden;
    flex-direction: column;
    height: 100%;
    background-color: #ffffff;
    .header {
        height: 50px;
        line-height: 50px;
        width: 100%;
        background-color: #f1f1f1;
        text-align: center;
    }
    .input_content {
        width: 100%;
        // display: flex;
        // flex-direction: column;
        .tool {
            background-color: #fff;
            width: 100%;
            padding: 3px 20px 6px 20px;
            i {
                margin-right: 6px;
            }

        }
        .input {
            width: 100%;
            // flex-grow: 1;
            border: 0px;
            padding: 10px;
            min-height: 62px;
        }
        .send_button {
            align-self: flex-end;
            width: 70px;
            min-height: 24px;
            margin: 0px 10px 10px 0px;
            float: right;
        }
        textarea {
            outline: none;
            font-size: 16px;
            resize: none;
        }
    }
}
.msg_warp {
    background-color: #eeeeee;
    flex-grow: 1;
    width: 100%;
    padding: 20px;
    border-top: 1px solid #d6d6d6;
    border-bottom: 1px solid #d6d6d6;
    overflow: auto;
    .msg_warpper {
        padding: 10px 0px;
    }
    .msg_content {
        display: inline-block;
        vertical-align: top;
        max-width: 80%;
        margin-left: 10px;
        p {
            color: #9c9898;
        }
        .self_msg {
            background-color: greenyellow;
        }
    }
    .msg {
        display: inline-block;
        background-color: #fff;
        padding: 10px;
        border-radius: 5px;
    }
}
@media (min-width: 420px) {
    .CWS_hidden_icon {
        display: none;
    }
    .input_content {
        height: 200px;
    }
    .input_content .tool {
        height: 40px;
        font-size: 25px;
        line-height: 40px;
    }
}
@media (max-width: 420px) {
    .CWS_hidden_icon {
        display: inline-block;
    }
    .input_content {
        height: 150px;
    }
    .input_content .tool {
        height: 36px;
        line-height: 36px;
        font-size: 20px;
    }
}
</style>