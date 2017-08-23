<template>
    <div class="g-content">
        账户列表
    </div>
</template>

<script>
    export default {
        created(){
            // 设置面包屑路径
            this.$store.commit('SET_BREADCRUMB', [
                { name: '首页', path: '/Home' },
                { name: '账户列表', path: '/Examples/AccountList' }
            ]);
        }
    }
</script>

<style>
</style>
