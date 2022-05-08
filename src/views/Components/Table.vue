<template>
  <div class="g-content">
    <!-- 可编辑表格 -->
    <h2 class="m-title">可编辑表格</h2>
    <div class="m-content">
      <div class="m-compo-part" style="float: none; max-width: 100%; border: none;">
        <EditableTable
          :title="title"
          :data="listData"
          @on-select="getSelectRowData"
          @on-all-select="getAllSelectRowData"
          @on-save="getRowData"
          @on-delete="getDelete"
        />
        <div class="m-desc">
            <p>属性：</p>
            <p><span class="attr-text">title</span>：表格表头名称。Array类型，默认值为空数组</p>
            <p><span class="attr-text">data</span>：表格数据。Array类型，默认值为空数组</p>
            <p><span class="attr-text">emptyText</span>：源树形数据。String类型，默认值为“暂无数据”</p>
            <p><span class="attr-text">imgMaxSize</span>：图片可上传的文件大小。String类型，默认值为2048</p>
            <p><span class="attr-text">imgFormat</span>：图片可上传的文件格式。Array类型，默认值为['image/jpg', 'image/jpeg', 'image/png']</p>
        </div>
        <div class="m-desc">
            <p>事件：</p>
            <p><span class="attr-text">on-select</span>：点击复选框时触发，返回已勾选的列表数组、当前行</p>
            <p><span class="attr-text">on-save</span>：点击“保存”按钮时触发，返回当前行</p>
            <p><span class="attr-text">on-delete</span>：点击“删除”按钮时触发，返回当前行</p>
        </div>
      </div>
    </div>
    <!-- 查看要保存的信息 -->
    <Modal title="查看要保存的信息" v-model="showSaveData">
      <div class="m-hint g-mb10">这里仅作演示使用，实际操作时直接获取保存内容不进行弹窗</div>
      <Form :model="saveData" label-position="left" :label-width="100">
        <FormItem label="编号">
          <Input v-model="saveData.id" />
        </FormItem>
        <FormItem label="标题">
          <Input v-model="saveData.title" />
        </FormItem>
        <FormItem label="封面图片URL">
          <Input v-model="saveData.img" />
        </FormItem>
        <FormItem label="跳转链接URL">
          <Input v-model="saveData.url" />
        </FormItem>
      </Form>
      <div slot="footer"></div>
    </Modal>
  </div>
</template>

<script>
// 组件
import EditableTable from "components/Table/EditableTable";

export default {
  components: { EditableTable },
  data() {
    return {
      // 保存信息弹窗标题
      showSaveTitle: '查看要保存的信息',
      // 是否显示保存信息弹窗
      showSaveData: false,
      // 保存信息
      saveData: {},
      // 表格标题
      title: [
        {
          title: "全选",
          key: "selecAll",
          align: "center",
          type: "CheckBox",
          width: "50"
        },
        {
          title: "编号",
          key: "id",
          align: "center",
          type: "Text",
          width: "100"
        },
        {
          title: "标题",
          key: "title",
          align: "center",
          type: "Input"
        },
        {
          title: "封面图片",
          key: "img",
          align: "center",
          type: "UploadImg",
          width: "300"
        },
        {
          title: "跳转链接",
          key: "url",
          align: "center",
          type: "Input"
        },
        {
          title: "操作",
          key: "operate",
          align: "center",
          type: "Button",
          button: [
            {
              type: "primary",
              size: "small",
              minWidth: "64",
              text: "保存",
              click: "save"
            },
            {
              type: "primary",
              size: "small",
              minWidth: "64",
              text: "删除",
              click: "delete"
            }
          ],
          width: "200"
        }
      ],
      // 表格信息
      listData: [
        {
          id: 1,
          title: "测试数据1",
          img: "http://xlongadmin.xlong.club/2020/01/07/0c2363a540108eff805ea057ccafc0f8.jpg",
          url: "https://www.baidu.com/"
        },
        {
          id: 2,
          title: "测试数据2",
          img: "http://xlongadmin.xlong.club/2020/01/07/38cd18614033cd2080439c17fabf9379.jpg",
          url: "https://www.baidu.com/"
        },
        {
          id: 3,
          title: "测试数据3",
          img: "http://xlongadmin.xlong.club/2020/01/07/8cfb88554033556b804bb363569c4d5f.jpg",
          url: "https://www.baidu.com/"
        }
      ]
    };
  },
  created() {
    // 设置面包屑路径
    this.$store.commit("SET_BREADCRUMB", [
      { name: "首页", path: "/Home" },
      { name: "表格组件", path: "/Components/Table" }
    ]);
  },
  methods: {
    // 获取一行数据
    getRowData(row) {
      this.showSaveData = true;
      this.saveData = row;
    },
    // 获取删除行数据
    getDelete(row) {
      if (row) {
        this.$Message.success(`编号为${row.id}的记录删除成功！`);
      }
    },
    // 获取选中行数据
    getSelectRowData(list, row){
      row.isCheck ? this.$Message.success(`编号为${row.id}的已选中！`) : this.$Message.success(`编号为${row.id}的已取消选中！`);
    },
    // 获取全选列表
    getAllSelectRowData(list){
      list.length ? this.$Message.success('已全选！') : this.$Message.success('已取消全选！');
    }
  }
};
</script>

<style lang="less" scoped>
@import "../../assets/less/page_desc";
</style>
