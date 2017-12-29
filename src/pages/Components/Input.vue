<template>
    <div class="g-content">
        <!-- 可输入下拉框组件 -->
        <h2 class="m-title">可输入下拉框</h2>
        <div class="m-content">            
            <div class="m-compo-part">
                <InputAndSelect :direction="inputSelectAttr.direction"></InputAndSelect>
                <div class="m-desc">
                    <p>组件包含属性：</p>
                    <P>direction。String类型, 可选值为 "top" 表示向上显示列表，"down" 表示向下显示列表。默认值为"down"</P>
                </div>
            </div>
            <div class="m-test-part">
                <p class="g-mb10">组件属性值测试（直接选择即可在左侧进行测试）：</p>
                <!-- 功能表单 -->
                <Form ref="inputSelectAttr" :model="inputSelectAttr" :label-width="75" style="width:400px;">
                    <Form-item label="direction：" prop="direction">
                        <RadioGroup v-model="inputSelectAttr.direction">
                            <Radio label="down">down</Radio>
                            <Radio label="top">top</Radio>
                        </RadioGroup>
                    </Form-item>
                </Form>
            </div>
        </div>
        <!-- 模糊查询组件 -->
        <h2 class="m-title">模糊查询</h2>
        <div class="m-content">
            <div class="m-compo-part">
                <FuzzyQuery></FuzzyQuery>
                <p class="g-mb10 g-mt20">测试数据如下，可选择字段进行测试：</p>
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
            </div>
            <div class="m-test-part"></div>
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
                /* 可输入下拉框 */
                inputSelectAttr: {
                    direction: 'down',
                },
            }
        },
        created(){
            // 设置面包屑路径
            this.$store.commit('SET_BREADCRUMB', [
                { name: '首页', path: '/Home' },
                { name: 'Input输入框', path: '/Components/Input' }
            ]);
        },
        methods:{}
    }
</script>

<style lang="less" scoped>
    @import "../../assets/less/page_desc";
</style>
