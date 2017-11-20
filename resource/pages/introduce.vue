<template>
  <div>
    <!-- 导航栏 -->
    <page-nav></page-nav>
    <!-- 主要内容 -->
    <Row type="flex" align="middle" class="introduce_content main_content" justify="center">
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
            JavaScript: 深刻理解对象、函数、闭包、原型、继承、事件流等机制
            <Progress :percent="75" status="active"></Progress>
            Nodejs: 熟悉基础和特性,并对其架构有所了解
            <Progress :percent="65" status="active"></Progress>
            Koa2: 熟悉相关技术栈,并能用其进行服务端开发
            <Progress :percent="70" status="active"></Progress>
            DB: 使用Mysql/mongodb ORM框架进行数据存储处理
            <Progress :percent="60" status="active"></Progress>
            Vuejs: 使用技术栈进行开发,对其部分细节有深入了解
            <Progress :percent="60" status="active"></Progress>
            Other: 前端兼容、优化、安全有一定了解
            <Progress :percent="50" status="active"></Progress>
          </Card>
        </div>
        <div style="background:#eee;padding:20px;margin-bottom:40px">
          <Card :bordered="false" class="info">
            <p slot="title">工作经历与项目</p>
            <Timeline>
              <TimelineItem>
                  <p class="time">2016.01-2016.06</p>
                  <p class="content">Apple I 问世</p>
              </TimelineItem>
              <TimelineItem>
                  <p class="time">2016.06-2017.01</p>
                  <p class="content">发布 Macintosh</p>
              </TimelineItem>
              <TimelineItem>
                  <p class="time">2017.01-至今</p>
                  <p class="content">发布 iPhone</p>
              </TimelineItem>
            </Timeline>
          </Card>
        </div>
      </Col>
    </Row>
  </div>
</template>
<script>
    import Nav from "../components/nav";
    export default {
        name: "Introduce",
        data () {
            return {
                theme3: 'dark',
                showContent: 1
            }
        },
        components: {
            "page-nav": Nav
        }
    }
</script>
<style rel="stylesheet/scss" lang="scss">
    .introduce_content {
      background-color: #777777;
      .sub_content {
        height: 100%;
        margin: 40px 20px 0px 20px;
        background-color: #ffffff;
        padding: 40px 40px 0px 40px;
        border-radius: 5px;
        .time{
          font-size: 14px;
          font-weight: bold;
        }
        .content{
            padding-left: 5px;
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