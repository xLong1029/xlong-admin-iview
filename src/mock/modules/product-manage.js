import { handleMock, handleResponse } from "../mock-handle.js";
import { ConvertToChinaNum, DeepClone } from "utils";
import Mock from "mockjs";
const Random = Mock.Random;

let product = Mock.mock({
  "list|2-5": [
    {
      "sid|+1": 1,
      "dataFrom|1": [1, 2],
      createTime: '@date("yyyy-MM-dd hh:mm:ss")',
      updateTime: null,
    },
  ],
});

product.list.forEach((e, index) => {
  e.id = Random.guid();
  e.productName = `测试产品${ConvertToChinaNum(index + 1)}`;
  e.productDesc = "<p>测试内容</p>"
});

let cases = Mock.mock({
  "list|10-20": [
    {
      "sid|+1": 1,
      "brand|1": [null, "美特斯邦威", "戴尔", "雅思兰黛", "兰蔻"],
      createTime: '@date("yyyy-MM-dd hh:mm:ss")',
      updateTime: null,
    },
  ],
});

cases.list.forEach((e, index) => {
  e.id = Random.guid();
  e.url = Random.url("http");
  e.img = Random.image('185x230', Random.color(), '#FFF', 'jpg', `Test-${index + 1}`)

  const parent = product.list[Math.floor(Math.random() * product.list.length)];
  e.productId = parent.id;
  e.title = `测试案例${ConvertToChinaNum(index + 1)}`;
})

export default [
  {
    url: "/api/product/list",
    method: "get",
    response: (config) =>
      handleMock(config, () => {
        const { params, pageNo, pageSize } = config.query;

        const page = parseInt(pageNo);
        const size = parseInt(pageSize);

        let list = DeepClone(product.list);

        // 筛选
        const filters = JSON.parse(params);
        for (let i in filters) {
          if (filters[i]) {
            if (i === 'productName') {
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
    url: "/api/product/info",
    method: "get",
    response: (config) =>
      handleMock(config, () => {
        const { id } = config.query;
        const getproduct = product.list.find((e) => e.id == id);

        return getproduct
          ? handleResponse(200, "success", getproduct)
          : handleResponse(404, "找不该产品");
      }),
  },
  {
    url: "/api/product/add",
    method: "post",
    response: (config) =>
      handleMock(config, () => {
        let data = { ...config.body };

        data.sid = product.list[product.list.length - 1].sid + 1;
        data.id = Random.guid();
        data.createTime = Mock.mock('@now("yyyy-MM-dd hh:mm:ss")');

        product.list.unshift(data);
        return handleResponse(200, "success", data.id);
      }),
  },
  {
    url: "/api/product/delete",
    method: "post",
    response: (config) =>
      handleMock(config, () => {
        const { ids } = config.body;
        product.list = product.list.filter((e) => !ids.includes(e.id));

        return handleResponse(200, "success");
      }),
  },
  {
    url: "/api/product/edit",
    method: "post",
    response: (config) =>
      handleMock(config, () => {
        console.log(config);
        const data = { ...config.body };

        const index = product.list.findIndex((e) => e.id == data.id);
        if (index >= 0) {
          product.list[index] = { ...config.body };
          product.list[index].updateTime = Mock.mock('@now("yyyy-MM-dd hh:mm:ss")');
          return handleResponse(200, "success");
        } else {
          return handleResponse(404, "找不该产品");
        }
      }),
  },
  {
    url: "/api/case/list",
    method: "get",
    response: (config) =>
      handleMock(config, () => {
        const { productId } = config.query;

        let list = DeepClone(cases.list);
        if (productId) {
          list = list.filter((e) => e.productId == productId);
          return handleResponse(200, "success", list);
        }
        else {
          return handleResponse(500, "缺少产品id");
        }
      }),
  },
  {
    url: "/api/case/add",
    method: "post",
    response: (config) =>
      handleMock(config, () => {
        let data = { ...config.body };

        console.log(data);

        data.sid = cases.list[cases.list.length - 1].sid + 1;
        data.id = Random.guid();
        data.createTime = Mock.mock('@now("yyyy-MM-dd hh:mm:ss")');

        cases.list.push(data);
        return handleResponse(200, "success", data.id);
      }),
  },
  {
    url: "/api/case/delete",
    method: "post",
    response: (config) =>
      handleMock(config, () => {
        const { ids } = config.body;
        console.log(ids);
        cases.list = cases.list.filter((e) => !ids.includes(e.id));

        return handleResponse(200, "success");
      }),
  },
  {
    url: "/api/case/edit",
    method: "post",
    response: (config) =>
      handleMock(config, () => {
        const data = { ...config.body };

        const index = cases.list.findIndex((e) => e.id == data.id);
        if (index >= 0) {
          cases.list[index] = { ...config.body };
          cases.list[index].updateTime = Mock.mock('@now("yyyy-MM-dd hh:mm:ss")');
          return handleResponse(200, "success");
        } else {
          return handleResponse(404, "找不该产品");
        }
      }),
  },
];
