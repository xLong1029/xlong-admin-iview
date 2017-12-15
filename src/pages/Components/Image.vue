<template>
    <div class="g-content">
        <!-- 单图片上传组件 -->
        <h2 class="m-title">单图片上传</h2>
        <div class="m-content">
            <div class="m-compo-part">
                <SingleImage :preview="true" size-hint="100*100px"></SingleImage>
                <div class="m-desc">
                    <p>组件包含属性：</p>
                    <p>1. preview，是否可预览。Boolean类型，默认值为false，不可预览</p>
                    <p>2. sizeHint，是否显示图片尺寸建议。String类型，默认不显示。设置其他值：size-hint="100*100px"</p>
                    <p>3. fileSize，设置最大图片文件大小，单位KB。Number类型，默认值为150</p>
                </div>
            </div>
            <div class="m-test-part" style="color:#aaa;">
                属性的测试功能开发中...
            </div>
        </div>
        <!-- 多图片上传组件 -->
        <h2 class="m-title">多图片上传</h2>
        <div class="m-content">
            <div class="m-compo-part">
                <MultipleImage :preview="true" size-hint="100*100px" :file-size="Number(5120)" :max-num="Number(3)"></MultipleImage>
                <div class="m-desc">
                    <p>组件包含属性：</p>
                    <p>1. preview，是否可预览。Boolean类型，默认值为false，不可预览</p>
                    <p>2. sizeHint，是否显示图片尺寸建议。String类型，默认不显示。设置其他值：size-hint="100*100px"</p>
                    <p>3. fileSize，设置最大图片文件大小，单位KB。Number类型，默认值为150</p>
                    <p>4. maxNum，设置最大上传个数。Number类型，默认值为5</p>
                </div>
            </div>
            <div class="fl m-test-part" style="color:#aaa;">
                属性的测试功能开发中...
            </div>
        </div>
        <!-- 图片展示组件 -->
        <h2 class="m-title">图片展示（可多图展示）</h2>
        <div class="m-content">
            <div class="m-compo-part">
                <ShowImage :image-url-arr="imgUrlArr"></ShowImage>
                <div class="m-desc">
                    <p>组件包含属性：</p>
                    <p>1. imageUrlArr，图片的URL地址集合。Array类型，默认值为[]空数组</p>
                </div>
            </div>
            <div class="m-test-part m-show-img-block">
                <!-- 操作按钮 -->
                <Button class="fl g-mr10" type="primary" @click="clearImgUrl">清空图片链接</Button>
                <Button class="fl" type="primary" @click="showTest">测试功能</Button>
                <div class="clearfix"></div>
                <!-- 功能表单 -->
                <Form v-if="showTestFun" class="g-mt20" ref="addUrlPart" :model="addUrlPart" :rules="addValid" :label-width="100">
                    <Form-item class="fl g-mr10" label="新增URL：" prop="url">
                        <Input v-model="addUrlPart.url" style="width:460px" placeholder="请输入需要展示的图片链接"></Input>
                    </Form-item>
                    <Button class="fl g-mr10" type="primary" style="margin-top:2px" @click="addShowImgUrl('addUrlPart')">新增</Button>
                    <Button class="fl" type="ghost" style="margin-top:2px" @click="clearForm('addUrlPart')">重置</Button>
                    <div class="clearfix"></div>
                </Form>
                <!-- 图片链接展示 -->
                <p :class="!showTestFun ? 'g-mt20' : ''">当前显示图片Url: </p>
                <ul v-if="imgUrlArr.length > 0 && imgUrlArr[0] != ''" class="g-mt15">
                    <li class="g-mb10" v-for="(item, index) in imgUrlArr" :key="index"><a :href="item" target="_blank">{{ index + 1 }}. {{ item }}</a></li>
                </ul>
                <p v-else class="g-mt15" style="color:#aaa;">暂无图片链接</p>
            </div>
        </div>
    </div>
</template>

<script>
    // 组件
	import SingleImage from 'components/Image/UploadImage/SingleImage'
    import MultipleImage from 'components/Image/UploadImage/MultipleImage'
    import ShowImage from 'components/Image/ShowImage'

    export default {
        components:{ SingleImage, MultipleImage, ShowImage },
        data() {
            return {
                // 显示查看图片
                imgUrlArr: ['https://ss0.baidu.com/6ONWsjip0QIZ8tyhnq/it/u=1569462993,172008204&fm=5'],
                // 显示图片的地址
                showImgUrl: '',
                // 显示测试功能
                showTestFun: false,
                // 新增图片链接部分
                addUrlPart:{
                    url: '',
                },
                // 新增图片验证
                addValid:{
                    url: [
                        { required: true, message: '图片链接不能为空', trigger: 'blur'},
                        { pattern: /^[\S]+$/, message: '请不要输入空字符', trigger: 'blur' }
                    ],
                }
            }
        },
        created(){
            // 设置面包屑路径
            this.$store.commit('SET_BREADCRUMB', [
                { name: '首页', path: '/Home' },
                { name: 'Image图片操作', path: '/Components/Image' }
            ]);
            // 初始化图片显示链接
            this.$store.commit('SET_IMAGE_URL', '');
            this.$store.commit('SET_IMAGE_URL_ARR', '');
        },
        methods:{
            // 新增图片展示Url
            addShowImgUrl(form){
                this.$refs[form].validate((valid) => {
                    if (valid) {
                        if(this.imgUrlArr.length <= 1)
                            this.imgUrlArr = [this.addUrlPart.url];
                        else
                            this.imgUrlArr.push(this.addUrlPart.url);
                        
                        this.$Message.success('新增成功！请查看功能是否正确');
                    }
                    else this.$Message.error('提交失败！填写有误');
                })
            },
            // 显示功能测试
            showTest(){
                this.showTestFun = true;
            },
            // 清空图片链接
            clearImgUrl(){
                this.imgUrlArr = [''];
            },
            // 清空表单
            clearForm(form){
                this.$refs[form].resetFields();
            }
        }
    }
</script>

<style lang="less" scoped>
    @import "../../assets/less/page_desc";
    .m-show-img-block{
        a{
            width: 100%;
            display: block;
            word-wrap:break-word;
        }
    }
</style>
