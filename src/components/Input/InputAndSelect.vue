<template>
    <div id="inputAndSelect" ref="inputAndSelect" class="f-input-and-select">
        <!-- 关键字输入框 -->
        <input
            ref="inputBox"
            placeholder="请输入快递公司"
            class="input-select ivu-input"
            v-model="value"
            @click="toggleDropDownList"
            @blur="hideDropDownList"
        />
        <i class="ivu-icon ivu-icon-arrow-down-b ivu-select-arrow"></i>
        <!-- 下拉列表 -->
        <div ref="dropDownList" :class="['input-select-down', showList ? '' : 'hidden']">
            <!-- 选项列表 -->
            <ul @mouseleave="leaveList" @mouseenter ="enterList">
                <li                        
                    v-for="(item, index) in optionList"
                    :class="['input-select-item', selectIndex === index ? 'input-select-item-selected' : '']"
                    :key="index"                   
                    @click="selectDropDownItem(item, index)"
                >
                {{ item.label }}
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
    import JsonData from 'mock/data.json'
    export default {
        name: 'inputAndSelect',
        // 获取父组件传值
        props: {
            // 绑定值
            model:{
                type: String,
                default: ''
            },
            // 列表显示方向，top：向上显示列表，down：向下显示列表
            direction:{
                type: String,
                default: 'down'
            },
        },
        data () {
            return {
                // 选择值
                value: '',
                // 当前选项索引
                // -404：表示无匹配数据
                selectIndex: -404,
                // 是否显示下拉框
                showList: false,
                // 是否选择选项
                getSelect: false,
                // 选项列表
                optionList: [],
            }
        },
        watch: {
            model(val) {
                this.value = val;
            } 
        },
        created() {
            this.value = this.model;
        },
        created(){
            // 获取json数据
            const result = JsonData.expressCompany;
            // 设置选项列表
            this.setSelectList(result);
        },
        methods: {
            // 设置选项列表
            setSelectList(result){
                this.optionList = result.map(item => {
                    return {
                        value: item.id,
                        label: item.name
                    };
                });
            },
            // 选择下拉选项
            selectDropDownItem(item, index){
                // 获取选项值
                // this.value = item.label;
                // 更新输入框存储的值
                this.$emit('on-change', item.label);
                // 当前选项索引
                this.selectIndex = index;
                // 隐藏下拉框
                this.showList = false;
                this.getSelect = true;
            },
            // 鼠标进入列表
            enterList(item, index){
                this.getSelect = true;
            },
            // 鼠标离开列表
            leaveList(item, index){
                this.getSelect = false;
            },
            // 切换显示隐藏下拉框
            toggleDropDownList(){
                let inputBox = this.$refs.inputBox,
                    inputAndSelect = this.$refs.inputAndSelect,
                    dropDownList = this.$refs.dropDownList;

                // 检测输入数据是否与选项相等
                this.checkValue();
                
                if(this.showList){
                    this.showList=false;
                    inputAndSelect.setAttribute('class', 'f-input-and-select');
                }
                else{
                    this.showList = true;
                    // 全选输入框文本
                    inputBox.select();
                    inputAndSelect.setAttribute('class', 'f-input-and-select input-select-visible');

                    // 设置下拉框显示位置
                    const listLength = this.optionList.length;
                    let setTop = 0;
                    if(listLength >= 6) setTop = 210;
                    else setTop = listLength * 31 + 20;

                    // 判断下拉框显示方向
                    if(this.direction == 'top') dropDownList.style.top = - setTop + 'px';
                    else dropDownList.style.top = '31px';
                }
            },
            // 隐藏下拉框
            hideDropDownList(){
                // 未选择数据
                if(!this.getSelect) this.showList = false;
                // 输入数据与选择不符
                if(!this.checkValue()) this.showList = false;
                this.$refs.inputAndSelect.setAttribute('class', 'f-input-and-select');
                // 更新输入框存储的值
                this.$emit('on-change', this.value);
                
            },
            // 检测输入数据是否与选项相等
            checkValue(){
                if(this.selectIndex != -404 && this.value != this.optionList[this.selectIndex].label){
                    this.selectIndex = -404;
                    return false;
                }
                else return true;
            }
        }
    }
</script>
<style lang="less">
    @import "../../assets/less/color";
    .f-input-and-select{
        width:100%;
        height:100%;
        position: relative;

        .input-select{
            cursor: pointer;
        }

        .input-select-down {
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
        .input-select-down.hidden{
            display:none;
        }

        .input-select-item {
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

        .input-select-item-focus, .input-select-item:hover {
            background: #f3f3f3;
        }

        .input-select-item-selected, .input-select-item-selected:hover {
            color: #fff;
            background: @base_color;
        }
    }

    .input-select-visible .ivu-select-arrow{
        transform: rotate(180deg);
    }
</style>