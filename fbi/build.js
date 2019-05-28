const webpack = require('webpack')
const options = require('./helpers/options')()
const formatStats = require('./helpers/format-stats')
ctx.env = require('./helpers/env')(options, 'build', 'prod')
ctx.isProd = true
process.env.NODE_ENV = 'production'

// Set target root
options.server.root = options.server.root || 'dist'

ctx.logger.log(`Root: ${options.server.root}`)

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
