<template>
    <div class="g-content">
        <p>噔噔~！XLONG家里蹲管理系统，欢迎你！</p>
        <br/>
        <p>组件页面里的相关组件，是本人由于工作需要根据Iview原有组件进行部分重写的新组件。</p>
        <br/>
        <p>示例页面里的相关页面，是本人整理出来曾用过一些功能页面。</p>
    </div>
</template>

<script>
    export default {
        created(){
            // 设置面包屑路径
            this.$store.commit('SET_BREADCRUMB', [{ name: '首页', path: '/Home' }]);
        }
    }
</script>

<style>
</style>
