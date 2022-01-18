const jwt = require('jsonwebtoken')
const User = require('../models/user')

const auth = async (req, res,next) => {
    try{
        const token = req.header('Authorization').replace('Bearer ','')
        const decoded = jwt.verify(token, 'thisismypassword')
        // find a user who has authentication token still stored
        const user = await User.findOne({ _id: decoded._id, 'tokens.token' : token })

        if(!user) {
            throw new Error()
        }

        req.user = user
        next()
    } catch(e) {
        res.status(401).send({ error: 'Please authenticate.'})
    }
}

modul.exports = auth