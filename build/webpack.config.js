const fs = require('fs')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const WebpackBar = require('webpackbar')

const {
  resolve
} = require('./utils')

const publicPath = ''

const {
  cssLoader,
  sassLoader,
  lessLoader
} = require('./loaders')

module.exports = {
  entry: resolve('src'),
  output: {
    path: resolve('dist'),
    filename: 'js/[name].[hash].js',
    publicPath,
    chunkFilename: 'js/[id].[hash].js'
  },
  module: {
    rules: [{
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
        test: '/\.css$/',
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
  optimization: {
    namedChunks: true,
    splitChunks: {
      minSize: 30000,
      cacheGroups: {
        commons: {
          chunks: 'initial', // "initial", "async", "all"
          name: 'commons',
          minChunks: 2,
          maxInitialRequests: 5,
          minSize: 0,
          priority: 0
        },
        vendor: {
          chunks: 'initial', // "initial", "async", "all"
          test: /node_modules/, // /[\\/]node_modules[\\/]vue/,
          name: 'vendor',
          priority: -10,
          enforce: true
        }
      }
    }
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        APP_TITLE: JSON.stringify(process.env.npm_package_name)
      }
    }),
    new CopyWebpackPlugin(
      fs.existsSync(resolve('static')) ? [{
        from: resolve('static'),
        to: '',
        ignore: ['.*']
      }] : []
    ),
    new HtmlWebpackPlugin({
      template: 'public/index.html',
      path: publicPath,
      filename: 'index.html',
      inject: true,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true,
        minifyJS: true,
        minifyCSS: true
      },
      chunksSortMode: 'dependency'
    }),
    new WebpackBar()
  ]
}