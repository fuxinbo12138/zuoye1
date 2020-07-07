const sass = require('sass')

const loadGruntTasks = require('load-grunt-tasks')


module.exports = grunt => {
    grunt.initConfig({
        sass: {//转化sass语法，并放置到dist中
            options: {
                implementation: sass
            },
            main: {
                files: [
                  // includes files within path and its sub-directories
                  {
                      expand: true,
                      cwd: 'src',
                      src: ['assets/styles/*.scss'], 
                      dest: 'dist/'
                  }, 
                ]
            }
        },
        babel: { //转化js语法，并放置到dist中
            options: {
              presets: ['@babel/preset-env']
            },
            main: {
              files: [
                // includes files within path and its sub-directories
                {
                    expand: true,
                    cwd: 'src',
                    src: ['assets/scripts/*.js'], 
                    dest: 'dist/'
                }, 
              ]
            }
          },

          copy: {
            main: {
                files: [
                    // includes files within path and its sub-directories
                    {
                        expand: true,
                        cwd: 'src',
                        src: ['assets/images/**'], 
                        dest: 'dist/'
                    }, {
                        expand: true,
                        cwd: 'src',
                        src: ['assets/fonts/**'], 
                        dest: 'dist/'
                    }, {
                      expand: true,
                      cwd: 'temp',
                      src: ['**/*'], 
                      dest: 'dist/'
                  }
                  ],
            },
          },

        web_swig: {//转化模板语法，并放置到dist中
            options: {
              swigOptions:{
                cache: false
              },
              getData: function(tpl){
                  return {
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
                  };
              }
            },
            your_target: {
              // Target-specific file lists and/or options go here.
                files: {
                    'temp/about.html': 'src/about.html',
                    'temp/index.html': 'src/index.html'
                }
            },
          },
          useref: {//提取node——modules下的文件
            // specify which files contain the build blocks
            html: 'temp/*.html',
            // explicitly specify the temp directory you are working in
            // this is the the base of your links ( "/" )
            temp: '/'
        }
          
    })

    loadGruntTasks(grunt)

    grunt.registerTask('default', ['sass', 'babel', 'web_swig', 'useref', 'copy'])
}