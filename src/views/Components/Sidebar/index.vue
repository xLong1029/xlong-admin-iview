<template>
    <div class="g-content">
        <!-- 侧边栏组件 -->
        <h2 class="m-title">侧边栏</h2>
        <div class="m-content">
            <Row class="m-sidebar-cont">
                <Col span="4">
                    <Sidebar :active-name="activeName" :menu-list="menuList" />
                </Col>
                <Col span="20">
                    <router-view></router-view>
                </Col>
            </Row>
            <div class="m-desc">
                <p class="m-hint">*由于在实际项目开发过程中，发现iView里自带的Menu 导航菜单用作侧边栏时，2个不同父级的页面相互跳转，会导致侧边栏无法准确定位对应菜单并且高亮显示，所以我便重写了一个自定义侧边栏组件。</p>
                <p>&nbsp;</p>
                <p>属性：</p>
                <p><span class="attr-text">spanWidth</span>：侧边栏跨距大小，-1表示无跨距，正值表示跨距大小。Number类型，默认值为-1</p>
                <p><span class="attr-text">accordion</span>：是否开启手风琴模式，开启后至多展开一个子菜单。Boolean类型，默认值为false</p>
                <p><span class="attr-text">activeName</span>：第一次加载激活的一级菜单对应路由name。String类型，默认值为"Home"</p>
                <p><span class="attr-text">menuList</span>：菜单列表数据。Array类型，默认值对应路由为"Home"。数据格式如下：</p>
                <pre>
                [
                    {
                        <font color="#00c5a3">// menu-item对应的路由name</font>
                        name: 'AccountManage',
                        <font color="#00c5a3">// iView的Icon图标的type属性</font>
                        icon: 'navicon-round',
                        <font color="#00c5a3">// menu-title显示文本</font>
                        text: '账户管理',
                        <font color="#00c5a3">// 是否为标题菜单，标题菜单则不显示Icon，只在spanWidth有值且侧边栏跨距小于spanWidth才显示</font>
                        isTitle: false,
                        <font color="#00c5a3">// submenu列表</font>
                        children: [
                            {
                                <font color="#00c5a3">// submenu-item对应的路由name</font>
                                name: 'AccountList',
                                <font color="#00c5a3">// submenu-title显示文本</font>
                                text: '账户列表',
                            },
                        ]
                    },
                ]
                </pre>
            </div>
        </div>
    </div>
</template>

<script>
    // 组件
	import Sidebar from 'components/Sidebar/Sidebar'

    export default {
        components:{ Sidebar },
        data () {
            return {
                // 第一次加载激活的一级菜单对应路由name
                activeName: 'PageA',
                // 菜单列表
                menuList: [
                    {
                        name: 'PageA',
                        icon: 'navicon-round',
                        text: '一级菜单-1'
                    },
                    {
                        name: 'TestTwo',
                        icon: 'navicon-round',
                        text: '一级菜单-2',
                        children: [
                            {
                                name: 'PageB',
                                text: '二级菜单-2.1'
                            },
                            {
                                name: 'PageC',
                                text: '二级菜单-2.2'
                            }
                        ]
                    },
                    {
                        name: 'TestThree',
                        icon: 'navicon-round',
                        text: '一级菜单-3',
                        children: [
                            {
                                name: 'PageD',
                                text: '二级菜单-3.1'
                            }
                        ]
                    },
                ],
            }
            },
        created(){
            // 设置面包屑路径
            this.$store.commit('SET_BREADCRUMB', [
                { name: '首页', path: '/Home' },
                { name: '侧边栏', path: '/Components/Sidebar' }
            ]);
        }
    }
</script>

<style lang="less" scoped>
    @import "../../../assets/less/page_desc";
    .m-sidebar-cont{
        border:1px solid #a5a7a9;
        border-radius: 4px;
    }
    .m-desc{
        width:100%;
    }

    .m-content{
        padding: 0 20px 20px 20px;
    }

    .g-content{
        padding: 15px;
    }
</style>
