<template>
    <div class="g-content">
        <!--  加载判断 -->
        <Loading v-if="pageLoading"></Loading>
        <div v-else>
            <!-- 操作按钮 -->
            <div class="m-operation">
                <Button class="operation-btn" type="primary" @click="addSection">新增</Button>
                <Button class="operation-btn" :disabled="selectList.length == 0" type="warning" @click="deleteData">删除</Button>
            </div>
            <!-- 板块列表 -->
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
            <div class="clearfix"></div>
        </div>
        <!-- 新增窗口-->
        <Modal v-model="showModal" width="500" class-name="g-edit-model" @on-cancel="closeModal('paramsForm')">
            <p slot="header">
                <span v-text="paramsForm.title == '' ? '新增版块' : '编辑版块'"></span>
            </p>
            <div class="m-edit-form">
                <Form ref="paramsForm" :model="paramsForm" :rules="validate" :label-width="100">
                    <Form-item label="版块标题：" prop="title">
                        <Input v-model="paramsForm.title"></Input>
                    </Form-item>
                    <Form-item label="版块分类：" prop="type">
                        <Radio-group v-model="paramsForm.type">
                            <Radio label="行业分类">行业分类</Radio>
                            <Radio label="地区分类">地区分类</Radio>
                        </Radio-group>
                    </Form-item>
                </Form>
            </div>
            <div slot="footer">
                <Button size="large" @click="closeModal('paramsForm')">取消</Button>
                <Button type="primary" size="large" @click="operation('paramsForm', operateType)">确定</Button>
            </div>
        </Modal>
    </div>
</template>

<script>
    // 组件
    import Loading from '@/components/Common/Loading'
    // Api方法
    import Api from '@/api/api.js'
    // 表格设置
    import tableSetting from 'common/table_setting.js'
    // 表格操作
    import TableOperate from 'mixins/table_operate.js'
    // 页码设置
    import Page from 'mixins/page.js'

    export default {
        components: { Loading },
        mixins: [ TableOperate, Page ],
        computed: {
            // 新增操作接口
            apiAdd(){
                return () => Api.AddSection(this.paramsForm);
            },
            // 编辑操作接口
            apiEdit(){
                return () => Api.EditSection(this.paramsForm, this.editId);
            },
            // 删除操作接口
            apiDelete(){
                return () => Api.DeleteSec(this.selectList);
            },
        },
        data() {
            return {
                // 加载页面
                pageLoading: false,
                // 是否显示弹窗
                showModal: false,
                // 参数表单
                paramsForm: {
                    title: '',
                    type: ''
                },
                // 需要编辑的对象id
                editId: '',
                // 操作类型:1是新增, 2是编辑
                operateType: 0,
                // 验证规则
                validate: {
                    title:[{ required: true, message: '版块标题不能为空', trigger: 'blur' }],
                },
                // 板块列表
                userList:[
                    {
                        title: '全选',
                        type: 'selection',
                        key: 'selectAll',
                        width: '60',
                        align: 'center',
                    },
                    {
                        title: '版块编号',
                        key: 'id',
                        align: 'center',
                    },
                    {
                        title: '版块标题',
                        key: 'title',
                        align: 'center'
                    },
                    {
                        title: '版块类型',
                        key: 'type',
                        align: 'center'
                    },
                    {
                        title: '操作',
                        key: 'operation',
                        width: '200',
                        align: 'center',
                        render: (h, params) => {
                            return h('div', [
                                tableSetting.gotoPage(h, params, this, '内容管理', 'ContManage', '10px'),
                                h('Button', {
                                    props: {
                                        type: 'primary',
                                        size: 'small'
                                    },
                                    style: {
                                        minWidth: '64px',
                                    },
                                    on: {
                                        click: () => {
                                            // 打开弹窗操作
                                            this.openModel(params.row);
                                            this.operateType = 2;
                                        }
                                    }
                                }, '编辑')
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
                { name: '版块列表', path: '/Examples/SectionList' }
            ]);
            // 获取板块列表
            this.getTableList();
        },
        methods: {
            // 获取表格列表
            getTableList(query){
                Api.GetSecList().then(res => {
                    this.pageLoading = false;
                    if(res.code == 200){
                        // 设置数据
                        this.setListData(res.data);
                    }
                    else this.$Message.error('获取数据失败!');
                })
                .catch(err => console.log(err))
            },
            // 设置列表数据
            setListData(result){
                if(result.length > 0){
                    this.listData = result.map(item => {
                        return {
                            id: item.id,
                            title: item.attributes.title,
                            type: item.attributes.type,
                        }
                    });
                }
                else this.listData = [];
            },
            // 关闭弹窗
            closeModal(name){
                // 数据初始化（重置）
                this.$refs[name].resetFields();
            },
            // 打开弹窗
            openModel(params){
                this.showModal = true;
                this.paramsForm.title = params.title;
                this.paramsForm.type = params.type;
                this.editId = params.id;
            },
            // 弹窗操作
            operation(name, type){
                // 操作
                if(type == 1) this.addData();
                else if(type == 2) this.EditData();                
                // 延迟关闭
                setTimeout(() => {
                    this.showModal = false;
                }, 500);
            },
            addSection(){
                this.showModal = true;
                this.operateType = 1;
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