const chalk = require('chalk')
const getNotes = require('./2-notes')

const msg = getNotes()

console.log(msg)

// 1. Install chalk version 2.4.1
// console >>npm i chalk
// 2. Load Chalk into app.js
// require statement
// 3. Use Chalk to print string Success to the console in green
console.log(chalk.bold.inverse.green('Hello') + ' World' + chalk.red('!'));
