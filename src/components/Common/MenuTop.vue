<template>
 	<Menu ref="menu" mode="horizontal" class="menu-top">
        <!-- 收缩侧边栏按钮 -->
	    <Button type="text" @click="changeSideBar">
	        <Icon type="navicon" size="32"></Icon>
	    </Button>
        <!-- 账户信息 -->
        <div class="account">
            <span>Hi，欢迎您，</span>
            <Submenu name="1" style="z-index:10">
                <template slot="title">
                    <img class="account-face" src="" @error="notFoundPic"/>
                    <strong> xLong </strong>
                </template>
                <!-- <Menu-item name="personalProfile" class="dropdown-item"><router-link :to="{ name: 'PersonalProfile'}">个人资料</router-link></Menu-item>
                <Menu-item name="changePassword" class="dropdown-item"><router-link :to="{ name: 'ChangePassword'}">修改密码</router-link></Menu-item> -->
                <Menu-item name="logOut" class="dropdown-item"><a @click="logOut">退出登录</a></Menu-item>
            </Submenu>
        </div>
	</Menu>
</template>

<script>
    import { SetDefaultPic } from 'common/common.js'
    import { mapGetters } from 'vuex'

	export default {
		computed: {
            ...mapGetters([ 'sidebarSpan' ]),
        },
		methods: {
            // 改变侧边栏
            changeSideBar () {
                if (this.sidebarSpan === 3) {
                    this.$store.commit('SET_SIDEBAR_SPAN', 1);
                }
                else {
                    this.$store.commit('SET_SIDEBAR_SPAN', 3);
                }
            },
            // 登出
            logOut(){
                this.$store.dispatch('LogOut')
                .then((res)=>{
                    this.$Message.success('已退出!');
                    this.$router.push({name: 'Login'});
                })
                .catch((err)=>{})
            },
            // 无法显示图片
            notFoundPic:(event) => {
                SetDefaultPic(event, 1);
            }
        }
	}
</script>

<style lang="less" scoped>
	.menu-top{
        background: #fff;
    }
    .account{
        float: right;
        margin-right: 50px;
        span, strong{
            float: left;
            margin-right: 10px;
        }

        .ivu-select-dropdown{
            .ivu-menu-item.dropdown-item{
                padding: 0;
            }
            a{
                padding: 10px 26px 12px 20px;
                display: block;
                color: #495060;
            }
            .ivu-menu-item-selected, .ivu-menu-item-selected:hover{
                a{
                     color: #fff;
                }
            }
        }
    }
    .account-face{
        float: left;
        margin-top: 5px;
        margin-right: 15px;
        width: 40px;
        height: 40px;
        border: 1px solid #eee;
        border-radius: 20px;
        -webkit-border-radius: 20px;
        -o-border-radius: 20px;
    }  
</style>
