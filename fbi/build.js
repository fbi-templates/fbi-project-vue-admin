process.env.NODE_ENV = 'production'
const webpack = require('webpack')
const env = require('./helpers/env')('build', 'prod')
const formatStats = require('./helpers/format-stats')

// Set environment
process.env.NODE_ENV = 'production'

ctx.isProd = true
ctx.env = env.name

// Set target root
ctx.options.server.root = ctx.options.server.root || 'dist'

ctx.logger.log(`Root: ${ctx.options.server.root}`)

const webpackConfig = require('./configs/webpack.prod')

function build () {
  return new Promise((resolve, reject) => {
    webpack(webpackConfig, (err, stats) => {
      if (err) {
        throw err
      }

      console.log(formatStats(stats, webpackConfig.output.path))
      resolve()
    })
  })
}

module.exports = build
