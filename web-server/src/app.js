const path = require('path')
const express = require('express')

console.log(__dirname)
//console.log(__filename)
console.log(path.join(__dirname, '../public'))
const app = express()
const publicDirectoryPath = path.join(__dirname, '../public')

// customize the server to serve out folder
// serve static files for static directory
app.use(express.static(publicDirectoryPath))

// app.com
app.get('', (req, res) => {
    res.send('<h1>XYZ App</h1>')
})

// app.com/help
app.get('/help', (req, res) => {
    res.send({
        name: 'Ismail',
        surname: 'Sirma'
    }, {
        name: 'Sarah',
        surname: 'Connor'
    })
})

// app.com/about
app.get('/about', (req, res) => {
    res.send('About')
})

app.listen(3000, () => {
    console.log('Web server is up on port 3000.')
})