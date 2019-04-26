<template>
    <div class="g-content">
        <p>噔噔~！XLONG家里蹲管理系统，欢迎你！</p>
        <br/>
        <p>组件页面里的相关组件，是本人由于工作需要根据Iview原有组件进行部分重写的新组件。</p>
        <br/>
        <p>示例页面里的相关页面，是本人整理出来曾用过一些功能页面。</p>
        <br/>
        <br/>
        <img :src="qrcode"/>
        <p style="margin-left:50px">扫一扫，关注xLong设计</p>
        <br/>
        <br/>
        <p>联系方式（一个不务正业的前端工程师）</p>
        <br/>
        <p>QQ：381612175</p>
        <p>github：<a href="https://github.com/xLong1029/" target="_blank">https://github.com/xLong1029/</a></p>
        <p>站酷主页：<a href="http://xlong.zcool.com.cn/" target="_blank">http://xlong.zcool.com.cn/</a></p>
        <p>UI中国：<a href="http://i.ui.cn/ucenter/358591.html" target="_blank">http://i.ui.cn/ucenter/358591.html</a></p>
        <br/>
        <p>*此项目做学习Vuejs使用，有什么问题可联系我讨论</p>
    </div>
</template>

<script>
    export default {
        data(){
            return{
                qrcode: require('assets/images/qrcode.jpg')
            }
        },
        created(){
            // 设置面包屑路径
            this.$store.commit('SET_BREADCRUMB', [{ name: '首页', path: '/Home' }]);
        }
    }
</script>

<style>
</style>
