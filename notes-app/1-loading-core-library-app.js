// require function is used to load npm module to be installed into our project and loaded in filesystem. Require function returns all of the stuff from that module and we have to store that on a variable
const fileSystem = require('fs')

// if file doesn't exist it will be created, overwritten if there is a file with same name.
fileSystem.writeFileSync('notes.txt','This file was created by Node.js!')

// Append a message to notes.txt

// Use appendFileSync to append to the file
fileSystem.appendFileSync('notes.txt','I live in Istanbul.')

