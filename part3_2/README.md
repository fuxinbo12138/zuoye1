# 简答题

1. 请简述 Vue 首次渲染的过程。

    1. 引入vue

        + src/platforms/web/entry-runtime.js
            这个文件做的事情非常的简单，导入导出 Vue
        + src/platforms/web/runtime/index.js
            这个文件做的事也非常的简单，给 Vue 添加各种静态属性和动态方法 如：在原型上挂在了patch、$mount,
        + src/core/index.js
            初始化了全局 API，劫持了 Vue 原型 和 Vue 上的一些属性，添加了 Vue 的静态属性 version
            global-api/index.js
            initGlobalAPI 就是在给 Vue 添加一些静态方法，至于 initUse, initMixin, initExtend... 这些都是给 Vue 添加一些静态方法
            所以 src/core/index.js 主要做了两件事，劫持动态属性 和 静态属性，给 Vue 添加静态方法和静态属性
        + src/core/instance/index.js
            Vue构造函数
            initMinxi()    主要挂载了_init方法
            stateMinxi()    $set、$delete、$watch
            eventMinxi()   $on、$once、$off、emit
            lifecycleMinxi() $_update、$forceUpdate、$destroy
            renderMinxi()   $nextTick、_render

    2. 初始化结束 new Vue(options) 的时候调用了this._init方法, _init函数中调用了$mount

    3. $mount有两种形式，
        一种是有模板文件的‘entry-runtime-with-compiler.js’，首先判断有没有render，如果没有使用template，通过compiler模块编译成render，如果也没有template，就将el作为模板
        一种是runtime版‘runtime/index.js’，this.$mount()方法，这个方法首先会重新获取el，因为如果是运行时版本的话，是不会走entry-runtime-with-compiler.js这个入口中获取el，所以如果是运行时版本的话，我们会在runtime/index.js的$mount()中重新获取el。
        调用mountComponent()
    
    4. 在mountComponent()中，首先会判断render选项，如果没有render，但是传入了模板，并且当前是开发环境的话会发送警告，警告运行时版本不支持编译器。接下来会触发beforeMount这个生命周期中的钩子函数，也就是开始挂载之前。

    5.定义updateComponent()，在这个方法中，定义了_render和_update，_render的作用是生成虚拟DOM，_update的作用是将虚拟DOM转换成真实DOM，并且挂载到页面上来。

    6. 创建Watcher对象，在创建Watcher时，传递了updateComponent这个函数，updateComponent最终在Watcher的get方法中执行，生命周期的钩子函数mounted,挂载结束，最终返回Vue实例

    7. Watcher.get() Watcher创建完成之后会调用Watcher.get()，其中调用updateComponent，调用用户传入的_render创建，最后调用_update方法，进行patch，将虚拟dom渲染到页面
    

