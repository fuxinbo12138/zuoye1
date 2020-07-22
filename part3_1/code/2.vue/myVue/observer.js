import Dep from './dep.js'
export default class Observer {
  constructor(data) {
    this.walk(data);
  }
  walk(data) {
    //判断data是否是对象
    if(!data || typeof data != 'object') {
        return
    }
    //如果data是对象，遍历data的所有属性
    Object.keys(data).forEach(key => {
        this.defineReactive(data, key, data[key])
    })
  }
  defineReactive(data, key, value) {
    const self = this
    //收集依赖，发送通知
    let dep = new Dep()

      //如果子数据是对象形式，把它变成响应式
    this.walk(value)
    Object.defineProperty(data, key, {
        enumerable: true,
        configurable: true,
        get() {
            //收集依赖
            Dep.target && dep.addSub(Dep.target)
            return value
        },
        set(newValue) {
            if(newValue === value){
                return 
            }
            value = newValue
            self.walk(newValue)
            // 发送通知
            dep.notify()
        }
    })
  }
}
