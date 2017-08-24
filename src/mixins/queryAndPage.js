// 通用JS
import Common from '@/common/common.js'

export default {
	data() {
		return {
			// 判断是否是查询状态
            isQuery: false,
			// 分页设置
            page: {
				// 总记录数
				dataCount: 0,
				// 是否有下一页
				hasNextPage: false,
				// 是否有上一页
				hasPreviousPage: false,
				// 总页数
				pageCount: 0,
				// 当前页码
				pageNo: 1,
				// 每页显示记录数
				pageSize: 20,
				// 每条条数切换的配置
				pageSizeOpts: [10, 20, 30, 40]
			},
			// 日期设置
			dateSetting: {
				shortcuts: [
					{
						text: '最近一周',
						value () { return Common.SetDate(1); }
					},
					{
						text: '最近一个月',
						value () { return Common.SetDate(2); }
					},
					{
						text: '最近三个月',
						value () { return Common.SetDate(3); }
					}
				]
			},
		}
	},
	methods: {
		// 获取查询起始和结束时间
		getDate(date) {
			console.log('get date:' + date);
			this.queryForm.createTimeStart = date[0];
			this.queryForm.createTimeEnd = date[1];
		},
		// 查询 form:表单对象， getValid:是否需要验证表单
		query(form, getValid) {
			// 修改当前页码
			this.page.pageNo = 1;

			if(getValid == 'valid'){
				// 表单验证
				this.$refs[form].validate((valid)=>{
					// 传值true表示要筛选用户列表            
					if (valid) this.getTableList(true);
					else this.$Message.warning('查询失败！填写有误');
				})
			}
			else this.getTableList(true);
		},
		// 切换页码
		changePage(pageNo) {
			// 修改当前页码
			this.page.pageNo = pageNo;
			// 更新列表
			this.updateList();
		},
		// 切换每页条数
		changePageSize(pageSize){
			// 修改当前显示条数
			this.page.pageSize = pageSize;
			// 更新列表
			this.updateList();
		},
		// 更新列表信息
		updateList(){
			// 判断是否为查询状态
			this.isQuery ? this.getTableList(true) : this.getTableList();
		},
	}
}