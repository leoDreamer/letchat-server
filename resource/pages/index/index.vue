<template>
    <div class="index_main_content">
        <!-- 导航栏 -->
        <page-nav></page-nav>
        <!-- 主要内容 -->
        <Row class="index_content main_content" type="flex" justify="center" align="middle">
            <page-visit></page-visit>
            <transition name="content-show">
                <Col span=24 v-if="show" style="height:300px">
                    <p class="title">Hi, &nbsp&nbsp I &nbsp&nbsp am &nbsp&nbsp Leo</p>
                    <p class="sub_title">- Web Developer -</p>
                    <p class="introduce">我是Leo,是一个Web开发者,目前在重庆从事Node/前端方向开发</p>
                    <router-link to="/introduce">
                        <Button type="ghost" class="more">
                            关于我
                        </Button>
                    </router-link>
                </Col>
            </transition>
        </Row>
    </div>
</template>
<script>
    import Nav from "components/nav";
    import Visit from "components/visit";
    export default {
        name: "Index",
        data () {
            return {
                show: false
            }
        },
        mounted () {
            this.show = true;
        },
        components: {
            "page-nav": Nav,
            "page-visit": Visit
        }
    }
</script>
<style rel="stylesheet/scss" lang="scss">
    .index_main_content {
        background: url("../../assets/main_bg.jpg");
        background-repeat: no-repeat;
        background-size: 100% 100%;
        overflow: hidden;
    }
    .index_content {
        font-size: 25px;
        text-align: center;
        margin: auto 0;
        user-select: none;
        p {
            color: #ffffff;
            text-align: center;
            padding: 10px 0px;
        }
        .title {
            font-family: "Microsoft YaHei";
            font-size: 40px;
        }
        .more {
            border: 2px solid #f1b10a;
            padding: 10px 20px;
            color: #ffffff;
            a { 
                font-size: 15px;
                color: #ffffff;
            }
        }
    }
    .content-show-enter-active {
        transition: all 1s ease;
    }
    .content-show-enter {
        transform: translateX(30px);
        opacity: 0;
    }
</style>