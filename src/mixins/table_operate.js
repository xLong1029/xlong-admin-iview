export default {
	data() {
		return {
			// 全选选项列表
            selectList: [],
		}
	},
	methods: {
		// 设置选项列表
		setSelectList(selection, row){
			// 清空选项列表
			this.selectList = [];
			for(let i = 0 ; i < selection.length ; i ++){
				this.selectList.push(selection[i].id);
			}
        },
        // 清空选项
        clearSelect(){
            this.selectList = [];
        },
		// 删除账户
        deleteAccount(){
            // this.apiDelete().then(res => {
            //     if(res.code == 200){
            //         this.$Message.success('删除成功!');
            //         // 更新列表
            //         this.updateList();
            //         // 清空选项列表
            //         this.clearSelect();
            //     }
            //     else this.$Message.warning(res.msg);
            // }).catch(err => console.log(err))
        },
        // 启用和禁用
        enableOrdisable(type){
            if(this.selectList.length <= 0){
                this.$Message.warning('请选择操作选项!');
                return;
            }
            // 如果需要操作的状态为启用
            if(type === 1){
                // 启用用户
                // this.apiEnable().then(res => {
                //     if(res.code == 200){
                //         this.$Message.success('启用成功!');
                //         // 更新列表
                //         this.updateList();
                //         // 清空选项列表
                //         this.clearSelect();
                //     }
                //     else this.$Message.warning(res.msg);
                // }).catch(err => console.log(err))
            }
            // 如果需要操作的状态为禁用
            else if(type === 2){                                
                // 禁用用户
                // this.apiDisable().then(res => {
                //     if(res.code == 200){
                //         this.$Message.success('禁用成功!');
                //         // 更新列表
                //         this.updateList();
                //         // 清空选项列表
                //         this.clearSelect();
                //     }
                //     else this.$Message.warning(res.msg);
                // }).catch(err => console.log(err))
            }
        },
	}
}