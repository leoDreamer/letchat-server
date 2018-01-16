<template>
    <div class='spider_content'>
        <page-nav></page-nav>
        <div class="show_table">
            <div class="condition">
                <div class="condition_line">
                    <span class="condition_lable">职位关键字: </span>
                    <Input v-model="key" placeholder="职位关键字" style="width: 150px"></Input>
                    <span class="condition_lable">搜索数量: </span>
                    <Input v-model="number" placeholder="搜索数量" style="width: 150px"></Input>
                    <span class="condition_lable">搜索地区: </span>
                    <Cascader :data="addrList" v-model="addr" size="large" style="width:150px;display:inline-block"></Cascader></br>
                </div>
                <div class="condition_line">
                    <span class="condition_lable">信息来源: </span>
                    <Dropdown>
                        <Button type="primary">
                            {{originMap[origin]}}
                            <Icon type="arrow-down-b"></Icon>
                        </Button>
                        <DropdownMenu slot="list">
                            <DropdownItem name="huibo" @click.native="originFn('huibo')">{{originMap.huibo}}</DropdownItem>
                            <DropdownItem name="lagou" @click.native="originFn('lagou')" disabled>{{originMap.lagou}}</DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                    <Button type="primary" @click="search">搜索</Button>
                </div>
            </div>
            <Table stripe :columns="columns1" :data="jobs" class="table"></Table>
        </div>
        <Spin size="large" fix v-if="spinShow"></Spin>
    </div>
</template>
<script>
    import Nav from "components/nav";
    export default {
        name: "App",
        data() {
            return {
                key: "",
                number: 20,
                origin: "huibo",
                spinShow: false,
                originMap: {
                    huibo: "汇博人才网",
                    lagou: "拉钩"
                },
                columns1: [
                    {
                        title: '工作名称',
                        key: 'name'
                    },
                    {
                        title: '工资待遇',
                        key: 'money'
                    },
                    {
                        title: '工作地址',
                        key: 'address'
                    },
                    {
                        title: '工作经验',
                        key: 'exp'
                    },
                    {
                        title: '发布时间',
                        key: 'publicTime'
                    },
                    {
                        title: '公司名称',
                        key: 'title'
                    }
                ],
                jobs: [],
                addr: ['chongqing', 'quanbu'],
                addrList: [{
                    value: 'chongqing',
                    label: '重庆',
                    children: [
                        {
                            value: 'quanbu',
                            label: '全部'
                        },
                        {
                            value: 'yuzhong',
                            label: '渝中区'
                        },
                        {
                            value: 'dadukou',
                            label: '大渡口区'
                        },
                        {
                            value: 'jiangbei',
                            label: '江北区'
                        },
                        {
                            value: 'shapingban',
                            label: '沙坪坝区'
                        },
                        {
                            value: 'jiulongpo',
                            label: '九龙坡区'
                        },
                        {
                            value: 'nanan',
                            label: '南岸区'
                        },
                        {
                            value: 'yubei',
                            label: '渝北区'
                        },
                        {
                            value: 'banan',
                            label: '巴南区'
                        },
                        {
                            value: 'wanzhou',
                            label: '万州区'
                        },
                        {
                            value: 'beibei',
                            label: '北碚区'
                        },
                        {
                            value: 'shuangqiao',
                            label: '双桥区'
                        },
                        {
                            value: 'fuling',
                            label: '涪陵区'
                        },
                        {
                            value: 'qianjiang',
                            label: '黔江区'
                        },
                        {
                            value: 'changshou',
                            label: '长寿区'
                        },
                        {
                            value: 'jiangjin',
                            label: '江津区'
                        },
                        {
                            value: 'hechuan',
                            label: '合川区'
                        },
                        {
                            value: 'yongchuan',
                            label: '永川区'
                        },
                        {
                            value: 'nanchuan',
                            label: '南川区'
                        }
                    ]
                }]
            }
        },
        mounted () {
            this.$children[6].$on("on-row-click", (row) => {
                window.open(row.url);
            })
        },
        components: {
            "page-nav": Nav
        },
        methods: {
            search () {
                if (!this.key) this.$Message.info("请输入搜索职位");
                this.spinShow = true;
                let province = "", city = "";
                this.addrList.forEach((each, index) => {
                    if (each.value === this.addr[0]) province = this.addrList[index];
                })
                province.children.forEach(each => {
                    if (each.value === this.addr[1]) city = each.label;
                })
                this.$Message.info(`您选择了 ${province.label}-${city} 地址查询,暂未支持该功能`);
                this.axios.get(`/spider/huibo?key=${this.key}&number=${this.number}`)
                    .then(resp => {
                        this.spinShow = false;
                        if (!resp) return;
                        if ( resp.data.jobs.length === 0) this.$Message.info("暂未找到条件相关职位")
                        this.jobs = resp.data.jobs;
                        this.jobs.push({});
                        this.jobs.pop();
                    })
            },
            originFn (origin) {
            }
        }
    }
</script>
<style rel="stylesheet/scss" lang="scss">
    @import "../../assets/common";
    .spider_content {
        background-color: $gray;
        display: flex;
        justify-content: center;
        flex-wrap: wrap;
        overflow-y: scroll;
        min-width: 950px;
        height: 100%;
        margin-right: -20px;
        .condition_line {
            padding: 10px 0px;
        }
        .show_table {
            padding: 20px 0px;
            width: 80%;
            overflow: hidden;
            .condition {
                margin-bottom: 20px;
            }
            .table {
                margin-right: -10px ;
                .ivu-table {
                    overflow: auto;
                }
            }
            .condition_lable {
                color: #ffffff;
                font-size: 14px;
            }
            .ivu-input-large {
                height: 32px;
            }
        }
    }
</style>