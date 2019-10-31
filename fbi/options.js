const path = require('path')

// 浏览器兼容配置 https://github.com/browserslist/browserslist#best-practices
const targets = {
  browserslist: ['last 2 versions', 'ie >= 10']
}

function resolve (dir) {
  return path.join(process.cwd(), dir)
}

module.exports = {
  // 常用路径设置
  paths: {
    // 主入口文件路径
    main: 'src/main.js',
    // 页面入口文件及其他需要拷贝到dist目录的文件放在这个目录
    public: 'public',
    // 静态资源构建目标目录
    assets: 'assets'
  },

  // 开发服务器配置
  server: {
    // 构建目标目录
    root: 'dist',
    host: 'localhost',
    port: 8888,
    proxy: {
      '/proxy': 'http://api.yourdomain.com'
    },
    // API数据模拟
    mock: {
      // 是否开启
      enable: true,
      // API 前缀，开发时应与 data.dev.APIROOT 的值相同
      prefix: '/mock-api'
    },
    public: resolve('public')
  },

  // 构建时数据 (js和public/index.ejs文件里可用)
  data: {
    // 所有环境
    all: {
      // 网站title
      SITE_TITLE: 'Admin System',
      SITE_LOGO: 'https://vuejs.org/images/logo.png',
      ROUTE_BASE: '/'
    },
    // 开发环境 `fbi s`
    dev: {
      // API前缀
      APIROOT: '/mock-api'
    },
    // 测试环境 `fbi b -t`
    test: {
      APIROOT: 'https://test.yourdomain.com'
    },
    // 生产环境 `fbi b`
    prod: {
      APIROOT: 'https://prod.yourdomain.com',
      publicPath: '/assets/'
    }
  },

  // 资源别名 for webpack
  // 例如: import '../../components/x' 可使用 import '@/components/x'
  alias: {
    '@': resolve('src'),
    vue: resolve('node_modules/vue/dist/vue.esm.js'),
    vuex: resolve('node_modules/vuex/dist/vuex.esm.js'),
    'vue-router': resolve('node_modules/vue-router/dist/vue-router.esm.js'),
    'vuex-router-sync': resolve('node_modules/vuex-router-sync/index.js')
  },

  // https://webpack.js.org/configuration/externals/#externals
  externals: {},

  // dll plugin配置
  dllEntries: false,

  // 指定Webpack不解析的模块（用于提高构建速度）
  // Docs: https://webpack.js.org/configuration/module/#module-noparse
  noParse: content => {
    return false
  },

  // 若要使用VSCode断点调试功能，请务必选择使用 cheap-module-source-map 或 source-map
  // [开发环境, 生产环境]
  sourcemap: ['cheap-module-source-map', ''],

  // 静态检查
  lint: {
    scripts: {
      enable: true,
      options: {
        // http://eslint.org/docs/user-guide/configuring
        rules: {
          // rules docs: https://standardjs.com/rules.html
        }
        // fix: true,
        // emitError: true,
        // emitWarning: true
      },
      exclude: [/node_modules/]
    }
  },

  // babel-loader options
  // https://babeljs.io/docs/usage/api/#options
  // https://github.com/babel/babel-loader#options
  scripts: {
    exclude: file => /node_modules/.test(file) && !/\.vue\.js/.test(file),
    babel: {
      presets: [
        [
          // https://github.com/babel/babel/tree/master/packages/babel-preset-env#options
          '@babel/preset-env',
          {
            targets: targets.browserslist,
            corejs: '2',
            useBuiltIns: 'entry'
            // debug: true
          }
        ]
      ]
    },
    //  https://github.com/webpack-contrib/terser-webpack-plugin#options
    uglify: {
      cache: true,
      parallel: true,
      sourceMap: true,
      terserOptions: {
        ecma: 5,
        parse: {},
        compress: {
          drop_console: true
        }
      }
    },
    workersDist: 'js/workers/'
  },

  // https://github.com/postcss/postcss-loader#options
  styles: {
    // plugins: {
    //   plugin-name: plugin-options
    // }
    plugins: {
      // https://github.com/postcss/postcss-reporter#options
      'postcss-reporter': {
        clearReportedMessages: true,
        clearAllMessages: true
      },

      // https://github.com/postcss/autoprefixer#options
      // https://github.com/ai/browserslist#queries
      autoprefixer: { overrideBrowserslist: targets.browserslist },
      // https://github.com/songsiqi/px2rem-postcss
      'postcss-px2rem': {
        remUnit: 100
      }
    }
  },

  // https://webpack.docschina.org/configuration/performance/
  performance: {
    hints: 'warning',
    maxEntrypointSize: 1000 * 1024, // KiB
    maxAssetSize: 200 * 1024 // KiB
  }
}
