# 简答题

1. 当我们点击按钮的时候动态给 data 增加的成员是否是响应式数据，如果不是的话，如果把新增成员设置成响应式数据，它的内部原理是什么。

    ```
        let vm = new Vue({
            el: '#el'
            data: {
            o: 'object',
            dog: {}
            },
            method: {
                clickHandler () {
                    // 该 name 属性是否是响应式的
                    this.dog.name = 'Trump'
                }
            }
        })
    ```

    在初始化之后添加的新属性都不是响应式数据，需要调用this.$set(this.dog, 'name', 'Trump')
    原理： 初始化时将data数据通过_proxyData方法内部使用Object.defineProperty转化成getter和setter注入到了vue实例上，并调用observer通过它的defineReactive方法对给每个数据内部递归定义了getter和setter方法，将data中的数据转化成了相应式数据，新添加的属性没有在注册的时候被监控到，所以不能直接转化成相应式数据。$set方法就是判断这个数据是否已经被监控，如果没有，就调用defineReactive方法将他转化成相应式数据

2. 请简述 Diff 算法的执行过程

    通过init创建patch函数，patch函数主要用来比较新旧节点，将不同的节点更新到页面上
    patch函数接收两个两个参数，oldVnode和vnode，oldVnode可以是真实dom节点，也可以是虚拟vnode，
        如果是真实dom，会将真实dom通过emptyNodeAt转化成vnode，然后比较vnode节点是否相同，不相同的话，将新的vnode节点插入到真实dom之前，然后将真实dom移除
        如果oldVnode和vnode都是虚拟dom，调用patchVnode函数，如果是文字节点，判断文字节点是否相同，更新dom，如果oldvnode有子节点，直接移除oldvonde的子节点，
        如果不是文本节点，判断oldVnode和vnode是否都有子节点，
            如果都有子节点，调用updateChildren函数对比两个vnode的子节点，然后渲染
            如果之后新节点有子节点，将老节点置空，将新节点的子节点调用addVnodes，遍历插入到页面上
            如果只有老节点有子节点，就将老节点的内部元素通过removeVnodes质控
            如果老节点是文字节点，将文字置为空
    updateChildren函数
        如果子节点不相同，调用updateChildren函数进行对比，对比所有子节点差异，更新dom，以为我们一般不会将元素层级变化，所以只会比较同级的子元素，这样我们的时间复杂度是O(n)
        在进行比较时，首先对开始和结束节点设置标记索引，遍历过程中移动索引
        开始和结束节点比较的时候有四种情况
            1. oldStartVnode/newStartVnode(旧节点开始 <==> 新开始节点)
            2. oldEndVnode/newEndVnode(旧节点结束 <==> 新开始结束)
            3. oldStartVnode/newEndVnode(旧节点开始 <==> 新开始结束)
            4. oldEndVnode/newStartVnode(旧节点结束 <==> 新开始节点)

        开始节点和结束节点比较
            1. oldStartVnode/newStartVnode(旧节点开始 <==> 新开始节点)
                如果oldStartVnode和newStartVnode节点是sameVnode(key和sel相同)
                调用patchVnode()对比和更新节点
                将对应的oldStartIdx++，newStartIdx++， 将更新oldStartVnode和newStartVnode，重新进行比较
            2. oldEndVnode/newEndVnode(旧节点结束 <==> 新开始结束)
                如果oldEndVnode和newEndVnode节点是sameVnode(key和sel相同)
                调用patchVnode()对比和更新节点
                将对应的oldEndIdx--，newEndIdx--， 将更新oldEndVnode和newEndVnode，重新进行比较
            3. oldStartVnode/newEndVnode(旧节点开始 <==> 新开始结束)
                对比oldStartVnode和newEndVnode点是sameVnode(key和sel相同)
                调用patchVnode()对比和更新节点
                将节点插入到最后，因为他和新的结束节点相同，所以放在最后
                将对应的oldStartIdx++，newEndIdx--，将更新oldStartVnode和newEndVnode，重新进行比较
            4. oldEndVnode/newStartVnode(旧节点结束 <==> 新开始节点)
                对比oldEndVnode和newStartVnode点是sameVnode(key和sel相同)
                调用patchVnode()对比和更新节点
                将节点插入到最前面，因为他和新的开始节点相同，所以放在最前面
                将对应的--oldEndIdx，++newStartIdx，将更新oldEndVnode和newStartVnode，重新进行比较
            
            如果都不满足，使用新的开始节点在oldchild中寻找key相同的组件节点如果都不行同，或key相同sel不同，就创建对应的dom节点放到节点数组的最前面，如果key和sel相同就将这个子节点移动到节点数组的最前面

            循环结束，比较完毕
                新的子节点数量大于老的子节点，就将新的子节点多出来的放到节点数组最后面
                老的子节点数量大于新的子节点，将老节点对应的多出来的在节点数组中删除





