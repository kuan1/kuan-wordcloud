process.env.NODE_ENV = 'production'

const webpack = require('webpack')
const merge = require('webpack-merge')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

const baseConfig = require('./webpack.config')

const {
  resolve
} = require('./utils')

// build config
const webpackConfig = merge(baseConfig, {
  mode: 'production',
  optimization: {
    minimizer: [
      new OptimizeCSSAssetsPlugin({}),
      new UglifyJsPlugin()
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: './css/[name].[hash:7].css',
      chunkFilename: './css/[id].[hash:7].css',
    }),
    new CleanWebpackPlugin([baseConfig.output.path || resolve('dist')], {
      root: process.cwd()
    })
  ]
})

// 开始编译
webpack(webpackConfig, (err, stats) => {
  const message = `${stats.toString({colors: true})} \n`
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