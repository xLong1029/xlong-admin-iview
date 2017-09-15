<template>
    <div class="m-case-list">
        <!--  加载判断 -->
        <Loading v-if="pageLoading"></Loading>
        <div v-else>
            <div class="case-pic-list">
                <!-- 案例列表轮播 -->
                <swiper :options="swiperOption" ref="caseList">
                    <!-- 轮播图新增按钮 -->
                    <swiper-slide>
                        <div class="u-add-btn" @click="addCase">+ 新增案例</div>
                    </swiper-slide>
                    <!-- 轮播图列表 -->
                    <swiper-slide v-for="(item, index) in caseList" :key="index" >
                        <div :class="caseIndex === index ? 'swiper-active': 'swiper-div'" @click="showThisCase(index)">
                            <img :src="item.img" @error="notFoundPic"/>
                            <span>{{ item.title }}</span>
                        </div>
                    </swiper-slide>
                </swiper>
                <!-- 操作按钮 -->
                <a class="swiper-btn-prev" @click="swiperPrev()"></a>
                <a class="swiper-btn-next" @click="swiperNext()"></a>
            </div>
            <div v-if="caseList.length > 0" class="case-cont">
                <div class="case-cont-item">
                    <span>案例标题：</span>{{ caseInfo.title }}
                </div>
                <div class="case-cont-item">
                    <span>品牌名称：</span>{{ caseInfo.brand }}
                </div>
                <!-- 操作按钮 -->
                <div class="m-operation">
                    <Button class="fr" type="primary" @click="editCase" disabled>编辑(开发中)</Button>
                    <div class="clearfix"></div>
                </div>
            </div>
        </div>
        <!-- 新增窗口-->
        <Modal v-model="showModal" width="500" @on-cancel="closeModal('paramsForm')">
            <p slot="header">
                <span v-text="paramsForm.title == '' ? '新增版块' : '编辑版块'"></span>
            </p>
            <div>
                <Form ref="paramsForm" :model="paramsForm" :rules="validate" :label-width="100">
                    <Form-item label="案例标题：" prop="title">
                        <Input v-model="paramsForm.title" placeholder="请输入案例标题"></Input>
                    </Form-item>
                    <Form-item label="案例图片：" prop="img">
                        <!-- 组件-图片上传-单图片显示 -->
                        <SingleImage :preview="true"></SingleImage>
                    </Form-item>
                    <Form-item label="对应品牌：" prop="brand">
                        <Input v-model="paramsForm.brand" placeholder="请输入案例品牌名称"></Input>
                    </Form-item>
                </Form>
            </div>
            <div slot="footer">
                <Button size="large" @click="closeModal('paramsForm')">取消</Button>
                <Button type="primary" size="large" @click="operation('paramsForm', operateType)">确定</Button>
            </div>
        </Modal>
    </div>
</template>

