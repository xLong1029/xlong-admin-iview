<template>
    <div class="g-content">
        <!-- 单图片上传组件 -->
        <h2 class="m-title">单图片上传</h2>
        <div class="m-content">
            <div class="m-compo-part">
                <SingleImage :src="sUploadAttr.src" :preview="sUploadAttr.preview" :size-hint="sUploadAttr.sizeHint" :file-size="sUploadAttr.fileSize"></SingleImage>
                <div class="m-desc">
                    <p>组件包含属性：</p>
                    <p>1. src，显示的图片路径。String类型，默认值为''，不显示</p>
                    <p>2. preview，是否可预览。Boolean类型，默认值为false，不可预览</p>
                    <p>3. sizeHint，是否显示图片尺寸建议。String类型，默认不显示。设置其他值：size-hint="100*100px"</p>
                    <p>4. fileSize，设置最大图片文件大小，单位kb。Number类型，默认值为150</p>
                </div>
            </div>
            <div class="m-test-part">
                <p class="g-mb10">组件属性值测试：</p>
                <!-- 功能表单 -->
                <Form ref="sUploadAttr" :model="sUploadAttr" :rules="uploadValid" :label-width="75" style="width:400px;">
                    <Form-item label="preview：" prop="setPreview">
                        <RadioGroup v-model="sUploadAttr.setPreview">
                            <Radio label="true">true</Radio>
                            <Radio label="false">false</Radio>
                        </RadioGroup>
                    </Form-item>
                    <Form-item label="src：" prop="setSrc">
                        <Input v-model="sUploadAttr.setSrc" placeholder="请输入显示图片路径，例如：https://file.iviewui.com/dist/87ead0a68423c0844ddd159f0cde42b3.jpg"></Input>
                    </Form-item>
                    <Form-item label="sizeHint：" prop="setSizeHint">
                        <Input v-model="sUploadAttr.setSizeHint" placeholder="请输入尺寸建议，例如：100*100px"></Input>
                    </Form-item>
                    <Form-item label="fileSize：" prop="setFileSize">
                        <Input v-model="sUploadAttr.setFileSize" placeholder="请输入限制最大文件大小，例如：1024"></Input>
                    </Form-item>
                    <Form-item>
                        <Button type="primary" style="margin-top:2px" @click="uploadAttrTest('sUploadAttr', 1)">测试</Button>
                        <Button type="ghost" style="margin-top:2px" @click="clearForm('sUploadAttr', 1)">重置</Button>
                    </Form-item>
                </Form>
            </div>
        </div>
        <!-- 多图片上传组件 -->
        <h2 class="m-title">多图片上传</h2>
        <div class="m-content">
            <div class="m-compo-part">
                <MultipleImage :img-list="mUploadAttr.imgList" :preview="mUploadAttr.preview" :size-hint="mUploadAttr.sizeHint" :file-size="mUploadAttr.fileSize" :max-num="mUploadAttr.maxNum" @get-img-list="setImgList"></MultipleImage>
                <div class="m-desc">
                    <p>组件包含属性：</p>
                    <p>1. preview，是否可预览。Boolean类型，默认值为false，不可预览</p>
                    <p>2. sizeHint，是否显示图片尺寸建议。String类型，默认不显示。设置其他值：size-hint="100*100px"</p>
                    <p>3. fileSize，设置最大图片文件大小，单位kb。Number类型，默认值为150</p>
                    <p>4. maxNum，设置最大上传个数。Number类型，默认值为5</p>
                </div>
            </div>
            <div class="m-test-part">
                <p class="g-mb10">组件属性值测试：</p>
                <!-- 功能表单 -->
                <Form ref="mUploadAttr" :model="mUploadAttr" :rules="uploadValid" :label-width="75" style="width:400px;">
                    <Form-item label="preview：" prop="setPreview">
                        <RadioGroup v-model="mUploadAttr.setPreview">
                            <Radio label="true">true</Radio>
                            <Radio label="false">false</Radio>
                        </RadioGroup>
                    </Form-item>
                    <Form-item label="sizeHint：" prop="setSizeHint">
                        <Input v-model="mUploadAttr.setSizeHint" placeholder="请输入尺寸建议，例如：100*100px"></Input>
                    </Form-item>
                    <Form-item label="fileSize：" prop="setFileSize">
                        <Input v-model="mUploadAttr.setFileSize" placeholder="请输入限制最大文件大小，例如：1024"></Input>
                    </Form-item>
                    <Form-item label="fileSize：" prop="setMaxNum">
                        <Input v-model="mUploadAttr.setMaxNum" placeholder="请输入限制上传最大个数，例如：3"></Input>
                    </Form-item>
                    <Form-item>
                        <Button type="primary" style="margin-top:2px" @click="uploadAttrTest('mUploadAttr', 2)">测试</Button>
                        <Button type="ghost" style="margin-top:2px" @click="clearForm('mUploadAttr', 2)">重置</Button>
                    </Form-item>
                </Form>
            </div>
        </div>
        <!-- 图片裁剪组件 -->
        <h2 class="m-title">图片裁剪</h2>
        <div class="m-content">
            <div class="m-compo-part">
                <ImageCropper
                    :src="imgCropAttr.src"
                    :preview="imgCropAttr.preview"
                    :size-hint="imgCropAttr.sizeHint"
                    :file-size="imgCropAttr.fileSize"
                    :auto-crop-width="imgCropAttr.autoCropWidth"
                    :auto-crop-height="imgCropAttr.autoCropHeight"
                    :fixed="imgCropAttr.fixed"
                    :fixed-number="imgCropAttr.fixedNumber"
                ></ImageCropper>
                <div class="m-desc">
                    <p>组件包含属性：</p>
                    <p>1. src，显示的图片路径。String类型，默认值为''，不显示</p>
                    <p>2. preview，是否可预览。Boolean类型，默认值为false，不可预览</p>
                    <p>3. sizeHint，是否显示图片尺寸建议。String类型，默认不显示。设置其他值：size-hint="100*100px"</p>
                    <p>4. fileSize，设置最大图片文件大小，单位kb。Number类型，默认值为150</p>
                    <p>5. autoCropWidth，设置裁剪宽度，单位px。Number类型，默认值为100</p>
                    <p>6. autoCropHeight，设置裁剪高度，单位px。Number类型，默认值为100</p>
                    <p>7. fixed，是否限制裁剪高宽比例。Boolean类型，默认值为false，不限制</p>                 
                    <p>8. fixedNumber，设置裁剪高宽比例，只有限制高宽比例时才有用。Array类型，默认值为[4, 3]，即比例为4：3</p>
                </div>
            </div>
            <div class="m-test-part">
                <p class="g-mb10">组件属性值测试：</p>
                <!-- 功能表单 -->
                <Form ref="imgCropAttr" :model="imgCropAttr" :rules="uploadValid" :label-width="110" style="width:400px;">
                    <Form-item label="preview：" prop="setPreview">
                        <RadioGroup v-model="imgCropAttr.setPreview">
                            <Radio label="true">true</Radio>
                            <Radio label="false">false</Radio>
                        </RadioGroup>
                    </Form-item>
                    <Form-item label="src：" prop="setSrc">
                        <Input v-model="imgCropAttr.setSrc" placeholder="请输入显示图片路径，例如：https://file.iviewui.com/dist/87ead0a68423c0844ddd159f0cde42b3.jpg"></Input>
                    </Form-item>
                    <Form-item label="sizeHint：" prop="setSizeHint">
                        <Input v-model="imgCropAttr.setSizeHint" placeholder="请输入尺寸建议，例如：100*100px"></Input>
                    </Form-item>
                    <Form-item label="fileSize：" prop="setFileSize">
                        <Input v-model="imgCropAttr.setFileSize" placeholder="请输入限制最大文件大小，例如：1024"></Input>
                    </Form-item>
                    <Form-item label="autoCropWidth：" prop="setAutoCropWidth">
                        <Input v-model="imgCropAttr.setAutoCropWidth" placeholder="请输入裁剪宽度，例如：200"></Input>
                    </Form-item>
                    <Form-item label="autoCropHeight：" prop="setAutoCropHeight">
                        <Input v-model="imgCropAttr.setAutoCropHeight" placeholder="请输入裁剪高度，例如：200"></Input>
                    </Form-item>
                    <Form-item label="fixed：" prop="setFixed">
                        <RadioGroup v-model="imgCropAttr.setFixed">
                            <Radio label="true">true</Radio>
                            <Radio label="false">false</Radio>
                        </RadioGroup>
                    </Form-item>
                    <Form-item label="fixedNumber：" prop="setFixedNumber">
                        <Input v-model="imgCropAttr.setFixedNumber" placeholder="请输入高宽比例以冒号隔开，例如 4:3"></Input>
                    </Form-item>
                    <Form-item>
                        <Button type="primary" style="margin-top:2px" @click="uploadAttrTest('imgCropAttr', 3)">测试</Button>
                        <Button type="ghost" style="margin-top:2px" @click="clearForm('imgCropAttr', 3)">重置</Button>
                    </Form-item>
                </Form>
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
                <Form v-if="addFunDisplay" class="g-mt20" ref="addUrlPart" :model="addUrlPart" :rules="addValid" :label-width="100">
                    <Form-item class="fl g-mr10" label="新增URL：" prop="url">
                        <Input v-model="addUrlPart.url" style="width:460px" placeholder="请输入需要展示的图片链接"></Input>
                    </Form-item>
                    <Button class="fl g-mr10" type="primary" style="margin-top:2px" @click="addShowImgUrl('addUrlPart')">新增</Button>
                    <Button class="fl" type="ghost" style="margin-top:2px" @click="clearForm('addUrlPart', 4)">重置</Button>
                    <div class="clearfix"></div>
                </Form>
                <!-- 图片链接展示 -->
                <p :class="!addFunDisplay ? 'g-mt20' : ''">当前显示图片Url: </p>
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
    import ImageCropper from 'components/Image/ImageCropper'

    import { StrToArr } from 'common/important.js'

    export default {
        components:{ SingleImage, MultipleImage, ShowImage, ImageCropper },
        data() {
            return {
                /* 图片裁剪 */
                imgCropAttr:{
                    src: '',
                    setSrc: '',
                    preview: true,
                    setPreview: 'true',
                    sizeHint: '',
                    setSizeHint: '',
                    fileSize: 150,
                    setFileSize: '',
                    autoCropWidth: 100,
                    setAutoCropWidth: '',
                    autoCropHeight: 100,
                    setAutoCropHeight: '',
                    fixed: false,
                    setFixed: 'true',
                    fixedNumber: [4, 3],
                    setFixedNumber: ''
                },
                /* 单图片上传 */
                sUploadAttr:{
                    src: '',
                    setSrc: '',
                    preview: true,
                    setPreview: 'true',
                    sizeHint: '',
                    setSizeHint: '',
                    fileSize: 150,
                    setFileSize: ''
                },
                a:{
                    imgList: []
                },
                /* 多图片上传 */
                mUploadAttr: {
                    imgList: [],
                    preview: true,
                    setPreview: 'true',
                    sizeHint: '',
                    setSizeHint: '',
                    fileSize: 150,
                    setFileSize: '',
                    maxNum: 5,
                    setMaxNum: ''
                },
                uploadValid:{
                    setSrc: [{ pattern: /^[\S]+$/, message: '请不要输入空字符', trigger: 'blur' }],
                    setSizeHint: [{ pattern: /^[\S]+$/, message: '请不要输入空字符', trigger: 'blur' }],
                    setFileSize: [{ pattern: /^[\d]+$/, message: '请输入纯数字', trigger: 'blur' }],
                    setMaxNum: [{ pattern: /^[\d]+$/, message: '请输入纯数字', trigger: 'blur' }],
                    setAutoCropWidth: [{ pattern: /^[\d]+$/, message: '请输入纯数字', trigger: 'blur' }],
                    setAutoCropHeight: [{ pattern: /^[\d]+$/, message: '请输入纯数字', trigger: 'blur' }],
                },
                /* 图片展示 */
                // 显示查看图片
                imgUrlArr: ['https://ss0.baidu.com/6ONWsjip0QIZ8tyhnq/it/u=1569462993,172008204&fm=5'],
                // 显示新增图片框
                addFunDisplay: false,
                // 图片链接
                addUrlPart:{
                    url: '',
                },
                // 验证
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
                this.addFunDisplay = true;
            },
            // 清空图片链接
            clearImgUrl(){
                this.imgUrlArr = [''];
            },
            // 测试上传属性设置
            uploadAttrTest(form, type){
                switch(type){
                    case 1:
                        this.sUploadAttr.src = this.sUploadAttr.setSrc;
                        this.sUploadAttr.preview = this.sUploadAttr.setPreview == 'true' ? true : false;
                        this.sUploadAttr.sizeHint = this.sUploadAttr.setSizeHint;
                        this.sUploadAttr.fileSize = Number(this.sUploadAttr.setFileSize) == 0 ? 150 : Number(this.sUploadAttr.setFileSize);
                        break;
                    case 2:
                        this.mUploadAttr.preview = this.mUploadAttr.setPreview == 'true' ? true : false;
                        this.mUploadAttr.sizeHint = this.mUploadAttr.setSizeHint;
                        this.mUploadAttr.fileSize = Number(this.mUploadAttr.setFileSize) == 0 ? 150 : Number(this.mUploadAttr.setFileSize);
                        this.mUploadAttr.maxNum = Number(this.mUploadAttr.setMaxNum) == 0 ? 5 : Number(this.mUploadAttr.setMaxNum);
                        break;                    
                    case 3:
                        this.imgCropAttr.src = this.imgCropAttr.setSrc;
                        this.imgCropAttr.preview = this.imgCropAttr.setPreview == 'true' ? true : false;
                        this.imgCropAttr.sizeHint = this.imgCropAttr.setSizeHint;
                        this.imgCropAttr.fileSize = Number(this.imgCropAttr.setFileSize) == 0 ? 150 : Number(this.imgCropAttr.setFileSize);
                        this.imgCropAttr.autoCropWidth = Number(this.imgCropAttr.setAutoCropWidth) == 0 ? 100 : Number(this.imgCropAttr.setAutoCropWidth);
                        this.imgCropAttr.autoCropHeight = Number(this.imgCropAttr.setAutoCropHeight) == 0 ? 100 : Number(this.imgCropAttr.setAutoCropHeight);
                        this.imgCropAttr.fixed = this.imgCropAttr.setFixed == 'true' ? true : false;
                        // 中文：换成英文: ，再将字符串转成数组
                        this.imgCropAttr.fixedNumber = StrToArr(this.imgCropAttr.setFixedNumber.replace(/：/g, ":"), ':');
                        break;
                    default: console.log('清空type传值出错');
                } 
            },
            // 清空表单
            clearForm(form, type){
                this.$refs[form].resetFields();
                switch(type){
                    case 1:
                        this.sUploadAttr.preview = true;
                        this.sUploadAttr.sizeHint = '';
                        this.sUploadAttr.fileSize = 150;
                        break;
                    case 2:
                        this.mUploadAttr.preview = true;
                        this.mUploadAttr.sizeHint = '';
                        this.mUploadAttr.fileSize = 150;
                        this.mUploadAttr.maxNum = 5;
                        break;
                    case 3:
                        this.imgCropAttr.preview = true;
                        this.imgCropAttr.sizeHint = '';
                        this.imgCropAttr.fileSize = 150;
                        this.imgCropAttr.autoCropWidth = 100;
                        this.imgCropAttr.autoCropHeight = 100;
                        this.imgCropAttr.fixed = false;
                        this.imgCropAttr.fixedNumber = [4, 3];
                        break;
                    case 4:
                        break;
                    default: console.log('清空type传值出错');
                }                
            },
            // 获取多图片上传路径
            setImgList(value){
                this.mUploadAttr.imgList = value;
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
