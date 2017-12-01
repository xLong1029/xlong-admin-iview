/*
 * 模块 : 城市联动选择相关配置
 * 作者 : 罗永梅（381612175@qq.com）
 * 日期 : 2017-9-7
 * 版本 : version 1.0
 */
import Common from 'common/common.js'
import axios from 'axios'

export default {
	data() {
		return{
            // 显示遮罩
            showMask: false,
            // 上传进度
            percentage: 0,
        }
    },
    created(){},
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
            // 显示进度条
            this.progressShow();

            // 获取上传文件列表
            const fileList = this.$refs.imgFile.files;
            if(fileList.length > 0){
                let fileName = fileList[0].name;
                // 将文件大小字节转成kb
                let fileSize = Math.floor(fileList[0].size / 1024);

                let maxSize = this.fileSize;                
                let overHint = maxSize + 'kb';
                // 控制文件大小
                if(fileSize > maxSize){
                    if(maxSize > 1024) overHint = Math.floor(maxSize/1024) + 'M';
                    this.$Notice.warning({
                        title: '超出文件大小限制',
                        desc: '文件 ' + fileName + ' 太大，不能超过 ' + overHint
                    });
                    this.progressHide();
                    return false;
                }
                this.uploadFile(fileList[0]);
            }
            else console.log('获取不到文件列表');
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
            
            // 七牛存储空间测试时请选择华东，否则报错：incorrect region, please use up-z2.qiniu.com
            axios.post('http://upload.qiniu.com/', params)
            .then(res => {
                let url = Common.UPLOAD_URL + res.data.hash;
                this.$store.commit('SET_IMAGE_URL', url);
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
        // 显示进度条
        progressShow(){
            this.loading = true;
            this.uploadStatus = '';
            this.percentage = 0;
            this.showProgress = true;
        },
        // 隐藏进度条
        progressHide(){
            this.loading = false;
            this.uploadStatus = 'finished';
            this.showProgress = false;
        },
        // 无法显示图片
        notFoundPic(event){
            Common.SetDefaultPic(event, 2);
        },
	}
}