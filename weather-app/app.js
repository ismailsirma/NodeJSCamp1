const request = require('request')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

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
    if(response.body.features != undefined)
    {
        const longtitude = response.body.features[0].center[0]
        const latitude = response.body.features[0].center[1]
        console.log("long:" + longtitude + ", lati:" + latitude)
    }
})


const address = process.argv[2]

if(!address){
    console.log('Please provide an address')
} else {    
    geocode(address, (error, { latitude, longitude, location})=> {
        
        if(error){
            return console.log(error)
        }

        forecast(latitude, longitude, (error, forecastData) => {

            if(error){
                return console.log(error)
            }
            
            console.log(location)
            console.log(forecastData)
        })
    })
}
