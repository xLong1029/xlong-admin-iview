<template>
    <div class="g-content">
        <!-- 可输入下拉框组件 -->
        <h2 class="m-title">可输入下拉框</h2>
        <div class="m-content">
            <InputAndSelect direction="down"></InputAndSelect>
            <div class="m-desc">
                <p>组件包含属性：</p>
                <P>direction。String类型, 默认值为向下显示列表。可选值为 "top" 表示向上显示列表，"down" 表示向下显示列表。</P>
            </div>
        </div>
        <!-- 模糊查询组件 -->
        <h2 class="m-title">模糊查询</h2>
        <div class="m-content">
            <FuzzyQuery></FuzzyQuery>
        </div>
    </div>
</template>

<script>
    // 组件
	import InputAndSelect from 'components/Input/InputAndSelect'
    import FuzzyQuery from 'components/Input/FuzzyQuery'
      
    export default {
        components:{ InputAndSelect, FuzzyQuery },
        created(){
            // 设置面包屑路径
            this.$store.commit('SET_BREADCRUMB', [
                { name: '首页', path: '/Home' },
                { name: 'Input输入框', path: '/Components/Input' }
            ]);
        }
    }
</script>

<style lang="less" scoped>
    @import "../../assets/less/page_desc";
    .m-content{
        width: 500px;
    }
</style>
