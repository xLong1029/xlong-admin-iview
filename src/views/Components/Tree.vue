<template>
  <div class="g-content">
    <!-- 树形筛选组件 -->
    <h2 class="m-title">树形筛选组件</h2>
    <div class="m-content">
      <div class="m-compo-part">
        <FilterTree
          :height="400"
          origin-title="权限列表"
          :origin-data="tree"
          filter-title="已拥有权限列表"
          @on-select="getSelectData"
          @on-change="getCheckData"
          @on-toggle-expand="getToggleExpandData"
        />
        <div class="m-desc">
            <p>属性：</p>
            <p><span class="attr-text">height</span>：列表高度。Number类型，默认值为210</p>
            <p><span class="attr-text">originTitle</span>：源树形列表名称。String类型，默认值为"源列表"</p>
            <p><span class="attr-text">originData</span>：源树形数据。Array类型，同iView中Tree数据格式，空数组</p>
            <p><span class="attr-text">filterTitle</span>：筛选树形列表名称。String类型，默认值为"勾选列表"</p>
        </div>
        <div class="m-desc">
            <p>事件：</p>
            <p><span class="attr-text">on-select</span>：点击复选框时触发，返回源树形已勾选的节点数组、当前项</p>
            <p><span class="attr-text">on-change</span>：点击树节点时触发，返回源树形已选中的节点数组、当前项</p>
            <p><span class="attr-text">on-toggle-expand</span>：展开和收起子列表时触发, 返回当前节点数据</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// 组件
import FilterTree from "components/Tree/FilterTree";

export default {
  components: { FilterTree },
  data() {
    return {
      tree: [
        {
          title: "一级页面",
          value: 1,
          expand: true,
          children: [
            {
              title: "二级页面 1.1",
              value: 11,
              expand: true,
              children: [
                {
                  title: "查看",
                  value: 111
                },
                {
                  title: "新增",
                  value: 112
                },
                {
                  title: "编辑",
                  value: 113
                },
                {
                  title: "删除",
                  value: 114
                }
              ]
            },
            {
              title: "二级页面 1.2",
              value: 12,
              expand: true,
              children: [
                {
                  title: "查看",
                  value: 121
                },
                {
                  title: "新增",
                  value: 122
                },
                {
                  title: "编辑",
                  value: 123
                },
                {
                  title: "删除",
                  value: 124
                }
              ]
            }
          ]
        }
      ]
    };
  },
  created() {
    // 设置面包屑路径
    this.$store.commit("SET_BREADCRUMB", [
      { name: "首页", path: "/Home" },
      { name: "树形组件", path: "/Components/Tree" }
    ]);
  },
  methods: {
    // 获取勾选列表
    getCheckData(list, item) {
      console.log('已勾选节点数组：');
      console.log(list);
      console.log('已勾选的当前项：');
      console.log(item);
    },
    // 获取选择列表
    getSelectData(list, item) {
      console.log('已选中的节点数组：');
      console.log(list);
      console.log('已选中的当前项：');
      console.log(item);
    },
    // 获取当前展开获取收取的节点数据
    getToggleExpandData(item) {
      console.log('展开或收起的当前项：');
      console.log(item);
    },
  }
};
</script>

<style lang="less" scoped>
@import "../../assets/less/page_desc";
</style>
