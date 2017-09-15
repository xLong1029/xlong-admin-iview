<template>
    <div class="g-content">
        <!--  加载判断 -->
        <Loading v-if="pageLoading"></Loading>
        555
    </div>
</template>

<script>
    // 组件
    import Loading from 'components/Common/Loading'
    // 组件
    import SingleImage from 'components/UploadImage/SingleImage'
    // 通用JS
    import Common from 'common/common.js'
    // Api方法
    import Api from 'api/api.js'
    // Vuex
    import { mapGetters } from 'vuex'
    
    export default {
        components: { Loading },
        data() {
            return {
                // 加载页面
                pageLoading: true,
                // 职位列表
                jobList: [],
                // 地区列表
                provinceList: [],
                // 专业领域列表
                professionList: [],
                // 邮箱列表
                emailList: [],
                // 用户编号
                productId: '',
                // 表单信息
                infoForm: {
                    // 真实姓名
                    realname: '',
                    // 头像
                    face: require('@/assets/images/default-face.jpg'),
                    // 性别
                    gender: '男',
                    // 出生日期
                    birthdate: '',
                    // 手机号
                    mobile: '',
                    // 邮箱
                    email: '',
                    // 企业名称
                    companyName: '',
                    // 职位
                    job: '',
                    // 专业领域
                    profession: '',
                    // 所在省份
                    province: '河北省',
                    // 所在城市
                    city: '唐山市',
                    // 所在区域
                    area: '路北区',
                },
                // 验证规则
                validate: {
                    realname: [{ required: true, message: '真实姓名不能为空', trigger: 'blur'}],
                    birthdate: [{
                        validator: (rule, value, callback) => {
                            Validate.ValidBirthDate(value, callback, false);
                        },
                        trigger: 'change'
                    }],
                    mobile: [
                        { required: true, message: '手机号码不能为空', trigger: 'blur'},
                        { pattern: Common.regMobile, message: '手机号码格式不正确', trigger: 'blur' }
                    ]
                },
            }
        },
        created() {
            // 设置面包屑路径
            this.$store.commit('SET_BREADCRUMB', [
                { name: '首页', path: '/Home' },
                { name: '产品列表', path: '/Examples/ProductList' },
                { name: '产品详情', path: '' }
            ]);
            // 获取用户编号
            this.productId = this.$route.query.id;
        },
        methods: {
        }
    }
</script>

<style lang="less" scoped>    
    .m-operation {
        button,
        a {
            min-width: 80px;
            margin-left: 10px;
        }
    }
    .ivu-select.select-province {
        float: left;
        width: 32.5%;
        margin-right: 1%;
        &:nth-child(3n) {
            margin-right: 0;
        }
    }
</style>