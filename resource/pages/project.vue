<template>
    <div class="project_main_content">
        <!-- 导航栏 -->
        <page-nav active-name="2"></page-nav>
        <!-- 主要内容 -->
        <Row class="project_content main_content">
            <Col span=24>
                <p class="title">实验室还在开发中呢...</p>
            </Col>
        </Row>
    </div>
</template>
<script>
    import Nav from "../components/nav";
    export default {
        name: "Project",
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
  @import "../assets/common.scss";
  .project_main_content {
      background-color: $gray;
  }
  .project_content {
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