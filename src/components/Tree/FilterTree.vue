<template>
  <div id="filterTree" class="xl-filter-tree">
    <div class="xl-filter-tree-list g-mr10" :style="{ height: height + 'px' }">
      <div class="xl-filter-tree-list-header">
        <span class="xl-filter-tree-list-header__title">{{ originTitle }}</span>
      </div>
      <div class="xl-filter-tree-list-body">
        <div class="xl-filter-tree-list-content">
          <Tree
            :data="originData"
            show-checkbox
            @on-check-change="getFilterData"
            @on-select-change="getSelectData"
            @on-toggle-expand="getToggleExpandData"
          ></Tree>
        </div>
      </div>
    </div>
    <div class="xl-filter-tree-list" :style="{ height: height + 'px' }">
      <div class="xl-filter-tree-list-header">
        <span class="xl-filter-tree-list-header__title">{{ filterTitle }}</span>
      </div>
      <div class="xl-filter-tree-list-body">
        <div class="xl-filter-tree-list-content">
          <Tree :data="filterData"></Tree>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { CopyArr } from "utils";

export default {
  name: "filterTree",
  // 获取父组件传值
  props: {
    // 列表高度
    height: {
      type: Number,
      default: 210
    },
    // 源树形列表名称
    originTitle: {
      type: String,
      default: "源列表"
    },
    // 源树形数据
    originData: {
      type: Array,
      default: () => []
    },
    // 筛选树形列表名称
    filterTitle: {
      type: String,
      default: "勾选列表"
    }
  },
  data() {
    return {
      // 选择穿梭后形成的树形数据
      filterData: [],
      // 当前勾选项
      nowCheck: null
    };
  },
  created() {},
  methods: {
    // 点击复选框时触发，返回源树形已勾选的节点数组、当前项
    getFilterData(list, item) {
      if (this.originData.length) {
        // 数组深克隆，不改变源树形
        this.filterData = this.filterCheckData(CopyArr(this.originData));
        // console.log(this.filterData);
        this.$emit("on-change", this.filterData, item);
      }
    },
    // 递归查找勾选节点
    filterCheckData(node) {
      // console.log(node);
      if (node.length) {
        let arr = [];
        node.forEach(e => {
          if (e.checked) {
            // console.log('此节点已全选：', e);
            arr.push(e);
          } else if (e.children && e.indeterminate) {
            // console.log('此节点还有子节点：', e.children);
            let children = this.filterCheckData(e.children);
            arr.push({
              title: e.title,
              value: e.value,
              expand: e.expand,
              children
            });
          }
        });

        return arr;
      } else return node;
    },
    // 点击树节点时触发，返回源树形已选中的节点数组、当前项
    getSelectData(list, item) {
      this.$emit("on-select", list, item);
    },
    // 展开和收起子列表时触发, 返回当前节点数据
    getToggleExpandData(item){
      this.$emit("on-toggle-expand", item);
    }
  }
};
</script>

<style lang="less" scoped>
.xl-filter-tree-list {
  display: inline-block;
  width: 180px;
  height: 210px;
  font-size: 12px;
  vertical-align: middle;
  position: relative;
  padding-top: 35px;

  &-header {
    padding: 8px 16px;
    background: #f9fafc;
    color: #515a6e;
    border: 1px solid #dcdee2;
    border-bottom: 1px solid #e8eaec;
    border-radius: 6px 6px 0 0;
    overflow: hidden;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;

    &__count {
      float: right;
    }
  }

  &-body {
    height: 100%;
    border: 1px solid #dcdee2;
    border-top: none;
    border-radius: 0 0 6px 6px;
    position: relative;
    overflow: hidden;
  }

  &-content {
    height: 100%;
    padding: 4px;
    overflow: auto;
  }
}
</style>

