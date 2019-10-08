<template>
    <div class="g-content">
        <!--  加载判断 -->
        <Loading v-if="pageLoading"></Loading>
        <Form  v-else ref="infoForm" :model="infoForm" :rules="validate" :label-width="110" style="width:700px">
            <Form-item label="账号：">
                <span>{{ infoForm.username }}</span>
            </Form-item>
            <Form-item label="用户昵称：" prop="nickName">
                <Input v-model="infoForm.nickName" placeholder="请输入您的真实姓名" style="width:220px" />
            </Form-item>
            <Form-item label="真实姓名：">
                <Input v-model="infoForm.realName" placeholder="请输入您的真实姓名" style="width:220px" />
            </Form-item>
            <Form-item label="头像：">
                <!-- 组件-图片上传-单图片显示 -->
                <ImageCropper :src.sync="infoForm.userFace" :preview="true" :fixed="true" :fixedNumber="[1,1]"></ImageCropper>
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
	import ImageCropper from 'components/Image/ImageCropper'
	// Api方法
    import Api from 'api/profile.js'
    // Vuex
    import { mapGetters } from 'vuex'

    export default {
        components: {  Loading, ImageCropper },
        computed: {
            ...mapGetters([ 'token' ])
        },
		data(){
			return {
                // 加载页面
				pageLoading: false,
				// 表单信息
                infoForm: {
                    // 用户名(账号)
                    username: '',
                    // 用户昵称
                    nickName: '',
                    // 真实姓名
                    realName: '',
                    // 头像图片地址
                    userFace: require('@/assets/images/default-face.jpg'),
                    // 性别
                    gender: '男',
                },
				// 验证规则
                validate: {
                    nickName: [{ required: true, message: '昵称不能为空', trigger: 'blur' }],
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
                        Api.EditProfile(this.infoForm, this.infoForm.objectId)
                        .then(res => {
                            if(res.code == 200){
                                this.getProfile();
                                this.$Message.success('资料修改成功！');
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
                this.pageLoading= true;
                Api.GetUserInfo(this.token)
                .then(res => {
                    // 获取到数据
                    if(res.code == 200){
                      console.log( res);
                        this.pageLoading = false;
                        this.infoForm = res.data;
                        // 更新用户信息
                        this.$store.commit('SET_USER', {
                          face: this.infoForm.userFace,
                          nickName: this.infoForm.nickName,
                          role: this.infoForm.role,
                          id: this.infoForm.objectId
                        });
                    }
                    else this.$Message.error('无该用户数据!');
                })
                .catch(err => console.log(err));
            }
        }
	}
</script>
<style lang="less" scoped>
</style>

