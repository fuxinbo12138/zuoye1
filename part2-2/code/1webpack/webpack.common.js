/* eslint-disable no-path-concat */ // 浏览器环境下去掉node形式校验
/* eslint-disable no-undef */ // 浏览器环境下去掉node形式校验
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { VueLoaderPlugin } = require('vue-loader')
// const MiniCssExtractPlugin = require('mini-css-extract-plugin') //提取css文件
const webpack = require('webpack')

const path = require('path')

module.exports = {
  entry: './src/main.js',
  output: {
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.js$/, // 解析js模块使用babel转化语法
        use: {
          options: {
            presets: ['@babel/preset-env']
          },
          loader: 'babel-loader'
        }
      },
      {
        test: /\.vue$/, // 解析vue模块使用提取css文件
        use: {
          loader: 'vue-loader',
          options: {
            loaders: {
              less: 'vue-style-loader!css-loader!less-loader',
              css: 'vue-style-loader!css-loader'
            }
          }
        }
      },
      {
        test: /\.(js|vue)$/,
        use: {
          loader: 'eslint-loader',
          options: {
            formatter: require('eslint-friendly-formatter') // 默认的错误提示方式
          }
        },
        enforce: 'pre', // 编译前检查
        exclude: /node_modules/, // 排除目录
        include: [path.join(__dirname, '/src')] // 要检查的目录
      },
      {
        test: /\.less$/, // 解析less文
        use: ['style-loader', 'css-loader', 'less-loader']
      },
      {
        test: /\.css$/, // 解析css文件
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.(png|jpg|jpeg|gif)$/, // 解析图片文， 最大20k可以转化为base 64位，大于20k使用file-loader转化
        use: {
          options: {
            limit: 20 * 1024,
            esModule: false
          },
          loader: 'file-loader'
        }
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({ // 设置默认值
      BASE_URL: JSON.stringify('')
    }),
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      title: 'Hellow World',
      filename: 'index.html',
      template: './public/index.html'
    })
  ]
}
