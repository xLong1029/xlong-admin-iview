<template>
    <div class="g-content">
        <!-- 单图片上传显示组件 -->
        <h2 class="m-title">单图片上传显示</h2>
        <div class="m-content">
            <SingleImage :preview="true"></SingleImage>
            <div class="m-desc">
                <p>组件包含属性：preview</p>
                <p>可选值为 "true" 表示可预览，"false" 表示不可预览</p>
            </div>
        </div>
        <!-- 多图片上传显示组件 -->
        <h2 class="m-title">多图片上传显示</h2>
        <div class="m-content">
            <MultipleImage :preview="true"></MultipleImage>
            <div class="m-desc">
                <p>组件包含属性：preview</p>
                <p>可选值为 "true" 表示可预览，"false" 表示不可预览</p>
            </div>
        </div>
    </div>
</template>

<script>
    // 组件
	import SingleImage from '@/components/UploadImage/SingleImage'
  	import MultipleImage from '@/components/UploadImage/MultipleImage'

    export default {
        components:{ SingleImage, MultipleImage },
        created(){
            // 设置面包屑路径
            this.$store.commit('SET_BREADCRUMB', [
                { name: '首页', path: '/Home' },
                { name: '图片上传', path: '/Components/UploadImage' }
            ]);
        }
    }
</script>

<style lang="less" scoped>
    .m-content{
        width:500px;
        padding-left: 20px;
    }

    .m-desc{
        margin-top: 20px;
        border: 1px solid #d4ece8;
        border-radius: 4px;
        padding: 10px; 
    }
</style>
