const request = require('request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geodcoding/v5/mapbox.places/' + address + '.json?access_token=abcd123'

    request({ url: url, json: true }, (error, response) => {
        if(error){
            callback('Unable to connect to location services!', undefined)
        } else if(response.body.features !== undefined){
            if(response.body.features.length === 0)
            {
                callback('Unable to find location. Try another search.', undefined)
            }
        } else {
            console.log(response.body)
            if(response.body.features != undefined)
            {
                callback(undefined, {
                    latitude: response.body.features[0].center[0],
                    longitude: response.body.features[0].center[1],
                    location: response.body.features[0].place_name
                })
            }
        }
    })
}

module.exports = geocode