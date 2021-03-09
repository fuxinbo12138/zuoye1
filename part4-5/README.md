# 简答题

1. 通过该项目，请简要说明 typescript 比 javascript 的优势在哪

    （1）、便于开发人员做注释。

    （2）、能帮助开发人员检测出错误并修改。

    （3）、TypeScript工具使重构更变的容易、快捷。

    （6）、类型安全功能能在编码期间检测错误，这为开发人员创建了一个更高效的编码和调试过程。

2. 请简述一下支付流程

    用户点击提交订单按钮时向服务端发送一个请求，服务端返回支付地址，客户端跳转支付地址进行用户支付，用户支付完成之后，支付服务端会返回重定向到之前设置好的一个客户端地址用来告诉用户支付结果，支付服务端会向服务器发送一个post请求，用来告诉服务器支付状态

3. react-redux 的主要作用是什么，常用的 api 有哪些，什么作用？

    react-redux用来将redux创建的store映射到组件内部，简化redux操作，react-redux 提供了两个重要的函数，Provider 和 connect。

    Provider组件
        Provider其实是一个React 组件，其原理是通过React组件的context 属性实现store 的传递， 进而拿到整个应用的state。
    connect 函数
        connect函数是把 redux 的 dispatch 和 state 映射为 react 组件的 props中，将页面里的组件与应用的状态state真正连接起来。
        mapStateToProps()、mapDispatchToProps()可以建立一个从（外部的）state，store.dispatch对象到（UI 组件的）props对象的映射关系

4. redux 中的异步如何处理？
    
    使用中间件redux-thunk或redux-saga实现，
    redux-thunk 使用高阶函数实现， 判别action的类型，如果action是函数，就调用这个函数，书写较为简单
    redux-saga  使用generator函数实现，集中处理了所有的异步操作，异步接口部分一目了然，但是书写较为复杂
