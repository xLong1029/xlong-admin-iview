<template>
    <div class="g-content">
        <!-- 按条件查询 -->
        <div class="m-query-form">
            <Form ref="queryForm" :model="queryForm" :rules="validate">
                <Form-item class="query-item">
                    <Input v-model="queryForm.id" placeholder="用户编号"></Input>
                </Form-item>
                <Form-item prop="mobile" class="query-item">
                    <Input v-model="queryForm.mobile" placeholder="手机号码"></Input>
                </Form-item>
                <Form-item prop="email" class="query-item">
                    <AutoComplete v-model="queryForm.email" :data="emailList" @on-search="selectEmail" @on-select="setEmail" placeholder="邮箱"></AutoComplete>
                </Form-item>
                <Form-item class="query-item">
                    <Select v-model="queryForm.job" placeholder="职位">
                        <Option value="" >全部</Option>
                        <Option v-for="(item, index) in jobList" :value="item.name" :key="index">{{ item.name }}</Option>
                    </Select>
                </Form-item>
                <Form-item class="query-item">
                    <Select v-model="queryForm.province" placeholder="所在省市">
                        <Option value="" >全部</Option>
                        <Option v-for="(item, index) in provinceList" :value="item.name" :key="index">{{ item.name }}</Option>
                    </Select>
                </Form-item>
                <Form-item class="fl" prop="date">
                    <Date-picker class="query-item" type="date" v-model="queryForm.sTime" placement="bottom-end" placeholder="创建日期-起始" @on-change="getStartDate"></Date-picker>
                    <Date-picker class="query-item" type="date" v-model="queryForm.eTime" placement="bottom-end" placeholder="创建日期-结束" @on-change="getEndDate"></Date-picker>
                    <div class="clearfix"></div>
                </Form-item>
                <Form-item class="query-item">
                    <Select v-model="queryForm.enabledState" placeholder="用户状态">
                        <Option value="">全部</Option>
                        <Option value="1">启用</Option>
                        <Option value="-1">禁用</Option>
                    </Select>
                </Form-item>
                <Form-item class="fl">
                    <Button class="query-button" type="primary" @click="query('queryForm', 'valid')">查询</Button>
                    <Button class="query-button" type="ghost" @click="resetQuery('queryForm')">重置</Button>
                </Form-item>
            </Form>
            <div class="clearfix"></div>
        </div>
        <!-- 操作按钮 -->
        <div class="m-operation">
            <router-link :to="{ name: 'StoreAccount' }" class="operation-btn ivu-btn ivu-btn-primary">新增</router-link>
            <Button class="operation-btn" :disabled="selectList.length == 0" type="warning" @click="deleteData">删除</Button>
            <Button class="operation-btn" :disabled="selectList.length == 0" type="primary" @click="enableOrDisable(1)">启用</Button>
            <Button class="operation-btn" :disabled="selectList.length == 0" type="warning" @click="enableOrDisable(-1)">禁用</Button>
            <div class="clearfix"></div>
        </div>
        <!--  加载判断 -->
        <Loading v-if="pageLoading"></Loading>
        <div v-else>            
            <!-- 用户列表 -->
            <Table
                :row-class-name="rowClassName"
                class="m-table-list"
                border
                :columns="tableList"
                :data="listData"
                @on-selection-change="setSelectList"
            ></Table>
            <!-- 分页 -->
            <Page
                class-name="m-page"
                show-elevator
                show-sizer
                show-total
                :total="page.dataCount"
                :page-size="page.pageSize"
                :current="page.pageNo"
                :page-size-opts="page.pageSizeOpts"
                @on-change="changePage"
                @on-page-size-change="changePageSize"
            >
            </Page>
            <div class="clearfix"></div>
        </div>
    </div>
</template>

