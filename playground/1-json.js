const fs = require('fs')
const book = {
    title : 'Ego is the enemy',
    author : 'Ryan Holiday'
}

// Convert it into JSON
const bookJSON = JSON.stringify(book)
//console.log(bookJSON)

// Convert JSON string to an javascript object
//const parsedData = JSON.parse(bookJSON)
//console.log(parsedData)

// create a new file in the same directory
//fs.writeFileSync('1-json.json', bookJSON)

// read binary data from a file
const dataBuffer = fs.readFileSync('1-json.json')
//console.log(dataBuffer.toString())
const dataJSON = dataBuffer.toString()

// Convert JSON string to an javascript object
const data = JSON.parse(dataJSON)
console.log(data.title)

// ----------------------------------

// 1. Load and parse JSON data
const sampleDataBuffer = fs.readFileSync('1-json.json')
const sampleDataJSON = sampleDataBuffer.toString()

// 2. Change the name and age property using someone lese info
const sampleData = JSON.parse(sampleDataJSON)
sampleData.name = "Ismail"
sampleData.age = 30

// 3. Stringify the changed object and overwrite the original data 
const newJSON = JSON.stringify(sampleData)
fs.writeFileSync('1-json.json', newJSON)
