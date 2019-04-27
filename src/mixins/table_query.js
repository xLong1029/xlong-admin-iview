/*
 * 模块 : 表格查询相关配置
 * 作者 : 罗永梅（381612175@qq.com）
 * 日期 : 2017-8-31
 * 版本 : version 1.0
 */
import Common from 'common/common.js'

export default {
	data() {
		return {
			// 判断是否是查询状态
            isQuery: false,
			// 日期设置--用于iView的DatePicker的daterange类型数据配置，和Vue版本冲突，Vue2.4版本以上不可用
			// dateSetting: {
			// 	shortcuts: [
			// 		{
			// 			text: '最近一周',
			// 			value () { return Common.SetDate(1); }
			// 		},
			// 		{
			// 			text: '最近一个月',
			// 			value () { return Common.SetDate(2); }
			// 		},
			// 		{
			// 			text: '最近三个月',
			// 			value () { return Common.SetDate(3); }
			// 		}
			// 	]
			// },
		}
	},
	methods: {
		// 获取查询起始和结束时间--用于iView的DatePicker的daterange类型数据设置方法，和Vue版本冲突，Vue2.4版本以上不可用
		// getDate(date) {
		// 	console.log('get date:' + date);
		// 	this.queryForm.sTime = date[0] + ' 00:00:00';
		// 	this.queryForm.eTime = date[1] + ' 23:59:59';
		// },
		// 获取查询开始日期
		getStartDate(date) {
			console.log('get start date:' + date);
			this.queryForm.sTime = date;
		},
		// 获取查询结束日期
		getEndDate(date) {
			console.log('get end date:' + date);
			this.queryForm.eTime = date;
		},
		// 查询
		// form:表单对象， getValid:是否需要验证表单
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
		// 删除查询对象属性（清空对象）
		clearQuery(){		
			for(let key in this.queryForm){
				delete this.queryForm[key];
			}
		},
		// 重置查询内容
		resetQuery(form){
			this.clearQuery();
			this.$refs[form].resetFields();
			this.getTableList();
		},
		// 获取筛选列表
		getFilterList(){
			if(this.queryForm.sTime != '' && this.queryForm.eTime == ''){
				this.queryForm.eTime = (new Date()).toLocaleDateString();
			}
			this.apiGetFilter()
			.then(res => {
			    this.pageLoading = false;
			    if(res.code == 200){
			        // 设置数据
					this.setListData(res.data);
					// 设置页码
					this.setPage(res.page);
			    }
			    else this.$Message.error('获取数据失败!');
			})
			.catch(err => console.log(err))
		},
		// 获取表格列表
		getTableList(query){
			this.pageLoading = true;
			// 是否查询状态
			this.isQuery = query ? true : false;
			
			this.apiGetList().then(res => {
				this.pageLoading = false;
				if(res.code == 200){
					// 设置数据
					this.setListData(res.data);
					// 设置页码
					this.setPage(res.page);
				}
				else this.$Message.error('获取数据失败!');
			})
			.catch(err => console.log(err))
		},
		// 设置列表数据
		setListData(result){
			this.listData = result.length > 0 ? result : [];
		}
	}
}