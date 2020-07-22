import Observer from './observer.js'
import Compiler from './compiler.js'
export default class MyVue {
    constructor(options) {
        //通过属性保存选项的数据
        this.$options = options || {}
        this.$data = options.data || {}
        this.$methods = options.methods || {}
        this.$el = typeof options.el === 'string' ? document.querySelector(options.el) : options.el
        //把data的成员转化成getter和 setter，注入到vue实例中
        this._proxyData(this.$data)
        //将mothods中的方法注册到vue实例中
        this._proxyMethods(this.$methods)
        //调用observer对象监听数据变化
        new Observer(this.$data)
        //调用compiler对象解析指定和插值表达式
        new Compiler(this)
    }
    _proxyData(data) {
        //遍历data中的所有属性
        Object.keys(data).forEach(key => {
            //把data的所有属性注入到vue实例中
            Object.defineProperty(this, key, {
                enumerable: true,
                configurable: true,
                get() {
                    return data[key]
                },
                set(newValue) {
                    if(newValue === data[key]) {
                        return
                    }
                    data[key] = newValue
                }
            })
        })
    }
    _proxyMethods(methods) {
        Object.keys(methods).forEach(key => {
            this[key] = methods[key]
        })
    }
    // set(object, propertyName, value) {
    //     if(object === '') {
    //         this.$data[propertyName] = value
    //     }else {
    //         this.$data[object][propertyName] = value
    //     }

    //     this._proxyData(this.$data)

    //     Observer.walk(this.$data)
        
    // }
}