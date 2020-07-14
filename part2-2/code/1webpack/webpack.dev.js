const webpack = require('webpack') // 引入webpack， 使用器热更新模块
const { merge } = require('webpack-merge')// 引入webpack合并模块
const common = require('./webpack.common') // 映入公共模块

module.exports = merge(common, {
  mode: 'development',
  devtool: 'cheap-eval-module-source-map',
  devServer: {
    contentBase: './public',
    port: '15001',
    open: true, // 启动服务时，自动打开浏览器
    hot: true // 开启热更新功能
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin({}) // 热更新配置
  ]
})
