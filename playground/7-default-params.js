const greeter = (name = 'Lisa', age = 21) => {
    console.log('Hello ' + name)
}

greeter()

// default value for an object as an empty object
//const transaction = (type, { label, stock } = {}) => {
    //console.log(type, label, stock)
//}

// default value for an object as an empty object
const transaction = (type, { label, stock = 100 } = {}) => {
    console.log(type, label, stock)
}

transaction('order')