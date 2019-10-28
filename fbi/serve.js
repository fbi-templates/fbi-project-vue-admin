const path = require('path')
const http = require('http')
const express = require('express')
const webpack = require('webpack')
const proxy = require('http-proxy-middleware')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const { initDb, initMiddlewares } = require('./helpers/mock')
const options = require('./helpers/options')()
ctx.env = require('./helpers/env')(options, 'serve')
process.env.NODE_ENV = 'development'

// Service start port
let startPort = ctx.env.params.port || options.server.port

// Webpack config
const webpackConfig = require('./configs/webpack.dev')
const webpackOptions = {
  publicPath: webpackConfig.output.publicPath,
  stats: 'minimal',
  logLevel: 'error', // 'silent'
  quiet: true
}
const mockEnabled = options.server.mock && options.server.mock.enable

function server (db) {
  return new Promise((resolve, reject) => {
    const app = express()

    // proxy
    const proxyOptions = options.server.proxy
    if (proxyOptions) {
      for (let p in proxyOptions) {
        app.use(
          proxy(p, {
            target: proxyOptions[p],
            changeOrigin: true,
            pathRewrite: path => {
              return path.replace(p, '/')
            }
          })
        )
      }
    }

    // parse application/x-www-form-urlencoded
    app.use(
      bodyParser.urlencoded({
        extended: false
      })
    )

    // parse application/json
    app.use(bodyParser.json())

    if (mockEnabled) {
      // log middleware
      app.use(
        morgan(':method :url :status :res[content-length] - :response-time ms', {
          skip: (req, res) => !req.originalUrl.startsWith(options.server.mock.prefix)
        })
      )
      initMiddlewares(app, db, options.server.mock.prefix)
    }

    const compiler = webpack(webpackConfig)
    const devMiddleWare = require('webpack-dev-middleware')(compiler, webpackOptions)
    app.use(devMiddleWare)
    app.use(
      require('webpack-hot-middleware')(compiler, {
        log: false
      })
    )

    // serve static files
    if (options.server.public) {
      app.use(express.static(options.server.public))
    }

    app.get('*', (req, res) => {
      const fs = devMiddleWare.fileSystem
      devMiddleWare.waitUntilValid(() => {
        res.end(fs.readFileSync(path.join(webpackConfig.output.path, '../index.html')))
      })
    })

    devMiddleWare.waitUntilValid(() => resolve(app))
  })
}

function listen (app) {
  return new Promise((resolve, reject) => {
    let port = startPort
    startPort += 1
    const server = http.createServer(app)

    server.listen(port, err => {
      server.once('close', () => {
        app.listen(port, err => {
          return err ? reject(err) : resolve(port)
        })
      })
      server.close()
    })
    server.on('error', err => {
      ctx.logger.warn(`Port ${port} is already in use, trying ${startPort}...`)

      resolve(listen(app))
    })
  })
}

async function start () {
  try {
    let db
    if (mockEnabled) {
      db = await initDb()
    }

    const app = await server(db)
    const port = await listen(app)

    ctx.logger.info(`Server runing at http://${options.server.host}:${port}`)

    if (db) {
      ctx.logger.log(
        `Mock Server runing at http://${options.server.host}:${port}${options.server.mock.prefix}`
      )
    }
  } catch (err) {
    ctx.logger.error(err)
  }
}

module.exports = start
