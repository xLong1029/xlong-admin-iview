<template>
  <div :class="['g-layout', sidebarSpan < 3 ? 'layout-mini' : '']">
    <div class="layout-left">
      <!-- 侧边栏 -->
      <Sidebar :menu-list="sidebarMenu" :span-width="3" :accordion="true" />
    </div>
    <div class="layout-right">
      <!-- 顶部菜单 -->
      <MenuTop></MenuTop>
      <LocatePath></LocatePath>
      <!-- 页面视图 -->
      <div class="g-main">
        <transition name="fade" mode="out-in">
        <router-view></router-view>
      </transition>
      </div>
      <!-- 项目版权 -->
      <div class="copyright">2022-2032 &copy; XLONG JIALIDUN</div>
    </div>
  </div>
</template>
<script>
// 组件
import MenuTop from "components/Common/MenuTop";
import Sidebar from "components/Common/Sidebar";
import LocatePath from "components/Common/LocatePath";
// Vuex
import { mapGetters } from "vuex";

export default {
  components: { MenuTop, Sidebar, LocatePath },
  computed: {
    ...mapGetters(["sidebarSpan", "sidebarMenu", "breadcrumb"]),
  },
  data() {
    return {};
  },
};
</script>
<style lang="less" scoped>
.g-layout {
  position: relative;
  min-width: 1000px;
}
.layout-left {
  height: 100%;
  width: 200px;
  z-index: 10;
  position: absolute;
  left: 0;
  background: #4d5256;
  transition: width 0.2s ease-in-out;
  transition: width 0.2s ease-in-out;
  -moz-transition: width 0.2s ease-in-out; /* Firefox 4 */
  -webkit-transition: width 0.2s ease-in-out; /* Safari and Chrome */
  -o-transition: width 0.2s ease-in-out; /* Opera */
}
.layout-right {
  height: 100vh;
  width: 100%;
  padding-left: 200px;
  transition: padding-left 0.2s ease-in-out;
  -moz-transition: padding-left 0.2s ease-in-out; /* Firefox 4 */
  -webkit-transition: padding-left 0.2s ease-in-out; /* Safari and Chrome */
  -o-transition: padding-left 0.2s ease-in-out; /* Opera */
}

.g-layout.layout-mini {
  .layout-left {
    width: 68px;
  }
  .layout-right {
    padding-left: 68px;
  }
}

.g-breadcrumb {
  padding: 10px 15px 0;
}

.g-content {
  height: calc(~"100vh - 135px"); // 旧版less的运算方式和calc发送了冲突，需要改写法
  border-radius: 4px;
}

.g-main {
  height: calc(~"100vh - 135px"); // 旧版less的运算方式和calc发送了冲突，需要改写法
  background: #fff;
  overflow-y: auto;
  margin: 15px;
  padding: 15px;
  margin-bottom: 0;
}

.copyright {
  width: 100%;
  bottom: 0;
  text-align: center;
  height: 40px;
  line-height: 40px;
  color: #9ea7b4;
  background: #f5f5f5;
}
</style>
