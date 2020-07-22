import Dep from './dep.js'
export default class Watcher {
    constructor(vm, key, cb) {
        this.vm = vm
        this.key = key
        this.cb = cb

        //把watcher对象记录到dep类的静态属性target中
        Dep.target = this
        //触发get方法，在get方法中调用addsub

        this.oldValue = vm[key]

        Dep.target = null

    }
    //当数据发生变化的时候更新视图
    update() {
        let newValue = this.vm[this.key]
        if(newValue === 'oldValue') {
            return
        }
        this.cb(newValue)
    }
}