<template>
    <div id="editableTable">
        <!-- 可编辑表格 -->
        <table ref="table" class="m-table" width="100%" cellpadding="0" cellspacing="0">
          <!-- 表头名称 -->
          <th v-for="(item, index) in title" :key="index" :align="item.align" :style="{ 'width' : item.width + 'px'}">
              <Checkbox v-if="item.type == 'CheckBox'" v-model="checkAll" @on-change="selectAll(checkAll)"></Checkbox>
              <span v-else>{{ item.title }}</span>
          </th>
          <!-- 表格内容 -->
          <template v-if="data.length">
            <!-- 已有行 -->
            <tr v-for="(item, index) in data" :key="index">
              <td v-for="(th, i) in title" :key="i" :align="th.align">
                  <!-- 勾选框 -->
                  <Checkbox v-if="th.type == 'CheckBox'" v-model="item.isCheck" @on-change="selectRow(index, item.isCheck)"></Checkbox>
                  <!-- 显示文本 -->
                  <span v-if="th.type == 'Text'">{{ item[th.key] }}</span>
                  <!-- 输入框 -->
                  <Input v-if="th.type == 'Input'" v-model="item[th.key]" />
                  <!-- 图片上传 -->
                  <div v-if="th.type == 'UploadImg'">
                      <div class="upload-img">
                          <img class="show-img" :src="item[th.key]" alt="图片加载失败" @error="notFoundPic"/>
                      </div>
                      <div class="upload-btn">
                          <Button type="default" :disabled="item[th.key] == ''" icon="ios-eye-outline" @click="viewImage(index)">查看图片</Button>
                          <Button type="default" icon="ios-cloud-upload-outline" @click="uploadClick(index)" style="margin-left:10px">上传图片</Button>
                      </div>
                  </div>
                  <!-- 操作按钮 -->
                  <div v-if="th.type == 'Button'">
                    <span v-for="(button, i) in th.button" :key="i">
                      <Button
                        class="table-btn"
                        :type="button.type"
                        :size="button.size"
                        :style="{ 'min-width' : button.minWidth + 'px' }"
                        @click="buttonOperate(button, index)"
                      >
                      {{ button.text }}
                      </Button>
                    </span>
                  </div>
              </td>
            </tr>
          </template>
          <tr v-else><td :colspan="title.length" align="center">{{ emptyText }}</td></tr>
      </table>
      <!-- 隐藏的上传按钮 -->
      <input ref="imgFile" type="file" :accept="format" hidden @change="selectFile"/>
      <!-- 查看图片 -->
      <Modal title="查看图片" v-model="showImgModal">
          <img :src="imgUrl" style="width: 100%" @error="notFoundPic"/>
          <div slot="footer"></div>
      </Modal>
    </div>
</template>

