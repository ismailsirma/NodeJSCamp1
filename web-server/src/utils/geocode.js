const request = require('request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geodcoding/v5/mapbox.places/' + address + '.json?access_token=abcd123'

    request({ url, json: true }, (error, { body }) => {
        if(error){
            callback('Unable to connect to location services!', undefined)
        } else if( body.features !== undefined){
            if( body.features.length === 0)
            {
                callback('Unable to find location. Try another search.', undefined)
            }
        } else {
            console.log(body)
            if( body.features != undefined)
            {
                callback(undefined, {
                    latitude: body.features[0].center[0],
                    longitude: body.features[0].center[1],
                    location: body.features[0].place_name
                })
            }
        }
    })
}

module.exports = geocode