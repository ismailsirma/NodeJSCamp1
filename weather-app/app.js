const request = require('request')

const url = 'https://api.binance.com/api/v3/exchangeInfo'

// 1. options : url
// 2. function to run when response is received
request({ url : url}, (error, response) => {
    
    const data = JSON.parse(response.body)
    console.log(data.symbols[0].symbol)
})