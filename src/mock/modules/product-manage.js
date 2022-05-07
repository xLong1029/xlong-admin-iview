import { handleMock, handleResponse } from "../mock-handle.js";
import Mock from "mockjs";
const Random = Mock.Random;

const sections = [
  {
    title: "vue3.0项目搭建详解",
    content: `<p>&nbsp; &nbsp; 介绍在搭建vue3.0之前，我们首先来收悉一下vue3.0相比vue2.0做了那些改进，增加了那些特性。</p>
  <p>&nbsp; &nbsp;&nbsp;vue3.0相比vue2.0改进和新特性如下：</p>
  <p>&nbsp; &nbsp; &nbsp;1.相比于vue2.0，性能有了明显的提升；（据作者透露有了30%-300%的性能提升）</p>
  <p>&nbsp; &nbsp; &nbsp;2.相比于vue2.0，打包体积明显的缩小；采用Tree-shaking support将无用模块剪辑，仅打包需要的，大大降低了打包的体积；</p>
  <p>&nbsp; &nbsp; &nbsp;3.暴露了自定义渲染api，增加了可扩展性；</p>
  <p>&nbsp; &nbsp; &nbsp;4.底层完全采用typescript重写，可以很好的支持ts；</p>
  <p>&nbsp; &nbsp; &nbsp;5.新特性：增加组合式api（ composition-api ），是我们可以以一种低侵入式的，更灵活的组合组件的逻辑；</p>
  <p>通过上面的简单介绍，能给大家对vue3.0有一个初步的认识，下面正式开始搭建vue3.0项目。</p>
  <p>vue3.0项目搭建</p>
  <p>1.安装vue-cli3.0</p>
  <p>&nbsp; &nbsp; &nbsp; &nbsp; 注意：vue3.0必须使用vue-cli3.0等以上版本</p>
  <p>在桌面启动cmd命令窗口，执行下面命令，全局安装（可以先卸载之前的vue版本 npm uninstall vue-cli -g ）&nbsp;&nbsp;</p>
  <pre><code>npm install -g @vue/cli</code></pre>
  <p>查看版本</p>
  <pre><code>vue -V</code></pre>
  <p>2.开始vue3.0的项目创建</p>
  <p>&nbsp; &nbsp; 2.1.以搭建一个项目名称为my_test的Vue前端项目为例&nbsp;</p>
  <pre><code>vue create my_test<br /></code></pre>
  <p>&nbsp;&nbsp;&nbsp;&nbsp;2.2. 根据项目提示进行相应的配置方式(以Manually select features手动配置为例)</p>
  <p><img style="display: block; margin-left: auto; margin-right: auto;" src="http://www.itcdns.cn/fileResources/fileres/get/1697" /></p>
  <p>&nbsp; &nbsp; 2.3.根据项目需要选择一些特性，比如此处我们选择需要Babel编译、使用Vue路由、Vue状态管理器、CSS预处理器、以及单元测试，暂时不考虑端到端测试(E2E Testing)） 注意：通过上下键切换，空格键选中的方式进行选择</p>
  <p><img style="display: block; margin-left: auto; margin-right: auto;" src="http://www.itcdns.cn/fileResources/fileres/get/1698" /></p>
  <p>&nbsp; &nbsp; 2.4.选择vue版本，此处选择vue 3.x</p>
  <p><img style="display: block; margin-left: auto; margin-right: auto;" src="http://www.itcdns.cn/fileResources/fileres/get/1699" /></p>
  <p>&nbsp; &nbsp; 2.5.路由采用模式，这里采用历史模式</p>
  <p><img style="display: block; margin-left: auto; margin-right: auto;" src="http://www.itcdns.cn/fileResources/fileres/get/1700" /></p>
  <p>&nbsp; &nbsp; 2.6.选择CSS预处理器语言，此处选择Sass/SCSS</p>
  <p><img style="display: block; margin-left: auto; margin-right: auto;" src="http://www.itcdns.cn/fileResources/fileres/get/1701" /></p>
  <p>&nbsp; &nbsp; 2.7.配置Eslint代码规范，此处选择Standard</p>
  <p><img style="display: block; margin-left: auto; margin-right: auto;" src="http://www.itcdns.cn/fileResources/fileres/get/1702" /></p>
  <p>&nbsp; &nbsp; 2.8.选择何时进行代码检测，此处选择在保存时进行检测</p>
  <p><img style="display: block; margin-left: auto; margin-right: auto;" src="http://www.itcdns.cn/fileResources/fileres/get/1703" /></p>
  <p>&nbsp; &nbsp; 2.9.选择单元测试解决方案，此处选择 Jest</p>
  <p><img style="display: block; margin-left: auto; margin-right: auto;" src="http://www.itcdns.cn/fileResources/fileres/get/1704" /></p>
  <p>&nbsp; &nbsp; 2.10.选择 Babel、PostCSS、ESLint等配置文件存放位置，此处选择单独保存在各自的配置文件中</p>
  <p><img style="display: block; margin-left: auto; margin-right: auto;" src="http://www.itcdns.cn/fileResources/fileres/get/1705" /></p>
  <p>&nbsp; &nbsp; 2.11.是否保存当前配置作为下次创建项目的模板,这里选择n，等待一会儿加载依赖，项目创建完成</p>
  <p><img style="display: block; margin-left: auto; margin-right: auto;" src="http://www.itcdns.cn/fileResources/fileres/get/1707" /></p>
  <p><img style="display: block; margin-left: auto; margin-right: auto;" src="http://www.itcdns.cn/fileResources/fileres/get/1706" /></p>
  <p>3.测试项目是否创建成功</p>
  <p>&nbsp; &nbsp; 3.1 进入项目，启动项目</p>
  <pre><code> $ cd my
   $ npm run serve</code></pre>
  <p>&nbsp; &nbsp; &nbsp;3.2 启动成功，打开浏览器访问，效果如下</p>
  <p><img style="display: block; margin-left: auto; margin-right: auto;" src="http://www.itcdns.cn/fileResources/fileres/get/1709" /></p>`,
  },
  {
    title: "高级设计常用的8个技巧",
    content: `<p>常常听人评价说某些音乐、某些舞蹈、某些人的长相很高级，其实设计作品也有高级和不高级之分，那什么样的作品才有高级感呢？可能每个人的看法都不同，作为一个从业近十年的设计老鸟，葱爷也有自己的见解，通过浏览和分析大量的作品，我总结了高级设计常用的8个技巧。</p>
  <h3>01.对称</h3>
  <p>很多人觉得对称构图很死板，这是一个误解，之所以会出现这种情况通常是设计师把对称用错了地方，或者是图形本身不好看，其实对称是非常经典的一种形式，用好了会很高级，比如下面这些案例都使用了对称图形或对称构图。</p>
  <p><img style="display: block; margin-left: auto; margin-right: auto;" src="https://img.sj33.cn/uploads/202010/16231M052-1.jpg" alt="高级设计常用的8个技巧" /></p>
  <p>使用对称时还需注意：</p>
  <p>1.各元素的布局要有节奏感，比如图形的排列呈方向渐变、大小渐变或重复排列等。</p>
  <p><img style="display: block; margin-left: auto; margin-right: auto;" src="https://img.sj33.cn/uploads/202010/16231IA9-7.jpg" alt="高级设计常用的8个技巧" /></p>
  <p>&nbsp;</p>
  <p>2.元素要足够丰富，太简单的对称图形难有高级感；</p>
  <p><img style="display: block; margin-left: auto; margin-right: auto;" src="https://img.sj33.cn/uploads/202010/16231J109-8.jpg" alt="高级设计常用的8个技巧" /></p>
  <p>&nbsp;</p>
  <h3>02.纯色背景</h3>
  <p>虽然近几年很流行使用渐变色，但一些大品牌和设计大师仍旧更喜欢使用纯色来做设计，特别是用纯色来做背景，因为相较渐变色而言，单色给人的感觉更高级，这或许是因为其更平衡、更稳重的原因（不同的颜色的重量也不一样）。</p>
  <p><img style="display: block; margin-left: auto; margin-right: auto;" src="https://img.sj33.cn/uploads/202010/16231I059-9.jpg" alt="高级设计常用的8个技巧" /></p>
  <p>举个例子，下图两款元素和设计都是相同的，只是背景一个为纯色，一个为渐变色，通过对比可以看出，左图感觉更高级。</p>
  <h3>03.极简</h3>
  <p>极简风格的设计容易产生高级感，这应该是能达成共识的观点，极简其实就是画面中的元素、字体、颜色、特效等要尽量少，而留白的空间要足够多。当然，极简设计远不止这么简单，否则人人都能做，优秀的极简设计产品本身或者主视觉图形一定要美观、精简、独特，排版和配色也很讲究。</p>
  <p><img style="display: block; margin-left: auto; margin-right: auto;" src="https://img.sj33.cn/uploads/202010/16231GD9-15.jpg" alt="高级设计常用的8个技巧" /></p>
  <h3>04.抽象</h3>
  <p>很多艺术作品的表现手法就很抽象，很难一眼就看明白它们在说什么，所以艺术给人的感觉很高级，设计作品也同样如此，使用抽象手法来设计图形、表现设计主题，通常会比具象的表现手法更高级，这是招贴海报和logo设计惯用的手法。</p>
  <p><img style="display: block; margin-left: auto; margin-right: auto;" src="https://img.sj33.cn/uploads/202010/16231I021-19.jpg" alt="高级设计常用的8个技巧" /></p>
  <p>由于抽象图形不好理解，所以在设计调性的把握上一定要十分准确。</p>
  <p>&nbsp;</p>
  <h3>05.使用面瘫模特</h3>
  <p>大家应该都有发现这样一个现象，很多时装秀上的模特都是喜欢板着一张脸，还有一些时尚杂志上的模特姿态会很僵硬或者很扭曲，这让人很莫名奇妙，但视觉上确实会比咧嘴大笑或者姿势很随性的模特感觉要更高级，这或者是因为不接地气的原因吧。</p>
  <p align="center"><img src="https://img.sj33.cn/uploads/202010/16231H061-24.jpg" alt="高级设计常用的8个技巧" /></p>
  <p>&nbsp;</p>
  <h3>06.重复</h3>
  <p>重复的手法也容易营造高级感？是的，最典型的代表就是奢侈品的花样。</p>
  <p>重复之所以可以产生高级感是因为，通过重复排列元素可以产生节奏感以及大量的细节，并且画面会有很强的统一性。</p>
  <p align="center"><img src="https://img.sj33.cn/uploads/202010/16231GA7-29.jpg" alt="高级设计常用的8个技巧" /></p>
  <p>&nbsp;</p>
  <h3>07.黑白灰搭配</h3>
  <p>无论每年的流行色如何变，黑白灰永远都不会过时，颜色对设计的气质有很大影响，搭配不好就容易俗，而黑白灰是一组很完美的色彩搭配，不仅不会难看，还会因为其独立于花花视界之外而显得脱俗、高级。这其实也算是一种极简设计，即把颜色删减到没有颜色。</p>
  <p align="center"><img src="https://img.sj33.cn/uploads/202010/16231G391-34.jpg" alt="高级设计常用的8个技巧" /></p>
  <p align="center">&nbsp;</p>
  <p align="center">&nbsp;</p>
  <p>并且，巧妙运用图形的轮廓以及黑色的色值，同样可以设计出丰富的层次和体积感。</p>
  <p><img style="display: block; margin-left: auto; margin-right: auto;" src="https://img.sj33.cn/uploads/202010/16231I013-38.png" alt="高级设计常用的8个技巧" /></p>
  <p>&nbsp;</p>
  <h3>08.体现民族文化</h3>
  <p>俗话说，民族的就是世界的，在设计中融入民族文化也可以提升设计的高级感，当然，不是简单地加几个现成的传统元素，而是要在设计概念中融入传统文化，并且要将这些民族元素进行现代化的处理或者再创作，否则设计不但不会有高级感，还会显得很俗气。</p>
  <p align="center"><img src="https://img.sj33.cn/uploads/202010/16231L048-40.jpg" alt="高级设计常用的8个技巧" /></p>
  <h3>09.复古风</h3>
  <p>无论是服装设计行业还是建筑、装潢设计行业，都时不时会刮一阵复古风，平面设计也同样如此，复古意味着经典，也就意味着高级，所以我们会看到，有很多走高端路线的品牌的设计喜欢使用复古风。</p>
  <p align="center"><img src="https://img.sj33.cn/uploads/202010/16231J314-44.jpg" alt="高级设计常用的8个技巧" /></p>
  <p>显然，并不是用了以上技巧就能做出高级感，也并不是没有以上这些特点的设计就不高级，设计的气质是由设计的各个要素共同决定的，所以只有我们多看、多尝试、多总结，才能找到更多做出优秀设计的方法。</p>`,
  },
];

let product = Mock.mock({
  // 2-25 个元素的数组
  "list|2-5": [
    {
      // 自增数，起始值为 1，每次增 1
      "sid|+1": 1,
      // 一个 yyyy-MM-dd hh:mm:ss 的随机时间
      createdTime: '@date("yyyy-MM-dd hh:mm:ss")',
      updateTime: null,
    },
  ],
});

product.list.forEach((e) => {
  e.id = Random.guid();

  const { title, content } =
    sections[Math.floor(Math.random() * sections.length)];
  e.title = title;
  e.content = content;
});

export default [
  {
    url: "/api/product/list",
    method: "get",
    response: (config) =>
      handleMock(config, () => {
        const { params, pageNo, pageSize } = config.query;

        const page = parseInt(pageNo);
        const size = parseInt(pageSize);
        
        let list = JSON.parse(JSON.stringify(product.list));

        // 筛选
        const filters = JSON.parse(params);
        for (let i in filters) {
          if (filters[i]) {
            list = list.filter((e) => e[i] == filters[i]);
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
    url: "/api/product/detail",
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
        data.createdTime = Mock.mock('@now("yyyy-MM-dd hh:mm:ss")');

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
];
