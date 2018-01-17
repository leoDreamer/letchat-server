<template>
    <div class="project_main_content">
        <!-- 导航栏 -->
        <page-nav active-name="2"></page-nav>
        <!-- 主要内容 -->
        <Row class="project_content main_content"  type="flex" justify="space-around">
            <Col span=20 class="col" justify="space-around">
                <Col span=5 align="start" class="pro_content" v-for="(p, index) in projects"
                    @click.native="goPro(p.path)" :key="p.name" :style="{ backgroundColor: colors[index % 4] }">
                    <p class="title">{{p.name}}</p>
                    <div class="info_self">{{p.description}}</div>
                </Col>
            </Col>
        </Row>
    </div>
</template>
<script>
    import Nav from "components/nav";
    export default {
        name: "Project",
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
            projects () {
                return this.$store.state.information.projects;
            }
        },
        components: {
            "page-nav": Nav
        },
        methods: {
            goPro (path) {
                window.open(path);
            }
        }
    }
</script>
<style rel="stylesheet/scss" lang="scss">
  @import "../../assets/common";
    .project_content {
            text-align: center;
            padding: 40px 0 40px 0;
            .col {
                background-color: #ffffff;
                border-radius: 10px;
                display: flex;
                justify-content: space-around;
                flex-wrap: wrap;
                align-items: flex-start;
                padding: 20px 10px;
            }
            .title {
                color: #ffffff;
                text-align: center;
                padding: 10px 0px;
                font-size: 20px;
                font-weight: bold;
                border-bottom: 1px solid #ffffff;
            }
            .pro_content {
                height: 200px;
                border-radius: 5px;
                overflow: hidden;
                color: #ffffff;
                padding: 0px 10px;
                box-shadow: 10px 10px 5px #bbb7b7;
            }
            .info_self {
                padding: 10px 0px;
            }

    }
</style>