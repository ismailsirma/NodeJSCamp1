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
        helpText: 'This is some support info.',
        title: 'Help',
        authorName: 'Ismail Sirma'
    })
})

// app.com/help/*
app.get('/help/*', (req, res) => {
    res.send({
        helpText: 'This is some support info.' + req,
        title: 'Help',
        authorName: 'Ismail Sirma'
    })
})

// Get info from a specific product using query string
// app.com/products?search=BTC&rating=5
app.get('/products', (req, res) => {
    if(!req.query.search){
        return res.send({
            error: 'You must provide a symbol'
        })
    }

    // continue to provide product details
    res.send({
        products: [ 'apple', 'banana', 'orange' ]
    })
})

// app.com/about
app.get('/about', (req, res) => {
    res.send('About')
})

app.listen(3000, () => {
    console.log('Web server is up on port 3000.')
})