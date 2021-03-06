const fs = require('fs')
const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const AutoDllPlugin = require('autodll-webpack-plugin')
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin')
const eslintConfig = require('./eslint.config')
const opts = require('../helpers/options')()

const noop = function () {}
const root = process.cwd()
const isProd = process.env.NODE_ENV === 'production'
let templateFilepath = path.join(root, opts.paths.public || 'public', 'index.html')
if (!fs.existsSync(templateFilepath)) {
  templateFilepath = templateFilepath.replace('.html', '.ejs')
}

const devModulesPath = ctx.nodeModulesPaths[1] || path.join(root, './node_modules')

// Babel
const babelOptions = require('../helpers/babel-options')(
  Object.assign(
    {},
    {
      babelrc: false,
      cacheDirectory: true,
      plugins: ['@babel/plugin-syntax-dynamic-import', 'babel-plugin-transform-vue-jsx']
    },
    opts.scripts.babel || {}
  ),
  devModulesPath
)

// remove warning:
// DeprecationWarning: loaderUtils.parseQuery() received a non-string value which can be problematic, see https://github.com/webpack/loader-utils/issues/56
// parseQuery() will be replaced with getOptions() in the next major version of loader-utils.
// process.noDeprecation = true

const config = {
  target: 'web',
  externals: opts.externals || {},
  resolve: {
    extensions: ['*', '.js', '.vue', '.css', '.json'],
    alias: opts.alias,
    // https://github.com/benmosher/eslint-plugin-import/issues/139#issuecomment-287183200
    modules: ctx.nodeModulesPaths.concat([path.resolve(__dirname, '..', 'src')])
  },
  resolveLoader: {
    modules: ctx.nodeModulesPaths
  },
  module: {
    noParse: opts.noParse ? opts.noParse : [],
    rules: [
      {
        test: /\.vue$/,
        use: ['vue-loader']
      },
      // https://github.com/kazupon/vue-i18n-loader#custom-blocks-single-file-components
      // http://kazupon.github.io/vue-i18n/guide/sfc.html#webpack
      {
        resourceQuery: /blockType=i18n/,
        loader: '@kazupon/vue-i18n-loader'
      },
      {
        test: /\.worker\.js$/,
        use: {
          loader: 'worker-loader',
          options: {
            name: isProd
              ? `${opts.scripts.workersDist || 'js/workers/'}[name]-[hash:8].js`
              : `${opts.scripts.workersDist || 'js/workers/'}[name].js?[hash:8]`
          }
        }
      },
      // this will apply to both plain `.js` files
      // AND `<script>` blocks in `.vue` files
      {
        test: /\.js?$/,
        exclude: opts.scripts.exclude || /node_modules/,
        use: [
          {
            loader: 'cache-loader',
            options: {
              cacheDirectory: path.resolve('node_modules/.cache/cache-loader')
            }
          },
          {
            loader: 'babel-loader',
            options: babelOptions
          }
        ]
      },
      {
        test: /\.html$/,
        use: 'vue-html-loader'
      },
      {
        test: /\.svg$/,
        loader: 'svg-sprite-loader',
        options: {
          symbolId: 'icon-[name]',
          extract: false,
          runtimeCompat: true,
          esModule: false
        }
      },
      {
        test: /\.(png|jpe?g|gif)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 5000,
          name: isProd ? 'img/[name].[hash:8].[ext]' : 'img/[name].[ext]?[hash:8]'
        }
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 5000,
          name: isProd ? 'media/[name].[hash:8].[ext]' : 'media/[name].[ext]?[hash:8]'
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 5000,
          name: isProd ? 'fonts/[name].[hash:8].[ext]' : 'fonts/[name].[ext]?[hash:8]'
        }
      },
      {
        test: /\.(graphql|gql)$/,
        exclude: /node_modules/,
        loader: 'graphql-tag/loader'
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin(ctx.env.stringifyData),
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      inject: true,
      templateParameters: ctx.env.data,
      template: templateFilepath,
      filename: '../index.html',
      cache: true,
      chunksSortMode: 'none'
    }),
    Array.isArray(opts.dllEntries)
      ? new AutoDllPlugin({
        debug: true,
        inject: true,
        path: 'js',
        filename: '[hash].dll.js',
        entry: {
          vendor: opts.dllEntries
        }
      })
      : noop,
    new webpack.ProgressPlugin(),
    new FriendlyErrorsWebpackPlugin()
  ],
  cache: true,
  // Fail out on the first error
  bail: true
}

if (opts.lint.scripts.enable) {
  config.module.rules.push({
    test: /\.(vue|js)$/,
    loader: 'eslint-loader',
    enforce: 'pre',
    exclude: file => opts.lint.scripts.exclude.some(item => new RegExp(item).test(file)),
    options: Object.assign({}, eslintConfig, opts.lint.scripts.options)
  })
}

module.exports = config
