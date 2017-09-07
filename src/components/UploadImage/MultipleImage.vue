<template>
    <div id='multipleImage' class="m-Upload">
        <!-- 图片显示 -->
        <div :ref="'upload-img-'+index" v-for="(item, index) in getImageUrlArr" key="index" class="upload-show">
            <img class="upload-image" :src="item" alt="图片加载失败" @error="notFoundPic"/>
            <!-- 可预览遮罩 -->
            <div class="upload-mask">
                <Icon v-if="preview" type="eye" style="margin-right:15px;" @click.native="viewImage(item)"></Icon>
                <Icon type="ios-trash" @click.native="removeImage('upload-img-'+index, index)"></Icon>
            </div>
        </div>
        <!-- 上传按钮 -->
        <div>
            <Button type="ghost" :loading="loading" icon="ios-cloud-upload-outline" @click="uploadClick">上传图片</Button>
            <input ref="imgFile" type="file" :accept="format" hidden @change="selectFile"/>
        </div>
        <!-- 上传进度条  -->
        <template v-if="uploadStatus != 'finished'">
            <Progress v-if="showProgress" :percent="percentage" hide-info :stroke-width="3" style="width:340px;"></Progress>
        </template>
        <br/>
        <!-- 图片格式提示 -->
        <span class="hint">* 图片格式要求：jpg、jpeg、png，文件大小为2M以内。</span>
        <div class="clearfix"></div>
        <!-- 查看图片 -->
        <Modal title="查看图片" v-model="showModal">
            <img :src="showImgUrl" style="width: 100%" @error="notFoundPic"/>
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
    // Vuex
    import { mapGetters } from 'vuex'

    export default {
        name: 'multipleImage',
        mixins: [ UploadImg ],
        // 获取父级传值preview，true为可预览图片，false为不可预览
        props: {
            // 设置默认值
            preview:{
                type: Boolean,
                default: false
            }, 
        },
        computed: {
            ...mapGetters([
                // 获取图片显示路径
                'getImageUrlArr',
            ])
        },
        data () {
            return {
                // 上传加载
                loading: false,
                // 显示查看图片
                showModal: false,
                // 显示图片URL
                showImgUrl: '',
                // 图片文件大小
                maxSize: 2048,
                // 可接受的图片上传格式
                format: ['image/jpg', 'image/jpeg', 'image/png'],
                // 上传状态，上传成功完成为finished
                uploadStatus: '',
                // 是否显示进度条
                showProgress: false,
                // 保存url的数组
                urlArr: [],
            }
        },
        methods: {
            // 查看图片
            viewImage(url){
                this.showImgUrl = url;
                this.showModal = true;
            },
            // 移除图片
            removeImage(img, index){
                // 移除对应索引位置的图片
                this.urlArr.splice(index, 1);
                // 更新多图片显示路径
                this.$store.commit('SET_IMAGE_URL_ARR', this.urlArr);
            },
            // 上传文件
            uploadFile(file){
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
                
                // 上传请求
                axios.post('http://upload.qiniu.com/', params, { emulateJSON: true})
                .then(res => {
                    let url = Common.UPLOAD_URL + res.data.hash;
                    this.urlArr.push(url);
                    // 更新多图片显示路径
                    this.$store.commit('SET_IMAGE_URL_ARR', this.urlArr);
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
        text-align: center;

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
        height: 100%;
        border-radius: 4px;
        max-width: 350px;
    }
</style>