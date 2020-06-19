 //状态类型
 const status = {
    PENDDING: 'padding',
    RESOLVE: 'fulfilled',
    REJECT: 'rejected'

}

class MyPromise {
    constructor(fn) {
        this.status = status.PENDDING

        this.value = null
    
        this.error = null
    
        this.successCb = []
    
        this.failCb= []

        //成功时执行
        this.resolve = (value) => {
            if(this.status !== status.PENDDING) return
            this.status = status.RESOLVE
            this.value = value

            //异步执行
            // this.successCb && this.successCb(this.value)
			this.successCb.forEach(fn => fn())
        }
        //失败时执行
        this.reject = (error) => {
            if(this.status !== status.PENDDING) return
            this.status = status.REJECT
            this.error = error

            //异步执行
            // this.failCb &&  this.failCb(this.error)
			this.failCb.forEach(fn => fn())
        }

		try {
			fn(this.resolve, this.reject)
		}catch(e) {
			this.reject(e)
		}

        
    }
    

    then(successCb, failCb) {
		successCb = successCb ? successCb : value => value
		failCb = failCb ? failCb : err => { throw err }
        //链式调用
         let result =  new MyPromise((resolve, reject) => {
            if(this.status === status.RESOLVE) {
                //异步调用让mypromise2出现
                setTimeout(() => {
					try {
						let x = successCb(this.value)
						//判断是否为自身
						if(result === x)  {
							reject(new TypeError('Chaining cycle detected for promise #<Promise>'))
						}else {
							//判断x是否时普通值
							x instanceof MyPromise ? x.then(resolve, reject) : resolve(x)
						}
					}catch(e) {
						reject(e)
					}
                    
                }, 0)
                
            }else if(this.status === status.REJECT){
				setTimeout(() => {
					try {
						let x = failCb(this.error)
						// console.log(result)
						//判断是否为自身
						if(result === x)  {
							reject(new TypeError('Chaining cycle detected for promise #<Promise>'))
						}else {
							//判断x是否时普通值
							x instanceof MyPromise ? x.then(resolve, reject) : resolve(x)
						}
					}catch(e) {
						reject(e)
					}
				    
				}, 0)
                
            }else  {
					this.successCb.push(() => {
						setTimeout(() => {
							try {
								let x = successCb(this.value)
								//判断是否为自身
								if(result === x)  {
									reject(new TypeError('Chaining cycle detected for promise #<Promise>'))
								}else {
									//判断x是否时普通值
									x instanceof MyPromise ? x.then(resolve, reject) : resolve(x)
								}
							}catch(e) {
								reject(e)
							}
						}, 0)
						
					})
					
					this.failCb.push(() => {
						setTimeout(() => {
							try {
								let x = failCb(this.error)
								// console.log(result)
								//判断是否为自身
								if(result === x)  {
									reject(new TypeError('Chaining cycle detected for promise #<Promise>'))
								}else {
									//判断x是否时普通值
									x instanceof MyPromise ? x.then(resolve, reject) : resolve(x)
								}
							}catch(e) {
								reject(e)
							}
						    
						}, 0)

					})
	
            }
        })

        return result
    }
	
	catch(failCb) {
		return this.then(undefined, failCb)
	}
	
	finally (cb) {
		
		
		let x = this.then((value)  => {
			return MyPromise.resolve(cb()).then(() => value)
		}, (error) => {
			return MyPromise.resolve(cb()).then(() => {throw error})	
		})
		
		return x
	}
	
	static all(array) {
		let result = []
		let index = 0
		return new MyPromise((resolve, reject) => {
			function addData(key, value) {
				result[key] = value
				index++
				
				//保证所有都已经执行菜返回， 不会出现空值
				if(index == array.length) {
					resolve(result)
				}
			}
			for(let ai = 0; i < array.length; i++) {
				let current = array[i]
				if(current instanceof MyPromise) {
					//promise 
					current.then(res=> {
						addData(i, res)
					},err => {
						reject(err)
					})
				}else {
					//直接放到result中
					addData(i, array[i])
				}
			}
		})
	}
	
	static resolve(value) {
		if(value instanceof MyPromise) {
			return value
		}else {
			return new MyPromise(resolve => resolve(value))
		}
	}

}