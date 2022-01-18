const app = require('./app')
const port = process.env.PORT || 3000

app.listen(port, () => {
    console.log('Server is up on port '+ port)
})

//////////////////// code below is just a test ////////////////////////////////////
const jwt = require('jsonwebtoken')

// jwt sign
// first input is jwt header arguement (user id)
// second input is the scret (password)
// third is expiration
const myFunction = async () => {
    const token = jwt.sign({
        _id: 'abc123'
    }, 
    'thisismysecret', 
    {
        expiresIn : '15 minutes'
    })
    console.log(token)

    //verify the json token
    // first input is token, second is the secret password
    // it throws error if secret is not correct for the token
    const data = jwt.verify(token, 'thisismysecret')
    console.log(data)
}

myFunction()