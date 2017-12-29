<template>
    <div class="m-product-info">
        <!--  加载判断 -->
        <Loading v-if="pageLoading"></Loading>
        <div v-else>
            <Form ref="infoForm" :model="infoForm" :rules="validate" :label-width="100">
                <Form-item label="产品名称：" prop="productName">
                    <Input v-model="infoForm.productName" placeholder="请输入产品名称"></Input>
                </Form-item>
                <Form-item label="产品说明：" prop="productDesc">
                    <quill-editor
                        class="instruction-editor"
                        v-model="infoForm.productDesc"
                        ref="myQuillEditor"
                        :options="editorOption"
                        @ready="onEditorReady($event)"
                    >
                    </quill-editor>
                </Form-item>
                <!-- 操作按钮 -->
                <div class="m-operation">
                    <Button class="fr" type="primary" @click="edit('infoForm')">确认修改</Button>
                    <div class="clearfix"></div>
                </div>
            </Form>
        </div>
    </div>
</template>

<script>
    // 组件
    import Loading from 'components/Common/Loading'
    // Api方法
    import Api from 'api/api.js'
    // Vue-quill-editor
    import Quill from 'quill'
    // QullEditor图片上传配置
    import { ImageImport } from 'qullEditor/ImageImport.js'
    import { ImageResize } from 'qullEditor/ImageResize.js'
    Quill.register('modules/imageImport', ImageImport)
    Quill.register('modules/imageResize', ImageResize)
    
    export default {
        components: { Loading },
        // 获取父级传值productId
        props: {
            // 设置默认值
            productId:{
                type: String,
                default: '',
            }, 
        },
        data() {
            return {
                // 加载页面
                pageLoading: true,
                // 富文本编辑器配置
                editorOption:{
                    placeholder: '内容',
                    modules:{
                        imageImport: true,
                        imageResize: {
                            displaySize: true
                        }
                    }
                },
                // 表单信息
                infoForm: {
                    productName: '',
                    productDesc: '',
                },
                // 验证规则
                validate: {
                    productName: [{ required: true, message: '产品名称不能为空', trigger: 'blur'}],
                },
            }
        },
        created() {
            // 获取产品详情
            this.getDetail();
        },
        methods: {
            // 编辑器初始化
            onEditorReady(editor) {
            },
            // 编辑器内容改变
            onEditorChange({ editor, html, text }) {
                this.content = html
            },
            // 获取产品详情
            getDetail(){
                Api.GetProdInfo(this.productId)
                .then(res => {                    
                    // 取消页面加载
                    this.pageLoading = false;
                    const result = res.data.attributes;                    
                    if(res.code == 200){
                        // 设置数据
                        this.infoForm = result;
                    }
                    else this.$Message.warning(res.msg);
                })
                .catch(err => console.log(err))
            },
            // 修改信息
            edit(name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        // 页面加载
                        this.pageLoading = true;

                        // 修改产品信息
                        Api.EditProduct(this.infoForm, this.productId)
                        .then(res => {
                            // 取消页面加载
                            this.pageLoading = false;
                            if(res.code == 200) this.$Message.success('信息修改成功!');
                            else this.$Message.warning(res.msg);
                        })
                        .catch(err => console.log(err))
                    }
                    else this.$Message.error('提交失败！填写有误');
                })    
            },
        }
    }
</script>

<style lang="less">
    @import "../../../../assets/less/color";
    .m-product-info{
        background: #f5f5f5;
        border-radius: 4px;
        padding: 20px;
    }

    .m-operation {
        button, a {
            min-width: 80px;
            margin-left: 10px;
        }
    }
    
    .instruction-editor{
        background: #fff;
        .ql-toolbar{
            border-radius: 4px 4px 0 0;
            border: 1px solid @table-border-color;
        }
        .ql-container{
            min-height: 500px;
            border-radius: 0 0 4px 4px;
            border: 1px solid #eee;
            .ql-editor{
                padding-bottom: 20px;
            }
        }
    }
</style>