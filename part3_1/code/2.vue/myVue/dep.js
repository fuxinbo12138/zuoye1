export default class Dep {
    constructor() {
        //存储所有的观察者
        this.subs = []
    }
    addSub(sub) {
        //添加观察者
        if(sub && sub.update) {
            this.subs.push(sub)
        }
    }
    notify() {
        //通知所有的观察者
        this.subs.forEach(sub => {
            sub.update()
        })
    }
}