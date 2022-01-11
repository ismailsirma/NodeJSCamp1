const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url  = 'https://api.darksky.net/forecast/askdahsjkdhaskdjasd/'

    request({ url, json: true}, (error, { body }) => {
        if(error){
            callback('Unable to connect to the service!', undefined)
        } else if(body.error){
            callback('Unable to find location', undefined)
        } else {
            callback(undefined, body.symbols[0].symbol)
        }
    })
}

module.exports = forecast