<template>
  <div class="g-content">
    <Alert closable class="g-mb15"
      >温馨提醒：Mock数据，请勿刷新页面，刷新后当前数据则不存在啦，会提示“找不到该产品”</Alert
    >
    <div style="position: relative">
      <Tabs class="m-tabs" type="card" :animated="false">
        <TabPane label="基本信息">
          <div class="tabs-cont">
            <ProductInfo :product-id="productId"></ProductInfo>
          </div>
        </TabPane>
        <TabPane label="案例展示">
          <div class="tabs-cont">
            <CaseList :product-id="productId"></CaseList>
          </div>
        </TabPane>
      </Tabs>
      <Button class="u-btn-goback fr" type="default" @click="$router.go(-1)"
        >返回</Button
      >
    </div>
  </div>
</template>

<script>
// 组件
import ProductInfo from "views/Examples/ProductManage/ProductDetail/ProductInfo";
import CaseList from "views/Examples/ProductManage/ProductDetail/CaseList";
// 通用JS
import { GetUrlQuery } from "utils";

export default {
  components: { ProductInfo, CaseList },
  data() {
    return {
      // 产品编号
      productId: "",
    };
  },
  created() {
    // 设置面包屑路径
    this.$store.commit("SET_BREADCRUMB", [
      { name: "首页", path: "/Home" },
      { name: "产品列表", path: "/Examples/ProductManage/List" },
      { name: "产品详情", path: "" },
    ]);
    // 获取产品编号
    this.productId = GetUrlQuery("id");
  },
};
</script>

<style lang="less" scoped>
@import "../../../assets/less/color";
.u-btn-goback {
  position: absolute;
  top: -5px;
  right: 0;
  min-width: 80px;
}

.m-tabs {
  margin-top: 5px;
}

.tabs-cont {
  min-height: 300px;
  border-left: 1px solid @table_border_color;
  border-right: 1px solid @table_border_color;
  border-bottom: 1px solid @table_border_color;
  border-radius: 0 0 4px 4px;
  padding: 15px;
}
</style>
