const request = require('request')

//const url = 'https://api.binance.com/api/v3/exchangeInfo'

const url = 'https://api.binance.com/api/v3/exchangeInfo?symbol=BNBBTC'

// 1. options : url, json (if true parse response as json) 
// 2. function to run when response is received
request({ url : url, json: true}, (error, response) => {
    if(error){
        console.log('Unable to connect to the service!')
    } else if(response.body.error){
        console.log('Unable to find location')
    } else {
        // Print a currency info to the user
        console.log(response.body.symbols[0].symbol)
    }
})

// GET /geodcoding/v5/{endpoint}/{search_text}.json
// GET https://api.mapbox.com/geodcoding/v5/mapbox.places/{search_text}.json?access_token=abcd123

/*
    sample output
    {
        "type" : "FeatureCollection",
        "query" : [ "los", "angeles" ],
        "features" : [
            {
                "id" : "place.123123",
                "type" : "Feature",
                "place_type" : [ "place" ],
                "relevance" : 1,
                "properties" : { "wikidata" : "Q65" },
                "place_name" : "Los Angeles, California",
                "bbox" : [ -118,52, 33.9, -118.12, 34.16 ],
                "center" : [-118.24, 34.05 ],
                "geometry" : {
                    "type" : "point",
                    "coordinates" : [ -118.24, 34.05 ]
                }
            }
        ]
    }
*/

const geocodeURL = 'https://api.mapbox.com/geodcoding/v5/mapbox.places/Los%20Angeles.json?access_token=abcd123'

request({ url : geocodeURL, json: true}, (error, response) => {
    // Print Latitude and longtitude
    const longtitude = response.body.features[0].center[0]
    const latitude = response.body.features[0].center[1]
    console.log("long:" + longtitude + ", lati:" + latitude)
})


const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geodcoding/v5/mapbox.places/' + address + '.json?access_token=abcd123'

    request({ url: url, json: true }, (error, response) => {
        if(error){
            callback('Unable to connect to location services!', undefined)
        } else if(response.body.features.length === 0){
            callback('Unable to find location. Try another search.', undefined)
        } else {
            callback(undefined, {
                latitude: response.body.features[0].center[0],
                longitude: response.body.features[0].center[1],
                location: response.body.features[0].place_name
            })
        }
    })
}

geocode('Philadelphia', (error, data)=> {
    console.log('Error', error)
    console.log('Data', data)
})