<template>
    <div id="fuzzyQuery" class="f-fuzzy-query">
        <!-- 关键字输入框 -->
        <Input
            v-model="inputValue"
            placeholder="请输入企业名称（例：设计）"
            @input="changeQuery"
            @on-focus="checkQuery"
            @on-blur="hideDropDownList"                   
        ></Input>
        <!-- 下拉列表 -->
        <div :class="['query-select-dropdown', showList ? '' : 'hidden']">
            <ul v-show="notFound" class="query-select-not-found">无匹配数据</ul>
            <ul v-show="loading" class="query-select-loading">加载中</ul>
            <!-- 选项列表 -->
            <ul @mouseleave="leaveList" @mouseenter ="enterList">
                <li                        
                    v-for="(item, index) in optionList"
                    :class="['query-select-item', selectIndex === index ? 'query-select-item-selected' : '']"
                    :key="index"                   
                    @click="selectDropDownItem(item, index)"
                >{{ item.label }}</li>
            </ul>                    
        </div>
    </div>
</template>
<script>
    // Json数据
    import JsonData from '@/mock/data.json'
    
    export default {
        name: 'fuzzyQuery',
        data () {
            return {
                // 输入框的值
                inputValue: '',
                // 是否加载
                loading: false,
                // 当前选项索引
                // -404：表示无匹配数据
                // -1: 表示正在查询
                selectIndex: -404,
                // 是否显示下拉框
                showList: false,
                // 无匹配数据
                notFound: false,
                // 是否选择选项
                getSelect: false,
                // 选项列表
                optionList: [],
                // 搜索显示的列表条数
                optMaxSize: 10,
            }
        },
        methods: {
            // 模糊查询
            fuzzyQuery(keyword){
                this.optionList = [];
                this.loading = true;
                this.notFound = false;
                // 显示选择框
                this.showList = true;
                setTimeout(() => {
                    // 获取本地json数据，设置选项列表
                    this.setSelectList(JsonData.companyName, keyword);
                }, 200);
            },
            // 设置选项列表
            setSelectList(result, keyword){
                // 筛选测试，实际调用接口不用筛选
                let list = result.map(item => {
                    return {
                        value: item.id,
                        label: item.name
                    };
                });
                this.optionList = list.filter(item => item.label.indexOf(keyword) > -1);
                // 筛选测试，实际调用接口不用筛选

                this.loading = false;

                if(this.optionList.length <= 0) this.notFound = true;
                else this.notFound = false;
            },
            // 搜索词改变时
            changeQuery(text){
                // 更新输入框的值
                this.$store.commit('SET_INPUT_VALUE', text);
                // 查询时，当前选项索引为-1
                this.selectIndex = -1;
                let keyword = this.inputValue;
                this.getSelect = false;
                console.log('get keyword:' + keyword);
                // 搜索词为空
                if (keyword == '') {
                    this.optionList = [];
                    this.notFound = true;
                }
                else this.fuzzyQuery(keyword);
            },
            // 选择下拉选项
            selectDropDownItem(item, index){
                // 获取选项值
                this.inputValue = item.label;
                // 当前选项索引
                this.selectIndex = index;
                // 更新输入框的值
                this.$store.commit('SET_INPUT_VALUE', item.label);
                // 隐藏下拉框
                this.showList = false;
                this.getSelect = true;
            },
            // 检查搜索词
            checkQuery(text){
                let keyword = text.target._value;
                console.log('get keyword:' + keyword);
                // 搜索词为空
                if (keyword == '') {                    
                    this.optionList = [];
                    this.notFound = true;
                }
                else this.fuzzyQuery(keyword);
            },
            // 鼠标进入列表
            enterList(item, index){
                this.getSelect = true;
            },
            // 鼠标离开列表
            leaveList(item, index){
                this.getSelect = false;
            },
            // 隐藏下拉框
            hideDropDownList(){                
                if(this.notFound) this.selectIndex = -404;
                // console.log(this.selectIndex, this.inputValue, this.getSelect);
                // 匹配不到或者未选择
                if(this.selectIndex == -404 || !this.getSelect){
                    this.showList = false;
                }
            }
        }
    }
</script>
<style lang="less">
    .f-fuzzy-query{
        width:100%;
        height:100%;
        position: relative;

        .query-select-dropdown {
            width: inherit;
            max-height: 200px;
            overflow: auto;
            margin: 5px 0;
            padding: 5px 0;
            background-color: #fff;
            box-sizing: border-box;
            border-radius: 4px;
            box-shadow: 0 1px 6px rgba(0,0,0,.2);
            position: absolute;
            z-index: 900;
        }
        .query-select-dropdown.hidden{
            display:none;
        }

        .query-select-loading {
            text-align: center;
            color: #bbbec4;
        }

        .query-select-not-found {
            text-align: center;
            color: #bbbec4;
        }

        .query-select-item {
            margin: 0;
            line-height: normal;
            padding: 7px 16px;
            clear: both;
            color: #495060;
            font-size: 12px!important;
            white-space: nowrap;
            list-style: none;
            cursor: pointer;
            transition: background .2s ease-in-out;
        }

        .query-select-item-focus, .query-select-item:hover {
            background: #f3f3f3;
        }

        .query-select-item-selected, .query-select-item-selected:hover {
            color: #fff;
            background: rgba(12, 189, 159, 0.9);
        }
    }
</style>