<script>
    // 组件
    import Loading from '@/components/Common/Loading'
    // 通用JS
    import Common from 'common/common.js'
    // 验证方法
    import Validate from 'common/validate.js'
    // Api方法
    import Api from '@/api/account_list.js'
    // Json数据
    import JsonCity from 'mock/city.json'
    import JsonData from 'mock/data.json'
    // 邮箱自动填充
    import EmailComplete from 'mixins/email_complete.js'
    // 表格设置
    import tableSetting from 'common/table_setting.js'
    // 表格查询
    import TableQuery from 'mixins/table_query.js'
    // 表格操作
    import TableOperate from 'mixins/table_operate.js'
    // 页码设置
    import Page from 'mixins/page.js'

    export default {
        components: { Loading },
        mixins: [ EmailComplete, TableQuery, TableOperate, Page ],
        computed: {
            // 获取列表
            apiGetList(){
                return () => Api.GetAccList(this.queryForm, this.page.pageNo, this.page.pageSize);
            },
            // 删除操作接口
            apiDelete(){
                return () => Api.DeleteAcc(this.selectList);
            },
            // 启用操作接口
            apiEnable(){
                return () => Api.EnableAcc({ enabledState: 1 }, this.selectList);
            },
            // 禁用操作接口
            apiDisable(){
                return () => Api.EnableAcc({ enabledState: -1 }, this.selectList);
            }
        },
        data() {
            return {
                // 加载页面
                pageLoading: true,
                // 职位列表
                jobList: [],
                // 地区列表
                provinceList: [],
                // 查询表单
                queryForm: {
                    // 用户编号
                    id: '',
                    // 手机号码
                    mobile: '',
                    // 邮箱
                    email: '',
                    // 职位
                    job: '',
                    // 地区
                    province: '',
                    // 起始时间
                    sTime: '',
                    // 结束时间
                    eTime: '',
                    // 状态
                    enabledState: '',
                },
                // 验证规则
                validate: {
                    email:[{ pattern: Common.regEmail , message: '邮箱格式不正确' }],
                    mobile:[{ pattern: Common.regMobile , message: '手机号码格式不正确', trigger: 'blur' }],
                    date:[{
                        validator: (rule, value, callback) => {
                            Validate.ValidRangeDate(this.queryForm.sTime, this.queryForm.eTime, callback, false);
                        },
                        trigger: 'change',
                    }]
                },
                // 用户列表
                tableList:[
                    {
                        title: '全选',
                        type: 'selection',
                        key: 'selectAll',
                        width: '60',
                        align: 'center',
                    },
                    {
                        title: '用户编号',
                        key: 'id',
                        align: 'center',
                    },
                    {
                        title: '真实姓名',
                        key: 'realname',
                        align: 'center'
                    },
                    {
                        title: '性别',
                        key: 'gender',
                        align: 'center'
                    },
                    {
                        title: '手机号码',
                        key: 'mobile',
                        align: 'center'
                    },
                    {
                        title: '邮箱',
                        key: 'email',
                        align: 'center'
                    },
                    {
                        title: '职位',
                        key: 'job',
                        align: 'center'
                    },
                    {
                        title: '所在省市',
                        key: 'province',
                        align: 'center',
                    },
                    {
                        title: '创建时间',
                        key: 'createTime',
                        align: 'center',
                    },
                    {
                        title: '状态',
                        key: 'enabledState',
                        align: 'center',
                        render: (h, params) => {
                            return h('span', {
								attrs: {
									class: params.row.enabledState == 1 ? 'status-success' : 'status-fail',
								}
							}, params.row.enabledState == 1 ? '启用' : '禁用');
                        }
                    },
                    {
                        title: '操作',
                        width: '120',
                        key: 'operation',
                        align: 'center',
                        render: (h, params) => {
                            return h('div', [
                                tableSetting.gotoDetail(h, params, this, '查看详情', 'StoreAccount'),
                            ]);                          
                        }
                    }
                ],
                //表格信息
                listData:[],
            }
        },
        created(){
            // 设置面包屑路径
            this.$store.commit('SET_BREADCRUMB', [
                { name: '首页', path: '/Home' },
                { name: '账户列表', path: '/Examples/AccountList' }
            ]);
            // 获取用户列表
            this.getTableList();
            // 获取本地“职位”列表
            this.jobList = JsonData.job;
            // 获取本地“省份”列表
            this.provinceList = JsonCity;
        },
        methods: {
            // 设置列表数据
            setListData(result){
                if(result.length > 0){
                    this.listData = result.map(item => {
                        return {
                            id: item.objectId,
                            realname: item.realname,
                            gender: item.gender,
                            mobile: item.mobile,
                            email: item.email,
                            job: item.job,
                            province: item.province,
                            createTime: item.createdAt,
                            enabledState: item.enabledState,
                            
                        }
                    });
                }
                else this.listData = [];
            },
        }
    }
</script>

<style lang="less" scoped>
    @import "../../../assets/less/table_list";
    .query-item{
        width: 150px;
    }
</style>