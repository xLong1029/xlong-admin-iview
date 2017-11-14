<template>
    <div class="g-content">
        <!-- 单图片上传显示组件 -->
        <h2 class="m-title">单图片上传显示</h2>
        <div class="m-content">
            <SingleImage :preview="true" size-hint="100*100px"></SingleImage>
            <div class="m-desc">
                <p>组件包含属性：</p>
                <p>1. “preview”，是否可预览上传图片，Boolean类型，"true" 表示可预览，"false" 表示不可预览</p>
                <p>2. “sizeHint”，是否显示图片尺寸建议，String类型，""表示不显示，若为其他字符串内容直接显示</p>
            </div>
        </div>
        <!-- 多图片上传显示组件 -->
        <h2 class="m-title">多图片上传显示</h2>
        <div class="m-content">
            <MultipleImage :preview="true" size-hint="100*100px"></MultipleImage>
            <div class="m-desc">
                <p>组件包含属性：</p>
                <p>1. “preview”，是否可预览上传图片，Boolean类型，"true" 表示可预览，"false" 表示不可预览</p>
                <p>2. “sizeHint”，是否显示图片尺寸建议，String类型，""表示不显示，若为其他字符串内容直接显示</p>
            </div>
        </div>
    </div>
</template>

<script>
    // 组件
	import SingleImage from 'components/UploadImage/SingleImage'
  	import MultipleImage from 'components/UploadImage/MultipleImage'

    export default {
        components:{ SingleImage, MultipleImage },
        created(){
            // 设置面包屑路径
            this.$store.commit('SET_BREADCRUMB', [
                { name: '首页', path: '/Home' },
                { name: '图片上传', path: '/Components/UploadImage' }
            ]);
            // 初始化图片显示链接
            this.$store.commit('SET_IMAGE_URL', '');
            this.$store.commit('SET_IMAGE_URL_ARR', '');
        }
    }
</script>

<style lang="less" scoped>
    .m-content{
        padding-left: 20px;
    }

    .m-desc{
        width: 600px;
        margin-top: 20px;
        border: 1px solid #d4ece8;
        border-radius: 4px;
        padding: 10px; 
    }
</style>
