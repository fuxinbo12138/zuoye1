# 简答题

### 谈一谈你如何理解js异步编程，Eventloop、消息队列都做了什么，什么是宏任务和微任务

1. js异步编程

    因为js属于单线程的语言，代码按照顺序执行，遇到阻塞则无法执行后续代码。基于这种情况下需要在特定的时刻下执行的事件就需要执行异步处理，js异步包括定时器，ajax，事件操作等

2. Eventloop、消息队列

    消息队列是一个先进先出的队列，内部储存着异步事件的回调函数。Eventloop要做的就是当前主线程内的事件执行完成之后从消息队列中拿到第一个异步回调去执行，每取一个是加作为一个循环，直到队列中的事件全部执行完成

3. 宏任务与微任务

    Eventloop调用时的执行顺序为 宏任务（同步代码）--》 所有微任务 --》 下一个宏任务 --》 所有微任务 ...循环执行，微任务总是提前与下一个消息队列中的任务执行
    常见的宏任务：同步代码、setTimeout、setInterval 等
    常见的微任务：promise、MutationObserver 等
