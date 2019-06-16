process.env.NODE_ENV = 'production'

const fs = require('fs')

const webpack = require('webpack')
const merge = require('webpack-merge')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')

const baseConfig = require('./webpack.config')

const {
  resolve
} = require('./utils')

const libName = 'kuan-wordcloud'
const distPath = resolve('dist')

// build config
const webpackConfig = merge(baseConfig, {
  entry: resolve('src/demo.js'),
  output: {
    path: distPath,
    // filename: `${libName}.js`,
    // library: libName,
    // libraryTarget: 'commonjs2'
  },
  mode: 'production',
  optimization: {
    namedChunks: true,
    minimizer: [
      new OptimizeCSSAssetsPlugin({}),
      new UglifyJsPlugin()
    ],
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
  // externals: [nodeExternals()],
  plugins: [
    new MiniCssExtractPlugin({
      filename: `${libName}.css`,
    }),
    new CopyWebpackPlugin(
      fs.existsSync(resolve('public'))
        ? [
          {
            from: resolve('public'),
            to: '',
            ignore: ['.*']
          }
        ]
        : []
    ),
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: 'public/index.html',
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
  ]
})

// 开始编译
webpack(webpackConfig, (err, stats) => {
  const message = `${stats.toString({ colors: true })} \n`
  if (err || stats.hasErrors()) {
    console.log(err || message)
    if (onFail) {
      onFail({
        err,
        stats
      });
    }
    process.exit(1);
  }
  console.log(message)
});