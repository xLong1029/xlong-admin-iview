<template>
  <div id="singleImage" class="m-Upload">
    <!-- 图片显示 -->
    <div v-if="getImageUrl != ''" class="upload-show">
      <div class="upload-img-wrap">
        <img class="upload-image" :src="getImageUrl" alt="图片加载失败" @error="notFoundPic" />
      </div>
      <!-- 遮罩 -->
      <div class="upload-mask">
        <Icon v-if="preview" type="md-eye" class="g-mr10" @click.native="viewImage"></Icon>
        <Icon type="md-create" @click.native="uploadClick"></Icon>
      </div>
    </div>
    <!-- 上传按钮 -->
    <div v-show="showUploadBtn" class="upload-btn" @click="uploadClick">
      <Icon type="md-camera" size="20"></Icon>
      <input ref="imgFile" type="file" :accept="format" hidden @change="selectFile" />
    </div>
    <!-- 上传进度条  -->
    <template v-if="uploadStatus != 'finished'">
      <Progress
        v-if="showProgress"
        :percent="percentage"
        hide-info
        :stroke-width="3"
        style="width:340px;"
      ></Progress>
    </template>
    <!-- 图片格式提示 -->
    <div v-if="showHint" class="hint">
      * 图片格式要求：jpg、jpeg、png，文件大小为
      <span v-if="fileSize < 1024">{{ fileSize }}kb</span>
      <span v-else>{{ Math.floor(fileSize/1024) }}M</span>
      以内。
    </div>
    <div class="clearfix"></div>
    <!-- 查看图片 -->
    <Modal title="查看图片" class="m-view-img" v-model="showModal" width="600">
      <img :src="getImageUrl" @error="notFoundPic" />
      <div slot="footer"></div>
    </Modal>
  </div>
</template>

<script>
// 通用JS
import Common from "common/common.js";
// 图片上传设置
import { UploadImg } from "mixins";

export default {
  name: "singleImage",
  mixins: [UploadImg],
  // 获取父级传值
  props: {
    // 图片路径
    src: {
      type: String,
      default: ""
    },
    // 是否可预览
    preview: {
      type: Boolean,
      default: false
    },
    // 是否显示格式提示
    showHint: {
      type: Boolean,
      default: true
    },
    // 上传按钮尺寸提示文本
    sizeHint: {
      type: String,
      default: "100*100px"
    },
    // 图片文件大小限制，单位KB
    fileSize: {
      type: Number,
      default: 150
    },
    // 组件索引值
    index: {
      type: Number,
      default: -1
    }
  },
  watch: {
    src(val) {
      this.showUploadBtn = val ? false : true;
      this.getImageUrl = val;
    }
  },
  data() {
    return {
      // 获取图片显示路径
      getImageUrl: this.src,
      // 显示上传按钮
      showUploadBtn: this.src ? false : true
    };
  },
  methods: {
    // 上传文件
    uploadFile(file) {
      this.uploadFileDemo(file)
        .then(res => {
          const { data: { url } } = res;

          this.$emit("update:src", url);
          this.$emit("get-img-url", url);
        })
        .catch(err => console.log(err));
    }
  }
};
</script>

<style lang="less" scoped>
@import "../../../assets/less/upload_img";
</style>
