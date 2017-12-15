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
    // Vuex
    import { mapGetters } from 'vuex'

    export default {
        name: 'singleImage',
        mixins: [ UploadImg ],
        // 获取父级传值
        props: {
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