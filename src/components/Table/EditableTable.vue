<template>
    <div id="editableTable">
        <!-- 可编辑表格 -->
        <table ref="table" class="m-table" width="100%" cellpadding="0" cellspacing="0">
            <!-- 表头名称 -->
            <th v-for="(item, index) in title" :key="index" :align="item.align" :style="{ 'width' : item.width + 'px'}">
                <Checkbox v-if="item.type == 'CheckBox'"></Checkbox>
                <span v-else>{{ item.title }}</span>
            </th>
            <!-- 表格内容 -->
            <tr v-for="(item, index) in data" :key="index">
                <td v-for="(th, index) in title" :key="index" :align="th.align">
                    <!-- 勾选框 -->
                    <Checkbox v-if="th.type == 'CheckBox'"></Checkbox>
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
                            <Button type="ghost" :disabled="item[th.key] == ''" :loading="loading" icon="ios-eye-outline" @click="uploadClick">查看图片</Button>
                            <Button type="ghost" :loading="loading" icon="ios-cloud-upload-outline" @click="uploadClick" style="margin-left:10px">上传图片</Button>
                            <input ref="imgFile" type="file" :accept="format" hidden @change="selectFile"/>
                        </div>
                    </div>
                    <!-- 操作按钮 -->
                    <div v-if="th.type == 'Button'">
                        <Button
                            v-for="(btn, index) in th.button"
                            :key="index"
                            :type="btn.type"
                            :size="btn.size"
                            :style="{ 'margin-right' : btn.marginRight + 'px', 'min-width' : btn.minWidth + 'px' }"
                        >
                        {{ btn.text }}
                        </Button>
                    </div>
                </td>
            </tr>
        </table>
        <!-- 查看图片 -->
        <Modal title="查看图片" v-model="showModal">
            <img :src="imgUrl" style="width: 100%" @error="notFoundPic"/>
            <div slot="footer"></div>
        </Modal>
    </div>
</template>

<script>
    // 通用JS
    import Common from 'common/common.js'
    // axios
    import axios from 'axios'

    export default {
        name: 'editableTable',
        /*
        * 获取父组件传值
        * title: 表格表头名称
        * data: 表格数据
        */
        props: {
            // 设置默认值
            title: {
                type: Array,
                default: [{
                    title: '',
                    key: '',
                    align: '',
                    type: 'Text'
                }]
            },
            data: {
                type: Array,
                default: []
            }
        },
        data() {
            return {
                //选中所有项
                checkAll: false,
                // 显示查看图片
                showModal: false,
                // 显示图片Url
                imgUrl: '',
                // 图片文件大小
                maxSize: 2048,
                // 可接受的图片上传格式
                format: ['image/jpg', 'image/jpeg', 'image/png'],
            }
        },
        created() {

        },
        methods: {
            // 查看图片
            viewImage(){
                this.showModal = true;
            },
            // 上传按钮点击事件
            uploadClick(){
                // 触发上传按钮点击事件
                this.$refs.imgFile.click();
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
                    let url = Common.UPLOAD_URL + res.data.hash;
                })
                .catch(err => {              
                    this.$Notice.error({ title: '图片上传失败，请重试！' });
                })
            },
            // 无法显示图片
            notFoundPic(event){
                Common.SetDefaultPic(event, 2);
            },
        }
    }
</script>

<style lang="less" scoped>
    @import "../../assets/less/color";
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
            border-bottom: 1px solid @td_border_color;
            border-right: 1px solid @td_border_color;
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

