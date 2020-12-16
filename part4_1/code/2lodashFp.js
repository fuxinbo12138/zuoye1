const fp = require('lodash/fp')

const cars = [
    {
        name: 'Ferrari FF', 
        horsepower: 660,
        dallor_value: 700000,
        in_stock: true
    },
    {
        name: 'Spyke C12 Zagato', 
        horsepower: 650,
        dallor_value: 648000,
        in_stock: false
    },
    {
        name: 'Jaguar XKR-S', 
        horsepower: 550,
        dallor_value: 132000,
        in_stock: false
    },
    {
        name: 'Audi R8', 
        horsepower: 525,
        dallor_value: 114200,
        in_stock: false
    },
    {
        name: 'Aston Martin One-77', 
        horsepower: 750,
        dallor_value: 1850000,
        in_stock: true
    },
    {
        name: 'Pagani Huayra', 
        horsepower: 700,
        dallor_value: 1300000,
        in_stock: false
    }
]


//1. 
var isLastInStock = function(cars) {
    let last_car = fp.last(cars)

    return fp.prop('in_stock', last_car)
}

let result = fp.flowRight(fp.prop('in_stock'), fp.last)
console.log(result(cars))



//2.
let result1 = fp.flowRight(fp.prop('name'), fp.first)
console.log(result1(cars))


//3.
let _average = function(xs) {
	return fp.reduce(fp.add, 0, xs) / xs.length
}//这里不需要更改

let averageDollarValue = function(cars) {
	let dollar_value = fp.map(function(car) {
		return car.dollar_value
	},cars)
	return _average(dollar_value)
}
console.log(averageDollarValue(cars))

let averageDollarValue1 = fp.flowRight(_average, fp.map(function(car) {
		return car.dollar_value
}))

let result2 = averageDollarValue(cars)
console.log(result2)

//4.
//sanitizeNames(['Hello World'])
let _underscore = fp.replace(/\W+/g, '_')

function sanitizeNames (value) {
	return fp.map(item => {
		  let result = fp.flowRight(fp.lowerCase, _underscore)
		  return result(item)
	})(value)
}


let result3 = sanitizeNames(['Hello World'])

console.log(result3)