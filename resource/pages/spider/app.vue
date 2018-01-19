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
                        <DropdownMenu slot="list" @on-click="originFn">
                            <DropdownItem name="huibo">{{originMap.huibo}}</DropdownItem>
                            <DropdownItem name="lagou" disabled>{{originMap.lagou}}</DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                    <Button type="primary" @click="search">搜索</Button>
                </div>
            </div>
            <Table stripe :columns="columns1" @on-row-click="rowClick" :data="jobs" class="table"></Table>
        </div>
        <Spin size="large" fix v-if="spinShow"></Spin>
    </div>
</template>
<script>
    import Nav from "components/nav";
    export default {
        name: "App",
        beforeCreate () {
            this.$store.dispatch("createUser", {});
        },
        data() {
            return {
                key: "",
                number: 20,
                origin: "huibo",
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
                addr: ['chongqing', 'quanbu']
            }
        },
        mounted () {
            this.$store.dispatch("createIntDate");
        },
        components: {
            "page-nav": Nav
        },
        computed: {
            spinShow ()  { return this.$store.state.show.spin },
            originMap () { return this.$store.state.spider.originMap },
            jobs () { return this.$store.state.spider.jobs },
            addrList () { return this.$store.state.spider.addrList }
        },
        methods: {
            search () {
                if (!this.key) return this.$Message.info("请输入搜索职位");
                let province = "", city = "";
                this.addrList.forEach((each, index) => {
                    if (each.value === this.addr[0]) province = this.addrList[index];
                })
                province.children.forEach(each => {
                    if (each.value === this.addr[1]) city = each.label;
                })
                this.$Message.info(`您选择了 ${province.label}-${city} 地址查询,暂未支持该功能`);
                this.$store.dispatch("patchJobs", {
                    key: this.key,
                    number: this.number
                })
            },
            originFn (origin) {
                this.origin = origin;
            },
            rowClick (row) {
                window.open(row.url);
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
        align-items: flex-start;
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
                    height: auto;
                    min-height: 70%;
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