import { handleResponse } from "./../mock-handle.js";

const expressCompanys = [
    {
        "id": 1,
        "name": "顺丰速运"
    },
    {
        "id": 2,
        "name": "EMS邮政特快"
    },
    {
        "id": 3,
        "name": "申通快递"
    },
    {
        "id": 4,
        "name": "圆通快递"
    },
    {
        "id": 5,
        "name": "中通快递"
    },
    {
        "id": 6,
        "name": "韵达快递"
    },
    {
        "id": 7,
        "name": "百世快递"
    },
    {
        "id": 8,
        "name": "中国邮政"
    },
    {
        "id": 9,
        "name": "天天快递"
    },
    {
        "id": 10,
        "name": "宅急送"
    },
    {
        "id": 11,
        "name": "德邦快递"
    }
];

const companyNames = [
    {
        "id": 1,
        "name": "xLong设计工作室"
    },
    {
        "id": 2,
        "name": "华蓝集团"
    },
    {
        "id": 3,
        "name": "百度网络有限公司"
    },
    {
        "id": 4,
        "name": "上海建筑设计有限公司"
    },
    {
        "id": 5,
        "name": "设计通有限责任公司"
    },
    {
        "id": 6,
        "name": "爱美达设计公司"
    },
    {
        "id": 7,
        "name": "康众畅想信息科技有限公司"
    },
    {
        "id": 8,
        "name": "华建信息科技有限公司"
    },
    {
        "id": 9,
        "name": "杭州雁行信息科技有限公司"
    },
    {
        "id": 10,
        "name": "南宁云海风网络科技有限公司"
    },
    {
        "id": 11,
        "name": "南宁风生水传媒有限公司"
    }
]

const articleTags = [
    {
        "id": 1,
        "name": "设计"
    },
    {
        "id": 2,
        "name": "IT技术"
    },
    {
        "id": 3,
        "name": "故事"
    },
    {
        "id": 4,
        "name": "星座"
    },
    {
        "id": 5,
        "name": "其他"
    },
    {
        "id": 6,
        "name": "科学"
    }
]

const consultList = [
    {
        "face": "https://o5wwk8baw.qnssl.com/a42bdcc1178e62b4694c830f028db5c0/avatar",
        "userName": "张三",
        "userId": "10001",
        "content": "为啥一定要 nuxt.js 呢，隐藏 modal 的 footer 有个属性",
        "time": "2016-06-25",
        "num": 1
    },
    {
        "face": "https://o5wwk8baw.qnssl.com/bc7521e033abdd1e92222d733590f104/avatar",
        "userName": "张三",
        "userId": "10002",
        "content": "哪位大神有nuxt.js+iview的demo，搞了N久没搞定，各种问题",
        "time": "2016-06-25",
        "num": 0
    },
    {
        "face": "https://o5wwk8baw.qnssl.com/7eb99afb9d5f317c912f08b5212fd69a/avatar",
        "userName": "李四",
        "userId": "10003",
        "content": "用modal对话框自定义内容组件,出现这个报错,并没有自定义Type属性,是不是vue版本导致的哈.貌似Vue后来的版本只能单向数据流",
        "time": "2016-06-25",
        "num": 3
    },
    {
        "face": "https://avatars1.githubusercontent.com/acmeid?v=3&s=30",
        "userName": "赵五",
        "userId": "10004",
        "content": "iview select控件怎么设置选中？除了数据绑定的方法，设置selected属性为啥不可以",
        "time": "2016-06-25",
        "num": 0
    }, {
        "face": "https://avatars0.githubusercontent.com/MarvinWilliam?v=3&s=30",
        "userName": "大六子",
        "userId": "10005",
        "content": "iview官网是用iview写的吗",
        "time": "2016-06-25",
        "num": 0
    },
    {
        "face": "https://avatars1.githubusercontent.com/lovesmilesha?v=3&s=30",
        "userName": "小六子",
        "userId": "10006",
        "content": "有人知道怎么调整Table的行高吗？不render的情况下",
        "time": "2016-06-25",
        "num": 2
    },
    {
        "face": "https://avatars1.githubusercontent.com/airclear?v=4&s=30",
        "userName": "小五子",
        "userId": "10007",
        "content": "请问上传图片Upload 里带参数怎么传 它是有一个data的 但不知道怎么写进去",
        "time": "2016-06-25",
        "num": 1
    },
    {
        "face": "https://avatars0.githubusercontent.com/maxid?v=3&s=30",
        "userName": "小凳子",
        "userId": "10008",
        "content": "modal底部的按钮有什么办法可以去掉吗？",
        "time": "2016-06-25",
        "num": 0
    },
    {
        "face": "https://avatars2.githubusercontent.com/jiayeZhu?v=3&s=30",
        "userName": "小桌子",
        "userId": "10009",
        "content": "请问为什么表单验证的时候如果有时间，并且打开页面动态加载了时间，表单验证就会报Uncaught TypeError: t.getTime is not a function错误 是什么问题啊？？？急急急",
        "time": "2016-06-25",
        "num": 3
    },
    {
        "face": "https://avatars1.githubusercontent.com/byends?v=3&s=30",
        "userName": "小四子",
        "userId": "10010",
        "content": "ivew 表格怎么实行表格列的最小宽度设置",
        "time": "2016-06-25",
        "num": 0
    }, {
        "face": "https://avatars0.githubusercontent.com/seekwe?v=3&s=30",
        "userName": "小三子",
        "userId": "10011",
        "content": "为什么我的ivew官网打开这么多久,没有《vue实战》书籍出售的提示,今天重启了机器,打开了就有了,签名的都没有了,纪念的页没有了",
        "time": "2016-06-25",
        "num": 0
    },
    {
        "face": "https://avatars1.githubusercontent.com/u/5109966?v=4&s=30",
        "userName": "小二",
        "userId": "10012",
        "content": "请问在table的render函数中怎么对checkbox实现单选功能呢？",
        "time": "2016-06-25",
        "num": 2
    }
]

export default [
  {
    url: "/api/map/util-list",
    method: "get",
    response: () => handleResponse(200, "success", utilList)
  },
];
