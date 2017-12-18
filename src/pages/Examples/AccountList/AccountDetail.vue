<template>
    <div class="g-content">
        <!--  加载判断 -->
        <Loading v-if="pageLoading"></Loading>
        <Form v-else ref="infoForm" :model="infoForm" :rules="validate" :label-width="100">
            <!-- 个人信息 -->
            <h2 class="m-title">个人信息</h2>
            <div class="m-content">
                <Row>
                    <Col span="12">
                    <Form-item label="真实姓名：" prop="realname">
                        <Input v-model="infoForm.realname" placeholder="请输入真实姓名"></Input>
                    </Form-item>
                    <Form-item label="性别：" prop="gender">
                        <Radio-group v-model="infoForm.gender">
                            <Radio label="男">男</Radio>
                            <Radio label="女">女</Radio>
                        </Radio-group>
                    </Form-item>
                    <Form-item label="手机号码：" prop="mobile">
                        <Input v-model="infoForm.mobile" placeholder="请输入手机号码"></Input>
                    </Form-item>
                    <Form-item label="邮箱：">
                        <AutoComplete v-model="infoForm.email" :data="emailList" @on-search="selectEmail" @on-select="setEmail" placeholder="请输入邮箱地址"></AutoComplete>
                    </Form-item>
                    </Col>
                    <Col span="12">
                    <Form-item label="头像：" style="margin-bottom:16px;">
                        <!-- 组件-图片上传-单图片显示 -->
                        <SingleImage :preview="true" size-hint="100*100px"></SingleImage>
                    </Form-item>
                    <Form-item label="出生日期：" prop="birthdate">
                        <Date-picker v-model="infoForm.birthdate" type="date" placeholder="起始时间" @on-change="getBirthDate" style="width:100%"></Date-picker>
                        <div class="clearfix"></div>
                    </Form-item>
                    </Col>
                </Row>
            </div>
            <!-- 工作信息 -->
            <h2 class="m-title">工作信息</h2>
            <div class="m-content">
                <Row>
                    <Col span="12">
                    <Form-item label="企业名称：">
                        <!-- 组件-匹配企业名称 -->
						<CompanyName type="1"></CompanyName>
                    </Form-item>
                    <Form-item label="专业领域：">
                        <Select v-model="infoForm.profession" placeholder="请选择专业领域">
                            <Option v-for="(item, index) in professionList" :value="item.name" :key="index">{{ item.name }}</Option>
                        </Select>
                    </Form-item>
                    </Col>
                    <Col span="12">
                    <Form-item label="职位：">
                        <Select v-model="infoForm.job" placeholder="请选择职位">
                            <Option v-for="(item, index) in jobList" :value="item.name" :key="index">{{ item.name }}</Option>
                        </Select>
                    </Form-item>
                    <Form-item label="所在省市：">
                        <Cascader :data="cityList" v-model="provinceValue" placeholder="请选择所在省市" @on-change="selectCity"></Cascader>
                    </Form-item>
                    </Col>
                </Row>
            </div>
            <!-- 操作按钮 -->
            <div class="m-operation">
                <Button class="fr" type="primary" @click="edit('infoForm')">确认修改</Button>
                <Button class="fr" type="ghost" @click="$router.go(-1)">返回</Button>
                <div class="clearfix"></div>
            </div>
        </Form>
    </div>
</template>

<script>
    // 组件
    import Loading from 'components/Common/Loading'
    import CompanyName from 'components/Input/FuzzyQuery'
    // 组件
    import SingleImage from 'components/Image/UploadImage/SingleImage'
    // 通用JS
    import Common from 'common/common.js'
    // 验证方法
    import Validate from 'common/validate.js'
    // Api方法
    import Api from 'api/api.js'
    // 城市联动选择
    import CitySelect from 'mixins/city_select.js'
    // 邮箱自动填充
    import EmailComplete from 'mixins/email_complete.js'
    // Json数据
    import JsonCity from 'mock/city.json'
    import JsonData from 'mock/data.json'
    // Vuex
    import { mapGetters } from 'vuex'
    
    export default {
        components: { Loading, CompanyName, SingleImage },
        mixins: [ CitySelect, EmailComplete ],
        computed: {
            ...mapGetters(['companyName', 'getImageUrl' ])
        },
        data() {
            return {
                // 加载页面
                pageLoading: true,
                // 职位列表
                jobList: [],
                // 专业领域列表
                professionList: [],
                // 城市联动选择值
                provinceValue:[],
                // 用户编号
                userId: '',
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
                    ],
                    email: [
                        { required: true, message: '邮箱不能为空', trigger: 'blur'},
                        { pattern: Common.regEmail, message: '邮箱格式不正确', trigger: 'change' }
                    ]
                },
            }
        },
        created() {
            // 设置面包屑路径
            this.$store.commit('SET_BREADCRUMB', [
                { name: '首页', path: '/Home' },
                { name: '账户列表', path: '/Examples/AccountList' },
                { name: '账户详情', path: '' }
            ]);
            // 初始化图片和输入框
            Common.InitPicStore(this);
            Common.InitInputStore(this);
            // 获取用户编号
            this.userId = this.$route.query.id;
            // 获取账户详情
            this.getDetail();
            // 获取本地“职位”列表
            this.jobList = JsonData.job;    
            // 获取本地“专业领域”列表
            this.professionList = JsonData.profession;
        },
        methods: {
            // 获取账户详情
            getDetail(){
                Api.GetAccInfo(this.userId)
                .then(res => {                    
                    // 取消页面加载
                    this.pageLoading = false;
                    const result = res.data.attributes;                    
                    if(res.code == 200){
                        // 设置数据
                        this.infoForm = result;
                        // 设置省市值
                        this.provinceValue = [this.infoForm.province, this.infoForm.city, this.infoForm.area];
                        // 设置企业名称
						this.$store.commit('SET_INPUT_VALUE', result.companyName);                  
                        // 更新用户头像
                        this.$store.commit('SET_IMAGE_URL', this.infoForm.face);
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
                        
                        this.infoForm.face = this.getImageUrl;
                        this.infoForm.companyName = this.companyName;
                        // 日期转成字符串
                        if(this.infoForm.birthdate != '')
                            this.infoForm.birthdate = new Date(this.infoForm.birthdate).toLocaleDateString();

                        // 修改账户信息
                        Api.EditAccount(this.infoForm, this.userId)
                        .then(res => {
                            // 取消页面加载
                            this.pageLoading = false;
                            if(res.code == 200) this.$Message.success('账户修改成功!');
                            else this.$Message.warning(res.msg);
                        })
                        .catch(err => console.log(err))
                    }
                    else this.$Message.error('提交失败！填写有误');
                })    
            },
            // 获取出生日期
            getBirthDate(date) {
                console.log('get birth date:' + date);
                this.infoForm.birthdate = date;
            },
        }
    }
</script>

<style lang="less" scoped>    
    .m-operation {
        button, a {
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