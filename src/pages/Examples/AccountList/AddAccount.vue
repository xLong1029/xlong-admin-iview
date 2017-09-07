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
                        <AutoComplete v-model="infoForm.email" :data="emailList" @on-search="selectEmail" @on-select="setEmail" placeholder="请输入邮箱地址"></AutoComplete>
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
                    <Form-item label="所在地区：">
                        <Select class="select-province" v-model="infoForm.province" placeholder="请选择省份" @on-change="changeProvince">
                            <Option v-for="(item, index) in provinceList" :value="item.name" :key="index">{{ item.name }}</Option>
                        </Select>
                        <Select class="select-province" v-model="infoForm.city" placeholder="请选择城市" @on-change="changeCity">
                            <Option v-for="(item, index) in cityList" :value="item.name" :key="index">{{ item.name }}</Option>
                        </Select>
                        <!-- iView的Select组件这里有个Bug,有时会导致选中的选项无法显示，但实际已经获取到值  -->
                        <Select class="select-province" v-model="infoForm.area" placeholder="请选择区域" @on-change="changeArea">
                            <span>{{ infoForm.area }}</span>
                            <Option v-for="(item, index) in areaList" :value="item.name" :key="index">{{ item.name }}</Option>
                        </Select>
                    </Form-item>
                    </Col>
                </Row>
            </div>
            <!-- 操作按钮 -->
            <div class="m-operation">
                <Button class="fr" type="primary" @click="submit('infoForm')">确认新增</Button>
                <Button class="fr" type="ghost" @click="$router.go(-1)">返回</Button>
                <div class="clearfix"></div>
            </div>
        </Form>
    </div>
</template>

<script>
    // 组件
    import SingleImage from 'components/UploadImage/SingleImage'
    import CompanyName from 'components/Input/FuzzyQuery'
    // 通用JS
    import Common from 'common/common.js'
    // 验证方法
    import Validate from 'common/validate.js'
    // Api方法
    import Api from 'api/api.js'
    // 城市联动选择
    import CitySelect from 'mixins/city_select.js'
    // Json数据
    import JsonCity from 'mock/city.json'
    import JsonData from 'mock/data.json'

    export default {
        components: { CompanyName, SingleImage },
        mixins: [ CitySelect ],
        data() {
            return {
                // 职位列表
                jobList: [],
                // 地区列表
                provinceList: [],
                // 专业领域列表
                professionList: [],
                // 邮箱列表
                emailList: [],
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
                    // 所在省份
                    province: '',
                    // 所在城市
                    city: '',
                    // 所在区域
                    area: '',
                    // 默认账户禁用
                    enabledState: -1,
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
                { name: '账户列表', path: '/Examples/AccountList' },
                { name: '新增账户', path: '/Examples/AddAccount' }
            ]);

            // 清空图片路径
            this.$store.commit('SET_IMAGE_URL', '');
            // 清空图片ID
            this.$store.commit('SET_IMAGE_ID', '');
    
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

                        this.infoForm.faceId = this.getImageId;
                        this.infoForm.companyName = this.inputValue;
                        
                        // 新增用户
                        Api.AddAccount(this.infoForm)
                        .then(res => {
                            // 取消页面加载
                            this.pageLoading = false;
                            if(res.code == 200) this.$Message.success('新增账户成功!');
                            else console.log(res);                           
                        })
                        .catch(err => this.$Message.warning(err.message))
                    }
                    else this.$Message.error('提交失败！填写有误');
                })    
            },
            // 获取出生日期
            getBirthDate(date) {
                console.log('get birth date:' + date);
                this.infoForm.birthdate = date;
            },
            // 选择邮箱后缀名
            selectEmail(value) {
                this.emailList = !value || value.indexOf('@') >= 0 ? [] : [
                    value + '@qq.com',
                    value + '@sina.com',
                    value + '@dingtalk.com',
                    value + '@115.com',
                    value + '@163.com',
                ];
            },
            // 设置邮箱
            setEmail(value){
                this.infoForm.email = value;
            }
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