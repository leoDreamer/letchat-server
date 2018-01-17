<template>
    <div class="blog_main_content">
        <!-- 导航栏 -->
        <page-nav  active-name="3"></page-nav>
        <!-- 主要内容 -->
        <Row class="blog_content" type="flex" justify="space-around">
            <Col span=20 class="col">
                <div class="blog_main_content" v-for="b in blogs" key="b.path">
                    <a class="title"  @click="goBlog(b.path)">{{b.title}}</a>
                    <div class="content">
                        <span></span>
                        {{b.content.slice(0, 200)}}
                        ......
                    </div>
                    <div class="manage">
                        <span class="date">{{b.publish_date.slice(0, 10)}}</span>
                        <span>阅读: {{b.hits}}</span>
                        <span>点赞: {{b.vote}}</span>
                        <span>收藏: {{b.save}}</span>
                    </div>
                </div>
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
                colors: [
                    "#fd6a7f",
                    "#70c3ff",
                    "#7f8ea0",
                    "#89d04f"
                ]
            }
        },
        computed: {
            blogs () {
                return this.$store.state.information.blogs;
            }
        },
        components: {
            "page-nav": Nav
        },
        methods: {
            goBlog: function (path) {
                const host = "https://segmentfault.com/";
                window.open(host + path);
            }
        }
    }
</script>
<style rel="stylesheet/scss" lang="scss">
    @import "../../assets/common";
    .blog_content {
        text-align: center;
        min-height: 900px;
        padding: 40px 0 40px 0;
        .col {
            border-radius: 10px;
            background-color: #ffffff;
            padding: 0px 50px 40px 50px;
        }
        .blog_main_content{
            padding: 20px 10px;
            border-bottom: 1px dashed #ddd;
            display: flex;
            justify-content: flex-start;
            flex-wrap: wrap;
            align-items: flex-start;
            text-align: start;
            .title {
                font-size: 20px;
                line-height: 24px;
                font-weight: bold;
                padding: 10px 0px;
                color: #333333;
            }
            .title:hover {
                font-size: 22px;
            }
            .manage {
                text-align: right;
                width: 100%;
                span {
                    padding: 10px 5px;
                }
            }
            .content {
                margin: 10px;
                font-size: 16px;
                text-align: left;
                span {
                    width: 20px;
                    display: inline-block;
                }
            }
        }
    }
</style>