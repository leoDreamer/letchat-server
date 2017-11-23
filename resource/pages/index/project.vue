<template>
    <div class="project_main_content">
        <!-- 导航栏 -->
        <page-nav active-name="2"></page-nav>
        <!-- 主要内容 -->
        <Row class="project_content main_content"  type="flex" justify="center">
            <Col span=20 class="col" align="start">
                <div class="card_out" v-for="p in projects" :key="p.id" @click="goPro(p.path)">
                    <div  class="card_inside">
                        <p class="title">{{p.name}}</p>
                        <div class="info_self">{{p.description}}</div>
                    </div>
                </div>
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
                theme1: 'dark',
                projects: this.$store.state.projects
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
      p {
            color: #333333;
            text-align: center;
            padding: 10px 0px;
      }
      .col {
        padding: 40px 10px 40px 10px;
        border-radius: 10px;
        background-color: #ffffff;
        min-height: 85%;
      }
      .card_out {
          background: #eee;
          padding: 10px;
          margin: 10px;
          width: 20%;
          border-radius: 5px;
          display: inline-block;
          .title {
              border-bottom: 1px solid #eee;
              font-size: 18px;
              font-weight: bold;
          }
          .info_self {
              min-height: 50px;
              padding: 10px;
          }
      }
      .card_inside {
          background: #ffffff;
      }
  }
</style>