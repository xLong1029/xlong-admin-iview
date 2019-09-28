<template>
    <div class="g-content">
        页面：二级菜单-2.1 (注意看地址栏变化)
        <br/><br/>
        <Button type="primary" @click="$router.push({ name: 'PageD' })">跳转到一级菜单-3.1页面</Button>
    </div>
</template>

<script>
    export default {
    }
</script>

<style lang="less" scoped>
    @import "../../../assets/less/page_desc";
    .g-content{
      padding-bottom: 0;
    }
</style>
