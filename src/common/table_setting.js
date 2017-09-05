import Common from 'common/common.js'

export default {
    // 查看详情
    details: (h, params, _this , routeName, marginR) => h('Button', {
        props: {
            type: 'primary',
            size: 'small'
        },
        style: {
            minWidth: '64px',
            marginRight: marginR,
        },
        on: {
            // 点击跳转到详情页
            click: () => {
                // 跳转到账户详情，传值用户编号
                _this.$router.push({ name : routeName, query : { id : params.row.id } });
            }
        }
    }, '查看详情'),
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
                Common.SetDefaultPic(event, 2);
            }
        }
    }),
}