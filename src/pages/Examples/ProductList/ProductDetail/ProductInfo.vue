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
                    <!-- 组件-富文本编辑器 -->
                    <Tinymce v-model="infoForm.productDesc" height="500" />
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
    //导入富文本组件
	import Tinymce from 'components/Common/Tinymce'
    // Api方法
    import Api from 'api/product_list.js'
    
    export default {
        components: { Loading, Tinymce },
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
                pageLoading: false,
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
            // 获取产品详情
            getDetail(){
                this.pageLoading = true;
                Api.GetProdInfo(this.productId)
                .then(res => {                    
                    // 取消页面加载
                    this.pageLoading = false;
                    const result = res.data;                    
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
                            if(res.code == 200){
                                this.$Message.success('信息修改成功!');
                                this.getDetail();
                            }
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
</style>