<template>
    <div class="g-content">
        <!-- 单图片上传显示组件 -->
        <h2 class="m-title">单图片上传显示</h2>
        <div class="m-content">
            <SingleImage :preview="true" size-hint="100*100px"></SingleImage>
            <div class="m-desc">
                <p>组件包含属性：</p>
                <p>1. preview，是否可预览。Boolean类型，默认值为false，不可预览</p>
                <p>2. sizeHint，是否显示图片尺寸建议。String类型，默认不显示。设置其他值：size-hint="100*100px"</p>
                <p>3. fileSize，设置最大图片文件大小，单位KB。Number类型，默认值为150</p>
            </div>
        </div>
        <!-- 多图片上传显示组件 -->
        <h2 class="m-title">多图片上传显示</h2>
        <div class="m-content">
            <MultipleImage :preview="true" size-hint="100*100px" :file-size="Number(5120)" :max-num="Number(3)"></MultipleImage>
            <div class="m-desc">
                <p>组件包含属性：</p>
                <p>1. preview，是否可预览。Boolean类型，默认值为false，不可预览</p>
                <p>2. sizeHint，是否显示图片尺寸建议。String类型，默认不显示。设置其他值：size-hint="100*100px"</p>
                <p>3. fileSize，设置最大图片文件大小，单位KB。Number类型，默认值为150</p>
                <p>4. maxNum，设置最大上传个数。Number类型，默认值为5</p>
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
    @import "../../assets/less/page_desc";
</style>
