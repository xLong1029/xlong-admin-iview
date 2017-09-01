<template>
  <div id="loading" class="page-load">
        <Spin>
            <Icon type="load-c" size=18 class="spin-icon-load"></Icon>
            <div>玩命加载中...</div>
        </Spin>
    </div>
</template>
<script>
  export default {
    name: 'loading',
    data () {
      return {}
    }
  }
</script>
<style lang="less" scoped>
  .page-load{
    margin-top: 18%;
  }
</style>

