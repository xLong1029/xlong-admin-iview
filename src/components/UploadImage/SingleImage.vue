<template>
    <div id="singleImage" class="m-Upload">
        <!-- 图片显示 -->
        <div v-if="getImageUrl != ''" class="upload-show">
            <img class="upload-image" :src="getImageUrl" alt="图片加载失败" @error="notFoundPic"/>
            <!-- 可预览遮罩 -->
            <div v-if="preview" class="upload-mask">
                <Icon type="eye" @click.native="viewImage"></Icon>
            </div>
        </div>
        <!-- 上传按钮 -->
        <Upload
            :show-upload-list="false"
            :before-upload="beforeUpload"
            :on-success="uploadSuccess"
            :on-error="uploadError"
            :format="format"
            :max-size="maxSize"
            :on-format-error="imageFormatError"
            :on-exceeded-size="imagesMaxSize"
            :action="imageUploadUrl">
            <Button type="ghost" icon="ios-cloud-upload-outline">上传图片</Button>
        </Upload>
        <!-- 上传进度条  -->
        <template v-if="uploadStatus != 'finished'">
            <Progress v-if="showProgress" :percent="percentage" :stroke-width="3" style="width:340px;"></Progress>
        </template>
        <br/>
        <!-- 图片格式提示 -->
        <span class="hint">* 图片格式要求：jpg、jpeg、png，文件大小为2M以内。</span>
        <div class="clearfix"></div>
        <!-- 查看图片 -->
        <Modal title="查看图片" v-model="showModal">
            <img :src="getImageUrl" style="width: 100%" @error="notFoundPic"/>
            <div slot="footer"></div>
        </Modal>
    </div>
</template>
<script>
    // 通用JS
    import Common from 'common/common.js'
    // Vuex
    import { mapGetters } from 'vuex'

    export default {
        name: 'singleImage',
        // 获取父级传值preview，true为可预览图片，false为不可预览
        props: [ 'preview' ],
        computed: {
            ...mapGetters([
                // 获取图片显示路径
                'getImageUrl',
            ])
        },
        data () {
            return {                
                // 显示遮罩
                showMask: false,
                // 显示查看图片
                showModal: false,
                // 是否显示图片
                visible: true,
                // 图片上传请求Url
                imageUploadUrl: '//jsonplaceholder.typicode.com/posts/',
                // 图片文件大小
                maxSize: 2048,
                // 图片上传格式
                format: ['jpg', 'jpeg', 'png'],
                // 上传状态，上传成功完成为finished
                uploadStatus: '',
                // 是否显示进度条
                showProgress: false,
                // 上传进度
                percentage: 0,
            }
        },
        created(){
            // 设置图片要存储的文件目录，以当年作为数值
            this.dir = new Date().getFullYear();
        },
        methods: {
            // 查看图片
            viewImage(){
                this.showModal = true;
            },
            imageFormatError(file) {
                this.$Notice.warning({
                    title: '文件格式不正确',
                    desc: '文件 ' + file.name + ' 格式不正确，请上传 jpg 或 png 格式的图片。'
                });
            },
            // 图片大小超出限制
            imagesMaxSize(file) {
                this.$Notice.warning({
                    title: '超出文件大小限制',
                    desc: '文件 ' + file.name + ' 太大，不能超过 ' + 2 + 'M。'
                });
            },
            // 文件上传前
            beforeUpload(){
                this.uploadStatus = '';
            },
            // 上传成功
            uploadSuccess(res, file) {
                if (res.code == '200') {
                    // 延迟结束
                    setTimeout(() => {
                        this.uploadStatus = file.status;
                    }, 500);
                    // 显示进度条和百分比
                    this.showProgress = file.showProgress;
                    this.percentage = file.percentage;

                    // 更新图片上传ID
                    this.$store.commit('SET_IMAGE_ID', res.data.id);
                    // 更新图片上传图像显示路径
                    this.$store.commit('SET_IMAGE_URL', res.data.url);    
                    this.$Notice.success({ title: '图片上传成功!' });

                    this.visible = true;
                } 
                else this.$Notice.error({ title: '图片上传失败，服务器出错！' });
            },
            // 上传失败
            uploadError(res, file) {
                // 隐藏进度条
                this.showProgress = false;
                this.$Notice.error({ title: '图片上传失败，请重试！' });
            },
            // 无法显示图片
            notFoundPic(event){
                Common.SetDefaultPic(event, 2);
            },            
        }
    }
</script>
<style lang="less" scoped>
    .hint{
        color:#ed3f14;
        margin-top: 15px;
    }
    
    .upload-show{
        float: left;
        position: relative;
        min-width: 90px;
        height: 90px;
        margin-right: 15px;
        border: 1px solid #e4e5e7;
        border-radius: 4px;
        overflow: hidden;

        img{
            border-radius: 4px;
            max-width: 350px;
        }

        &:hover{
            .upload-mask{
                display: block;
            }
        }   
    }
    .upload-mask{
        cursor: pointer;
        display: none;
        position: absolute;
        height: 100%;
        width: 100%;
        top: 0;
        left: 0;
        background: rgba(0,0,0,0.8);
        border-radius: 4px;
        text-align: center;
        .ivu-icon{
            color:#fff;
            line-height: 90px;
            font-size: 20px;
        }
    }
    .upload-image{
        float: left;
        height: 100%;
    }
</style>