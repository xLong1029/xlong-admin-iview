<template>
  <div id="app">
    <transition name="fade" mode="out-in">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
export default {
  name: "app",
};
</script>

<style lang="less">
@import "assets/less/common";
@import "assets/less/table";

#app {
  height: 100vh;
  overflow: hidden;
}
</style>
