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
    // 图片上传设置
    import UploadImg from 'mixins/upload_img.js'
    // axios
    import axios from 'axios'
    // Vuex
    import { mapGetters } from 'vuex'

    export default {
        name: 'singleImage',
        mixins: [ UploadImg ],
        // 获取父级传值是否可预览图片preview，上传按钮尺寸提示文本sizeHint
        props: {
            // 设置默认值
            preview:{
                type: Boolean,
                default: false
            },
            sizeHint:{
                type: String,
                default: ''
            }
        },
        computed: {
            ...mapGetters([
                // 获取图片显示路径
                'getImageUrl',
            ])
        },
        data () {
            return {
                // 上传加载
                loading: false,
                // 是否显示弹窗
                showModal: false,
                // 图片文件大小
                maxSize: 2048,
                // 可接受的图片上传格式
                format: ['image/jpg', 'image/jpeg', 'image/png'],
                // 上传状态，上传成功完成为finished
                uploadStatus: '',
                // 是否显示进度条
                showProgress: false,
            }
        },
        methods: {}
    }
</script>

<style lang="less" scoped>
    @import "../../assets/less/upload_img";
</style>