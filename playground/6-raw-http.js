const https = require('https')
const url = 'https://api.binance.com/api/v3/exchangeInfo?symbol=BNBBTC'

// listen for all chunks to come in
const request = https.request(url, (response) => {

    let data = ''

    // register a handler
    // first argument is event name
    // second argument is callback function
    // call back function going to be fired when new data comes in
    // access the data received via chunk
    // we can have more than one chunk of data
    response.on('data', (chunk) => {
        data = data + chunk.toString()
    })

    // wait for the end event
    response.on('end', () => {
        const body = JSON.parse(data)
        console.log(body)
    })

})

// error handling when error event occurs
request.on('error', (error) => {
    console.log('An error', error)
})
// Make the request ready to send
request.end()