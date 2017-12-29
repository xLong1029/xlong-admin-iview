<template>
  	<Menu
        :theme="theme"
        :open-names="openNames"
        :active-name="activeName"
        accordion
        width="auto"
        :class="{'sidebar-hide-text': sidebarSpan < 3}"
    >
        <Menu-item name="Home" class="menu-item">
            <router-link to="/" tag="div" class="sidebar-title">
                <img v-show="sidebarSpan < 3" class="sidebar-logo" :src="logo"/>
                <span v-show="sidebarSpan === 3" class="sidebar-title-text">XLONG家里蹲管理系统</span>
            </router-link>
        </Menu-item>
        <Submenu v-for="(submenu, index) in Submenu" :key="index" :name="submenu.name" class="submenu-item">
            <template slot="title">
                <Icon :type="submenu.icon" :size="iconSize"></Icon>                
                <span class="sidebar-text">{{ submenu.text }}</span>
            </template>                 
            <Menu-item v-for="(item, index) in submenu.menuItem" :key="index" :name="item.name" class="menu-item">
                <router-link :to="{ name: item.name }" tag="p">{{ item.text }}</router-link>
            </Menu-item>
        </Submenu>
    </Menu>
</template>

<script>
    // Vuex
    import { mapGetters } from 'vuex'

	export default {
        computed: {
            ...mapGetters([ 'sidebarSpan', 'contentSpan' ]),
            iconSize () {
                return this.sidebarSpan === 3 ? 14 : 24;
            }
        },
        data() {
            return {
                // LOGO
                logo: require('assets/images/icon-logo.png'),
                // 主题
                theme: 'dark',
                // 展开菜单名
                openNames: ['Home'],
                // 激活菜单名
                activeName: 'Home',
                // 子菜单列表
                Submenu:[
                    {
                        // Submenu的name属性
                        name: 'Componets',
                        // Icon的type属性
                        icon: 'ios-keypad',
                        // Submenu显示文本
                        text: '组件',
                        // menu-item 参数
                        menuItem: [
                            {
                                name: 'Image',
                                text: 'Image图片操作'
                            },
                            {
                                name: 'Input',
                                text: 'Input输入框'
                            },
                            {
                                name: 'Sidebar',
                                text: '侧边栏'
                            }
                        ]
                    },
                    {
                        name: 'Examples',
                        icon: 'ios-paper',
                        text: '布局示例',
                        menuItem: [
                            {
                                name: 'AccountList',
                                text: '账户列表'
                            },
                            {
                                name: 'SectionList',
                                text: '版块列表'
                            },
                            {
                                name: 'ProductList',
                                text: '产品列表'
                            },
                            {
                                name: 'MessageList',
                                text: '消息列表'
                            },
                        ]
                    },
                ],
            }
        },
        created() {
            // 固定展示侧边栏
            let stop = false;
            const submenu = this.Submenu;
            // 遍历submenu
            for(let i = 0 ; i < submenu.length ; i ++){
                if(!stop){
                    // 遍历submenu下的menu-item
                    for(let j = 0 ; j < submenu[i].menuItem.length; j ++){
                        // 获取Submenu的下Menu-item的name
                        let activeName = submenu[i].menuItem[j].name;
                        if(window.location.href.indexOf(activeName) != -1){
                            this.openNames = [submenu[i].name];
                            this.activeName = activeName;
                            stop = true;
                            break;
                        }
                        else{
                            this.openNames = ['Home'];
                            this.activeName = 'Home';
                        }
                    }
                }
                else break;
            }
        },
        methods: {
        }
	}
</script>

<style lang="less">
    @import "../../assets/less/color";
    .sidebar-title{
        padding: 13px 0;
        color: @primary-color;
        text-align:center;
        border-bottom: 1px solid #3a3d44;
    }
    .sidebar-logo{
        display: block;
        margin: 0 auto;
    }
    .sidebar-hide-text{
        .sidebar-text{
            display: none;
        }
        .ivu-menu-item{
            text-align: center;
        }
        .ivu-menu-item > i{
            margin-right: 0;
        }
    }
    .ivu-menu-vertical{
        .menu-item.ivu-menu-item{
            padding: 0;
            p{
                padding: 14px 0 14px 45px;
            }
        }
        .submenu-item{
            // border-bottom: 1px solid #3a3d44;
            .ivu-menu-submenu-title{
                padding: 14px 24px;
            }
        }
    }

    .layout-mini{
        .menu-item.ivu-menu-item{
            p{
                padding: 14px 0;
                font-size: 12px;
            }
        }
        .submenu-item{
            .ivu-menu-submenu-title{
                padding: 14px 24px 30px 24px;
            }
        }
    }
</style>
