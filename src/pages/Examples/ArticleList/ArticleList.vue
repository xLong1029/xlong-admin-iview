<template>
    <div class="g-content">
        <!-- 按条件查询 -->
        <div class="m-query-form fr">
            <Form ref="queryForm" :model="queryForm" :rules="validate">
                <Form-item class="query-item">
                    <Input v-model="queryForm.id" placeholder="文章编号"></Input>
                </Form-item>
                <Form-item class="fl" prop="date">
                    <Date-picker class="query-item" type="date" v-model="queryForm.sTime" placement="bottom-end" placeholder="创建日期-起始" @on-change="getStartDate"></Date-picker>
                    <Date-picker class="query-item" type="date" v-model="queryForm.eTime" placement="bottom-end" placeholder="创建日期-结束" @on-change="getEndDate"></Date-picker>
                    <div class="clearfix"></div>
                </Form-item>
                <Form-item class="fl">
                    <Button class="query-button" type="primary" @click="query('queryForm', 'valid')">查询</Button>
                    <Button class="query-button" type="ghost" @click="resetQuery('queryForm')">重置</Button>
                </Form-item>
            </Form>
        </div>
        <!-- 操作按钮 -->
        <div class="m-operation fl">
            <router-link :to="{ name: 'StoreArticle' }" class="operation-btn ivu-btn ivu-btn-primary">新增</router-link>
            <Button class="operation-btn" :disabled="selectList.length == 0" type="warning" @click="deleteData">删除</Button>
        </div>
        <div class="clearfix"></div>
        <!--  加载判断 -->
        <Loading v-if="pageLoading"></Loading>
        <div v-else>
            <!-- 板块列表 -->
            <Table
                class="m-table-list"
                border
                :columns="tableList"
                :data="listData"
                @on-selection-change="setSelectList"
            ></Table>
        </div>
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
</template>

<script>
    // 组件
    import Loading from '@/components/Common/Loading'
    // 验证方法
    import Validate from 'common/validate.js'
    // Api方法
    import Api from '@/api/article_list.js'
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
        mixins: [ TableQuery, TableOperate, Page ],
        computed: {
            // 获取列表
            apiGetList(){
                return () => Api.GetArtcList(this.queryForm, this.page.pageNo, this.page.pageSize);
            },
            // 删除操作接口
            apiDelete(){
                return () => Api.DeleteArtc(this.selectList);
            }
        },
        data() {
            return {
                // 加载页面
                pageLoading: true,
                // 是否显示弹窗
                showModal: false,
                // 需要编辑的对象id
                editId: '',
                // 操作类型:1是新增, 2是编辑
                operateType: 0,
                // 查询表单
                queryForm: {
                    // 文章编号
                    id: '',
                    // 起始时间
                    sTime: '',
                    // 结束时间
                    eTime: '',
                },
                // 验证规则
                validate: {
                    date:[{
                        validator: (rule, value, callback) => {
                            Validate.ValidRangeDate(this.queryForm.sTime, this.queryForm.eTime, callback, false);
                        },
                        trigger: 'change',
                    }]
                },
                // 板块列表
                tableList:[
                    {
                        title: '全选',
                        type: 'selection',
                        key: 'selectAll',
                        width: '60',
                        align: 'center',
                    },
                    {
                        title: '文章编号',
                        key: 'id',
                        align: 'center',
                    },
                    {
                        title: '文章标题',
                        key: 'title',
                        align: 'center'
                    },
                    {
                        title: '文章标签',
                        key: 'tags',
                        align: 'center',
                        render: (h, params) => {
                            return h('span', {}, params.row.tags.toString());
                        }
                    },
                    {
                        title: '创建时间',
                        key: 'createdTime',
                        align: 'center'
                    },
                    {
                        title: '更新时间',
                        key: 'updateTime',
                        align: 'center'
                    },
                    {
                        title: '操作',
                        key: 'operation',
                        width: '120',
                        align: 'center',
                        render: (h, params) => {
                            return h('div', [
                                tableSetting.gotoDetail(h, params, this, '查看详情', 'StoreArticle'),
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
                { name: '文章列表', path: '' }
            ]);
            // 获取板块列表
            this.getTableList();
        },
        methods: {
            // 设置列表数据
            setListData(result){
                if(result.length > 0){
                    this.listData = result.map(item => {
                        return {
                            id: item.objectId,
                            title: item.title,
                            dataFrom: item.dataFrom,
                            tags: item.tags,
                            createdTime: item.createdAt,
                            updateTime: item.updatedAt
                        }
                    });
                }
                else this.listData = [];
            }
        }
    }
</script>

<style lang="less" scoped>
    @import "../../../assets/less/table_list";
</style>