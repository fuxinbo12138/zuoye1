const fp = require('lodash/fp')

class Container {
    static of(value) {
        return new Container(value)
    }

    constructor (value) {
        this._value = value
    }

    map(fn) {
        return new Container(fn(this._value))
    }
}

class Maybe {
    static of(value) {
        return new Maybe(value)
    }
    
    constructor (value) {
        this._value = value
    }

    map(fn) {
        return this.isNothing() ? new Maybe(null) : new Maybe(fn(this._value))
    }

    isNothing() {
        return this._value === null || this._value === undefined
    }
}


//1.
let maybe = Maybe.of([5, 6, 1])

let ex1 = (num) => {
	return maybe.map((value)=> {
		let result = fp.map(item => {
			return fp.add(item, num)
		})
		return result(value)
	})
}

let result = ex1(1)
console.log(result._value)


//2.
let xs = Container.of(['do', 'ray', 'mi', 'fa', 'so', 'la', 'xi'])

let ex2 = () => {
	return xs.map((value)=> {
		return fp.first(value)
	})._value
}

let result2 = ex2()
console.log(result2)

// //3
let safeProp = fp.curry(function(x, o) {
	return Maybe.of(o[x])
})

let user = {id: 2, name: 'Albert'}
let ex3 = function() {
	let maybe = safeProp('name', user)
	return maybe.map((value)=> {
		return fp.flowRight(fp.first, fp.split(''))(value)
	})._value
}
let result3 = ex3()
console.log(result3)


// //4
let ex4 = function(n) {
	if(n) {
		return parseInt(n)
	}
}

let result = (n) = > {
	return Maybe.of(n).map((value)=> {
		parseInt(value)
	})._value
}

