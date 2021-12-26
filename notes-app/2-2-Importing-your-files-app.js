// use function from our own file
//const firstName = require('./2-utils')
//console.log(firstName)

// second example
const add = require('./2-utils')

const sum = add(4,-2)
console.log(sum)

// third example 

const getNotes = require('./2-notes')
const msg = getNotes()
console.log(msg)