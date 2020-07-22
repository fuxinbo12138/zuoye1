import Watcher from './watcher.js'

export default class Compiler {
    constructor(vm) {
        this.el = vm.$el
        this.vm = vm
        this.compile(this.el)
    }
    compile(el) {
        //编译模板，处理文本节点和元素节点
        let childNodes = el.childNodes
        Array.from(childNodes).forEach(node => {
            if(this.isTextNode(node)) {//处理文本节点
                this.compileText(node)
            }

            if(this.isElementNode(node)) {//处理元素节点
                this.compileElement(node)
            }

            if(node.childNodes && node.childNodes.length) { //深层处理模板
                this.compile(node)
            }
            
        })
    }
    compileElement(node) {
        //编译元素节点， 处理指令
        Array.from(node.attributes).forEach(attr => {
            let attrName = attr.name
            attrName = attrName.startsWith('@') ? 'v-on' + attrName.substring(2) : attrName
            attrName = attrName.startsWith(':') ? 'v-bind' + attrName.substring(2) : attrName
            if(this.isDirective(attrName)) {
                if(attrName.indexOf("v-on") != -1 || attrName.indexOf("v-bind") != -1) {
                    let [name, event] = attrName.split(":")
                    attrName = name.substring(2)
                    const key = attr.value
                    this.update(node, key, attrName, event)
                }else {
                    attrName = attrName.substring(2)
                    const key = attr.value
                    this.update(node, key, attrName)
                }
                
            }
        })
    }
    update(node, key, attrName, event) {
        let updateFn = this[attrName + 'Update']
        updateFn && updateFn.call(this, node, this.vm[key], key, event)
    }
    //v-text
    textUpdate(node, value, key) {
        node.textContent = value
        new Watcher(this.vm, key, (newValue) => {
            node.textContent = newValue
        })
    }
    //v-html
    htmlUpdate(node, value, key) {
        node.innerHTML = value
        new Watcher(this.vm, key, (newValue) => {
            node.innerHTML = newValue
        })
    }
    //v-on
    onUpdate(node, value, key, event) {
        node.addEventListener(event.toLowerCase(), () => {
            value()    
        })
    }
    //v-model
    modelUpdate(node, value, key) {
        //双向数据绑定
        node.addEventListener('input', () => {
            this.vm[key] = node.value
        })
        node.value = value
        new Watcher(this.vm, key, (newValue) => {
            node.value = newValue
        })
    }
    compileText(node) {
        //处理文本节点处理插值表达式
        const reg = /\{\{(.+?)\}\}/
        const value = node.textContent
        if(reg.test(value)) {
            let key = RegExp.$1.trim()
            node.textContent = value.replace(reg, this.vm[key])


            //创建watcher对象
            new Watcher(this.vm, key, (newValue) => {
                node.textContent = newValue
            })
        }
    }
    isDirective(attrName) {
        //判断元素属性是否为指令
        return attrName.startsWith('v-')
    }
    isTextNode(node) {
        //判断是否是文本节点
        return node.nodeType === 3
    }
    isElementNode(node) {
        //判断是否是元素节点
        return node.nodeType === 1
    }
}