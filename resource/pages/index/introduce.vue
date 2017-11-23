<template>
  <div>
    <!-- 导航栏 -->
    <page-nav  active-name="1"></page-nav>
    <!-- 主要内容 -->
    <Row type="flex" class="introduce_content main_content" justify="center">
      <Col class="sub_content" :span="20">
        <div style="background:#eee;padding:20px;margin-bottom:40px">
            <Card :bordered="false" class="info">
                <p slot="title">关于我</p>
                <p class="info_self">
                  我叫 李川-男-25岁
                </p>
                <P class="info_self">
                  毕业于 重庆邮电大学
                </P>
                <P class="info_self">
                  联系我 leolichuan@qq.com
                </P>
                <p class="info_self">
                  <a href="https://github.com/leoDreamer">
                    <Icon type="social-github"></Icon>
                    Github
                  </a>
                  <a href="https://segmentfault.com/u/leodreamer">
                    <Icon type="social-foursquare"></Icon>
                    segmentfault
                  </a>
                </p>
            </Card>
        </div>
        <div style="background:#eee;padding:20px;margin-bottom:40px">
          <Card :bordered="false" class="info">
            <p slot="title">专业技能</p>
            <div v-for="s in skill" :key="s.id">
              {{s.description}}
              <Progress :percent="s.degree" status="active"></Progress>
            </div>
          </Card>
        </div>
        <div style="background:#eee;padding:20px;margin-bottom:40px">
          <Card :bordered="false" class="info">
            <p slot="title">工作经历与项目</p>
            <Timeline>
              <TimelineItem v-for="e in experience" :key="e.id">
                  <p class="time">{{e.time}}</p>
                  <p>主要工作: </p>
                  <p v-for="w in e.works" :key="w.id">&nbsp&nbsp&nbsp&nbsp{{w}}</p>
                  <div class="content" v-for="p in e.projects" :key="p.id">
                    <p class="name">{{p.name}} - {{p.position}}</p>
                    <p>项目描述: {{p.description}}</p>
                    <p>项目地址: {{p.link}}</p>
                    <p>项目工作: {{p.workDescription}}</p>
                  </div>
              </TimelineItem>
            </Timeline>
          </Card>
        </div>
      </Col>
    </Row>
  </div>
</template>
<script>
    import Nav from "components/nav";
    export default {
        name: "Introduce",
        data () {
          return {
              theme3: 'dark',
              showContent: 1,
              skill: this.$store.state.introduce.skills,
              experience: this.$store.state.introduce.experiences
          }
        },
        components: {
            "page-nav": Nav
        }
    }
</script>
<style rel="stylesheet/scss" lang="scss">
    @import "../../assets/common";
    .introduce_content {
      .sub_content {
        margin: 40px 20px 0px 20px;
        background-color: #ffffff;
        padding: 40px 40px 40px 40px;
        border-radius: 5px;
        min-height: 85%;
        .time{
          font-size: 14px;
          font-weight: bold;
        }
        .content{
            padding-left: 5px;
            .name {
              font-weight: bold;
            }
        }
        .info {
          .info_self {
            line-height: 30px;
          }
          i {
            font-size: 18px;
          }
          a {
            color: #333;
          }
        }
      }
    }
</style>