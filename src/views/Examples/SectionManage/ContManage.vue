<template>
    <div class="g-content">
        <!-- 操作按钮 -->
        <div class="m-operation">
            <Button class="operation-btn" type="primary" @click="openModel">新增</Button>
            <Button class="operation-btn" type="warning" :disabled="selectList.length == 0" @click="deleteData">删除</Button>
            <Button class="operation-btn" type="default" @click="$router.go(-1)">返回</Button>
        </div>
        <!--  加载判断 -->
        <Loading v-if="pageLoading"></Loading>
        <div v-else>
            <!-- 内容列表 -->
            <EditableTable
              :title="title"
              :data="listData"
              @on-select="getSelectRowData"
              @on-all-select="getSelectRowData"
              @on-save="saveThis"
            />
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
        <!-- 新增内容 -->
        <Modal title="新增内容" v-model="showAddModal" @on-cancel="closeModal('paramsForm')">
            <div>
                <Form ref="paramsForm" :model="paramsForm" :rules="validate" :label-width="100">
                    <Form-item label="内容标题：" prop="title">
                        <Input v-model="paramsForm.title" />
                    </Form-item>
                    <Form-item label="封面图片：">
                        <!-- 组件-图片上传-单图片显示 -->
                        <SingleImage :src.sync="paramsForm.img" />
                    </Form-item>
                    <Form-item label="跳转链接：">
                        <Input v-model="paramsForm.url" />
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
    import SingleImage from 'components/Image/UploadImage/SingleImage'
    import EditableTable from 'components/Table/EditableTable'
    import Loading from 'components/Common/Loading'
    // 通用JS
    import Common from 'common/common.js'
    import { GetUrlQuery, SetDefaultPic } from 'utils'
    // Api方法
    import Api from '@/api/section_list.js'
    // 表格查询
    import { TableQuery } from 'mixins'
    // 表格操作
    import { TableOperate } from 'mixins'
    // 页码设置
    import { Page } from 'mixins'
    // Vuex
    import { mapGetters } from 'vuex'
    // 图片上传设置
    import { UploadImg } from 'mixins'

    export default {
        components: { SingleImage, EditableTable, Loading },
        mixins: [ TableQuery, TableOperate, Page, UploadImg ],
        computed: {
            ...mapGetters([ 'getImageUrl' ]),
            // 获取所有列表
            apiGetList(){
                return () => Api.GetContList(this.parentId, this.page.pageNo, this.page.pageSize);
            },
            // 新增操作接口
            apiAdd(){
                return () => Api.AddContent(this.paramsForm);
            },
            // 删除操作接口
            apiDelete(){
                return () => Api.DeleteCont(this.selectList);
            },
            // 编辑操作接口
            apiEdit(){
                return () => Api.EditContent(this.paramsForm, this.editId);
            },
        },
        data(){
            return{
                // 加载页面
                pageLoading: false,
                //选中所有项
                checkAll: false,
                // 参数表单
                paramsForm: {
                    title: '',
                    img: '',
                    url: '',
                    parentId: ''
                },
                // 验证规则
                validate: {
                    title:[{ required: true, message: '内容标题不能为空', trigger: 'blur' }],
                },
                // 父级板块id
                parentId: '',
                // 需要编辑的对象id
                editId: '',
                // 显示新增弹窗
                showAddModal: false,
                // 表格表头
                title: [
                    {
                        title: '全选',
                        key: 'selecAll',
                        align: 'center',
                        type: 'CheckBox',
                        width: '50'
                    },
                    {
                        title: '编号',
                        key: 'id',
                        align: 'center',
                        type: 'Text',
                        width: '100'
                    },
                    {
                        title: '内容标题',
                        key: 'title',
                        align: 'center',
                        type: 'Input'
                    },
                    {
                        title: '封面图片',
                        key: 'img',
                        align: 'center',
                        type: 'UploadImg',
                        width: '300'
                    },
                    {
                        title: '跳转链接',
                        key: 'url',
                        align: 'center',
                        type: 'Input'
                    },
                    {
                        title: '操作',
                        key: 'operate',
                        align: 'center',
                        type: 'Button',
                        button: [
                          {
                            type: "primary",
                            size: "small",
                            minWidth: "64",
                            text: "保存",
                            click: "save"
                          }
                        ],
                        width: '180',
                    },
                ],
                // 表格信息
                listData: [],
            }
        },
        created(){
            // 设置面包屑路径
            this.$store.commit('SET_BREADCRUMB', [
                { name: '首页', path: '/Home' },
                { name: '板块列表', path: '/Examples/SectionManage/List' },
                { name: '内容管理', path: '' }
            ]);
            this.parentId = GetUrlQuery('id');
            // 获取内容列表
            this.getTableList();
            // 初始化表格内容
            this.initData(this.listData);
        },
        methods: {
            // 初始化表格内容
            initData(data){
                // 初始化，给data添加isCheck属性，默认值为false
                if(data.length > 0){
                    data.forEach(item => {
                        item.isCheck = false;
                    })
                }
            },
            // 设置列表数据
            setListData(result){
                if(result.length > 0){
                    this.listData = result.map(item => {
                        return {
                            id: item.objectId,
                            title: item.title,
                            img: item.img,
                            url: item.url,
                        }
                    });
                }
                else this.listData = [];
            },
            // 保存数据
            saveThis(row){
                const { id, title, imgUrl, url } = row;
                this.editId = id;
                this.paramsForm = { parentId: this.parentId, title, img: imgUrl, url};
                // 编辑数据
                this.editData();
            },
            // 打开弹窗
            openModel(){
                this.showAddModal = true;
                this.paramsForm.title = '';
                this.paramsForm.img = '';
                this.paramsForm.url = '';
                this.paramsForm.parentId = this.parentId;
            },
            // 关闭弹窗
            closeModal(name){
                this.showAddModal = false;
                // 数据初始化（重置）
                this.$refs[name].resetFields();
            },
            // 新增内容
            add(name){
                // 表单验证
                this.$refs[name].validate((valid)=>{
                    if(valid){

                        // 新增数据
                        this.addData();
                        // 延迟关闭
                        setTimeout(() => {
                            this.closeModal(name);
                        }, 500);
                    }
                    else this.$Message.error('提交失败！填写有误');
                })
            },
            // 获取选中行数据
            getSelectRowData(list){
              list.forEach(e => this.selectList.push(e.id));
            },
            // 无法显示图片
            notFoundPic(event){
                SetDefaultPic(event, 2);
            },
        }
    }
</script>

<style lang="less" scoped>
    @import "../../../assets/less/table_list";
    @import "../../../assets/less/color";
    .m-table{
        position: relative;
        border: 1px solid @table_border_color;
        border-bottom: 0;
        border-right: 0;
        font-size: 12px;

        td,th{
            box-sizing: border-box;
            text-overflow: ellipsis;
            vertical-align: middle;
            border-bottom: 1px solid @table_border_color;
            border-right: 1px solid @table_border_color;
            padding: 12px;
        }

        th{
            background-color: #f8f8f9;
        }

        .show-img{
            width: auto;
            max-height: 120px;
            max-width: 90%;
            margin-bottom: 10px;
            border-radius: 4px;
            border: 1px solid rgb(228, 229, 231);
        }
    }
</style>
