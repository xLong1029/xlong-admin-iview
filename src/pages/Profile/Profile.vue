<template>
    <div class="g-content">
        <!--  加载判断 -->
        <Loading v-if="pageLoading"></Loading>
        <Form  v-else ref="infoForm" :model="infoForm" :rules="validate" :label-width="110" style="width:600px">
            <Form-item label="账号：">
                <span>{{ infoForm.username }}</span>
            </Form-item>
            <Form-item label="用户昵称：" prop="nickname">
                <Input v-model="infoForm.nickname" placeholder="请输入您的真实姓名" style="width:220px"></Input>
            </Form-item>
            <Form-item label="真实姓名：">
                <Input v-model="infoForm.realname" placeholder="请输入您的真实姓名" style="width:220px"></Input>
            </Form-item>
            <Form-item label="头像：">
                <!-- 组件-图片上传-单图片显示 -->
                <SingleImage :src="infoForm.userface" @get-img-url="setFace"></SingleImage>
            </Form-item>                           
            <Form-item label="性别：" prop="gender">
                <Radio-group v-model="infoForm.gender">
                    <Radio label="男">男</Radio>
                    <Radio label="女">女</Radio>
                </Radio-group>
            </Form-item>
            <Form-item>
                <Button type="primary" @click="submit('infoForm')">确认</Button>
            </Form-item>
        </Form>
    </div>
</template>

<script>
    // 组件
    import Loading from 'components/Common/Loading'
	import SingleImage from 'components/Image/UploadImage/SingleImage'
	// Api方法
    import Api from 'api/profile.js'
    // Vuex
    import { mapGetters } from 'vuex'

    export default {
        components: {  Loading, SingleImage },
        computed: {
            ...mapGetters([ 'token' ])
        },
		data(){
			return {
                // 加载页面
				pageLoading: true,
				// 表单信息
                infoForm: {
                    // 用户名(账号)
                    username: '',
                    // 用户昵称
                    nickname: '',
                    // 真实姓名
                    realname: '',
                    // 头像图片地址
                    userface: require('@/assets/images/default-face.jpg'),
                    // 性别
                    gender: '男',
                },
				// 验证规则
                validate: {
                    nickname: [{ required: true, message: '昵称不能为空', trigger: 'blur' }],
                    gender: [{ required: true, message: '请选择性别', trigger: 'change' }],
                }
			}
        },
        created(){
            // 设置面包屑路径
            this.$store.commit('SET_BREADCRUMB', [
                { name: '首页', path: '/Home' },
                { name: '个人资料', path: '/Profile' }
            ]);
            // 获取个人资料
            this.getProfile();
        },
        methods:{
            // 提交表单
            submit(form) {
                this.$refs[form].validate((valid) => {
                    if (valid) {
                        // 页面加载
                        this.pageLoading = true;

                        Api.EditProfile(this.infoForm, { username : this.infoForm.username})
                        .then(res => {
                            this.pageLoading = false;
                            if(res.code == 200){
                                this.$Message.success('资料修改成功！');
                                // 更新用户信息
                                this.$store.commit('SET_USER_NICKNAME', res.data.attributes.nickname);
                            }
                            else this.$Message.error('资料修改失败！');
                        })
                        .catch(err => console.log(err));
                    }
                    else this.$Message.error('提交失败！填写有误');
                })
            },
            // 获取个人资料
            getProfile(){
                Api.GetUserInfo(this.token)
                .then(res => {
                    // 获取到数据
                    if(res.code == 200){
                        this.pageLoading = false;					
                        this.infoForm = res.data.attributes;
                    }
                    else this.$Message.error('无该用户数据!');
                })
                .catch(err => console.log(err));
            },
            // 设置头像
            setFace(url){
                this.infoForm.userface = url;
            }
        }
	}
</script>
<style lang="less" scoped>
</style>

