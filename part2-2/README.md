# 简答题

1. Webpack 的构建流程主要有哪些环节？如果可以请尽可能详尽的描述 Webpack 打包的整个过程。

    1. 初始化参数：通过配置文件和窗口运行参数得到最终配置参数，如webpack.config.js和--mode none
    2. 开始编译： 通过上一步的所有参数，生成compiler对象，加载所有插件，执行对象的run方法开始执行编译
    3. 确定入口： 根据entry字段确定打包的入口文件
    4. 编译模块： 从入口文件开始，执行配置中的loader对模块进行编译，在递归找到所有的依赖模块进行递归处理，知道所有依赖模块都进行了编译操作。 能够触发依赖的方法有 模块化（ES module commonJs cmd src url等，href可以通过html-loader设置）
    5. 完成模板编译： 经过loader编译之后得到每个模块编译之后的内容及依赖关系
    6. 输出资源： 根据入口文件及其依赖模块，生成对应的chunk，在将chunk转化成单独的文件加入到输出列表中，可以在此处修改输出内容
    7. 输出内容： 根据配置文件的output内容输出写入到对应的文件夹

2. Loader 和 Plugin 有哪些不同？请描述一下开发 Loader 和 Plugin 的思路。
    

    + 不同
        因为本身webpack只能解析js文件，想要打包其他文件就需要不同的loader去加载其他模块，loader可以让webpack拥有解析和加载除js文件之外的其他模块
        plugin可以拓展webpack功能，webpack在运行过程中会出现很多生命周期，plugin可以监听这些生命周期事件在合适的时间改变输出结果
        loader和plugin的书写位置和使用方法：
            loader放在module的rules中，根据描述中的test和loader匹配文件和使用对应的loader，loader顺序是从右向左
            plugin放在plugins数组中，可以使用多个相同的plugin
    
    + 开发loader和plugin的思路
        编写loader要遵循单一原则，每一个loader只做一种转义工作，拿到文件信息source之后将处理完成的结果，return交给后续模块处理
        plugin需要时一个class对象，必须要有一个apply方法接收compiler，通过compiler的生命周期拿到打包的上下文，对上下文进行处理



