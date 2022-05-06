// vue.config.js相关配置请参考 https://github.com/vuejs/vue-cli/tree/dev/docs/config
// const webpack = require("webpack");
const production = process.env.NODE_ENV === 'production';
const path = require('path');

function resolve(dir) {
    return path.join(__dirname, dir);
}

module.exports = {
    // 部署应用程序的基本URL
    // 默认情况下，将部署在域的根目录下。如果部署在子路径上，则需要使用此选项指定子路径。例如，部署在https://www.foobar.com/my-app/，则publicPath到'/my-app/'
    publicPath: production ? '/xlong-admin-iview/' : '/',
    // 构建输出目录，在npm run build 或 yarn build 时 ，生成文件的目录名称（要和baseUrl的生产环境路径一致）
    outputDir: 'dist',
    // 用于放置生成的静态资源 (js、css、img、fonts) 的；（项目打包之后，静态资源会放在这个文件夹下）
    assetsDir: "static",
    // webpack配置，如果值是Object，则它将使用webpack-merge合并到最终配置中
    configureWebpack:{
        resolve: {
            alias: {
              // 定义别名和插件位置
              'vue$': 'vue/dist/vue.esm.js',
                '@': resolve('src'),
                'api': resolve('src/api'),
                'mock': resolve('src/mock'),
                'mixins': resolve('src/mixins'),
                'assets': resolve('src/assets'),
                'common': resolve('src/common'),
                'components': resolve('src/components'),
                'views': resolve('src/views'),
                'bmob': resolve( 'src/bmob'),
                'utils': resolve( 'src/utils'),
            }
          }
    },
    // 生产环境是否生成 sourceMap 文件，将此设置为false不输出map文件可以加速生产构建
    productionSourceMap: false,
    devServer: {
        // 端口
        port: process.env.PORT || 6060
    }
}
