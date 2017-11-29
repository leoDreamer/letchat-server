<template>
    <div class="chat_out_content">
        <comp-login v-if="show.login"></comp-login>
        <div class="chat_mian_content">
            <div class="header">
                <span>好友</span>
                <span style="font-size:20px">ChatRoom</span>
                <span >{{user.nickName}}</span>
            </div>
            <div class="chat_content">
                <div class="content" v-for="(msg, index) in msgs" key="msg + index">
                    <p>{{msg.user}} :</p>
                    <span class="msg_content">{{msg.msg}}</span>
                </div>
            </div>
            <Input v-model="msg" icon="ios-paperplane" placeholder="输入信息" class="input" size="large"></Input>
        </div>
    </div>
</template>
<script>
    import Login from "components/login";
    export default {
        name: "App",
        data () {
            return {
                user: "",
                show: {
                    login: false
                },
                msg: "",
                msgs: [
                    {
                        user: "用户1",
                        msg: "握草握草握草握草握草握草握草握草握草握草"
                    },{
                        user: "用户1",
                        msg: "握草握草握草握草握草握草握草握草握草握草握草握草握草握草握草握草握草握草握草握草握草握草握草握草握草握草握草握草握草握草"
                    },{
                        user: "用户1",
                        msg: "握草握草握草握草握草握草握草握草握草握草"
                    }
                ]
            }
        },
        components: {
            "comp-login": Login
        },
        mounted () {
            if (!global.user) {
                this.show.login = true;
            } else {
                this.$set(this, "user", global.user);
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
        background-color: #9e9e9e;
        border: 1px solid #333;
        border-radius: 10px;
        overflow: hidden;
        display: flex;
        flex-direction: column;
        .header{
            width: 100%;
            padding: 20px 20px;
            background-color: #3a3838;
            color: #ffffff;
            display: flex;
            justify-content: space-between;
            user-select: none;
            span {
                line-height: 20px;
            }
        }
        .chat_content {
            width: 100%;
            flex-grow: 1;
            padding: 20px 20px;
            background-color: #ecebeb;
            .content {
                margin: 10px 0px;
            }
            .msg_content {
                display: inline-block;
                padding: 4px 6px;
                background-color: #ffffff;
            }
        }
    }
</style>