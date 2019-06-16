const webpack = require('webpack')
const WebpackBar = require('webpackbar')

const { resolve } = require('./utils')

const { cssLoader, sassLoader, lessLoader } = require('./loaders')

module.exports = {
  entry: resolve('src/demo'),
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env'],
          plugins: ['@babel/plugin-transform-runtime']
        }
      },
      {
        test: /\.(png|jpg|gif|)$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: 'images/[name].[ext]?[hash]'
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: 'fonts/[name].[ext]?[hash]'
        }
      },
      {
        test: /\.scss$/,
        use: sassLoader
      },
      {
        test: /\.less$/,
        use: lessLoader
      },
      {
        test: '/.css$/',
        use: cssLoader
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.json'],
    alias: {
      '@': resolve('src')
    }
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        APP_TITLE: JSON.stringify(process.env.npm_package_name)
      }
    }),
    new WebpackBar()
  ]
}
