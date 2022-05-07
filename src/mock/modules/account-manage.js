import { handleMock, handleResponse } from "./../mock-handle.js";
import { professionList, jobList, companyNames, cityList,avatars } from "./list.js";
import { CompareDate } from "utils";
import Mock from "mockjs";
const Random = Mock.Random;

const phonePrefixs = new Array(
  "139",
  "138",
  "137",
  "136",
  "135",
  "134",
  "159",
  "158",
  "157",
  "150",
  "151",
  "152",
  "188",
  "187",
  "182",
  "183",
  "184",
  "178",
  "130",
  "131",
  "132",
  "156",
  "155",
  "186",
  "185",
  "176",
  "133",
  "153",
  "189",
  "180",
  "181",
  "177"
);
const workExperience = new Array(
  null,
  [{ date: "2001.3.1-至今", unitAndPost: "华蓝集团", witness: "小凳子" }],
  [
    {
      date: "2019.1.1-至今",
      unitAndPost: "自然资源信息中心",
      witness: "小六子",
    },
  ]
);

let account = Mock.mock({
  // 10-20 个元素的数组
  "list|10-20": [
    {
      // 自增数，起始值为 1，每次增 1
      "sid|+1": 1,
      // 取数组当中的一个值
      "gender|1": ["男", "女"],
      // 随机email
      email: "@email",
      "job|1": jobList.map((e) => e.name),
      "companyName|1": companyNames.map((e) => e.name),
      "avatar|1": avatars,
      "enabledState|1": [1, -1],
      birthdate: null,
      // 一个 yyyy-MM-dd hh:mm:ss 的随机时间
      createdTime: '@date("yyyy-MM-dd hh:mm:ss")',
      workTime: '@date("yyyy-MM-dd")',      
      remark: "@paragraph()",
      address: null,
      domain: null,
      city: "柳州市",
      area: null,
      province: "广西壮族自治区",
      
    },
  ],
});

account.list.forEach((e) => {
  // 随机guid
  e.id = Random.guid();
  // 随机身份证
  e.idCard = Random.id();
  // 随机人名
  e.realname = Random.cname();
  // 随机取2-4个不重复的值
  e.profession = Random.pick(
    professionList.map((e) => e.name),
    2,
    4
  );
  // 随机手机号
  e.mobile =
    phonePrefixs[Math.floor(Math.random() * phonePrefixs.length)] +
    Mock.mock(/\d{8}/);
  // 工作经验
  e.workExperience =
    workExperience[Math.floor(Math.random() * workExperience.length)];
  // 是否毕业
  e.isGraduate = false;

  const province = cityList[Math.floor(Math.random() * cityList.length)];
  e.province = province.name;
  const city =
    province.childs[Math.floor(Math.random() * province.childs.length)];
  e.city = city?.name;
  const area = city?.childs[Math.floor(Math.random() * city.childs.length)];
  e.area = area?.name;
});

export default [
  {
    url: "/api/account/list",
    method: "get",
    response: (config) =>
      handleMock(config, () => {
        const { params, pageNo, pageSize } = config.query;

        const page = parseInt(pageNo);
        const size = parseInt(pageSize);
        let list = JSON.parse(JSON.stringify(account.list));

        // 筛选
        const filters = JSON.parse(params);
        for (let i in filters) {
          if (filters[i]) {
            switch (i) {
              case "sTime":
                list = list.filter((e) =>
                  CompareDate(filters[i], e.createdTime)
                );
                break;
              case "eTime":
                list = list.filter((e) =>
                  CompareDate(e.createdTime, filters[i])
                );
                break;
              default:
                list = list.filter((e) => e[i] == filters[i]);
            }
          }
        }

        // 深克隆
        const filterList = JSON.parse(JSON.stringify(list));

        list = list.slice((page - 1) * size, page * size);

        return handleResponse(200, "success", {
          list,
          page: {
            count: filterList.length,
            page,
            size,
          },
        });
      }),
  },
  {
    url: "/api/account/info",
    method: "get",
    response: (config) =>
      handleMock(config, () => {
        const { id } = config.query;
        const user = account.list.find((e) => e.id == id);

        return user ? handleResponse(200, "success", user) : handleResponse(404, "找不该用户");
      }),
  },
  {
    url: "/api/account/add",
    method: "post",
    response: (config) =>
      handleMock(config, () => {
        let data = { ...config.body };

        const user = account.list.find(
          (e) => e.mobile == data.mobile || e.email == data.email
        );
        if (user) {
          if (user.mobile == data.mobile) {
            return handleResponse(400, "手机号码已存在");
          }
          if (user.email == data.email) {
            return handleResponse(400, "电子邮箱");
          }
        }

        data.sid = account.list[account.list.length - 1].sid + 1;
        data.id = Random.guid();
        data.createdTime = Mock.mock('@now("yyyy-MM-dd hh:mm:ss")');

        account.list.unshift(data);
        return handleResponse(200, "success", data.id);
      }),
  },
  {
    url: "/api/account/delete",
    method: "post",
    response: (config) =>
      handleMock(config, () => {
        const { ids } = config.body;
        account.list = account.list.filter((e) => !ids.includes(e.id));

        return handleResponse(200, "success");
      }),
  },
  {
    url: "/api/account/edit",
    method: "post",
    response: (config) =>
      handleMock(config, () => {
        const data = { ...config.body };

        const user = account.list.find(
          (e) =>
            (e.mobile == data.mobile || e.email == data.email) &&
            e.id != data.id
        );

        if (user) {
          if (user.mobile == data.mobile) {
            return handleResponse(400, "手机号码已存在，请修改");
          }
          if (user.email == data.email) {
            return handleResponse(400, "电子邮箱，请修改");
          }
        }

        const index = account.list.findIndex((e) => e.id == data.id);

        if (index >= 0) {
          account.list[index] = { ...config.body };
          account.list[index].updateTime = Mock.mock('@now("yyyy-MM-dd hh:mm:ss")');
          return handleResponse(200, "success");
        } else {
          return handleResponse(404, "找不该用户");
        }
      }),
  },
  {
    url: "/api/account/enable",
    method: "post",
    response: (config) =>
      handleMock(config, () => {
        const { ids } = config.body;
        const { state } = config.query;

        account.list.forEach((e) => {
          if (ids.includes(e.id)) {
            e.enabledState = state;
          }
        });

        return handleResponse(200, "success");
      }),
  },
];
