<template>
    <div class="g-content">
        <!-- 操作按钮 -->
        <div class="m-operation">
            <Button class="operation-btn" type="primary" @click="openModel">新增</Button>
            <Button class="operation-btn" type="warning" :disabled="selectList.length == 0" @click="deleteData">删除</Button>
            <Button class="operation-btn" type="ghost" @click="$router.go(-1)">返回</Button>
        </div>
        <!--  加载判断 -->
        <Loading v-if="pageLoading"></Loading>
        <div v-else>
            <!-- 内容列表 -->
            <table ref="contTable" class="m-table" width="100%" cellpadding="0" cellspacing="0">
                <!-- 表头名称 -->
                <th v-for="(item, index) in title" :key="index" :align="item.align" :style="{ 'width' : item.width + 'px'}">
                    <Checkbox v-if="item.type == 'CheckBox'" v-model="checkAll" @on-change="selectAll(checkAll)"></Checkbox>
                    <span v-else>{{ item.title }}</span>
                </th>
                <!-- 表格内容 -->
                <tr v-for="(item, index) in listData" :key="index">
                    <td v-for="(th, i) in title" :key="i" :align="th.align">
                        <!-- 勾选框 -->
                        <Checkbox v-if="th.type == 'CheckBox'" v-model="item.isCheck" @on-change="selectRow(index, item.isCheck)"></Checkbox>
                        <!-- 显示文本 -->
                        <span v-if="th.type == 'Text'">{{ item[th.key] }}</span>
                        <!-- 输入框 -->
                        <Input v-if="th.type == 'Input'" v-model="item[th.key]"></Input>
                        <!-- 图片上传 -->
                        <div v-if="th.type == 'UploadImg'">
                            <div class="upload-img">
                                <img class="show-img" :src="item[th.key]" alt="图片加载失败" @error="notFoundPic"/>
                            </div>
                            <div class="upload-btn">
                                <Button type="ghost" :disabled="item[th.key] == ''" icon="ios-eye-outline" @click="viewImage(index)">查看图片</Button>
                                <Button type="ghost" icon="ios-cloud-upload-outline" @click="uploadClick(index)" style="margin-left:10px">上传图片</Button>                            
                            </div>
                        </div>
                        <!-- 操作按钮 -->
                        <div v-if="th.type == 'Button'">
                            <Button
                                :key="index"
                                :type="th.button.type"
                                :size="th.button.size"
                                :style="{ 'min-width' : th.button.minWidth + 'px' }"
                                @click="saveThis(index)"
                            >
                            {{ th.button.text }}
                            </Button>
                        </div>
                    </td>
                </tr>
            </table>
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
        <!-- 隐藏的上传按钮 -->
        <input ref="imgFile" type="file" :accept="format" hidden @change="selectFile"/>
        <!-- 查看图片 -->
        <Modal title="查看图片" v-model="showImgModal">
            <img :src="imgUrl" style="width: 100%" @error="notFoundPic"/>
            <div slot="footer"></div>
        </Modal>
        <!-- 新增内容 -->
        <Modal title="新增内容" v-model="showAddModal" @on-cancel="closeModal('paramsForm')">
            <div>
                <Form ref="paramsForm" :model="paramsForm" :rules="validate" :label-width="100">
                    <Form-item label="内容标题：" prop="title">
                        <Input v-model="paramsForm.title"></Input>
                    </Form-item>
                    <Form-item label="封面图片：">
                        <!-- 组件-图片上传-单图片显示 -->
                        <SingleImage :src="paramsForm.img" @get-img-url="setCover"></SingleImage>
                    </Form-item>
                    <Form-item label="跳转链接：">
                        <Input v-model="paramsForm.url"></Input>
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
    // 组件
    import Loading from 'components/Common/Loading'
    // 通用JS
    import Common from 'common/common.js'
    import { GetUrlQuery } from 'common/important.js'
    // Api方法
    import Api from '@/api/section_list.js'
    // 表格查询
    import TableQuery from 'mixins/table_query.js'
    // 表格操作
    import TableOperate from 'mixins/table_operate.js'
    // 页码设置
    import Page from 'mixins/page.js'
    // Vuex
    import { mapGetters } from 'vuex'
    // axios
    import axios from 'axios'
      
    export default {
        components: { SingleImage, Loading },
        mixins: [ TableQuery, TableOperate, Page ],
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
                // 显示查看图片
                showImgModal: false,
                // 显示图片Url
                imgUrl: '',
                // 当前操作行索引
                rowIndex: -1,
                // 图片文件大小
                maxSize: 2048,
                // 可接受的图片上传格式
                format: ['image/jpg', 'image/jpeg', 'image/png'],
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
                        button: {
                            type: 'primary',
                            size: 'small',
                            minWidth: '64',
                            text: '保存',
                            click: 'save'
                        },
                        width: '100',
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
                { name: '板块列表', path: '/Examples/SectionList' },
                { name: '内容管理', path: '' }
            ]);
            this.parentId = GetUrlQuery('id');
            // 获取内容列表
            this.getTableList();
            // 初始化表格内容
            this.initData(this.listData);
        },
        methods: {
            // 全选
            selectAll(check){
                this.listData.forEach(item => {                    
                    if(check){
                        item.isCheck = true;
                        // 设置选项列表
                        this.selectList.push(item.id);
                    }
                    else{
                        item.isCheck = false;
                        // 清空选项列表
                        this.clearSelect();
                    }
                })
            },
            // 选中一行
            selectRow(index, check){
                if(check){
                    this.selectList.push(this.listData[index].id);
                }
                else{
                    this.selectList.forEach((item, i) => {           
                        if(item == this.listData[index].id) this.selectList.splice(i,1);
                    })
                }
            },
            // 初始化表格内容
            initData(data){
                // 初始化，给data添加isCheck属性，默认值为false
                if(data.length > 0){
                    data.forEach(item => {
                        item.isCheck = false;
                    })
                }
            },
            // 查看图片
            viewImage(index){
                this.showImgModal = true;
                this.imgUrl = this.listData[index].img;
            },
            // 上传按钮点击事件
            uploadClick(index){
                // 触发上传按钮点击事件
                this.$refs.imgFile.click();
                this.rowIndex = index;
            },
            // 选择文件
            selectFile(event){
                // 获取上传文件列表
                const fileList = this.$refs.imgFile.files;
                if(fileList.length > 0){
                    let fileName = fileList[0].name;
                    let fileSize = Math.floor(fileList[0].size / 1024);
                    // 控制文件大小
                    if(fileSize > this.maxSize){
                        this.$Notice.warning({
                            title: '超出文件大小限制',
                            desc: '文件 ' + fileName + ' 太大，不能超过 ' + 2 + 'M。'
                        });
                        return false;
                    }
                    this.uploadFile(fileList[0]);
                }
                else console.log('获取不到文件列表');
            },
            // 上传文件
            uploadFile(file){
                // 创建formData对象
                let params = new FormData();
                // 这里的token是七牛上传token，如需使用请换上你自己的七牛token
                params.append('token', Common.UPLOAD_TOKEN);
                params.append('file', file);
                
                // 七牛存储空间测试时请选择华东，否则报错：incorrect region, please use up-z2.qiniu.com
                axios.post('http://upload.qiniu.com/', params, { emulateJSON: true})
                .then(res => {
                    // 设置图片
                    this.listData[this.rowIndex].img = Common.UPLOAD_URL + res.data.hash;
                    this.$Notice.success({ title: '图片上传成功！' });
                })
                .catch(err => {              
                    this.$Notice.error({ title: '图片上传失败，请重试！' });
                })
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
            saveThis(index){
                this.editId = this.listData[index].id;
                this.paramsForm.parentId = this.parentId; 
                this.paramsForm.title = this.listData[index].title;
                this.paramsForm.img = this.listData[index].img;
                this.paramsForm.url = this.listData[index].url;
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
            // 设置封面图片
            setCover(url){
                this.paramsForm.img = url;
            },
            // 无法显示图片
            notFoundPic(event){
                Common.SetDefaultPic(event, 2);
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