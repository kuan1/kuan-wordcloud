process.env.NODE_ENV = 'development'

const webpack = require('webpack')
const WebpackDevServer = require('webpack-dev-server')
const chalk = require('chalk')
const portfinder = require('portfinder')

const webpackConfig = require('./webpack.config')

const HOST = '0.0.0.0'

// dev
choosePort(process.env.PORT || 8888)
  .then(port => {
    if (port === null) {
      return
    }
    webpackConfig.mode = 'development'
    const compiler = webpack(webpackConfig)
    compiler.hooks.done.tap('webpack dev', stats => {
      const message = `${stats.toString({colors: true})} \n`
      if (stats.hasErrors()) {
        console.log(chalk.red(message))
        process.stdout.write('\x07') // make sound
        return
      }
      console.log(message)
      console.log(`- App running at: ${chalk.cyan(`http://localhost:${port}`)}`)
    })
    const serverConfig = {
      disableHostCheck: true,
      compress: true,
      clientLogLevel: 'none',
      hot: true,
      quiet: true,
      headers: {
        'access-control-allow-origin': '*',
      },
      stats: 'normal', // minimal normal
      publicPath: webpackConfig.output.publicPath,
      watchOptions: {
        ignored: /node_modules/,
      },
      historyApiFallback: true,
      overlay: false,
      host: HOST
    }
    const server = new WebpackDevServer(compiler, serverConfig);

    server.listen(port, HOST, err => {
      if (err) {
        console.log(err)
        return
      }
      console.log(chalk.cyan('Starting the development server...\n'))
    })
  })
  .catch(err => {
    console.log(err)
  })


function choosePort(DEFAULT_PORT) {
  return new Promise((resolve, reject) => {
    portfinder.basePort = DEFAULT_PORT
    portfinder.getPort((err, port) => {
      if (err) {
        reject(err)
      } else {
        resolve(port)
      }
    })
  })
}