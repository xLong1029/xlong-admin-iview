<template>
    <div class="g-content">
        <!-- 按条件查询 -->
        <div class="m-query-form fr">
            <Form ref="queryForm" :model="queryForm">
                <Form-item class="query-item">
                    <Input v-model="queryForm.id" placeholder="产品编号"></Input>
                </Form-item>
                <Form-item class="query-item">
                    <Input v-model="queryForm.productName" placeholder="产品名称"></Input>
                </Form-item>
                <Form-item class="query-item">
                    <Select v-model="queryForm.dataFrom" placeholder="数据来源">
                        <Option value="">全部</Option>
                        <Option value="1">系统录入</Option>
                        <Option value="2">数据库添加</Option>
                    </Select>
                </Form-item>
                <Form-item class="fl">
                    <Button class="query-button" type="primary" @click="query('queryForm', '')">查询</Button>
                    <Button class="query-button" type="ghost" @click="resetQuery('queryForm')">重置</Button>
                </Form-item>
            </Form>
        </div>
        <!-- 操作按钮 -->
        <div class="m-operation fl">
            <Button class="operation-btn" type="primary" @click="addSection">新增</Button>
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
        <!-- 新增窗口-->
        <Modal v-model="showModal" width="500" @on-cancel="closeModal('paramsForm')">
            <p slot="header">
                <span v-text="paramsForm.title == '' ? '新增版块' : '编辑版块'"></span>
            </p>
            <div>
                <Form ref="paramsForm" :model="paramsForm" :rules="validate" :label-width="100">
                    <Form-item label="产品名称：" prop="productName">
                        <Input v-model="paramsForm.productName"></Input>
                    </Form-item>
                </Form>
            </div>
            <div slot="footer">
                <Button size="large" @click="closeModal('paramsForm')">取消</Button>
                <Button type="primary" size="large" @click="add('paramsForm')">确定</Button>
            </div>
        </Modal>
    </div>
</template>

<script>
    // 组件
    import Loading from '@/components/Common/Loading'
    // Api方法
    import Api from '@/api/product_list.js'
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
                return () => Api.GetProdList(this.queryForm, this.page.pageNo, this.page.pageSize);
            },
            // 新增操作接口
            apiAdd(){
                return () => Api.AddProduct(this.paramsForm);
            },
            // 编辑操作接口
            apiEdit(){
                return () => Api.EditProduct(this.paramsForm, this.editId);
            },
            // 删除操作接口
            apiDelete(){
                return () => Api.DeleteProd(this.selectList);
            },
        },
        data() {
            return {
                // 加载页面
                pageLoading: true,
                // 是否显示弹窗
                showModal: false,
                // 参数表单
                paramsForm: {
                    productName: '',
                    dataFrom: 1,
                },
                // 需要编辑的对象id
                editId: '',
                // 操作类型:1是新增, 2是编辑
                operateType: 0,
                // 验证规则
                validate: {
                    productName:[{ required: true, message: '产品名称不能为空', trigger: 'blur' }],
                },
                // 查询表单
                queryForm: {
                    // 产品编号
                    id: '',
                    // 产品名称
                    productName: '',
                    // 数据来源
                    dataFrom: '',
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
                        title: '产品编号',
                        key: 'id',
                        align: 'center',
                    },
                    {
                        title: '产品名称',
                        key: 'productName',
                        align: 'center'
                    },
                    {
                        title: '数据来源',
                        key: 'dataFrom',
                        align: 'center',
                        render: (h, params) => {
                            return h('span', {}, params.row.dataFrom == 1 ? '系统录入' : '数据库添加');
                        }
                    },
                    {
                        title: '创建时间',
                        key: 'createTime',
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
                                tableSetting.gotoDetail(h, params, this, '查看详情', 'ProductDetail'),
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
                { name: '产品列表', path: '' }
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
                            productName: item.productName,
                            dataFrom: item.dataFrom,
                            createTime: item.createdAt,
                            updateTime: item.updatedAt
                        }
                    });
                }
                else this.listData = [];
            },
            // 关闭弹窗
            closeModal(name){
                this.showModal = false;
                // 数据初始化（重置）
                this.$refs[name].resetFields();
            },
            // 打开弹窗
            openModel(params){
                this.showModal = true;
                this.paramsForm.productName = params.productName;
                this.paramsForm.dataFrom = params.dataFrom;
                this.editId = params.id;
            },
            // 新增产品
            add(name){
                // 表单验证
                this.$refs[name].validate((valid)=>{
                    if(valid){
                        // 操作
                        this.addData();
                        // 延迟关闭
                        setTimeout(() => {
                            this.closeModal(name);
                        }, 500);
                    }
                    else this.$Message.error('提交失败！填写有误');
                })
            },
            addSection(){
                this.showModal = true;
                this.operateType = 1;
            },
        }
    }
</script>

<style lang="less" scoped>
    @import "../../../assets/less/table_list";
</style>