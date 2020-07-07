const {src, dest, parallel, series, watch} = require('gulp')

const del = require('del')
const bs = require('browser-sync')

const sass = require('gulp-sass')
const babel = require('gulp-babel')
const swig = require('gulp-swig')
const imagemin = require('gulp-imagemin')
const useref = require('gulp-useref')

const data = {
    menus: [
      {
        name: 'Home',
        icon: 'aperture',
        link: 'index.html'
      },
      {
        name: 'Features',
        link: 'features.html'
      },
      {
        name: 'About',
        link: 'about.html'
      },
      {
        name: 'Contact',
        link: '#',
        children: [
          {
            name: 'Twitter',
            link: 'https://twitter.com/w_zce'
          },
          {
            name: 'About',
            link: 'https://weibo.com/zceme'
          },
          {
            name: 'divider'
          },
          {
            name: 'About',
            link: 'https://github.com/zce'
          }
        ]
      }
    ],
    pkg: require('./package.json'),
    date: new Date()
  }
  
//样式文件处理 通过sass预编译处理，并输出到dist目录，以src目录为基准
const style = () => {
    return src(`src/assets/styles/*.scss`, {base: 'src'})
        .pipe(sass())
        .pipe(dest('temp'))
        .pipe(bs.reload({ stream: true }))
}

//处理js文件， 通过babel转化， 并输出到dist目录， 以src目录为基准
const script = () => {
    return src(`src/assets/scripts/*.js`, {base: 'src'})
        .pipe(babel({presets: ['@babel/preset-env']}))
        .pipe(dest('temp'))
        .pipe(bs.reload({ stream: true }))
}


//处理js文件， swig模板转化  并输出到dist目录， 以src目录为基准
const html = () => {
    return src(`src/*.html`, {base: 'src'})
        .pipe(swig({ data }))
        .pipe(dest('temp'))
        .pipe(bs.reload({ stream: true }))
}

//处理图片, 使用imagemin压缩图片， 并输入到dist目录， 以src目录为基准
const image = () => {
    return src(`src/assets/images/**/*`, {base: 'src'})
        .pipe(imagemin())
        .pipe(dest('dist'))
}

//处理图标， 并将svg文件压缩， 输出到dist目录， 以src目录为基准
const icon = () => {
    return src('src/assets/fonts/**', { base: 'src' })
      .pipe(imagemin())
      .pipe(dest('dist'))
  }

//处理public下的静态文件 直接输出， 以public作为基准
const extra = () => {
    return src('public/**', { base: 'public' })
      .pipe(dest('dist'))
  }


//清空文件夹
const clean = () => {
    return del(['dist', 'temp'])
  }


//开启sever ，并执行热更新
const serve = () => {
    //css热更新
    watch('src/assets/styles/*.scss', style)
    //js热更新
    watch('src/assets/scripts/*.js', script)
    //html热更新
    watch('src/*.html', html)

    //图片字体静态文件热更新
    watch([
        'src/assets/images/**',
        'src/assets/fonts/**',
        'public/**'
    ], bs.reload)

    //开启服务
    bs.init({
        notify: false,
        port: 18080,
        server: {
            baseDir: ['temp', 'src', 'public'], //查找文件目录顺序
            routes: {
                '/node_modules': 'node_modules'
            }
        }
    })
}

//设置node_modules 依赖打包
const UR = () => {
    return src('temp/*.html', { base: 'temp' })
      .pipe(useref({ searchPath: ['temp', '.'] }))
      // html js css
      .pipe(plugins.if(/\.js$/, plugins.uglify()))
      .pipe(plugins.if(/\.css$/, plugins.cleanCss()))
      .pipe(plugins.if(/\.html$/, plugins.htmlmin({
        collapseWhitespace: true,
        minifyCSS: true,
        minifyJS: true
      })))
      .pipe(dest('dist'))
  }


const compile  = parallel(style, script, html)

const build =  series(
    clean,
    parallel(
        series(compile, UR),
        image,
        icon,
        extra
    )
)
const dev =  series(compile, serve)



module.exports = {
    clean,
    dev,
    build
}