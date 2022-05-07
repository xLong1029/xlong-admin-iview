import { handleMock, handleResponse } from "./../mock-handle.js";
import Mock from "mockjs";
import { avatars } from "./list.js";
const Random = Mock.Random;

const contents = [
    "为啥一定要 nuxt.js 呢，隐藏 modal 的 footer 有个属性",
    "哪位大神有nuxt.js+iview的demo，搞了N久没搞定，各种问题",
    "用modal对话框自定义内容组件,出现这个报错,并没有自定义Type属性,是不是vue版本导致的哈.貌似Vue后来的版本只能单向数据流",
    "iview select控件怎么设置选中？除了数据绑定的方法，设置selected属性为啥不可以",
    "iview官网是用iview写的吗",
    "有人知道怎么调整Table的行高吗？不render的情况下",
    "请问上传图片Upload 里带参数怎么传 它是有一个data的 但不知道怎么写进去",
    "modal底部的按钮有什么办法可以去掉吗？",
    "请问为什么表单验证的时候如果有时间，并且打开页面动态加载了时间，表单验证就会报Uncaught TypeError: t.getTime is not a function错误 是什么问题啊？？？急急急",
    "ivew 表格怎么实行表格列的最小宽度设置",
    "为什么我的ivew官网打开这么多久,没有《vue实战》书籍出售的提示,今天重启了机器,打开了就有了,签名的都没有了,纪念的页没有了",
    "请问在table的render函数中怎么对checkbox实现单选功能呢？"
  ];

let consult = Mock.mock({
    // 12 个元素的数组
    'list|12': [{
        // 自增数，起始值为 1，每次增 1
        'sid|+1': 1,
        // 一个 yyyy-MM-dd 的随机时间
        'time': '@date("yyyy-MM-dd)',
        'num|1': [0, 1,2],
        'face|1': avatars,
        'content|1': contents,
    }],
})

consult.list.forEach(e => {
    // 随机guid
    e.userId = Random.guid();
    // 随机人名
    e.userName = Random.cname();
});

export default [
    {
        url: "/api/consult/list",
        method: "get",
        response: (config) =>
            handleMock(config, () => {
                return handleResponse(200, "success", consult.list);
            }),
    },
];
