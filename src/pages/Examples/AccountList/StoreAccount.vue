<template>
    <div class="g-content">
        <!--  加载判断 -->
        <Loading v-if="pageLoading"></Loading>
        <Form v-else ref="infoForm" :model="infoForm" :rules="validate" :label-width="120">
            <!-- 个人信息 -->
            <h2 class="m-title">个人信息</h2>
            <div class="m-content">
                <Row>
                    <Col span="12">
                        <Form-item v-if="pageType == 'edit'" label="用户编号：">
                            <span>{{ userId }}</span>
                        </Form-item>
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
                        <Form-item v-if="pageType == 'edit'" label="创建时间：">
                            <span>{{ infoForm.createdAt }}</span>
                        </Form-item>
                        <Form-item label="头像：" style="margin-bottom:16px;">
                            <!-- 组件-图片上传-单图片显示 -->
                            <SingleImage :src="infoForm.face" :preview="true" size-hint="100*100px" @get-img-url="setFace"></SingleImage>
                        </Form-item>
                        <Form-item label="出生日期：" prop="birthdate">
                            <Date-picker v-model="infoForm.birthdate" type="date" placeholder="请选择时间" style="width:100%"></Date-picker>
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
                            <CompanyName :model="infoForm.companyName" @on-change="getCompanyName"></CompanyName>
                        </Form-item>                        
                        <Form-item label="专业领域：" prop="profession">
                            <CheckboxGroup v-model="professionValue" @on-change="checkProfess">
                                <Checkbox v-for="(item, index) in professionList" :key="index" :label="item.name"></Checkbox>
                            </CheckboxGroup>
                        </Form-item>
                        <Form-item label="所在省市：">
                            <Cascader :data="cityList" v-model="provinceValue" placeholder="请选择所在省市" @on-change="selectCity"></Cascader>
                        </Form-item>
                    </Col>
                    <Col span="12">
                        <Form-item label="职位：">
                            <Select v-model="infoForm.job" placeholder="请选择职位">
                                <Option v-for="(item, index) in jobList" :value="item.name" :key="index">{{ item.name }}</Option>
                            </Select>
                        </Form-item>
                        <Form-item label="参加工作时间：" prop="workTime">
                            <Date-picker v-model="infoForm.workTime" type="month" :placeholder="workTimePH" :disabled="disabledWT" style="width:85%;margin-right:10px"></Date-picker>
                            <Checkbox v-model="infoForm.isGraduate">尚未毕业</Checkbox>
                        </Form-item>                        
                    </Col>
                </Row>
            </div>
            <!-- 操作按钮 -->
            <div class="m-operation">
                <Button v-if="pageType == 'edit'" class="fr" type="primary" @click="submit('infoForm')">确认修改</Button>
                <Button v-else class="fr" type="primary" @click="submit('infoForm')">确认新增</Button>
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
    import { GetUrlQuery } from 'common/important.js'
    // 验证方法
    import Validate from 'common/validate.js'
    // Api方法
    import Api from 'api/account_list.js'
    // 城市联动选择
    import CitySelect from 'mixins/city_select.js'
    // 邮箱自动填充
    import EmailComplete from 'mixins/email_complete.js'
    // Json数据
    import JsonCity from 'mock/city.json'
    import JsonData from 'mock/data.json'
    
    export default {
        components: { Loading, CompanyName, SingleImage },
        mixins: [ CitySelect, EmailComplete ],
        data() {
            return {
                // 加载页面
                pageLoading: false,
                // 页面描述
                pageType: 'add',
                // 职位列表
                jobList: [],
                // 专业领域列表
                professionList: [],
                // 城市联动选择值
                provinceValue:[],
                // 专业领域选择值
                professionValue: [],
                // 是否禁用工作时间组件
                disabledWT: false,
                // 工作时间占位符提示
                workTimePH: '请选择时间',
                // 用户编号
                userId: '',
                // 表单信息
                infoForm: {                    
                    // 真实姓名
                    realname: '',
                    // 头像
                    face: require('@/assets/images/default-face.jpg'),
                    // 性别
                    gender: '',
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
                    province: '',
                    // 所在城市
                    city: '',
                    // 所在区域
                    area: '',
                    // 参加工作时间
                    workTime: '',
                    // 在校，尚未毕业
                    isGraduate: false,
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
                    ],
                    profession: [{
                        required: true,
                        validator: (rule, value, callback) => {
                            if(this.professionValue.length <= 0) return callback(new Error('请选择专业领域'));
                            else return callback();
                        },
                        trigger: 'change'
                    }],
                    workTime: [{
                        required: true,
                        validator: (rule, value, callback) => {
                            // 尚未毕业
                            if(this.infoForm.isGraduate){
                                // 清空时间
                                this.infoForm.workTime = '';
                                // 禁用工作时间
                                this.disabledWT = true;
                                // 修改占位符提示
                                this.workTimePH = '尚未毕业';
                                return callback();
                            }
                            else{
                                this.disabledWT = false;
                                this.workTimePH = '请选择时间';
                                if(value == '') return callback(new Error('工作时间不能为空'));
                                else{
                                    // 日期比较
                                    let nowDate = new Date();
                                    const compare = Common.CompareDate(value, nowDate);
                                    if (!compare) return callback(new Error('工作时间不能大于当前日期'));
                                    else return callback();
                                }
                            }
                        },
                        trigger: 'change'
                    }]
                },
            }
        },
        created() {
            // 获取本地“职位”列表
            this.jobList = JsonData.job;    
            // 获取本地“专业领域”列表
            this.professionList = JsonData.profession;
            let id = GetUrlQuery('id');          
            // 判断是否是编辑页
            if(id){
                // 获取用户编号
                this.userId = id;
                this.$store.commit('SET_BREADCRUMB', [
                    { name: '首页', path: '/Home' },
                    { name: '账户列表', path: '/Examples/AccountList' },
                    { name: '账户详情', path: '' }
                ]);
                // 获取账户详情
                this.getDetail();
                this.pageType = 'edit';
            }
            else{
                this.$store.commit('SET_BREADCRUMB', [
                    { name: '首页', path: '/Home' },
                    { name: '账户列表', path: '/Examples/AccountList' },
                    { name: '新增账户', path: '' }
                ]);
            }
        },
        methods: {
            // 提交表单
            submit(form) {
                this.$refs[form].validate((valid) => {
                    if (valid) {
                        // 页面加载
                        this.pageLoading = true;

                        // 格式化出生日期和工作时间
                        this.infoForm.birthdate = this.dateFormat(this.infoForm.birthdate);
                        this.infoForm.workTime = this.dateFormat(this.infoForm.workTime);
                        
                        if(this.pageType == 'add'){
                            // 新增用户
                            Api.AddAccount(this.infoForm)
                            .then(res => {
                                // 取消页面加载
                                this.pageLoading = false;
                                if(res.code == 200){
                                    this.$Message.success({
                                        content: '新增账户成功!',
                                        onClose: () => {
                                            // 跳转到列表页
                                            this.$router.push({ name: 'AccountList' });
                                        }
                                    }); 
                                }
                                else if(res.code == 404) this.$Message.warning(res.msg);
                                else console.log(res);
                            })
                            .catch(err => this.$Message.warning(err.message))
                        }
                        else{
                            // 修改账户信息
                            Api.EditAccount(this.infoForm, this.userId)
                            .then(res => {
                                // 取消页面加载
                                this.pageLoading = false;
                                if(res.code == 200){
                                    this.getDetail();
                                    this.$Message.success('账户修改成功!');
                                }
                                else if(res.code == 404) this.$Message.warning(res.msg);
                                else console.log(res);
                            })
                            .catch(err => console.log(err))
                        }
                    }
                    else this.$Message.error('提交失败！填写有误');
                })    
            },
            // 获取账户详情
            getDetail(){
                this.pageLoading = true;

                Api.GetAccInfo(this.userId)
                .then(res => {      
                    // 取消页面加载
                    this.pageLoading = false;
                    const result = res.data;                    
                    if(res.code == 200){
                        // 设置数据
                        this.infoForm = result;
                        // 设置省市值
                        this.provinceValue = [this.infoForm.province, this.infoForm.city, this.infoForm.area];
                        // // 设置企业名称
						// this.$store.commit('SET_INPUT_VALUE', result.companyName);
                        // 设置工作时间
                        if(this.infoForm.isGraduate){
                            this.disabledWT = true;
                            this.workTimePH = '尚未毕业';
                        }
                        // 截取专业领域
                        let str = this.infoForm.profession;
                        if(str != '')this.professionValue = this.infoForm.profession.split(",");
                        else this.professionValue = [];
                    }
                    else this.$Message.error('无该用户数据!');
                })
                .catch(err => console.log(err))
            },           
            // 获取出生日期
            getBirthDate(date) {
                console.log('get birth date:' + date);
                this.infoForm.birthdate = date;
            },
            // 专业领域选值
            checkProfess(checkedData){                
                let str = '';              
                for(let i = 0 ; i < checkedData.length ; i++){
                    str += checkedData[i] + ','
                }
                this.infoForm.profession = str.substring(0, str.length - 1);
            },
            // 格式化日期
            dateFormat(value){
                if(value != '')
                    value = new Date(value).toLocaleDateString();
                return value;
            },
            // 获取并设置头像
            setFace(url){
                console.log(url);
                this.infoForm.face = url;
            },
            // 获取企业名称改变值
            getCompanyName(value){
                this.infoForm.companyName = value;
                console.log(value);
            }
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