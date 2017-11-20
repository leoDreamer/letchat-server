<template>
    <div class="index_main_content">
        <!-- 导航栏 -->
        <page-nav></page-nav>
        <!-- 主要内容 -->
        <Row type="flex" align="middle" class="index_content main_content" justify="center">
            <Col span=24>
                <p class="title">Hi, &nbsp&nbsp I &nbsp&nbsp am &nbsp&nbsp Leo</p>
                <p class="sub_title">- Web Developer -</p>
                <p class="introduce">我是Leo,是一个Web开发者,目前在重庆从事Node/前端方向开发</p>
                <router-link to="/introduce">
                    <Button type="ghost" class="more">
                        关于我
                    </Button>
                </router-link>
            </Col>
        </Row>
    </div>
</template>
<script>
    import Nav from "../components/nav";
    export default {
        name: "Index",
        data () {
            return {
                theme1: 'dark'
            }
        },
        components: {
            "page-nav": Nav
        },
        methods: {
            add: function () {
                this.$store.commit('increment')
            }
        }
    }
</script>
<style rel="stylesheet/scss" lang="scss">
.index_main_content {
  background: url("../assets/main_bg.jpg");
  background-repeat: no-repeat;
  background-size: 100% 100%;
}
.ivu-menu-item {
    float: right !important;
}
.main_content {
    width: 100%;
}
.index_content {
    font-size: 25px;
    text-align: center;
    height: 100%;
    margin-top: -60px;
    padding-top: 60px;
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
</style>