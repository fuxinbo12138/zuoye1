# 简答题

### 谈一谈你如何理解js异步编程，Eventloop、消息队列都做了什么，什么是宏任务和微任务

1. 请说出下列最终的执行结果，并解释为什么。

```
var a = []

for (var i = 0; i< 10; i++){
    a[i] = function () {
        console.log(i)
    }
}

a[6]()
```

    输出10，var的创建的变量挂载在全局作用域，循环完成后i被赋值为10，当函数执行时函数内部的i在函数作用域中未找到，在全局作用域中查找到i时i已被赋值为10

2. 请说出下列最终的执行结果，并解释为什么。

```
var tmp = 123
if(true) {
    console. log(tmp)
    let tmp
}
```

    tmp is not defined
    因为if存在let的局部作用域， 所以if条件内的console.log(tmp)打印的时下面的tmp，但是let没有变量提升，在console的时候还没有初始化，所以会报错tem is not defined

3. 结合ES6新语法，用最简单的方式找出数组中的最小值

```
var arr = [12,34,32,89,4]
```


    1. Math.min(...arr)
    2. const max = (arr) => Math.min(...arr)
       max(arr)

4. 请详细说明var,let, const三种声明变量的方式之间的具体差别。

    var 只有全局作用域和函数作用域，存在变量提升，变量可被重新赋值
    let 存在全局作用域，函数作用域，块作用域，不存在变量提升，变量可被重新赋值
    const 存在全局作用域，函数作用域，块作用域，不存在变量提升， 变量不可被重新赋值

5. 请说出下列代码最终输出的结果并解释为什么。

```
var a = 10;
var obj = {
    a:20,
    fn() {
        setTimeout(() => {
            console.log(this.a)
        })
    }
}
obj.fn()
```

    输出20
    obj.fn() 中fn中的this指向obj， setTimeout中函数使用了箭头函数，箭头函数本身的this的绑定机制就是继承自父执行上下文中的this。父环境this只想了obj，所有setTimeout中的this指向了obj，打印obj.a为20

6. 简述 Symbol类型的用途

    + 使用Symbol来作为对象属性名
    + 使用Symbol来替代常量为变量赋值
    + 使用Symbol定义类的私有属性/方法
    + 使用symbol做for of循环迭代器

7. 说说什么是浅拷贝，什么是深拷

    根据javascript内存中堆栈概念， 会将引用类型的数据存在在堆内存中，内存地址指向变量，当变量被另外一个变量引用时，两个变量指向同一个地址，修改其中任意一个变量，堆内存中的数据都会发生变化。 如果我们希望两个变量只修改自身数据，就需要在内存中开辟一个新空间储存一个一样的新数据，这个时候我们就需要进行对象的拷贝
    
    + 浅拷贝： 根据上述内容，浅拷贝就是将直接挂载在对象上的属性直接复制， 如果对象上的属性是一个基本类型，那么修改的话另一个数据不会发生变化，但是如果是引用类型，浅拷贝就是将数据的引用地址挂载到了新数据中，所以修改引用类型的数据，另一个数据还是会被修改

    + 深拷贝： 深拷贝和浅拷贝的的概念相同，但是深拷贝会将原数据中的引用数据类型也进行复制，保证将两个数据变成两个完全不同的数据，即使是引用类型数据也不会被同步修改

8. 请简述 Type Script与 JavaScript之间的关系

    typescript 是 javascript 的超集，包含了所有javascript的属性，并且对javascript进行了延申，添加了一些属性，如数据类型校验、class的一些方法，接口，泛型等。通过编译typescript可以得到对应的javascript， 并且可以做对应的版本兼容

9. 请谈谈你所认为的 Type Script优缺点。

    + 优点：    
        1. 实现了数据类型校验，开发大型项目更加友好
        2. 对javascript进行了增强 弥补了javascript语言层面上的一些缺失如接口、泛型等
        3. 对es6的支持，可以获得更好的兼容
    + 缺点： 
        1. 相比原生javascript增加了学习成本
        2. 短期项目会增加开发成本
        3. 不是所有库都能完美结合typescript， 有些需要自己去实现类型声明

10. 描述引用计数的工作原理和优缺点

    对每一个可达对象进行技术，创建一个新的引用时计数加1， 引用失效时减1， 计数为0时会对对象进行回收， 

    + 优点： 回收效率高

    + 缺点： 维护引用数值消耗资源， 对相互引用的对像无法回收

11. 描述标记整理的工作流程

    首先标记出所有的需要回收的对象，让所有存活的对象都向一端移动，然后直接清理掉端边界以外的内存。

12. 描述V8中新生代储存去垃圾回收的流程

    1. 将新生代分割为两个完全相等的空间， 
    2. 开始垃圾回收的时候，会检查FROM区域中的存活对象，如果还活着，拷贝到TO空间，所有存活对象拷贝完后，清空(释放)FROM区域， 
    3. 然后FROM和To区域互换
    
    如果新生代中的队形超过5次回收还存在或者to空间占用超过25%就会进行晋升操作，将to中的对象放入老生代中

13. 描述增量标记算法在何时使用及工作原理
    
    v8中老生代GC处理的时候会进行增量标记算法，也就是把大暂停分成多个小暂停，每暂停一小段时间，应用程序运行一会，这样垃圾回收和应用程序交替进行，停顿时间可以减少到1/6左右



