# 简答题

## Vue 3.0 性能提升主要是通过哪几方面体现的？

    1.响应式系统升级
        vue2.x中响应式系统核心是defineProperty，初始化的时候会便利所有属性，通过defineProperty将数据转化为响应式数据，如果属性是对象的话，需要递归处理对应属性，初始化时就要将所有无论是否使用都会处理，无法监听属性删除和length变化
        vue3.0中使用Proxy对象重写了响应式系统，代理对象可以拦截属性的访问、赋值、删除等操作不需要初始化的时候遍历所有的属性，如果又嵌套，之后访问的时候才会处理嵌套属性
            可以监听动态新增树形（set）
            可以监听删除树形（deleteProperty）
            可以监听数组的索引和length属性
    2.编译优化
        通过优化编译过程和重写虚拟dom提升渲染性能
        vue2中通过编辑静态根节点，优化diff
        vue3中标记和提升了多有静态根节点，diff的时候只需要对比动态节点内容
        Fragments 片段特性，模板中不需要创建唯一根节点，可以直接放文本内容或者同级标签
        静态提升  初始化的时候会被创建一次， 再次render的时候不需要再次创建，可以重用vnode
        patch flag  执行diff的时候会检查整个block中带patch flag标记的节点静态节点都会被直接跳过，根据patch flag数值的不同，进行不同操作
        缓存事件处理函数 cacheHandlers 首次渲染的时候会生成一个返回操作的函数，再次调用render的时候会再次调用缓存中的函数
    3.通过
        移除了一些不常用的API inline-template、filter等
        通过优化源码体积和tree shaking支持减少打包体积



## Vue 3.0 所采用的 Composition Api 与 Vue 2.x使用的Options Api 有什么区别？

    vue2中methods，computed，watch，data中等等定义属性和方法，共同处理页面逻辑，我们称这种方式为Options API,
    缺点： 一个功能往往需要在不同的vue配置项中定义属性和方法，比较分散，项目小还好，清晰明了，但是项目大了后，一个methods中可能包含20多个方法，你往往分不清哪个方法对应着哪个功能

    vue3中导出了reactive, computed, watchEffect, ref, onMounted, onUnmounted...等可将相同逻辑所定义的所有api会放在一起（更加的高内聚，低耦合），这样做，即时项目很大，功能很多，我们都能快速的定位到这个功能所用到的所有API




## Proxy 相对于 Object.defineProperty 有哪些优点？

    Proxy的优势：
    可以直接监听对象而非属性
    可以直接监听数组的变化
    拦截方式较多
    Proxy返回一个新对象，可以只操作新对象达到目的，而Object.defineProperty只能遍历对象属性直接修改
    Proxy作为新标准将受到浏览器厂商重点持续的性能优化

    Object.defineProperty的优势如下:
    兼容性好,支持IE9


## Vue 3.0 在编译方面有哪些优化？

    通过优化编译过程和重写虚拟dom提升渲染性能
    vue2中通过编辑静态根节点，优化diff
    vue3中标记和提升了多有静态根节点，diff的时候只需要对比动态节点内容
    Fragments 片段特性，模板中不需要创建唯一根节点，可以直接放文本内容或者同级标签
    静态提升  初始化的时候会被创建一次， 再次render的时候不需要再次创建，可以重用vnode
    patch flag  执行diff的时候会检查整个block中带patch flag标记的节点静态节点都会被直接跳过，根据patch flag数值的不同，进行不同操作
    缓存事件处理函数 cacheHandlers 首次渲染的时候会生成一个返回操作的函数，再次调用render的时候会再次调用缓存中的函数

## Vue.js 3.0 响应式系统的实现原理？

    Vue3 使用 Proxy 对象重写响应式系统，这个系统主要有以下几个函数来组合完成的：
    1、reactive:
        接收一个参数，判断这参数是否是对象。不是对象则直接返回这个参数，不做响应式处理
        创建拦截器对象 handler, 设置 get/set/deleteProperty
        get
        收集依赖（track）
        返回当前 key 的值。
        如果当前 key 的值是对象，则为当前 key 的对象创建拦截器 handler, 设置 get/set/deleteProperty
        如果当前的 key 的值不是对象，则返回当前 key 的值
        set
        设置的新值和老值不相等时，更新为新值，并触发更新（trigger）
        deleteProperty
        当前对象有这个 key 的时候，删除这个 key 并触发更新（trigger）
        返回 Proxy 对象
    2、effect: 接收一个函数作为参数。作用是：访问响应式对象属性时去收集依赖
    3、track:
        接收两个参数：target 和 key
        如果没有 activeEffect，则说明没有创建 effect 依赖
        如果有 activeEffect，则去判断 WeakMap 集合中是否有 target 属性，
        WeakMap 集合中没有 target 属性，则 set(target, (depsMap = new Map()))
        WeakMap 集合中有 target 属性，则判断 target 属性的 map 值的 depsMap 中是否有 key 属性
        depsMap 中没有 key 属性，则 set(key, (dep = new Set()))
        depsMap 中有 key 属性，则添加这个 activeEffect
    4、trigger:
        判断 WeakMap 中是否有 target 属性
        WeakMap 中没有 target 属性，则没有 target 相应的依赖
        WeakMap 中有 target 属性，则判断 target 属性的 map 值中是否有 key 属性，有的话循环触发收集的 effect()