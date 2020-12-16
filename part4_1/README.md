1. 请简述 React 16 版本中初始渲染的流程
    
    要将 React 元素渲染到页面中，分为两个阶段，render 阶段和 commit 阶段。

    render 阶段负责创建 Fiber 数据结构并为 Fiber 节点打标记，标记当前 Fiber 节点要进行的 DOM 操作。

    commit 阶段负责根据 Fiber 节点标记 ( effectTag（插入并更新、更新、删除等 ） ) 进行相应的 DOM 操作。



2. 为什么 React 16 版本中 render 阶段放弃了使用递归

    在 React 15 的版本中，采用了循环加递归的方式进行了 virtualDOM 的比对，由于递归使用 JavaScript 自身的执行栈，一旦开始就无法停止，直到任务执行完成。如果 VirtualDOM 树的层级比较深，virtualDOM 的比对就会长期占用 JavaScript 主线程，由于 JavaScript 又是单线程的无法同时执行其他任务，所以在比对的过程中无法响应用户操作，无法即时执行元素动画，造成了页面卡顿的现象。

    在 React 16 的版本中，放弃了 JavaScript 递归的方式进行 virtualDOM 的比对，而是采用循环模拟递归。而且比对的过程是利用浏览器的空闲时间完成的，不会长期占用主线程，这就解决了 virtualDOM 比对造成页面卡顿的问题。


3. 请简述 React 16 版本中 commit 阶段的三个子阶段分别做了什么事情

   - before mutation 阶段（执行 DOM 操作前）
      -  通过while循环判断nextEffect不为空，调用commitBeforeMutationEffectOnFiber函数，判断如果为类组件调用 getSnapshotBeforeUpdate 生命周期函数
   - mutation 阶段（执行 DOM 操作）
     -  根据不同的 effectTag 进行插入，插入并更新，更新，删除等操作
   - layout 阶段（执行 DOM 操作后）
     -  如果在类组件中调用了生命周期函数 或者函数组件中调用 useEffect，调用commitLayoutEffectOnFiber去调用类组件和函数组件中的生命周期函数



4. 请简述 workInProgress Fiber 树存在的意义是什么

    在 React 中，DOM 的更新采用了双缓存技术，双缓存技术致力于更快速的 DOM 更新。
    双缓存技术可以利用内存快速计算绘制页面，最后再将绘制的结果一次性更新dom元素，达到快速更新dom元素的目的。

    在 React 中最多会同时存在两棵 Fiber 树，当前在屏幕中显示的内容对应的 Fiber 树叫做 current Fiber 树，当发生更新时，React 会在内存中重新构建一颗新的 Fiber 树，这颗正在构建的 Fiber 树叫做 workInProgress Fiber 树。在双缓存技术中，workInProgress Fiber 树就是即将要显示在页面中的 Fiber 树，当这颗 Fiber 树构建完成后，React 会使用它直接替换 current Fiber 树达到快速更新 DOM 的目的，因为 workInProgress Fiber 树是在内存中构建的所以构建它的速度是非常快的。

    一旦 workInProgress Fiber 树在屏幕上呈现，它就会变成 current Fiber 树。

    在 current Fiber 节点对象中有一个 alternate 属性指向对应的 workInProgress Fiber 节点对象，在 workInProgress Fiber 节点中有一个 alternate 属性也指向对应的 current Fiber 节点对象。
