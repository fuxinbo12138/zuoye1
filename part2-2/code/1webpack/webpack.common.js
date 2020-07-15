/* eslint-disable no-path-concat */ // 浏览器环境下去掉node形式校验
/* eslint-disable no-undef */ // 浏览器环境下去掉node形式校验
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { VueLoaderPlugin } = require('vue-loader')

const webpack = require('webpack')
const path = require('path')

module.exports = {
  mode: 'development',
  entry: './src/main.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'js/bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/, // 解析js模块使用babel转化语法
        use: {
          options: {
            presets: ['@babel/preset-env']
          },
          loader: 'babel-loader',
        },
        exclude: [
          /node_modules/,
          /\bcore-js\b/,
          /\bwebpack\/buildin\b/,
          /\bregenerator-runtime\b/,
        ]
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
  ],
  resolve: { //配置相对路径
    extensions: ['.js', '.vue', '.json'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': path.resolve('src'),
      'common': path.resolve('src/common')
    }
  }

}
