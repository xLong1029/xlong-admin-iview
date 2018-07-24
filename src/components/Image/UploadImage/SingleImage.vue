<template>
    <div id="singleImage" class="m-Upload">
        <!-- 图片显示 -->
        <div v-if="getImageUrl != ''" class="upload-show">
            <div class="upload-img-wrap"><img class="upload-image" :src="getImageUrl" alt="图片加载失败" @error="notFoundPic"/></div>
            <!-- 可预览遮罩 -->
            <div v-if="preview" class="upload-mask">
                <Icon type="eye" @click.native="viewImage"></Icon>
            </div>
        </div>
        <!-- 上传按钮 -->
        <div>
            <Button type="ghost" :loading="loading" icon="ios-cloud-upload-outline" @click="uploadClick">上传图片</Button>
            <span class="size-hint" v-if="sizeHint">（图片尺寸： {{ sizeHint }}）</span>
            <input ref="imgFile" type="file" :accept="format" hidden @change="selectFile"/>
        </div>
        <!-- 上传进度条  -->
        <template v-if="uploadStatus != 'finished'">
            <Progress v-if="showProgress" :percent="percentage" hide-info :stroke-width="3" style="width:340px;"></Progress>
        </template>
        <br/>
        <!-- 图片格式提示 -->
        <span class="hint">
            * 图片格式要求：jpg、jpeg、png，文件大小为
            <span v-if="fileSize < 1024">{{ fileSize }}kb</span>
            <span v-else>{{ Math.floor(fileSize/1024) }}M</span>
            以内。
        </span>
        <div class="clearfix"></div>
        <!-- 查看图片 -->
        <Modal title="查看图片" class="m-view-img" v-model="showModal" width="600">
            <img :src="getImageUrl" @error="notFoundPic"/>
            <div slot="footer"></div>
        </Modal>
    </div>
</template>

<script>
    // 通用JS
    import Common from 'common/common.js'
    // 图片上传设置
    import UploadImg from 'mixins/upload_img.js'
    // axios
    import axios from 'axios'

    export default {
        name: 'singleImage',
        mixins: [ UploadImg ],
        // 获取父级传值
        props: {
            // 图片Url
            src:{
                type: String,
                default: ''
            },
            // 是否可预览
            preview:{
                type: Boolean,
                default: false
            },
            // 上传按钮尺寸提示文本
            sizeHint:{
                type: String,
                default: '100*100px'
            },
            // 图片文件大小限制，单位KB
            fileSize:{
              type: Number,
              default: 150
            }
        },
        data () {
            return {
                // 上传加载
                loading: false,
                // 是否显示弹窗
                showModal: false,
                // 可接受的图片上传格式
                format: ['image/jpg', 'image/jpeg', 'image/png'],
                // 上传状态，上传成功完成为finished
                uploadStatus: '',
                // 是否显示进度条
                showProgress: false,
                // 获取图片显示路径
                getImageUrl: ''
            }
        },
        watch: {
			src(val) {
				this.getImageUrl = val;
			}
        },
        created() {
            this.getImageUrl = this.src;
        },
        methods: {
            // 上传文件
            uploadFile(file){
                this.progressShow();

                // 设置定时器累增进度条百分比
                let progress = setInterval(() => {
                    if(this.percentage == 90) clearInterval(progress);
                    this.percentage += 10;
                },100);

                // 创建formData对象
                let params = new FormData();
                // 这里的token是七牛上传token，如需使用请换上你自己的七牛token
                params.append('token', Common.UPLOAD_TOKEN);
                params.append('file', file);
                
                // 七牛存储空间测试时请选择华东，否则报错：incorrect region, please use up-z2.qiniu.com
                axios.post('http://upload.qiniu.com/', params)
                .then(res => {
                    let url = Common.UPLOAD_URL + res.data.hash;
                    this.getImageUrl = url;
                    // 传给父组件url
                    this.$emit('get-img-url', url);
                    // 停止加载和隐藏进度
                    this.progressHide();
                    this.percentage = 100;
                    clearInterval(progress);
                    this.$Notice.success({ title: '图片上传成功!' });
                })
                .catch(err => {
                    // 停止加载和隐藏进度条
                    this.progressHide();                 
                    clearInterval(progress);                
                    this.$Notice.error({ title: '图片上传失败，请重试！' });
                })

                /* Bmob上传有跨域问题，不可用 */
                // var this_file = new Bmob.File(fileName, file);     
                // this_file.save().then(function(obj) {
                //     alert(obj.url());
                // }, function(error) {
                //     console.log(error);
                // });
                /* Bmob上传有跨域问题，不可用 */
            },
        }
    }
</script>

<style lang="less" scoped>
    @import "../../../assets/less/upload_img";
</style>