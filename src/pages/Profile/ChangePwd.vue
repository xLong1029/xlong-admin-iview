<template>
    <div class="g-content">
        修改密码
    </div>
</template>

<script>
    export default {
        created(){
            // 设置面包屑路径
            this.$store.commit('SET_BREADCRUMB', [
                { name: '首页', path: '/Home' },
                { name: '修改密码', path: '/ChangePwd' }
            ]);
        }
    }
</script>

<style>
</style>
