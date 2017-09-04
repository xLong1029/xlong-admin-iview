<template>
    <div class="g-content">
        <Form ref="infoForm" :model="infoForm" :rules="validate" :label-width="100">
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
                    <Form-item label="邮箱：" prop="email">
                        <Input v-model="infoForm.email" placeholder="请输入邮箱地址"></Input>
                    </Form-item>
                    </Col>
                    <Col span="12">
                    <Form-item label="头像：" style="margin-bottom:16px;">
                        <!-- 组件-图片上传-单图片显示 -->
                        <SingleImage :preview="true"></SingleImage>
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
                    <Form-item label="公司名称：">
                        <Input v-model="infoForm.companyName" placeholder="请输入公司名称"></Input>
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
                    <Form-item label="所在地区：">
                        <Select v-model="infoForm.area" placeholder="请选择所在地区">
                            <Option v-for="(item, index) in provinceList" :value="item.name" :key="index">{{ item.name }}</Option>
                        </Select>
                    </Form-item>
                    </Col>
                </Row>
            </div>
            <!-- 操作按钮 -->
            <div class="m-operation">
                <Button class="fr" type="primary" @click="submit('infoForm')">确认修改</Button>
                <Button class="fr" type="ghost" @click="$router.go(-1)">返回</Button>
                <div class="clearfix"></div>
            </div>
        </Form>
    </div>
</template>

<script>
    // 组件
    import SingleImage from 'components/UploadImage/SingleImage'
    // 通用JS
    import Common from 'common/common.js'
    // 验证方法
    import Validate from 'common/validate.js'
    // Api方法
    import Api from 'api/api.js'
    // Json数据
    import JsonCity from 'mock/city.json'
    import JsonData from 'mock/data.json'
    
    export default {
        components: { SingleImage },
        data() {
            return {
                // 职位列表
                jobList: [],
                // 地区列表
                provinceList: [],
                // 专业领域列表
                professionList: [],
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
                    // 公司
                    companyName: '',
                    // 职位
                    job: '',
                    // 专业领域
                    profession: '',
                    // 所在地区
                    area: '',
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
                    email: [
                        { required: true, message: '邮箱不能为空', trigger: 'blur'},
                        { pattern: Common.regEmail, message: '邮箱格式不正确', trigger: 'blur' }
                    ],
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
                { name: '账户列表', path: '/Examples/AccountList' },
                { name: '账户详情', path: '/Examples/AccountDetail' }
            ]);
            // 获取用户编号
            this.userId = this.$route.query.id;
            // 获取账户详情
            this.getDetail();
            // 获取本地“职位”列表
            this.jobList = JsonData.job;    
            // 获取本地“专业领域”列表
            this.professionList = JsonData.profession;
            // 获取本地“城市”列表
            this.provinceList = JsonCity;
        },
        methods: {
            // 提交表单
            submit(form) {
                this.$refs[form].validate((valid) => {
                    if (valid) {
                        // 页面加载
                        this.pageLoading = true;
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
            // 获取账户详情
            getDetail(){
                Api.GetAccInfo(this.userId)
                .then(res => {
                    // 取消页面加载
                    this.pageLoading = false;
                    if(res.code == 200){
                        // 设置数据
                        this.infoForm = res.data.attributes;
                        // 更新用户头像
                        this.$store.commit('SET_IMAGE_URL', this.infoForm.face);
                    }
                    else this.$Message.warning(res.msg);                
                })
                .catch(err => console.log(err))
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
        button,
        a {
            min-width: 80px;
            margin-left: 10px;
        }
    }
</style>