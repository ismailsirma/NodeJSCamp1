const express = require('express')
require('./db/mongoose')
const userRouter = require('./routers/user')

const app = express()

// middleware function
/*
app.use((req, res, next) => {
    if(req.method === 'GET'){
        res.send('GET requests are disabled')
    } else {
        next()
    }
    //console.log(req.method, req.path)
})
*/

app.use(express.json())
app.use(userRouter)

module.exports = app