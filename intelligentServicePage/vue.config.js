

const path = require('path')
function resolve(dir) {
  return path.join(__dirname, dir)
}
const CompressionWebpackPlugin = require('compression-webpack-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

module.exports = {
  // baseUrl: process.env.NODE_ENV === 'production'? 'http://47.105.33.160:8888': '/',
  publicPath: './',

  // 输出文件目录
  outputDir: 'dist',

  assetsDir: 'static',

  filenameHashing: true,

  // eslint-loader 是否在保存的时候检查
  lintOnSave: false,

  // 是否使用包含运行时编译器的Vue核心的构建
  runtimeCompiler: false,

  // 默认情况下 babel-loader 忽略其中的所有文件 node_modules
  transpileDependencies: [],

  // 生产环境 sourceMap
  productionSourceMap: false,

  // cors 相关 https://jakearchibald.com/2017/es-modules-in-browsers/#always-cors
  // corsUseCredentials: false,
  // webpack 配置，键值对象时会合并配置，为方法时会改写配置
  // https://cli.vuejs.org/guide/webpack.html#simple-configuration
  configureWebpack: (config) => {
    // 简单/基础配置，比如引入一个新插件
    if (process.env.NODE_ENV === 'production') {
      // 为生产环境修改配置...
      return {
        plugins: [

          // 开启 Gzip 压缩
          new CompressionWebpackPlugin({
            filename: '[path].gz[query]',
            algorithm: 'gzip',
            test: new RegExp(
              '\\.(js|css)$'
            ),
            threshold: 10240,
            minRatio: 0.8
          }),

          // 使用包分析工具
          new BundleAnalyzerPlugin()
        ]
      }
    } else {
      // 为开发环境修改配置...
    }
  },

  // webpack 链接 API，用于生成和修改 webapck 配置
  // https://github.com/mozilla-neutrino/webpack-chain
  chainWebpack: (config) => {
    // 链式配置
    // 因为是多页面，所以取消 chunks，每个页面只对应一个单独的 JS / CSS
    config.optimization
      .splitChunks({
        cacheGroups: {}
      });

    // 'src/lib' 目录下为外部库文件，不参与 eslint 检测
    config.module
      .rule('eslint')
      .exclude
      .add('/Users/maybexia/Downloads/FE/community_built-in/src/lib')
      .end()

    config.module
      .rule('images')
      .test(/\.png|jpg|gif$/)
      .use('url-loader')
      .loader('url-loader')
      .options({
          limit: 5120,
        })
    //路径重命名
    config.resolve.alias
      .set("@", resolve("src"))
      .set('@img', resolve('src/assets'))

    config.module.rules.delete("svg")
    config.module
      .rule('svg-smart')
      .test(/\.svg$/)
      .include
      .add(resolve('src/icons'))
      .end()

      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })
  },

  // 配置高于chainWebpack中关于 css loader 的配置
  css: {
    // 是否开启支持 foo.module.css 样式
    modules: false,

    // 是否使用 css 分离插件 ExtractTextPlugin，采用独立样式文件载入，不采用 <style> 方式内联至 html 文件中
    extract: true,

    // 是否构建样式地图，false 将提高构建速度
    sourceMap: false,

    // css预设器配置项
    loaderOptions: {
      css: {
        // options here will be passed to css-loader
      },

      postcss: {
        // options here will be passed to postcss-loader
      }
    }
  },

  // webpack-dev-server 相关配置
  // All options for webpack-dev-server are supported
  // https://webpack.js.org/configuration/dev-server/

  devServer: {
    open: true,

    host: '0.0.0.0',

    port: 9999,

    https: false,

    hotOnly: false,
    //网络请求mock
    proxy: {
      '/acs': {
        target: 'http://47.105.33.160:8888',
        changeOrigin: true,
        // pathRewrite: {
        //     '^/acs': ''
        //   }
      }
    },

    before: app => {
    }
  },
  // 构建时开启多进程处理 babel 编译
  parallel: require('os').cpus().length > 1,

  // https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-pwa
  pwa: {},

  // 第三方插件配置
  pluginOptions: {},
  // module: {
  //   rules: [
  //     {
  //       test: /\.svg$/,
  //       use:[{
  //         loader: 'svg-sprite-loader',
  //         include: [path.resolve('src/icons')],
  //         options: {
  //           symbolId: 'icon-[name]'
  //         }
  //       }]
  //     },
  //   ]
  // }
};
