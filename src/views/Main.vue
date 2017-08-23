<template>
    <div :class="['g-layout', sidebarSpan < 3 ? 'layout-mini' : '']">
        <div class="layout-left">
        	<!-- 侧边栏 -->
            <Sidebar></Sidebar>
        </div>
        <div class="layout-right">
        	<!-- 顶部菜单 -->
            <MenuTop></MenuTop>
            <LocatePath></LocatePath>
            <!-- 页面视图 -->
            <transition name="fade" mode="out-in">
            	<router-view></router-view>
	        </transition>
	        <!-- 项目版权 -->
            <div class="copyright">
                2017-2022 &copy; XLONG JIALIDUN
            </div>
        </div>
    </div>
</template>
<script>
	// 组件
	import MenuTop from '@/components/Common/MenuTop'
  	import Sidebar from '@/components/Common/Sidebar'
    import LocatePath from '@/components/Common/LocatePath'
    // Vuex
    import { mapGetters } from 'vuex'

    export default {
    	components:{ MenuTop, Sidebar, LocatePath },
        computed: {
            ...mapGetters([ 'sidebarSpan', 'breadcrumb' ]),
        },
    }
</script>
<style lang="less">
    .g-layout{
        position: relative;
        min-width: 1000px;
    }
    .layout-left{
        height: 100%;
        width: 200px;
        position:absolute;
        left:0;
        background: #4d5256;
        transition: width .2s ease-in-out;
    }
    .layout-right{
        width: 100%;
        padding-left: 200px;
    }

    .g-layout.layout-mini{
        .layout-left{
            width: 68px;
        }
        .layout-right{
            padding-left: 68px;
        }
    }

    .g-breadcrumb{
        padding: 10px 15px 0;
    }

    .g-content{
        min-height: 700px;
        margin: 15px;
        background: #fff;
        border-radius: 4px;
        padding: 15px;
    }

    .content-main{
        padding: 10px;
    }
    
    .copyright{
        text-align: center;
        padding: 5px 15px;
        color: #9ea7b4;
    }

    .m-title {
        padding: 20px 0;
        border-bottom: 1px solid #eee;
        font-size: 14px;
        font-weight: 700;
        color: #00c5a3;
    }

    .m-content{
        margin-top: 30px;
    }
</style>
