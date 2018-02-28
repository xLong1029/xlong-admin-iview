<template>
	<div class="g-content">
		<p class="hint">注：此页面仅做布局展示，无交互功能</p>
		<div class="chat-list-wrap">
			<!--  加载判断 -->
			<div v-if="pageLoading" class="page-load">
				<Spin>
					<Icon type="load-c" size=18 class="spin-icon-load"></Icon>
					<div>玩命加载中...</div>
				</Spin>
			</div>
			<div v-else>
				<!-- 咨询列表-布局一 -->
				<table v-if="!showChat" cellpadding="0" cellspacing="0" class="consult-list-normal">
					<tr v-for="(item, index) in consultList" :key="index" @click="showModal(index)">
						<td><img class="item-face" :src="item.face" alt="图片加载失败" @error="notFoundPic" /></td>
						<td>{{ item.userName }}</td>
						<td>{{ item.userId }}</td>
						<td class="item-content">{{ item.content }}</td>
						<td width="120">{{ item.time }}</td>
						<td width="40">
							<Badge :count="item.num"></Badge>
						</td>
					</tr>
				</table>
				<!-- 咨询列表-布局二-含聊天窗口 -->
				<div v-else>
					<!-- 咨询列表 -->
					<table cellpadding="0" cellspacing="0" class="consult-list-chat">
						<tr v-for="(item, index) in consultList" :key="index" @click="showModal(index)">
							<td width="60"><img class="item-face" :src="item.face" alt="图片加载失败" @error="notFoundPic" /></td>
							<td>
								<P class="item-name">{{ item.userName }}</P>
								<p class="item-content">{{ item.content }}</p>
							</td>
							<td width="90">
								<p>{{ item.time }}</p>
								<Badge :count="item.num"></Badge>
							</td>
						</tr>
					</table>
					<!-- 聊天窗口 -->
					<div class="modal-chat">
						<!-- 窗口标题 -->
						<h2 class="chat-title">
							{{ chatModal.userName }} ({{ chatModal.userId }})
							<Icon class="fr" type="android-close" @click.native="closeModal"></Icon>
						</h2>
						<!-- 聊天消息 -->
						<div class="chat-content">							
							<ul v-for="(item, index) in message" :key="index">
								<!-- 用户消息 -->
								<li v-if="item.tag == 1" class="msg-left">
									<img class="msg-face" :src="chatModal.face" alt="图片加载失败" @error="notFoundPic"/>
									<div class="msg-content">
										<span class="msg-time">{{ item.time }}</span>
										<div class="msg-bg">
											<div class="msg-arrow"></div>
											<p>{{ item.text }}</p>
										</div>
									</div>
								</li>
								<!-- 管理员消息 -->
								<li v-else class="msg-right">								
									<img class="msg-face" :src="admin.face" alt="图片加载失败" @error="notFoundPic"/>
									<div class="msg-content">
										<span class="msg-time">{{ item.time }}</span>
										<div class="msg-bg">
											<div class="msg-arrow"></div>
											<p>{{ item.text }}</p>
										</div>
									</div>
								</li>
							</ul>
						</div>
						<!-- 消息发送框 -->
						<div class="chat-textarea">
							<div class="fl textarea"><Input type="textarea" v-model="msgContent" placeholder="可以输入内容，点击发送试试"></Input></div>
							<Button class="fr" type="info" style="width:80px;height:52px" @click="sendMsg">发送</Button>							
						</div>
					</div>                    
				</div>
				<div class="clearfix"></div>				
				<!-- 分页 -->
				<Page
					style="margin-top:20px;"
					class-name="m-page fr"
					show-elevator show-total
					:total="page.dataCount"
					:page-size="page.pageSize"
					:current="page.pageNo"
					@on-change="changePage"
				>
				</Page>
				<div class="clearfix"></div>
			</div>
		</div>
	</div>
</template>

