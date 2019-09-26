<template>
    <div class="g-content">
        <!-- 模糊查询组件 -->
        <h2 class="m-title">模糊查询</h2>
        <div class="m-content">
            <div class="m-compo-part">
                <FuzzyQuery :model="fuzzyQuery.value" @on-change='getFuzzyValue'></FuzzyQuery>
            </div>
            <div class="m-test-part">
                <p class="g-mb10">测试数据如下，可选择字段进行测试：</p>
                <div style="color:#aaa;">
                    <p v-for="(item, index) in companyList" :key="index">{{ item.name }}</p>
                </div>
            </div>
        </div>
        <!-- 可输入下拉框组件 -->
        <h2 class="m-title">可输入下拉框</h2>
        <div class="m-content">
            <div class="m-compo-part">
                <InputAndSelect :model="inputAndSelect.value" :direction="inputAndSelect.direction" @on-change='getInputSelectVal'></InputAndSelect>
                <div class="m-desc">
                    <p>组件包含属性：</p>
                    <P>direction。String类型, 可选值为 "top" 表示向上显示列表，"down" 表示向下显示列表。默认值为"down"</P>
                </div>
            </div>
            <div class="m-test-part">
                <p class="g-mb10">组件属性值测试（直接选择即可在左侧进行测试）：</p>
                <!-- 功能表单 -->
                <Form ref="inputAndSelect" :model="inputAndSelect" :label-width="75" style="width:400px;">
                    <Form-item label="direction：" prop="direction">
                        <RadioGroup v-model="inputAndSelect.direction">
                            <Radio label="down">down</Radio>
                            <Radio label="top">top</Radio>
                        </RadioGroup>
                    </Form-item>
                </Form>
            </div>
        </div>
    </div>
</template>

<script>
    // 组件
	  import InputAndSelect from 'components/Input/InputAndSelect'
    import FuzzyQuery from 'components/Input/FuzzyQuery'

    import JsonData from 'mock/data.json'

    export default {
        components:{ InputAndSelect, FuzzyQuery },
        data(){
            return {
                /* 模糊查询 */
                fuzzyQuery:{
                    value: ''
                },
                /* 可输入下拉框 */
                inputAndSelect: {
                    value: '',
                    direction: 'down'
                },
                companyList: JsonData.companyName
            }
        },
        created(){
            // 设置面包屑路径
            this.$store.commit('SET_BREADCRUMB', [
                { name: '首页', path: '/Home' },
                { name: 'Input输入框', path: '/Components/Input' }
            ]);
        },
        methods:{
            // 获取模糊查询改变值
            getFuzzyValue(value){
                this.fuzzyQuery.value = value;
            },
            // 获取可输入下拉框的值
            getInputSelectVal(value){
                this.inputAndSelect.value = value;
            }
        }
    }
</script>

<style lang="less" scoped>
    @import "../../assets/less/page_desc";
</style>
