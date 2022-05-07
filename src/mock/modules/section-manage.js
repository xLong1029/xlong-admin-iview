import { handleMock, handleResponse } from "../mock-handle.js";
import { convertToChinaNum } from "utils";
import Mock from "mockjs";
const Random = Mock.Random;

let section = Mock.mock({
  "list|2-8": [
    {
      "sid|+1": 1,
      "type|1": [1, 2],
      createdTime: '@date("yyyy-MM-dd hh:mm:ss")',
      updateTime: null,
    },
  ],
});

section.list.forEach((e, index) => {
  e.id = Random.guid();
  e.title = `测试板块${convertToChinaNum(index + 1)}`;
});

let content = Mock.mock({
  "list|10-20": [
    {
      "sid|+1": 1,
      createdTime: '@date("yyyy-MM-dd hh:mm:ss")',
      updateTime: null,
    },
  ],
});

content.list.forEach((e, index) => {
  e.id = Random.guid();
  e.url = Random.url("http");
  e.img = Random.image('125x125', Random.color(), '#FFF', 'jpg', `Test-${index+1}`)

  const parent = section.list[Math.floor(Math.random() * section.list.length)];
  e.sectionId = parent.id;
  e.title = `测试内容${convertToChinaNum(index + 1)}`;
})

export default [
  {
    url: "/api/section/list",
    method: "get",
    response: (config) =>
      handleMock(config, () => {
        const { params, pageNo, pageSize } = config.query;

        const page = parseInt(pageNo);
        const size = parseInt(pageSize);

        let list = JSON.parse(JSON.stringify(section.list));

        // 筛选
        const filters = JSON.parse(params);
        for (let i in filters) {
          if (filters[i]) {
            if (i === 'title') {
              list = list.filter((e) => e[i].indexOf(filters[i]) >= 0);
            }
            else {
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
    url: "/api/section/detail",
    method: "get",
    response: (config) =>
      handleMock(config, () => {
        const { id } = config.query;
        const getsection = section.list.find((e) => e.id == id);

        return getsection
          ? handleResponse(200, "success", getsection)
          : handleResponse(404, "找不该板块");
      }),
  },
  {
    url: "/api/section/add",
    method: "post",
    response: (config) =>
      handleMock(config, () => {
        let data = { ...config.body };

        data.sid = section.list[section.list.length - 1].sid + 1;
        data.id = Random.guid();
        data.createdTime = Mock.mock('@now("yyyy-MM-dd hh:mm:ss")');

        section.list.unshift(data);
        return handleResponse(200, "success", data.id);
      }),
  },
  {
    url: "/api/section/delete",
    method: "post",
    response: (config) =>
      handleMock(config, () => {
        const { ids } = config.body;
        section.list = section.list.filter((e) => !ids.includes(e.id));

        return handleResponse(200, "success");
      }),
  },
  {
    url: "/api/section/edit",
    method: "post",
    response: (config) =>
      handleMock(config, () => {
        const data = { ...config.body };

        const index = section.list.findIndex((e) => e.id == data.id);
        if (index >= 0) {
          section.list[index] = { ...config.body };
          section.list[index].updateTime = Mock.mock('@now("yyyy-MM-dd hh:mm:ss")');
          return handleResponse(200, "success");
        } else {
          return handleResponse(404, "找不该板块");
        }
      }),
  },
  {
    url: "/api/content/list",
    method: "get",
    response: (config) =>
      handleMock(config, () => {
        const { sectionId, pageNo, pageSize } = config.query;

        const page = parseInt(pageNo);
        const size = parseInt(pageSize);

        let list = JSON.parse(JSON.stringify(content.list));
        if(sectionId){
          list = list.filter((e) => e.sectionId == sectionId);
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
    url: "/api/content/add",
    method: "post",
    response: (config) =>
      handleMock(config, () => {
        let data = { ...config.body };

        data.sid = content.list[content.list.length - 1].sid + 1;
        data.id = Random.guid();
        data.createdTime = Mock.mock('@now("yyyy-MM-dd hh:mm:ss")');

        content.list.unshift(data);
        return handleResponse(200, "success", data.id);
      }),
  },
  {
    url: "/api/content/delete",
    method: "post",
    response: (config) =>
      handleMock(config, () => {
        const { ids } = config.body;
        content.list = content.list.filter((e) => !ids.includes(e.id));

        return handleResponse(200, "success");
      }),
  },
  {
    url: "/api/content/edit",
    method: "post",
    response: (config) =>
      handleMock(config, () => {
        const data = { ...config.body };

        const index = content.list.findIndex((e) => e.id == data.id);
        if (index >= 0) {
          content.list[index] = { ...config.body };
          content.list[index].updateTime = Mock.mock('@now("yyyy-MM-dd hh:mm:ss")');
          return handleResponse(200, "success");
        } else {
          return handleResponse(404, "找不到该板块下的内容");
        }
      }),
  },
];
