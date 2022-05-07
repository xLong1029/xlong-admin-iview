import { SetDefaultPic } from 'utils'

export default {
    // 通用设置
    common: (h, params, _this, funName, btnName, btnType, marginR) => h('Button', {
        props: {
            type: btnType,
            size: 'small'
        },
        style: {
            minWidth: '64px',
            marginRight: marginR,
        },
        on: {
            // 点击跳转到详情页
            click: () => {
                _this[funName](params);
            }
        }
    }, btnName),
    // 查看详情
    gotoDetail: (h, params, _this , btnName, routeName, marginR) => h('Button', {
        props: {
            type: 'primary',
            size: 'small'
        },
        style: {
            minWidth: '64px',
            marginRight: marginR,
        },
        on: {
            click: () => {
                // 跳转到指定页面,传值列表ID
                _this.$router.push({ name : routeName, query : { id : params.row.id } });
            }
        }
    }, btnName),
    // 跳转页面
    gotoPage: (h, params, _this , btnName, routeName, marginR) => h('Button', {
        props: {
            type: 'primary',
            size: 'small'
        },
        style: {
            minWidth: '64px',
            marginRight: marginR,
        },
        on: {
            click: () => {
                // 跳转到指定页面,传值列表ID
                _this.$router.push({ name : routeName });
            }
        }
    }, btnName),
    // 弹窗
    popUp: (h, params, _this , btnName, marginR) => h('Button', {
        props: {
            type: 'primary',
            size: 'small'
        },
        style: {
            minWidth: '64px',
            marginRight: marginR,
        },
        on: {
            click: () => {
                // 打开弹窗操作
                _this.openModel(params.row);
            }
        }
    }, btnName),
	// 图片显示
	showImage: (h, params, _this) => h('img', {
        attrs: {
            src: params.row.imgUrl,
        },
        style:{
            width: 'auto',
            maxHeight: '120px',
            maxWidth: '90%',
            margin: '15px',
            borderRadius: '4px',
            border: '1px solid #e4e5e7',
        },
        on: {
            error: (event) => {
                SetDefaultPic(event, 2);
            }
        }
    }),
}
