<template>
    <div class="g-content">
        <!-- 树形穿梭组件 -->
        <h2 class="m-title">树形穿梭组件</h2>
        <div class="m-content">
            <!-- <div class="m-compo-part">
                <FuzzyQuery :model="fuzzyQuery.value" @on-change='getFuzzyValue'></FuzzyQuery>
            </div>
            <div class="m-test-part">
                <p class="g-mb10">测试数据如下，可选择字段进行测试：</p>
                <div style="color:#aaa;">
                    <p>xLong设计工作室</p>
                    <p>华蓝集团</p>
                    <p>百度网络有限公司</p>
                    <p>上海建筑设计有限公司</p>
                    <p>设计通有限责任公司</p>
                    <p>爱美达设计公司</p>
                    <p>康众畅想信息科技有限公司</p>
                    <p>华建信息科技有限公司</p>
                    <p>杭州雁行信息科技有限公司</p>
                    <p>南宁云海风网络科技有限公司</p>
                    <p>南宁风生水传媒有限公司</p>
                </div>
            </div> -->
        </div>
    </div>
</template>

<script>
    // 组件
	  import InputAndSelect from 'components/Input/InputAndSelect'
    import FuzzyQuery from 'components/Input/FuzzyQuery'

    export default {
        components:{ InputAndSelect, FuzzyQuery },
        data(){
            return {
            }
        },
        created(){
            // 设置面包屑路径
            this.$store.commit('SET_BREADCRUMB', [
                { name: '首页', path: '/Home' },
                { name: '树形相关组件', path: '/Components/Tree' }
            ]);
        },
        methods:{
        }
    }
</script>

<style lang="less" scoped>
    @import "../../assets/less/page_desc";
</style>
