/* eslint-disable no-undef */ // 浏览器环境下去掉node形式校验
const common = require('./webpack.common')
const { merge } = require('webpack-merge')
const { CleanWebpackPlugin } = require('clean-webpack-plugin') // 清除指定目录
const CopyWebpackPlugin = require('copy-webpack-plugin') // 拷贝静态文件至输出目录
const MiniCssExtractPlugin = require('mini-css-extract-plugin') //提取css文件

const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin')
const TerserWebpackPlugin = require('terser-webpack-plugin')
const path = require('path')

module.exports = merge(common, {
  mode: 'production',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'js/bundle-[contenthash:8].js'
  },
  module:{
    rules: [
      {
        test: /\.less$/, // 解析less文
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'less-loader']
      },
      {
        test: /\.css$/, // 解析css文件
        use: [MiniCssExtractPlugin.loader, 'css-loader']
      },
    ]
  },
  optimization: {
    minimizer: [
      new TerserWebpackPlugin(),
      new OptimizeCssAssetsWebpackPlugin()
    ]
  },
  plugins: [
    new MiniCssExtractPlugin(),
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin({
      patterns: [{ from: path.join(__dirname, 'public'), to: '.' }]
    })
  ]
})
