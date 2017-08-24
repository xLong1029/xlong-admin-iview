export default {
    /* 产品相关 */
	// 查看产品详情
	productDetails: (h, params, _this, _type) => h('Button', {
        props: {
            size: 'small',
            type: 'primary',
        },
        style: {
            marginRight: '5px',
        },
        on: {
            click: () => {
                // 跳转到产品详情页
                _this.$router.push({ name: 'ProductDetails', query: { id: params.row.id, type : _type } });
            }
        }
    }, '查看详情'),
    // 开启产品展示状态
    openPorduct: (h, params, _this) => h('Button', {
        props: {
            size: 'small',
            type: 'primary',
        },
        style: {
            minWidth: '64px'
        },
        on: {
            click: () => {
                _this.selectList.push(params.row.id);
                _this.setShowState(1);
            }
        }
    }, '开启'),
    // 关闭产品展示状态
    closePorduct: (h, params, _this) => h('Button', {
        props: {
            size: 'small',
            type: 'error',
        },
        style: {
            minWidth: '64px'
        },
        on: {
            click: () => {
                _this.selectList.push(params.row.id);
                _this.setShowState(2);
            }
        }
    }, '关闭'),

    /* 权限相关 */
    // 取消开通权限
    cancelPermiss: (h, params, _this) => h('Button', {
        props: {
            size: 'small',
            type: 'primary',
        },
        on: {
            // 点击取消订单
            click: () => {
                // 弹窗提示确认取消
                _this.$Modal.confirm({
                    // 确认按钮文本
                    okText: '确认',
                    // 渲染内容
                    render: (h) => {
                        return h('p', {}, '是否确认取消开通？');
                    },
                    // 确定
                    onOk: () => {
                        // 传递当前对象的索引
                        _this.cancelOrder(params.index, params.row.id);
                    }
                });                
            }
        }
    }, '取消开通'),
    permissDetails: (h, params, _this) => h('Button', {
        props: {
            size: 'small',
            type: 'primary',
        },
        style: {
            marginRight: '5px',
            minWidth: '64px',
        },
        on: {
            // 点击跳转到权限详情页
            click: () => {
                // 跳转到权限详情页，并传参ID
                _this.$router.push({ name: 'PermissionDetails', query: { id: params.row.id } });
            }
        }
    }, '查看详情'),
    // 查看对应产品列表
    viewProduct: (h, params, _this) => h('Button', {
        props: {
            size: 'small',
            type: 'primary',
        },
        style: {
            marginRight: '5px',
            minWidth: '64px',
        },
        on: {
            // 点击跳转到拥有产品页
            click: () => {
                _this.$router.push({ name: 'ViewProduct', query: { id: params.row.id } });
            }
        }
    }, '查看产品'),
    // 开启权限展示状态
    openPermiss: (h, params, _this) => h('Button', {
        props: {
            size: 'small',
            type: 'primary',
        },
        style: {
            minWidth: '64px'
        },
        on: {
            click: () => {
                _this.enableOrdisbale(params.row.id, 'open');
            }
        }
    }, '开启'),
    // 关闭权限展示状态
    closePermiss: (h, params, _this) => h('Button', {
        props: {
            size: 'small',
            type: 'error',
        },
        style: {
            minWidth: '64px'
        },
        on: {
            click: () => {
                _this.enableOrdisbale(params.row.id, 'close');
            }
        }
    }, '关闭'),

    /* 订单相关 */
    // 去支付
    gotoPay: (h, params, _this) => h('Button', {
        props: {
            type: 'primary',
            size: 'small',
        },
        style: {
            marginRight: '5px'
        },
        on: {
            // 点击跳转到权限详情页
            click: () => {
                // 判断支付跳转页面
                _this.goToPay(params);
            }
        }
    }, '去支付'),
    // 取消订单
    cancelOrder: (h, params, _this) => h('Button', {
        props: {
            type: 'primary',
            size: 'small',
        },
        on: {
            click: () => {
                // 弹窗提示确认取消
                _this.$Modal.confirm({
                    // 确认按钮文本
                    okText: '确认',
                    // 渲染内容
                    render: (h) => {
                        return h('p', {}, '是否确认取消订单？');
                    },
                    // 确定
                    onOk: () => {
                        // 传递当前对象的索引
                        _this.cancelOrder(params.row.id);
                    }
                });
            }
        }
    }, '取消订单'),

    /* 发票相关 */
    // 开发票
    issueInvoice: (h, params, _this) => h('Button', {
        props: {
            type: 'primary',
            size: 'small',
        },
        on: {
            // 点击弹出发票确认框
            click: () => {
                // 清空开票数组
                _this.invoiceList = [params.row.id];
                _this.issueInvoice(_this.invoiceList);
            }
        }
    }, '开具发票'),
    // 查看发票详情
    invoiceDetails: (h, params, _this) => h('Button', {
        props: {
            type: 'primary',
            size: 'small',
        },
        on: {
            // 点击弹出发票确认框
            click: () => {
                _this.showInvoice(params.index);
            }
        }
    }, '查看详情'),
}