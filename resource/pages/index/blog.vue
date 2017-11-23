<template>
    <div class="blog_main_content">
        <!-- 导航栏 -->
        <page-nav  active-name="3"></page-nav>
        <!-- 主要内容 -->
        <Row class="blog_content main_content">
            <Col span=24>
                <p class="title">博客还在开发中呢...</p>
            </Col>
        </Row>
    </div>
</template>
<script>
    import Nav from "components/nav";
    export default {
        name: "Blog",
        data () {
            return {
                theme1: 'dark'
            }
        },
        components: {
            "page-nav": Nav
        }
    }
</script>
<style rel="stylesheet/scss" lang="scss">
    @import "../../assets/common";
    .blog_content {
        font-size: 25px;
        text-align: center;
        margin: auto 0;
        p {
            color: #ffffff;
            text-align: center;
            padding: 10px 0px;
        }
    }
</style>