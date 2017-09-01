<template>
    <div class="g-content">
        <!-- 按条件查询 -->
        <div class="m-query-form">
            <Form ref="queryForm" :model="queryForm" :rules="validate">
                <div class="query-item">
                    <Input v-model="queryForm.id" placeholder="用户编号"></Input>
                </div>
                <Form-item prop="mobile" class="query-item">
                    <Input v-model="queryForm.mobile" placeholder="手机号码"></Input>
                </Form-item>
                <Form-item prop="email" class="query-item">
                    <Input v-model="queryForm.email" placeholder="邮箱"></Input>
                </Form-item>
                <div class="query-item">
                    <Select v-model="queryForm.job" placeholder="职位">
                        <Option value="" >全部</Option>
                        <Option v-for="(item, index) in jobList" :value="item.name" :key="index">{{ item.name }}</Option>
                    </Select>
                </div>
                <div class="query-item">
                    <Select v-model="queryForm.area" placeholder="所在地区">
                        <Option value="" >全部</Option>
                        <Option v-for="(item, index) in areaList" :value="item.name" :key="index">{{ item.name }}</Option>
                    </Select>
                </div>
                <div class="query-item">
                    <Date-picker
                        type="daterange"
                        :options="dateSetting"
                        placement="bottom-end"
                        placeholder="选择起始时间和结束时间"
                        @on-change="getDate"
                    ></Date-picker>
                </div>
                <div class="query-item">
                    <Select v-model="queryForm.enabledState" placeholder="用户状态">
                        <Option value="">全部</Option>
                        <Option value="1">启用</Option>
                        <Option value="-1">禁用</Option>
                    </Select>
                </div>
                <Button class="query-button" type="primary" @click="query('queryForm', 'query')">查询</Button>
            </Form>
            <div class="clearfix"></div>
        </div>
        <!-- 操作按钮 -->
        <div class="m-operation">
            <router-link :to="{ name: 'AddAccount' }" class="operation-btn ivu-btn ivu-btn-primary">新增</router-link>
            <Button class="operation-btn" v-if="selectList.length > 0" type="error" @click="deleteAccount">删除</Button>
            <Button class="operation-btn" v-else type="primary" disabled>删除</Button>
            <Button class="operation-btn" v-if="selectList.length > 0" type="primary" @click="enableOrdisable(1)">启用</Button>
            <Button class="operation-btn" v-else type="primary" disabled>启用</Button>
            <Button class="operation-btn" v-if="selectList.length > 0" type="error" @click="enableOrdisable(2)">禁用</Button>
            <Button class="operation-btn" v-else type="primary" disabled>禁用</Button>
        </div>
        <!-- 用户列表 -->
        <Table
            class="m-table-list"
            border
            :columns="userList"
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
    </div>
</template>

<script>
    // 通用JS
    import Common from 'common/common.js'
    // Api方法
    //import Account from '@/api/account_manage.js'
    // Json数据
    import JsonCity from 'mock/city.json'
    import JsonData from 'mock/data.json'
    // 表格查询
    import TableQuery from 'mixins/table_query.js'
    // 表格操作
    import TableOperate from 'mixins/table_operate.js'
    // 页码设置
    import Page from 'mixins/page.js'
    // 表格通用设置：按钮、图片显示
    import tableSetting from 'common/table_setting.js'

    export default {
        mixins: [ TableQuery, TableOperate, Page ],
        computed: {
            // 删除操作接口
            apiDelete(){
                return () => Account.DeleteUser({ ids: this.selectList });
            },
            // 启用操作接口
            apiEnable(){
                return () => Account.EnableUser({ ids: this.selectList });
            },
            // 禁用操作接口
            apiDisable(){
                return () => Account.DisableUser({ ids: this.selectList });
            }
        },
        data() {
            return {
                // 加载页面
                pageLoading: true,
                // 职位列表
                jobList: [],
                // 地区列表
                areaList: [],
                // 查询表单
                queryForm: {
                    // 用户编号或姓名
                    id: '',
                    // 手机号码
                    mobile: '',
                    // 邮箱
                    email: '',
                    // 职位
                    job: '',
                    // 地区
                    area: '',
                    // 起始时间
                    createTimeStart: '',
                    // 结束时间
                    createTimeEnd: '',
                    // 状态
                    enabledState: '',
                },
                // 验证规则
                validate: {
                    email:[{ pattern: Common.regEmail , message: '邮箱格式不正确', trigger: 'blur' }],
                    mobile:[{ pattern: Common.regMobile , message: '手机号码格式不正确', trigger: 'blur' }],
                },
                // 用户列表
                userList:[
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
                        title: '用户名',
                        key: 'name',
                        align: 'center'
                    },
                    {
                        title: '性别',
                        key: 'sex',
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
                        title: '地区',
                        key: 'area',
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
                                tableSetting.details(h, params, this, 'UserAccInfo'),
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
            // 获取本地“城市”列表
            this.areaList = JsonCity;
        },
        methods: {
            // 获取表格列表
            getTableList(query){
                this.queryForm.pageNo = this.page.pageNo;
                this.queryForm.pageSize = this.page.pageSize;
                // 获取用户列表
                // Account.GetUserList(this.queryForm)
                // .then(res => {
                //     // 取消页面加载
                //     this.pageLoading = false;
                    
                //     if(res.code == 200){
                //         // 设置是否查询状态
                //         if(query) this.isQuery = true;
                //         else this.isQuery = false;                  
                //         // 设置数据
                //         this.listData = res.data;
                //         // 获取页码
                //         const paging = res.paging;
                //         // 设置页码
                //         this.page.pageNo = paging.page;
                //         this.page.pageSize = paging.size;
                //         this.page.dataCount = paging.totalSize;                        
                //     }
                //     else this.$Message.warning(res.msg);
                // })
                // .catch(err => console.log(err))
            },
        }
    }
</script>

<style lang="less" scoped>
    .m-operation {
        padding-bottom: 20px;
        padding-top:0;
    }
    .operation-btn {
        margin-right: 5px;
        min-width:80px;
    }
    
    .m-query-form {
        //padding-bottom: 20px;
    }

    .query-item {
        float: left;
        width: 12%;
        margin-right: 1%;
        position: relative;
        .ivu-date-picker{
            width:100%;
        }
    }  
    .query-button {
        float: right;
        margin-right: 0;
        min-width:80px;
    }
    
    .page {
        float: right;
        margin-top: 30px;
    }
</style>