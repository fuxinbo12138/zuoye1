//将下面的代码改为promise执行

setTimeout(function () {
    var a  = 'hello '
    setTimeout(function () {
        var b  = 'lagou '
        setTimeout(function () {
            var c  = 'I love you'
            console.log(a + b + c)
        }, 10)
    }, 10)
}, 10)

new Promise((resolve, reject)=> {
    setTimeout(() => {
        let a = 'hello '
        resolve(a)
    })
}).then(res => {
    return new Promise((resolve, reject)=> {
        setTimeout(() => {
            var b  = 'lagou '
            resolve({
                a: res,
                b
            })
        })
    }) 
}).then(({a, b}) => {
    var c  = 'I love you'
    console.log(a + b + c)
})