<script>
    // 通用JS
    import Common from 'common/common.js'
    import { SetDefaultPic } from 'utils'

    export default {
        name: 'editableTable',
        // 获取父组件传值
        props: {
            // 表格表头名称
            title: {
                type: Array,
                default: () => [
                  // {
                  //     title: '',
                  //     key: '',
                  //     align: '',
                  //     type: 'Text'
                  // }
                ]
            },
            // 表格数据
            data: {
                type: Array,
                default: () => []
            },
            // 空数据时显示的文本内容
            emptyText: {
              type: String,
              default: '暂无数据'
            }
        },
        data() {
            return {
                // 选项列表
                selectList: [],
                //选中所有项
                checkAll: false,
                // 显示查看图片
                showImgModal: false,
                // 显示图片Url
                imgUrl: '',
                // 当前操作行索引
                rowIndex: -1,
                // 图片文件大小
                maxSize: 2048,
                // 可接受的图片上传格式
                format: ['image/jpg', 'image/jpeg', 'image/png'],
            }
        },
        created() {

        },
        methods: {
            // 全选
            selectAll(check){
                this.data.forEach(item => {
                    if(check){
                        item.isCheck = true;
                        // 设置选项列表
                        this.selectList.push(item);
                    }
                    else{
                        item.isCheck = false;
                        // 清空选项列表
                        this.clearSelect();
                    }
                });
                this.$emit('on-all-select', this.selectList);
            },
            // 选中一行
            selectRow(index, check){
              let row = this.data[index];
                if(check){
                    this.selectList.push(row);

                }
                else{
                    this.removeSelectRow(index);
                }
                // 返回当前选中的列表，当前项
                this.$emit('on-select', this.selectList, row);
            },
            // 移除选中的行
            removeSelectRow(index){
              let row = this.data[index];
              this.selectList.forEach((item, i) => {
                  if(item == row){
                    row.isCheck = false;
                    this.selectList.splice(i,1);
                  }
              });
            },
            // 清空选项
            clearSelect(){
                this.selectList = [];
            },
            // 初始化表格内容
            initData(data){
                // 初始化，给data添加isCheck属性，默认值为false
                if(data.length > 0){
                    data.forEach(item => item.isCheck = false);
                }
            },
            // 查看图片
            viewImage(index){
              this.showImgModal = true;
              this.imgUrl = this.data[index].img;
            },
            // 上传按钮点击事件
            uploadClick(index, add){
                // 触发上传按钮点击事件
                this.$refs.imgFile.click();
                this.rowIndex = index;
            },
            // 选择文件
            selectFile(event){
                // 获取上传文件列表
                const fileList = this.$refs.imgFile.files;
                if(fileList.length > 0){
                    let fileName = fileList[0].name;
                    let fileSize = Math.floor(fileList[0].size / 1024);
                    // 控制文件大小
                    if(fileSize > this.maxSize){
                        this.$Notice.warning({
                            title: '超出文件大小限制',
                            desc: '文件 ' + fileName + ' 太大，不能超过 ' + 2 + 'M。'
                        });
                        return false;
                    }
                    this.uploadFile(fileList[0]);
                }
                else console.log('获取不到文件列表');
            },
            // 上传文件
            uploadFile(file){
                var thisFile = Bmob.File(file.name, file);
                // Bomb图片上传
                thisFile.save().then(res => {
                    this.data[this.rowIndex].img = res[0].url;
                    this.$Notice.success({ title: '图片上传成功!' });
                }, err =>  this.$Notice.error({ title: '图片上传失败，请重试！' }));
            },
            // 设置列表数据
            setListData(result){
                if(result.length > 0){
                    this.data = result.map(item => {
                        return {
                            id: item.objectId,
                            title: item.title,
                            img: item.img,
                            url: item.url,
                        }
                    });
                }
                else this.data = [];
            },
            // 按钮操作
            buttonOperate(button, index){
              let row = this.data[index];

              // 点击”保存“按钮触发，返回该行
              if(button.click == 'save'){
                this.$emit('on-save', row);
              }
              // 点击”删除“按钮触发，返回该行
              else if(button.click == 'delete'){

                this.$emit('on-delete', row);

                // 取消其选中效果
                if(row.isCheck){
                  this.removeSelectRow(index);
                }

                // 移除对应索引位置的内容
                this.data.splice(index, 1);
              }
            },
            // 无法显示图片
            notFoundPic(event){
                SetDefaultPic(event, 2);
            },
        }
    }
</script>

<style lang="less" scoped>
    @import "../../assets/less/color";
    .m-table{
        position: relative;
        border: 1px solid @table_border_color;
        border-bottom: 0;
        border-right: 0;
        font-size: 12px;

        td,th{
            box-sizing: border-box;
            text-overflow: ellipsis;
            vertical-align: middle;
            border-bottom: 1px solid @td_border_color;
            border-right: 1px solid @td_border_color;
            padding: 12px;
        }

        th{
            background-color: #f8f8f9;
        }

        .show-img{
            width: auto;
            max-height: 120px;
            max-width: 90%;
            margin-bottom: 10px;
            border-radius: 4px;
            border: 1px solid rgb(228, 229, 231);
        }

        .table-btn{
          margin: 0 5px;
        }
    }
</style>

