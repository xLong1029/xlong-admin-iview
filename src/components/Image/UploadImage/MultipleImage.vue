<template>
    <div id='multipleImage' class="m-Upload">
        <!-- 图片显示 -->
        <div :ref="'upload-img-'+index" v-for="(item, index) in getImageUrlArr" :key="index" class="upload-show">
            <div class="upload-img-wrap"><img class="upload-image" :src="item" alt="图片加载失败" @error="notFoundPic"/></div>
            <!-- 遮罩 -->
            <div class="upload-mask">
                <Icon v-if="preview" type="eye" style="margin-right:15px;" @click.native="viewImage(item)"></Icon>
                <Icon type="ios-trash" @click.native="removeImage('upload-img-'+index, index)"></Icon>
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
            以内，最多可上传{{ maxNum }}个文件。
        </span>
        <div class="clearfix"></div>
        <!-- 查看图片 -->
        <Modal title="查看图片" class="m-view-img" v-model="showModal" width="600">
            <img :src="showImgUrl" @error="notFoundPic"/>
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
        name: 'multipleImage',
        mixins: [ UploadImg ],
        // 获取父级传值
        props: {
            // 默认图片显示路径
            imgList:{
                type: Array,
                default: () => []
            },
            // 是否可预览
            preview:{
                type: Boolean,
                default: false
            },
            // 上传按钮尺寸提示文本
            sizeHint:{
                type: String,
                default: ''
            },
            // 图片文件大小限制，单位KB
            fileSize:{
              type: Number,
              default: 150
            },
            // 最大上传个数
            maxNum: {
                type: Number,
                default: 5
            }
        },
        watch: {
			imgList(val) {
				this.getImageUrlArr = val;
			}
        },
        data () {
            return {
                // 获取图片显示路径
                getImageUrlArr: [],
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
                // 传给父组件url
                this.$emit('get-img-list', this.urlArr);
                // 更新多图片显示路径
                // this.$store.commit('SET_IMAGE_URL_ARR', this.urlArr);
            },
            // 上传文件
            uploadFile(file){
                // 判断图片上传个数
                const check = this.getImageUrlArr.length < this.maxNum;
                if(!check){
                    this.$Notice.warning({
                        title: '超出文件个数限制',
                        desc: '最多只能上传' + this.maxNum + '张图片'
                    });
                    // 停止加载和隐藏进度条
                    this.progressHide(); 
                    return check;
                }

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
                axios.post('http://upload.qiniu.com/', params)
                .then(res => {
                    let url = Common.UPLOAD_URL + res.data.hash;
                    this.urlArr.push(url);
                    // 传给父组件url
                    this.$emit('get-img-list', this.urlArr);
                    // 更新多图片显示路径
                    // this.$store.commit('SET_IMAGE_URL_ARR', this.urlArr);
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
            }
        }
    }
</script>

<style lang="less" scoped>
    @import "../../../assets/less/upload_img";
</style>