<script>
    // 通用JS
    import Common from 'common/common.js'
    // Json数据
	import JsonData from 'mock/data.json'
	// 页码设置
    import Page from 'mixins/page.js'

	export default {
		mixins: [ Page ],
		data() {
			return {
				// 加载页面
				pageLoading: false,
				// 是否聊天状态
				showChat: false,
				// 咨询详情
				consultInfo: {
					// 是否显示对话框
					visible: false,
					// 用户编号
					userId: '',
					// 用户名
					userName: '',
				},
				// 消息内容
				msgContent: '',
				// 管理员信息
				admin:{
					face: '',
				},
				// 聊天用户信息
				chatModal:{
					// 用户编号
					userId: '',
					// 用户名
					userName: '',
					// 用户头像
					face: '',
				},
				// 聊天消息
				message:[
					// tag为1表示用户消息，tag为2表示管理员消息
					// {
					// 	tag: 1,
					// 	time: '2016-06-25 00:00:00',
					// 	text: '这里是用户咨询内容，这里是用户咨询内容，这里是用户咨询内容，这里是用户咨询内容，这里是用户咨询内容，这里是用户咨询内容，这里是用户咨询内容，这里是用户咨询内容，这里是用户咨询内容，这里是用户咨询内容，这里是用户咨询内容，这里是用户咨询内容，这里是用户咨询内容，这里是用户咨询内容，这里是用户咨询内容，这里是用户咨询内容，这里是用户咨询内容，真的是用户咨询内容。',
					// },
					// {
					// 	tag: 2,
					// 	time: '2016-06-25 00:00:00',
					// 	text: '稍等，马上解决',
					// }
				],
				// 咨询列表
				consultList: [{
						// 用户头像
						face: '',
						// 用户名
						userName: '',
						// 用户编号
						userId: '',
						// 咨询内容
						content: '',
						// 日期时间
						time: '',
						// 消息条数
						num: 0,
					},
				],
			}
		},
		created(){
            // 设置面包屑路径
            this.$store.commit('SET_BREADCRUMB', [
                { name: '首页', path: '/Home' },
                { name: '消息列表', path: '/Examples/MessageList' }
            ]);
			// 获取本地“职位”列表
			this.consultList = JsonData.consultList;
		},
		methods: {
			// 显示对话框
			showModal(index) {
				// 更改为聊天状态
				this.showChat = true;
				// 设置用户ID
				this.chatModal.userId = this.consultList[index].userId;
				// 设置用户名
				this.chatModal.userName = this.consultList[index].userName;
				// 设置用户头像
				this.chatModal.face = this.consultList[index].face;
				// 清空消息内容
				this.message = [];
				if(this.consultList[index].num > 0){
					// 设置咨询内容
					for(let i = 0 ; i < this.consultList[index].num ; i ++){
						this.message.push({
							tag: 1,
							time: '2016-06-25 00:00:00',
							text: this.consultList[index].content
						})
					}
				}
			},
			// 关闭对话框
			closeModal(){
				// 取消聊天状态
				this.showChat = false;
			},
			// 发送消息
			sendMsg(){
				let date = new Date();
				let nowTime = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() + ' ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
				this.message.push({
					tag: 2,
					time: nowTime,
					text: this.msgContent,
				})
				// 清空对话框内容
				this.msgContent = '';
			},
			// 无法显示图片
			notFoundPic(event) {
				Common.SetDefaultPic(event, 1);
			},
		}
	}
</script>

<style lang="less" scoped>
	@import "../../../assets/less/color";
	.consult-list-normal,.consult-list-chat {
		border-top: 1px solid @td_border_color;
		tr:hover {
			background: @table_light_color;
			cursor: pointer;
		}
		td {
			text-align: center;
			vertical-align: middle;
			height: 46px;
			border-bottom: 1px solid @td_border_color;
		}
		.item-face {
			display: inline-block;
			width: 30px;
			height: 30px;
			border-radius: 15px;
			border: 1px solid #eee;
		}
	}

	.consult-list-normal{
		width:100%;
		td.item-content {
			text-align: left;
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: nowrap;
			max-width: 400px;
		}
	}

	.consult-list-chat{
		width:48%;
		float: left;
		.item-name{
			text-align: left;
		}
		.item-content {
			text-align: left;
			float: left;
			height: 20px;
			max-width:550px; 
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: nowrap;
		}
	}

	.modal-chat{
		float: right;
		width: 50%;
		border: 1px solid @td_border_color;
		border-radius:4px; 
		height: 100%;
	}

	.chat-title{
		padding: 8px 15px;
		background: @base_color;
		color: #fff;
		border-bottom: 1px solid @td_border_color;
		border-radius: 4px 4px 0 0;
		i{
			font-size: 26px;
			cursor: pointer;
		}
	}

	.chat-content{
		height: 422px;
		overflow-y: auto;
		padding: 15px;

		.msg-face{
			float: left;
			width: 40px;
			height: 40px;
			border-radius: 20px;
			border: 1px solid #eee;
			margin-top: 12px; 
		}
		.msg-time{
			color: #888;
			display: block;
		}
		.msg-bg{
			float: left;
			position: relative;
			margin-top: 5px;
			border-radius: 4px;
			padding: 10px;
		}
		.msg-arrow{
			position: absolute;
			top: 5px;
			width:0; 
			height:0; 
			border-top: 5px solid transparent;
			border-bottom: 5px solid transparent;  
		}

		.msg-left, .msg-right{
			position: relative;
			margin-bottom:40px;
			width: 100%;
		}

		.msg-left{
			float: left;
			.msg-content{
				float: left;
				width: 90%;
				margin-left: 10px;
			}			
			.msg-arrow{
				left: -5px;
				border-right: 5px solid #f5f5f5;				
			}
			.msg-bg{
				background: #f5f5f5;
				color: #495060;
			}
		}

		.msg-right{
			float: right;
			.msg-face{
				float: right;
			}
			.msg-content{
				float: right;
				width: 90%;
				margin-right: 10px;
			}
			.msg-time{
				text-align: right;
			}
			.msg-arrow{
				right: -5px;
				border-left: 5px solid @base_color;
			}
			.msg-bg{
				background: @base_color;
				color: #fff;
				float: right;
			}
		}
	}

	.chat-textarea{
		border-top: 1px solid @td_border_color;
		border-radius: 0 0 4px 4px;
		background: #f5f5f5;
		height: 85px;
		padding: 15px;
		.textarea{
			width:86%;
		}
	}

	.hint{
        color:#ed3f14;
        margin-bottom: 15px;
    }

	@media screen and (max-width: 1673px) {
        .consult-list-chat{
			.item-content {
				max-width:350px;
			}
		}
		.modal-chat{
			min-width: 400px;
		}
		.chat-textarea{
			.textarea{
				width:80%;
			}
		}
    }

	@media screen and (max-width: 1500px) {
        .consult-list-chat{
			width: 35%;
			.item-content {
				max-width: 150px;
			}
		}
		.modal-chat{
			min-width: 580px;
		}
    }
</style>