<template>
    <div class="g-content">
        <Tabs class="m-tabs" type="card" :animated="false">
            <TabPane label="基本信息">
                <div class="tabs-cont"><ProductInfo :product-id="productId"></ProductInfo></div>
            </TabPane>
            <TabPane label="案例展示">
                <div class="tabs-cont"><CaseList :product-id="productId"></CaseList></div>
            </TabPane>
        </Tabs>
        <Button class="u-btn-goback fr" type="ghost" @click="$router.go(-1)">返回</Button>
    </div>
</template>

<script>
    // 组件
    import ProductInfo from 'pages/Examples/ProductList/ProductDetail/ProductInfo'
    import CaseList from 'pages/Examples/ProductList/ProductDetail/CaseList'
    export default {
        components: { ProductInfo, CaseList },
        data() {
            return {
                // 产品编号
                productId: '',
            }
        },
        created() {
            // 设置面包屑路径
            this.$store.commit('SET_BREADCRUMB', [
                { name: '首页', path: '/Home' },
                { name: '产品列表', path: '/Examples/ProductList' },
                { name: '产品详情', path: '' }
            ]);
            // 获取产品编号
            this.productId = this.$route.query.id;
        },
        methods: {
        }
    }
</script>

<style lang="less" scoped>
    .u-btn-goback{
        position: absolute;
        top: 15px;
        right: 20px;
        min-width: 80px;
    }

    .m-tabs{
        margin-top: 5px;
    }

    .tabs-cont{
        min-height: 300px;
        border-left: 1px solid #dddee1;
        border-right: 1px solid #dddee1;
        border-bottom: 1px solid #dddee1;
        border-radius: 0 0 4px 4px;
        padding: 15px;
    }
</style>