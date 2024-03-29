<template>
  <div id="imgCropper" class="m-Upload">
    <!-- 图片显示 -->
    <div v-if="getImageUrl != ''" class="upload-show">
      <div class="upload-img-wrap">
        <img
          class="upload-image"
          :src="getImageUrl"
          alt="图片加载失败"
          @error="notFoundPic"
        />
      </div>
      <!-- 遮罩 -->
      <div class="upload-mask">
        <Icon
          v-if="preview"
          type="md-eye"
          class="g-mr10"
          @click.native="viewImage"
        ></Icon>
        <Icon type="md-create" @click.native="uploadClick"></Icon>
      </div>
    </div>
    <!-- <div class="clearfix"></div> -->
    <!-- 上传按钮 -->
    <div v-show="showUploadBtn" class="upload-btn" @click="uploadClick">
      <Icon type="md-camera" size="20"></Icon>
      <input
        ref="imgFile"
        type="file"
        :accept="format"
        hidden
        @change="selectFile"
      />
    </div>
    <div class="clearfix"></div>
    <!-- 上传进度条  -->
    <template v-if="uploadStatus != 'finished'">
      <Progress
        v-if="showProgress"
        :percent="percentage"
        hide-info
        :stroke-width="3"
        style="width: 340px"
      ></Progress>
    </template>
    <!-- 图片格式提示 -->
    <div v-if="showHint" class="hint">
      * 图片格式要求：jpg、jpeg、png，
      <span v-if="sizeHint">建议尺寸： {{ sizeHint }}，</span>
      文件大小为
      <span v-if="fileSize < 1024">{{ fileSize }}kb</span>
      <span v-else>{{ Math.floor(fileSize / 1024) }}M</span>
      以内。
    </div>
    <!-- 裁剪图片弹窗 -->
    <Modal
      :title="cropImgModel.title"
      class="m-cropper-img"
      v-model="cropImgModel.show"
      width="900"
      @on-cancel="hideCropModel"
    >
      <!-- 图片裁剪区域 -->
      <div class="img-cropper-area">
        <vueCropper
          ref="cropper"
          :img="option.img"
          :outputSize="option.size"
          :outputType="option.outputType"
          :info="true"
          :canScale="option.canScale"
          :autoCrop="option.autoCrop"
          :autoCropWidth="autoCropWidth"
          :autoCropHeight="autoCropHeight"
          :fixed="fixed"
          :fixedNumber="fixedNumber"
          @realTime="realTime"
        ></vueCropper>
      </div>
      <!-- 裁剪预览区域 -->
      <div class="img-preview-area">
        <div class="preview" :style="previewStyle">
          <div v-if="previews" :style="previews.div">
            <img :src="previews.url" :style="previews.img" />
          </div>
          <span v-else>裁剪预览区域</span>
        </div>
      </div>
      <div class="clearfix"></div>
      <!-- 操作区域 -->
      <div class="img-button-area">
        <Button type="primary" @click="changeScale(1)">
          <Icon type="md-add"></Icon>
        </Button>
        <Button type="primary" @click="changeScale(-1)">
          <Icon type="md-remove"></Icon>
        </Button>
        <Button type="primary" @click="rotateRight">
          <Icon type="md-refresh"></Icon>
        </Button>
        <!-- <Button type="primary" @click="previewImg('blob')">预览</Button> -->
      </div>
      <!-- 图片格式提示 -->
      <div style="margin-top: 10px">
        <span class="hint">
          * 图片格式要求：jpg、jpeg、png，
          <span v-if="sizeHint">建议尺寸： {{ sizeHint }}，</span>
          文件大小为
          <span v-if="fileSize < 1024">{{ fileSize }}kb</span>
          <span v-else>{{ Math.floor(fileSize / 1024) }}M</span>
          以内。
        </span>
      </div>
      <!-- 底部按钮 -->
      <div slot="footer">
        <Button type="default" @click="hideCropModel">取消</Button>
        <Button type="primary" @click="comfirCropper">确认裁剪</Button>
      </div>
    </Modal>
    <!-- 查看图片弹窗 -->
    <Modal title="查看图片" class="m-view-img" v-model="showModal" width="600">
      <img :src="getImageUrl" @error="notFoundPic" />
      <div slot="footer"></div>
    </Modal>
  </div>
</template>

<script>
// 组件
import vueCropper from "vue-cropper";
// 通用JS
import Common from "common/common.js";
// 图片上传设置
import { UploadImg } from "mixins";

