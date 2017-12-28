<template>
    <div class="chat_out_content">
        <comp-login></comp-login>
        <comp-cover></comp-cover>
        <div class="chat_mian_content">
            <div class="header">
                <span @click="friendsList" v-show="showChat">好友</span>
                <Icon type="chevron-left" @click.native="friendsList" v-show="!showChat" class="back"></Icon>
                <span style="font-size:20px">ChatRoom</span>
                <span >{{user.name}}</span>
            </div>
            <div class="chat_content" id="chat_conent"  v-show="showChat">
                <div class="content" v-for="(msg, index) in msgs" key="msg + index">
                    <div v-if="msg.type === 'u'">
                        <p v-bind:class="{'user_self': msg.user === user.name}">{{msg.user}} :</p>
                        <span class="msg_content">{{msg.msg}}</span>
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
            <Input v-model="msg" icon="ios-paperplane" placeholder="输入信息" class="input" size="large" v-show="showChat">
            </Input>
        </div>
    </div>
</template>
<script>
    import Login from "components/login";
    import Cover from "components/cover";
    import io from 'socket.io-client';
    const socket = io();

    export default {
        name: "App",
        data () {
            return {
                user: {},
                showChat: true,
                msg: "",
                onlineUsers: [],
                msgs: [
                    {
                        msg: "socket聊天室demo",
                        type: 's'
                    }
                ]
            }
        },
        components: {
            "comp-login": Login,
            "comp-cover": Cover
        },
        mounted () {
            // 将user信息注入到data
            if (!window.global.user) {
                this.$root.$emit("LOGIN_SHOW")
                this.$root.$emit("COVER_SHOW")
                this.$root.$on("LOGIN_DONE", (data) =>{
                    this.$set(this, "user", data);
                })
            } else {
                this.$set(this, "user", window.global.user);
            }
            // 触发消息发送
            this.$children[this.$children.length - 1].$on("on-click", () => {
                if(this.msg === "") return this.$Message.info("请输入消息内容")
                socket.emit('message', {
                    userId: this.user.id,
                    name: this.user.name,
                    msg: this.msg
                });
                this.msg = "";
            })
            this.$children[this.$children.length - 1].$on("on-enter", () => {
                if(this.msg === "") return this.$Message.info("请输入消息内容")
                socket.emit('message', {
                    userId: this.user.id,
                    name: this.user.name,
                    msg: this.msg
                });
                this.msg = "";
            })

            // 监听消息推送
            socket.on("message", (data) => {
                this.msgs.push({
                    user: data.name,
                    type: 'u',
                    msg: data.msg
                })
            })

            // 监听消息推送
            socket.on("login", (data) => {
                this.msgs.push({
                    type: 's',
                    msg: `${data.name}加入了聊天`
                })
            })

            // 在线好友
            socket.on("online_user", (data) => {
                this.onlineUsers = [];
                data.users.map(u => {
                    this.onlineUsers.push(u);
                })
            })
        },
        methods: {
            friendsList: function() {
                this.showChat = !this.showChat
            }
        },
        watch: {
            user: function (newUser) {
                if (newUser) socket.emit('login', newUser)
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
            .content {
                margin: 10px 0px;
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