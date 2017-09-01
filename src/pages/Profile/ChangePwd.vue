<template>
    <div class="g-content">
        <div style="width:500px;">
            <Form ref="editForm" :model="editForm" :rules="validate" :label-width="100">
                <Form-item prop="oldPassword" label="旧密码：">
                    <Input type="password" v-model="editForm.oldPassword" placeholder="请输入旧密码"></Input>
                </Form-item>
                <Form-item prop="newPassword" label="新密码：">
                    <Input type="password" v-model="editForm.newPassword" placeholder="请输入新密码"></Input>
                </Form-item>
                <Form-item prop="passwdCheck" label="确认密码：">
                    <Input type="password" v-model="editForm.passwdCheck" placeholder="请输入确认密码"></Input>
                </Form-item>
                <Form-item>
                    <Button type="primary" @click="submit('editForm')">功能待开发</Button>
                </Form-item>
            </Form>
        </div>
    </div>
</template>

<script>
    // 验证方法
	import Validate from 'common/validate.js'
	// Api方法
	import Api from 'api/api.js'

	export default {
		data(){
			return {
				// 表单信息
				editForm:{
					// 验证码
					verifyCode: '',
                    // 旧密码
                    oldPassword: '',
					// 新密码
					newPassword: '',
					// 确认密码
					passwdCheck: '',
				},
				// 验证规则
				validate: {
                    oldPassword: [{
                        validator: (rule, value, callback) => {
                            Validate.ValidPassword(value, callback, true);
                        },
                        trigger: 'blur',
                        required: true,
                    }],
                    newPassword:[{
                        validator: (rule, value, callback) => {
                            Validate.ValidPassword(value, callback, true);
                        },
                        trigger: 'blur',
                        required: true,
                    }],
                    passwdCheck:[{
                        validator: (rule, value, callback) => {
                            Validate.ValidPwdCheck(this.editForm.newPassword, value, callback, true);
                        },
                        trigger: 'blur',
                        required: true,
                    }],
                }
			}
        },
        created(){
            // 设置面包屑路径
            this.$store.commit('SET_BREADCRUMB', [
                { name: '首页', path: '/Home' },
                { name: '修改密码', path: '/ChangePwd' }
            ]);
        },
        methods:{
            // 提交表单
            submit(form){
                this.$refs[form].validate((valid) => {
                    if (valid) {
                    console.log(this.editForm.oldPassword, this.editForm.newPassword)
                        // 修改密码 Api
                        Profile.ChangePassword(
                            this.editForm.oldPassword,
                            this.editForm.newPassword
                        )
                        .then(res => {
                            if (res.code == 200) {
                                // 登出 action方法
                                this.$store.dispatch('LogOut')
                                .then(res => {
                                    this.$Message.success('密码修改成功!请重新登录');
                                    this.$router.push({ name: 'Login' });
                                })
                                .catch(err => {
                                    console.log(err);
                                })
                            }
                            else {
                                console.log(res.msg);
                                // 弹出提示框
                                this.$Message.warning(res.msg);
                            }
                        })
                        .catch(err => {
                            console.log(err);
                        })
                    }
                    else this.$Message.error('提交失败！填写有误');
                })
            },
        }
	}
</script>
<style lang="less" scoped>
</style>