export default {
  name: "imgCropper",
  mixins: [UploadImg],
  components: { vueCropper },
  // 获取父级传值
  props: {
    // 图片Url
    src: {
      type: String,
      default: "",
    },
    // 是否可预览
    preview: {
      type: Boolean,
      default: false,
    },
    // 是否显示格式提示
    showHint: {
      type: Boolean,
      default: true,
    },
    // 上传按钮尺寸提示文本
    sizeHint: {
      type: String,
      default: "100*100px",
    },
    // 图片文件大小限制，单位KB
    fileSize: {
      type: Number,
      default: 150,
    },
    // 固定裁剪宽度
    autoCropWidth: {
      type: Number,
      default: 100,
    },
    // 固定裁剪高度
    autoCropHeight: {
      type: Number,
      default: 100,
    },
    // 是否限制高宽比例
    fixed: {
      type: Boolean,
      default: false,
    },
    // 高宽比例值
    fixedNumber: {
      type: Array,
      default: () => [4, 3],
    },
  },
  watch: {
    src(val) {
      this.showUploadBtn = val ? false : true;
      this.getImageUrl = val;
    },
  },
  data() {
    return {
      // 裁剪图片弹窗
      cropImgModel: {
        title: "裁剪图片",
        show: false,
      },
      // 图片配置，参数地址：https://github.com/xyxiao001/vue-cropper
      option: {
        img: "",
        size: 1,
        outputType: "jpg",
        canScale: false,
        autoCrop: true,
      },
      // 实时图片预览
      previews: {},
      // 预览样式
      previewStyle: {},
      // 裁剪图片url
      cropImgUrl: "",
      // 获取图片显示路径
      getImageUrl: this.src,
      // 显示上传按钮
      showUploadBtn: this.src ? false : true,
    };
  },
  methods: {
    // 上传按钮点击事件
    uploadClick() {
      // 触发上传按钮点击事件
      this.$refs.imgFile.click();
    },
    // 确认裁剪
    comfirCropper() {
      this.progressShow();

      // 设置定时器累增进度条百分比
      let progress = setInterval(() => {
        if (this.percentage == 90) clearInterval(progress);
        this.percentage += 10;
      }, 100);

      // 上传裁剪图片
      this.$refs.cropper.getCropBlob((file) => {
        file.lastModifiedDate = new Date();

        this.uploadFileDemo(file)
          .then((res) => {
            const {
              data: { url },
            } = res;

            this.$emit("update:src", url);
            this.$emit("get-img-url", url);

            this.hideCropModel();
          })
          .catch((err) => console.log(err));
      });
    },
    // 取消上传
    hideCropModel() {
      this.cropImgModel.show = false;
      this.$refs.cropper.clearCrop();
      this.option.img = "";
      this.cropImgUrl = "";
    },
    // 选择文件
    selectFile() {
      // 获取上传文件列表
      const fileList = this.$refs.imgFile.files;

      if (fileList.length > 0) {
        let fileName = fileList[0].name;
        // 将文件大小字节转成kb
        let fileSize = Math.floor(fileList[0].size / 1024);

        let maxSize = this.fileSize;
        let overHint = maxSize + "kb";
        // 控制文件大小
        if (fileSize > maxSize) {
          if (maxSize > 1024) overHint = Math.floor(maxSize / 1024) + "M";
          this.$Notice.warning({
            title: "超出文件大小限制",
            desc: "文件 " + fileName + " 太大，不能超过 " + overHint,
          });
          this.progressHide();
          return false;
        }

        // 显示裁剪弹窗
        this.cropImgModel.show = true;

        let file = fileList[0];
        // FileReader API ：获取图片的base64 代码 并预览
        let reader = new FileReader();
        reader.onload = (e) => {
          let data;
          if (typeof e.target.result === "object") {
            // 把Array Buffer转化为blob 如果是base64不需要
            data = window.URL.createObjectURL(new Blob([e.target.result]));
          } else {
            data = e.target.result;
          }

          this.option.img = data;

          // 设置高度显示图片裁剪区域
          let cropperArea = document.querySelector(".img-cropper-area");
          cropperArea.style.height = "500px";
          // $('.img-cropper-area').height('500px');
        };
        // 转化为base64
        // reader.readAsDataURL(file);
        // 转化为blob
        reader.readAsArrayBuffer(file);
      } else console.log("获取不到文件列表");
    },
    // 图片缩放
    changeScale(num) {
      this.$refs.cropper.changeScale(num);
    },
    // 图片旋转
    rotateRight() {
      this.$refs.cropper.rotateRight();
    },
    // 实时预览函数
    realTime(data) {
      this.previews = data;
      // 设置预览样式，缩放显示
      this.previewStyle = {
        width: data.w + "px",
        height: data.h + "px",
        overflow: "hidden",
        margin: "0 auto",
        zoom: 0.6,
      };
    },
    // 图片预览
    previewImg(type) {
      // 本页打开
      if (type === "blob") {
        this.$refs.cropper.getCropBlob((data) => {
          this.cropImgUrl = window.URL.createObjectURL(data);
        });
      } else {
        this.$refs.cropper.getCropData((data) => {
          this.cropImgUrl = data;
        });
      }

      // 别的页面打开
      // let test = window.open('about:blank');
      // test.document.body.innerHTML = '图片生成中..';
      // if (type === 'blob') {
      //     this.$refs.cropper.getCropBlob((data) => {
      //         test = window.open('');
      //         test.location.href = window.URL.createObjectURL(data);
      //     })
      // }
      // else {
      //     this.$refs.cropper.getCropData((data) => {
      //         test.location.href = data;
      //     })
      // }
    },
  },
};
</script>

<style lang="less" scoped>
@import "../../assets/less/upload_img";

.img-cropper-area {
  width: 500px;
  float: left;
  margin-right: 35px;
}

.img-preview-area {
  width: 330px;
  min-height: 100px;
  line-height: 100px;
  text-align: center;
  overflow: hidden;
  float: left;

  img {
    width: 100%;
    display: block;
  }

  .preview {
    width: 100%;
    border: 1px dashed #e9eaec;
  }
}

.img-button-area {
  margin-top: 10px;

  button {
    margin-right: 10px;
  }
}

.upload-show {
  margin-bottom: 0;
}
</style>
