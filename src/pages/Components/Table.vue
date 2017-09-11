<template>
    <div class="g-content">
        <!-- 可编辑表格组件 -->
        <h2 class="m-title">可编辑表格</h2>
        <div class="m-content">
            <EditableTable :title="title" :data="data"></EditableTable>
            <!-- <div class="m-desc">
                <p>组件包含属性：direction</p>
                <p>可选值为 "top" 表示向上显示列表，"down" 表示向下显示列表</p>
            </div> -->
        </div>
    </div>
</template>

<script>
    // 组件
	import EditableTable from 'components/Table/EditableTable'
      
    export default {
        components:{ EditableTable },
        data(){
            return{
                title: [
                    {
                        title: '全选',
                        key: 'selecAll',
                        align: 'center',
                        type: 'CheckBox',
                        width: '50'
                    },
                    {
                        title: '产品编号',
                        key: 'id',
                        align: 'center',
                        type: 'Text',
                    },
                    {
                        title: '产品标题',
                        key: 'title',
                        align: 'center',
                        type: 'Input'
                    },
                    {
                        title: '产品图片',
                        key: 'img',
                        align: 'center',
                        type: 'UploadImg'
                    },
                    {
                        title: '产品链接',
                        key: 'url',
                        align: 'center',
                        type: 'Input'
                    },
                    {
                        title: '操作',
                        key: 'operate',
                        align: 'center',
                        type: 'Button',
                        button: [
                            {
                                type: 'primary',
                                size: 'small',
                                minWidth: '64',
                                text: '保存',
                            },
                        ],
                        width: '100',
                    },
                ],
                data: [
                    {
                        id: '1001',
                        title: '六个六产品',
                        img: '',
                        url: 'http://fanyi.baidu.com/static/translation/img/header/logo_cbfea26.png'
                    },
                    {
                        id: '1002',
                        title: '六个六产品',
                        img: '',
                        url: 'http://fanyi.baidu.com/static/translation/img/header/logo_cbfea26.png'
                    },
                    {
                        id: '1003',
                        title: '六个六产品',
                        img: '',
                        url: 'http://fanyi.baidu.com/static/translation/img/header/logo_cbfea26.png'
                    }
                ],
            }
        },
        created(){
            // 设置面包屑路径
            this.$store.commit('SET_BREADCRUMB', [
                { name: '首页', path: '/Home' },
                { name: '表格', path: '/Components/Table' }
            ]);
        }
    }
</script>

<style lang="less" scoped>
    .m-desc{
        width: 500px;
        margin-top: 20px;
        border: 1px solid #d4ece8;
        border-radius: 4px;
        padding: 10px; 
    }
</style>
