<template>
    <div class="g-content">
        <!-- 操作按钮 -->
        <div class="m-operation">
            <Button class="operation-btn" type="primary" disabled>新增(待开发)</Button>
            <Button class="operation-btn" type="warning" @click="deleteData"  disabled>删除(待开发)</Button>
            <Button class="operation-btn" type="ghost" @click="$router.go(-1)">返回</Button>
        </div>
        <!-- 内容列表 -->
        <table ref="contTable" class="m-table" width="100%" cellpadding="0" cellspacing="0">
            <!-- 表头名称 -->
            <th v-for="(item, index) in title" :key="index" :align="item.align" :style="{ 'width' : item.width + 'px'}">
                <Checkbox v-if="item.type == 'CheckBox'" v-model="checkAll" @on-change="selectAll(checkAll)"></Checkbox>
                <span v-else>{{ item.title }}</span>
            </th>
            <!-- 表格内容 -->
            <tr v-for="(item, index) in data" :key="index">
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
        <!-- 隐藏的上传按钮 -->
        <input ref="imgFile" type="file" :accept="format" hidden @change="selectFile"/>
        <!-- 查看图片 -->
        <Modal title="查看图片" v-model="showModal">
            <img :src="imgUrl" style="width: 100%" @error="notFoundPic"/>
            <div slot="footer"></div>
        </Modal>
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
    // 通用JS
    import Common from 'common/common.js'
    // 表格操作
    import TableOperate from 'mixins/table_operate.js'
    // 页码设置
    import Page from 'mixins/page.js'
    // axios
    import axios from 'axios'
      
    export default {
        mixins: [ TableOperate, Page ],
        computed: {
            // 删除操作接口
            apiDelete(){
                return () => Api.DeleteAcc(this.selectList);
            },
        },
        data(){
            return{
                //选中所有项
                checkAll: false,
                // 显示查看图片
                showModal: false,
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
                },
                // 需要编辑的对象id
                editId: '',
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
                data: [
                    {
                        id: '1001',
                        title: '六个六产品',
                        img: '',
                        url: 'http://fanyi.baidu.com/static/translation/img/header/logo_cbfea26.png'
                    },
                    {
                        id: '1002',
                        title: '六个六产品',
                        img: '',
                        url: 'http://fanyi.baidu.com/static/translation/img/header/logo_cbfea26.png'
                    },
                ],
            }
        },
        created(){
            // 设置面包屑路径
            this.$store.commit('SET_BREADCRUMB', [
                { name: '首页', path: '/Home' },
                { name: '板块列表', path: '/Examples/SectionList' },
                { name: '内容管理', path: '' }
            ]);
            // 初始化表格内容
            this.initData(this.data);
        },
        methods: {
            // 全选
            selectAll(check){
                this.data.forEach(item => {
                    if(check) item.isCheck = true;
                    else item.isCheck = false;
                })
            },
            // 选中一行
            selectRow(index, check){
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
                this.showModal = true;
                this.imgUrl = this.data[index].img;
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
                    this.data[this.rowIndex].img = Common.UPLOAD_URL + res.data.hash;
                    this.$Notice.success({ title: '图片上传成功！' });
                })
                .catch(err => {              
                    this.$Notice.error({ title: '图片上传失败，请重试！' });
                })
            },
            // 保存记录
            saveThis(index){
                this.editId = index;
            },
            // 无法显示图片
            notFoundPic(event){
                Common.SetDefaultPic(event, 2);
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

    .m-table{
        position: relative;
        border: 1px solid #dddee1;
        border-bottom: 0;
        border-right: 0;
        font-size: 12px;

        td,th{
            box-sizing: border-box;
            text-overflow: ellipsis;
            vertical-align: middle;
            border-bottom: 1px solid #e9eaec;
            border-right: 1px solid #e9eaec;
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