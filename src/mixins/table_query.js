// 通用JS
import Common from 'common/common.js'

export default {
	data() {
		return {
			// 判断是否是查询状态
            isQuery: false,
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
	}
}