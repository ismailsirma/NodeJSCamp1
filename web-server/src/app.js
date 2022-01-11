const express = require('express')

const app = express()

// app.com
app.get('', (req, res) => {
    res.send('Hello express!')
})

// app.com/help
app.get('/help', (req, res) => {
    res.send('How can i help?')
})

// app.com/about
app.get('/about', (req, res) => {
    res.send('About ...')
})

app.listen(3000, () => {
    console.log('Web server is up on port 3000.')
})