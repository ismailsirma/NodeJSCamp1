// Object property shorthand

const name = 'Andrew'
const userAge = 27

/*
const user = {
    name : name,
    age: userAge,
    location: 'Philadelphia'
}
*/
const user = {
    name,
    age: userAge,
    location: 'Philadelphia'
}

console.log(user)

// object destructuring 

const product = {
    label: 'Red notebook',
    price: 3,
    stock: 201,
    salePrice: undefined,
    rating: 4.2
}

//const label = product.label
//const stock = product.stock

// Destructure object outside of the arguments for a function
//const { label: productlabel, stock, rating } = product
//console.log(productlabel)
//console.log(stock)
//console.log(rating)

// provide variables you want to destructure in one line
const transaction = (type, { label, stock }) => {
    console.log(type, label, stock)
}

transaction('order', product)