2. 请简述 Vue 响应式原理。

    1. src\core\instance\init.js

        initState 初始化了_data、_prop、methods等

    2. src\core\instance\state.js

        如果data不存在通过observe创建一个空的响应式根对象，如果存在调用initData，判断是否与prop、methods重名，如果不重名通过observe(data, true /* asRootData */)将data对象转化成响应式

    3. src\core\observer\index.js

        observe函数负责为每一个object对象创建一个observer实例，Observer对象分别对数组和对象进行响应式处理。通过其walk方法，遍历 obj 的所有属性，为每一个属性调用 defineReactive() 方法，设置 getter/setter
        defineReactive()方法中，给每一个getter中创建dep对象，在setter中调用notify，为观察者发送指令。如果对象的值是对象或赋新值，继续调用observe。
        如果是数组的话，将可以改变原数组的数组对应方法重写，在其修改的时候调用__ob__的notify更新视图

    4. src\core\observer\dep.js
        Dep类主要是收集依赖，发送通知

        1. 在 defineReactive() 的 getter 中创建 dep 对象，并判断 Dep.target 是否有值, 调用 dep.depend()
        2. dep.depend() 内部调用 Dep.target.addDep(this)，也就是 watcher 的 addDep() 方法，它内部最调用 dep.addSub(this)，把 watcher 对象，添加到 dep.subs.push(watcher) 中，也就是把订阅者添加到 dep 的 subs 数组中，当数据变化的时候调用 watcher 对象的 update() 方法
        3. 什么时候设置的 Dep.target? 通过简单的案例调试观察。调用 mountComponent() 方法的时候，创建了渲染 watcher 对象，执行 watcher 中的 get() 方法
        4. get() 方法内部调用 pushTarget(this)，把当前 Dep.target = watcher，同时把当前watcher 入栈，因为有父子组件嵌套的时候先把父组件对应的watcher 入栈，再去处理子组件的 watcher，子组件的处理完毕后，再把父组件对应的 watcher 出栈，继续操作
        5. Dep.target 用来存放目前正在使用的watcher。全局唯一，并且一次也只能有一个 watcher被使用

    5. Watcher类
        Watcher 分为三种，Computed Watcher、用户 Watcher (侦听器)、渲染 Watcher

        渲染 wacher 创建的位置 lifecycle.js 的 mountComponent 函数中 Wacher 的构造函数初始化，处理 expOrFn （渲染 watcher 和侦听器处理不同）

        调用 this.get() ，它里面调用 pushTarget() 然后 this.getter.call(vm, vm) （对于渲染 wacher 调用 updateComponent），如果是用户 wacher 会获取属性的值（触发get操作）

        当数据更新的时候，dep 中调用 notify() 方法，notify() 中调用 wacher 的 update() 方法 update() 中调用 queueWatcher()

        queueWatcher() 是一个核心方法，去除重复操作，调用 flushSchedulerQueue() 刷新队列并执行 watcher

        flushSchedulerQueue() 中对 wacher 排序，遍历所有 wacher ，如果有 before，触发生命周期的钩子函数 beforeUpdate，执行 wacher.run()，它内部调用 this.get()，然后调用 this.cb() (渲染 wacher 的 cb 是 noop)


    总结：vue响应式原理是当一个Vue实例创建时，vue会遍历data选项的属性，用 Object.defineProperty 将它们转为getter/setter并且在内部追踪相关依赖，在属性被访问和修改时通知变化。 每个组件实例都有相应的watcher程序实例，它会在组件渲染的过程中把属性记录为依赖，之后当依赖项的setter被调用时，会通知watcher重新计算，从而致使它关联的组件得以更新。



3. 请简述虚拟 DOM 中 Key 的作用和好处。
    在vue内部的diff算法中，在updateChildren的对比中，先通过
    旧开始/新开始
    旧结束/旧结束
    旧开始/新结束
    旧结束/新开始
    进行对比，如果对比都不相同，从新的节点开头获取一个，去老节点中查找相同节点，先找新开始节点的key和老节点相同的索引，如果没找到再通过sameVnode找，如果没有找到就创建一个新节点插入到最前面，如果找到了，执行 patchVnode，并且将找到的旧节点移动到最前面。如果key相同，元素不相同，也创建元素插到最前面


    好处： 综上所述，key属性可以帮助确定两个新旧元素是否是同一元素，如果是同一元素的话，可以减少dom操作提高渲染性能



4. 请简述 Vue 中模板编译的过程。

    模板编译的入口函数compileToFunctions，首先从缓存加载编译好的render函数，如果没有缓存的话就调用compile函数开始编译

    compile合并options并调用baseCompile进行编译。compile的主要作用是合并选项，真正编译模板的是baseCompile

    baseCompile，模板编译核心。parse方法将template转化成AST tree（抽象语法树），optimize方法标记AST tree中的静态sub trees，检测到静态子树，设置为静态，不需要再次重新渲染成节点，patch的时候会跳过静态子树，optimize的核心是优化抽象语法树，generate方法将AST tree转化成字符串形式的代码

    编译完成之后回到compileToFunctions将字符串形式的代码转化成函数形式，render和staticRenderFns执行完成之后，会被挂在到Vue实例的options对应的属性中





