const fs = require('fs')
const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const postcssSafeParser = require('postcss-safe-parser')
const webpackBaseConfig = require('./webpack.base')
const postcssConfig = require('./postcss.config')
const opts = require('../helpers/options')()
const noop = function () {}
const root = process.cwd()
const staticPath = path.join(root, opts.paths.public)
const needCopy = fs.existsSync(staticPath)
const assetsPath = opts.paths.assets || 'assets'

const config = {
  mode: 'production',
  entry: {
    app: path.join(root, opts.paths.main || 'src/main.js')
  },
  output: {
    path: path.join(root, opts.server.root, assetsPath),
    filename: 'js/[name].[contenthash:8].js',
    chunkFilename: 'js/[name].[contenthash:8].js',
    publicPath: ctx.env.data.publicPath || `/${assetsPath}/`
  },
  // For development, use cheap-module-eval-source-map. For production, use cheap-module-source-map.
  devtool: opts.sourcemap ? opts.sourcemap[1] : false,
  performance: opts.performance || {},
  optimization: {
    noEmitOnErrors: true,
    namedModules: true,
    namedChunks: true,
    // https://gist.github.com/sokra/1522d586b8e5c0f5072d7565c2bee693
    splitChunks: {
      chunks: 'async',
      minSize: 30000,
      minChunks: 1,
      maxAsyncRequests: 5,
      maxInitialRequests: 3,
      automaticNameDelimiter: '~',
      name: false,
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
          priority: -10
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true
        }
      }
    },
    minimizer: [
      new TerserPlugin(opts.scripts.uglify || {}),
      new OptimizeCSSAssetsPlugin({
        cssProcessorOptions: {
          parser: postcssSafeParser,
          discardComments: {
            removeAll: true
          }
        }
      })
    ]
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              // you can specify a publicPath here
              // by default it use publicPath in webpackOptions.output
              publicPath: '../'
            }
          },
          'css-loader',
          {
            loader: 'postcss-loader',
            options: postcssConfig(opts, root)
          }
        ]
      }
    ]
  },
  plugins: [
    // new ProgressBarPlugin(),
    // short-circuits all Vue.js warning code
    // http://vuejs.github.io/vue-loader/en/workflow/production.html
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: 'css/[name].[hash:8].css',
      chunkFilename: 'css/[name].[hash:8].css'
    }),
    // keep module.id stable when vender modules does not change
    new webpack.HashedModuleIdsPlugin(),
    // optimize module ids by occurrence count
    new webpack.optimize.OccurrenceOrderPlugin(),

    needCopy
      ? new CopyWebpackPlugin([
        {
          from: staticPath,
          to: '../',
          ignore: ['.*', 'index.ejs']
        }
      ])
      : noop
  ]
}

module.exports = merge(webpackBaseConfig, config)
