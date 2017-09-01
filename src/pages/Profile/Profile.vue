<template>
    <div class="g-content">
        个人资料
    </div>
</template>

<script>
    export default {
        created(){
            // 设置面包屑路径
            this.$store.commit('SET_BREADCRUMB', [
                { name: '首页', path: '/Home' },
                { name: '个人资料', path: '/Profile' }
            ]);
        }
    }
</script>

<style>
</style>
