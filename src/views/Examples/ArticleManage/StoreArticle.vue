<template>
  <div class="g-content">
    <!--  加载判断 -->
    <Loading v-if="pageLoading"></Loading>
    <div v-else>
      <Alert closable class="g-mb15"
        >温馨提醒：Mock数据，请勿刷新页面，刷新后当前数据则不存在啦，会提示“找不到该文章”</Alert
      >
      <Form
        ref="infoForm"
        :model="infoForm"
        :rules="validate"
        :label-width="100"
      >
        <Form-item label="文章标题：" prop="title">
          <Input v-model="infoForm.title" placeholder="请输入文章标题" />
        </Form-item>
        <Form-item label="文章标签：" prop="tags">
          <Select
            v-model="infoForm.tags"
            multiple
            placeholder="请选择文章标签(可多选)"
          >
            <Option v-for="item in tagList" :value="item.name" :key="item.id">{{
              item.name
            }}</Option>
          </Select>
        </Form-item>
        <Form-item label="文章内容：" prop="content">
          <!-- 组件-富文本编辑器 -->
          <Tinymce v-model="infoForm.content" height="500" />
        </Form-item>
        <!-- 操作按钮 -->
        <div class="m-operation">
          <Button
            v-if="pageType == 'edit'"
            class="fr"
            type="primary"
            @click="submit('infoForm')"
            >确认修改</Button
          >
          <Button v-else class="fr" type="primary" @click="submit('infoForm')"
            >确认新增</Button
          >
          <Button class="fr" type="default" @click="$router.go(-1)"
            >返回</Button
          >
          <div class="clearfix"></div>
        </div>
      </Form>
    </div>
  </div>
</template>

<script>
// 组件
import Loading from "components/Common/Loading";
//导入富文本组件
import Tinymce from "components/Common/Tinymce";
// 通用JS
import { GetUrlQuery } from "utils";
// Api方法
import Api from "api/article-manage.js";
import PublicApi from "api/public.js";
export default {
  components: { Loading, Tinymce },
  data() {
    return {
      // 加载页面
      pageLoading: false,
      // 页面描述
      pageType: "add",
      // 标签列表
      tagList: [],
      // 文章id
      articleId: "",
      // 表单信息
      infoForm: {
        title: "",
        tags: [],
        content: "",
      },
      // 验证规则
      validate: {
        title: [
          { required: true, message: "文章标题不能为空", trigger: "blur" },
        ],
        content: [
          { required: true, message: "文章内容不能为空", trigger: "blur" },
        ],
      },
    };
  },
  created() {
    let id = GetUrlQuery("id");
    // 判断是否是编辑页
    if (id) {
      // 获取用户编号
      this.articleId = id;
      this.$store.commit("SET_BREADCRUMB", [
        { name: "首页", path: "/Home" },
        { name: "文章列表", path: "/Examples/ArticleManage/List" },
        { name: "文章详情", path: "" },
      ]);
      // 获取文章详情
      this.getDetail();
      this.pageType = "edit";
    } else {
      this.pageLoading = false;
      this.$store.commit("SET_BREADCRUMB", [
        { name: "首页", path: "/Home" },
        { name: "文章列表", path: "/Examples/ArticleManage/List" },
        { name: "新增文章", path: "" },
      ]);
    }

    // 获取“标签”列表
    PublicApi.GetTagList()
      .then((res) => {
        const { code, data, message } = res;
        if (code === 200) {
          this.tagList = data;
        } else {
          this.$Message.warning(message);
        }
      })
      .catch((err) => console.log(err));
  },
  methods: {
    // 保存文章
    submit(form) {
      this.$refs[form].validate((valid) => {
        if (valid) {
          // 页面加载
          this.pageLoading = true;

          if (this.pageType == "add") {
            // 新增文章
            Api.AddArticle(this.infoForm)
              .then((res) => {
                this.pageLoading = false;

                const { code, message } = res;
                if (code == 200) {
                  this.$Message.success({
                    content: "新增文章成功!",
                    onClose: () => {
                      // 跳转到列表页
                      this.$router.push({ name: "ArticleList" });
                    },
                  });
                } else this.$Message.warning(message);
              })
              .catch((err) => console.log(err));
          } else {
            // 修改文章
            Api.EditArticle(this.infoForm, this.articleId)
              .then((res) => {
                this.pageLoading = false;

                const { code, message } = res;
                if (code == 200) {
                  this.$Message.success("文章修改成功!");
                  this.getDetail();
                } else this.$Message.warning(message);
              })
              .catch((err) => console.log(err));
          }
        } else this.$Message.error("提交失败！填写有误");
      });
    },
    // 获取文章详情
    getDetail() {
      this.pageLoading = true;
      Api.GetArtcDetail(this.articleId)
        .then((res) => {
          this.pageLoading = false;
           const { code, data, message } = res;
          if (code == 200) {
            this.infoForm = data;
          } else this.$Message.warning(message);
        })
        .catch((err) => console.log(err));
    },
  },
};
</script>

<style lang="less">
@import "../../../assets/less/color";
.m-operation {
  button,
  a {
    min-width: 80px;
    margin-left: 10px;
  }
}
</style>
