#!/usr/bin/env node

/**
 * 脚手架原理
 * 将模板文件通过命令交互的方式允许用户灵活配置一些文件，并生成项目结构
 * 
 */

const fs = require('fs')

const path = require('path')

const inquirer = require('inquirer')

const ejs = require('ejs')

inquirer.prompt([
    {
        type: 'input',
        name: 'name',
        message: 'project Name'
    }
  ])
  .then(answers => {
    //获取模板文件目录
    const tempDir = path.join(__dirname, 'template')

    //目标文件目录
    const destDir = process.cwd()

    //将模板文件放入
    fs.readdir(tempDir, (err, files) => {
        if(err) throw err

        files.forEach(file => {
            //使用ejs替换模板文件标识
            ejs.renderFile(path.join(tempDir, file), answers, (err, result) => {
                if(err) throw err 

                //将结果写入目标文件
                fs.writeFileSync(path.join(destDir, file), result)
            })
        })
    })

  })