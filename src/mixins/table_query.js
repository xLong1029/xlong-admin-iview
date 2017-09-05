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
			this.queryForm.sTime = date[0] + ' 00:00:00';
			this.queryForm.eTime = date[1] + ' 00:00:00';
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
		// 获取筛选列表
		getFilterList(){
			this.apiGetFilter()
			.then(res => {
			    this.pageLoading = false;
			    if(res.code == 200){
					/* 筛选制定日期内的数据 */
					let result = [], page;					
					if(this.queryForm.sTime != '' && this.queryForm.eTime != ''){
						for(let item of res.data){
							// 比较日期大小，若第一个值小于第二个值则返回true
							let start = Common.CompareDate(this.queryForm.sTime, item.createdAt),
								end = Common.CompareDate(item.createdAt, this.queryForm.eTime);
							// 满足条件则保留数据
							if(start && end){
								result.push(item);
							}
						}
						// 页码
                    	page = { count: result.length, pages: Math.ceil(result.length / pageSize) };
					}
					/* 筛选制定日期内的数据 */
					
			        // 设置数据
					this.setListData(result);
					// 设置页码
					this.setPage(page);
			    }
			    else this.$Message.error('获取数据失败!');
			})
			.catch(err => console.log(err))
		},
		// 获取所有列表
		getAllList(){
			this.apiGetAll().then(res => {
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
	}
}