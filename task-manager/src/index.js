const express = require('express')
require('./db/mongoose')
const userRouter = require('./routers/user')

const app = express()
const port = process.env.PORT || 3000

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

app.listen(port, () => {
    console.log('Server is up on port '+ port)
})

const jwt = require('jsonwebtoken')

// jwt sign
// first input is jwt header arguement (user id)
// second input is the scret (password)
// third is expiration
const myFunction = async () => {
    const token = jwt.sign({
        _id: 'abc123'
    }, 
    'thisismynewpassword', 
    {
        expiresIn : '15 minutes'
    })
    console.log(token)

    //verify the json token
    // first input is token, second is the secret password
    // it throws error if secret is not correct for the token
    const data = jwt.verify(token, 'thisismynewpassword')
    console.log(data)
}

myFunction()