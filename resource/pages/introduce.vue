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
            <div v-for="s in skill">
              {{s.description}}
              <Progress :percent="s.degree" status="active"></Progress>
            </div>
          </Card>
        </div>
        <div style="background:#eee;padding:20px;margin-bottom:40px">
          <Card :bordered="false" class="info">
            <p slot="title">工作经历与项目</p>
            <Timeline>
              <TimelineItem v-for="e in experience">
                  <p class="time">{{e.time}}</p>
                  <p>主要工作: </p>
                  <p v-for="w in e.works">&nbsp&nbsp&nbsp&nbsp{{w}}</p>
                  <div class="content" v-for="p in e.projects">
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
    import Nav from "../components/nav";
    export default {
        name: "Introduce",
        data () {
            return {
                theme3: 'dark',
                showContent: 1,
                skill: [
                  {
                    description: "JavaScript: 深刻理解对象、函数、闭包、原型、继承、事件流等机制",
                    degree: 75
                  }, {
                    description: "Nodejs: 熟悉基础和特性,并对其架构有所了解",
                    degree: 65
                  }, {
                    description: "Koa2: 熟悉相关技术栈,并能用其进行服务端开发",
                    degree: 70
                  }, {
                    description: "DB: 使用Mysql/mongodb ORM框架进行数据存储处理",
                    degree: 60
                  }, {
                    description: "Vuejs: 使用技术栈进行开发,对其部分细节有深入了解",
                    degree: 60
                  }, {
                    description: "Other: 前端兼容、优化、安全有一定了解",
                    degree: 50
                  }
                ],
                experience: [
                  {
                    time: "2017.01-至今 网达软件",
                    works: [
                          "接口业务逻辑实现",
                          "RESTful API 维护、设计",
                          "数据表的 维护、设计",
                          "前端页面还原、逻辑交互实现（Vuejs)",
                          "使用Koa2+MongoDB构建后端服务",
                          "使用Eggjs+Postgresql构建后端服务",
                          "与前端,测试同事合作进行联调和Bug修改",
                          "探索解决项目中使用的相关库出现的问题",
                    ],
                    projects: [
                      {
                        name: "合作联盟",
                        position: "后端开发",
                        description: "浙江移动物联网相关项目的众包平台,提供项目的发布,审核,展示,申请",
                        link: "http://ca.ioteams.com",
                        workDescription: "接口业务逻辑实现;部分数据表, API 设计、维护"
                      }, {
                        name: "和物官网",
                        position: "后端开发",
                        description: "和物介绍展示,和物产品开发调试,并与OneNET信息同步",
                        link: "http://hewu.ioteams.com",
                        workDescription: "接口业务逻辑实现;部分通用功能的封装(图片压缩,加解密,等等)"
                      }
                    ]
                  }, {
                    time: "2016.06-2017.01 海云数据",
                    works: [
                      "使用公司产品(图易)进行项目的开发、维护",
                      "使用Vue开发一些基础组件",
                      "使用React修改图易中一些基础组件完成用户定制需求",
                      "使用echarts完成用户定制需求",
                      "解决项目中遇到的比较棘手的问题"
                    ],
                    projects: [
                      {
                        name: "数据可视化",
                        position: "前端开发",
                        description: "针对警务系统的大数据可视化分析。根据警务系统已有数据从不同维度进行可视化展示",
                        link: "内网使用",
                        workDescription: "使用公司产品(图易)进行项目的开发、维护;解决项目中遇到的比较棘手的问题"
                      }
                    ]
                  }, {
                    time: "2016.01-2016.06 途宝科技(实习)",
                    works: [
                      "使用Vue+webpack+vue-router进行前端业务开发/维护",
                      "封装部分可复用组件"
                    ],
                    projects: [
                      {
                        name: "途宝旅行",
                        position: "前端开发",
                        description: "一个关于境外电话卡销售的电商平台",
                        link: "http://www.itourbag.com/wechat_h5shop",
                        workDescription: "在已搭好的项目架构下进行所有业务开发;封装可复用代码为组件"
                      }
                    ]
                  }
                ]
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