const validator = require('validator')

const getNotes = require('./2-notes')

const msg = getNotes()

console.log(msg)

console.log(validator.isEmail('erdem@example.com'))

console.log(validator.isURL('http://www.ismailsirma.com'))
