/*
 * 模块 : 图片上传相关配置
 * 作者 : 罗永梅（381612175@qq.com）
 * 日期 : 2022-05-07
 * 版本 : version 2.0
 */
import { SetDefaultPic } from "utils";

export default {
  data() {
    return {
      // 图片上传分时
      format: ["image/jpg", "image/jpeg", "image/png"],
      // 上传状态，上传成功完成为finished
      uploadStatus: "",
      // 上传状态，上传成功完成为finished
      uploadStatus: "",
      // 是否显示进度条
      showProgress: false,
      // 上传加载
      loading: false,
      // 是否显示弹窗
      showModal: false,
      // 显示遮罩
      showMask: false,
      // 上传进度
      percentage: 0,
      // 显示图片的地址
      showImgUrl: "",
      // 是否显示上传按钮
      showUploadBtn: true,
    };
  },
  created() {},
  methods: {
    // 查看图片
    viewImage() {
      this.showModal = true;
    },
    // 上传按钮点击事件
    uploadClick() {
      // 触发上传按钮点击事件
      this.$refs.imgFile.click();
    },
    // 上传至Bomb
    uploadToBomb(file) {
      // 设置定时器累增进度条百分比
      let progress = setInterval(() => {
        if (this.percentage == 90) clearInterval(progress);
        this.percentage += 10;
      }, 100);

      return new Promise((resolve, reject) => {
        file.save().then(
          (res) => {
            // 停止加载和隐藏进度
            this.progressHide();
            this.percentage = 100;
            clearInterval(progress);

            this.showUploadBtn = false;
            this.$Notice.success({ title: "图片上传成功!" });

            resolve(res);
          },
          (err) => {
            this.errorTip(progress);
            reject(err);
          }
        );
      });
    },
    // 上传文件（模拟）
    uploadFileDemo(file) {
      this.progressShow();

      return new Promise((resolve) => {
        // 设置定时器累增进度条百分比
        let progress = setInterval(() => {
          this.percentage += 20;

          if (this.percentage >= 100) {
            clearInterval(progress);

            const { name, size, type } = file;

            // 转bse64
            let reader = new FileReader();
            reader.readAsDataURL(file); // 这里也可以直接写参数event.raw
            reader.onload = () => {
              const url = reader.result;
              const data = {
                name,
                size,
                size,
                type,
                urlType: "base64",
                url,
              };
              const res = { code: 200, data, mesaage: "上传成功" };

              this.progressHide();
              resolve(res);
            };
          }
        }, 100);
      });
    },
    // 选择文件
    selectFile() {
      this.progressHide();

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

          return false;
        }
        this.uploadFile(fileList[0]);
      } else console.log("获取不到文件列表");
    },
    // 显示进度条
    progressShow() {
      this.loading = true;
      this.uploadStatus = "";
      this.percentage = 0;
      this.showProgress = true;
    },
    // 隐藏进度条
    progressHide() {
      this.loading = false;
      this.uploadStatus = "finished";
      this.showProgress = false;
    },
    // 无法显示图片
    notFoundPic(event) {
      SetDefaultPic(event, 1);
    },
    // 错误提示
    errorTip(progress) {
      // 停止加载和隐藏进度条
      this.progressHide();
      clearInterval(progress);
      this.$Notice.error({ title: "图片上传失败，请重试！" });
    },
  },
};