<script>
    // 组件
    import Loading from 'components/Common/Loading'
    import SingleImage from 'components/UploadImage/SingleImage'
    // 通用JS
    import Common from 'common/common.js'
    // Api方法
    import Api from 'api/api.js'
    // Vuex
    import { mapGetters } from 'vuex'
    
    export default {
        components: { Loading, SingleImage },
        // 获取父级传值productId
        props: {
            // 设置默认值
            productId:{
                type: String,
                default: '',
            },
        },
        computed:{
            ...mapGetters(['getImageUrl']),
			// 获取当前swiper实例对象
			swiper(){
				return this.$refs.caseList.swiper;
			}
        },
        data() {
            return {
                // 加载页面
                pageLoading: false,
                // 轮播图配置
                swiperOption: {
					notNextTick: true,
					prevButton:'.swiper-button-prev',
					nextButton:'.swiper-button-next',
					slidesPerView: 5,
					spaceBetween: 30,
					freeMode: true
                },
                // 当前显示的案例索引
				caseIndex: 0,
				// 案例列表
                caseList: [],
                // 操作类型:1是新增, 2是编辑
                operateType: 0,
                // 是否显示弹窗
                showModal: false,
                // 案例信息
                caseInfo:{
					img: '',
					title: '',
					brand: '',
                },
                // 参数表单
				paramsForm:{
					img: '',
					title: '',
					brand: '',
                },
                // 验证规则
                validate: {
                    title: [{ required: true, message: '案例名称不能为空', trigger: 'blur'}],
                },
            }
        },
        created() {
            // 初始化图片上传
            Common.initPicStore(this);
            // 获取案例列表
			this.getCaseList(this.productId);
        },
        mounted() {
			// 输出swiper实例对象
			console.log('this is current swiper instance object', this.swiper);
	    },
        methods: {
            // 轮播上一页
			swiperPrev(){
                console.log(this.swiper);
                this.swiper.slidePrev();
			},
			// 轮播下一页
			swiperNext(){
                console.log(this.swiper);
				this.swiper.slideNext();
            },
            // 通过产品ID获取案例
            getCaseList(id){
                Api.GetCaseList(this.productId)
                .then(res => {
                    if(res.code == 200){
                        const result = res.data;
                        // 设置案例列表
                        this.caseList = res.data;
                        // 获取第一个案例内容
	    				this.showThisCase(this.caseIndex);
                    }
                    else console.log(res);
                })
                .catch(err => console.log(err));
            },
            // 显示案例内容
            showThisCase(index){
                this.caseIndex = index;
                this.caseInfo.title = this.caseList[index].title;
                this.caseInfo.brand = this.caseList[index].brand;
            },
            // 关闭弹窗
            closeModal(name){
                this.showModal = false;
                // 数据初始化（重置）
                this.$refs[name].resetFields();
            },
            // 打开弹窗
            openModel(){
                this.showModal = true;
            },
            // 编辑案例
            editCase(){                
                this.operateType = 2;
                this.paramsForm.title = this.caseList[this.caseIndex].title;
                this.paramsForm.brand = this.caseList[this.caseIndex].brand;
                this.$store.commit('SET_IMAGE_URL', this.caseList[this.caseIndex].img);
                this.openModel();
            },
            // 新增案例
            addCase(){                
                this.operateType = 1;
                this.paramsForm.title = '';
                this.paramsForm.brand = '';
                this.$store.commit('SET_IMAGE_URL', '');
                this.openModel();
            },
            // 弹窗操作
            operation(name, type){
                // 表单验证
                this.$refs[name].validate((valid)=>{
                    if(valid){
                        // 设置图片路径
                        this.paramsForm.img = this.getImageUrl;
                        Api.AddCase(this.paramsForm, this.productId)
                        .then(res => {
                            if(res.code == 200){
                                this.closeModal(name);
                                this.$Message.success('新增成功!');
                                // 重新获取案例列表
                                this.getCaseList(this.productId);
                            }
                            else console.log(res);
                        })
                        .catch(err => console.log(err));
                    }
                    else this.$Message.error('提交失败！填写有误');
                })
            },
            // 无法显示图片
            notFoundPic(event){
                Common.SetDefaultPic(event, 2);
            },
        }
    }
</script>

<style lang="less">
    .m-operation {
        button, a {
            min-width: 80px;
            margin-left: 10px;
        }
    }

    .case-pic-list{
		background: #f5f5f5;
		padding: 20px 40px;
        position: relative;
        border-radius: 4px;
    }

    .case-cont{
        margin-top: 30px;
    }
    
    .case-cont-item{
        margin-bottom:20px;
        span{
            width: 120px;
            display: inline-block;
        } 
    }
    
    .swiper-container {
        width: 100%;
        height:230px;        
        background: #f5f5f5;
    }

    .swiper-div{
    	height:100%;
    	border:2px solid #dddee1;
    }

    .swiper-active{
    	height:100%;
    	border:2px solid #86C3FD;
    }
    .swiper-slide {
        text-align: center;
        font-size: 18px;
        background: #fff;

        cursor:pointer;

        img{
	    	width:100%;
	    	height:200px;
	    	display: block;
	    }

	    span{
	    	display:block;
	    	text-align:center;
	    	font-size:12px;
	    	line-height:28px;
	    	overflow:hidden;
	    	white-space:nowrap;
	    	overflow:hidden;
	    	text-overflow:ellipsis;
        }
        
        .u-add-btn{
            height:100%;
            line-height:228px;
            font-size:14px;
            border:1px dashed #999;
        }
    }

	.swiper-btn-prev, .swiper-btn-next {
	    background-image: url('../../../../assets/images/icon-arrows.png');
	    position: absolute;
	    top: 50%;
	    width: 23px;
	    height: 37px;
	    margin-top: -22px;
	    z-index: 10;
	    cursor: pointer;
	}

	.swiper-btn-prev{
		left: 8px;
	}

	.swiper-btn-next{
		right: 8px;
		background-position: -23px 0;
	}
</style>