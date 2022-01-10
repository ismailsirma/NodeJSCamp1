// callback function with first input function 
// and second input is timeout miliseconds

setTimeout( () => {
    console.log('Two seconds are up')
}, 2000)

const names = ['Erdem', 'Ahmet', 'Fatma']
// passing in calbback function inside filter function
const shortNames = names.filter( (name) => {
    return name.length <= 4
})

const geocode = (address, callback) => {
    setTimeout(() => {
        const data = {
            latitude: 0,
            longitude: 0
        }

        callback(data)
    }, 2000)

}

geocode('Philadelphia', (data) => {
    console.log(data)
})

// Add function accepts integers
// using Timeout to simulate a 2 second delay
// after 2 seconds are up, callback function will be called with the sum.
const add = (a, b, callback) => {
    setTimeout(() => {
        callback(a + b)
    }, 2000)
}

add(1, 4, (sum) => {
    console.log(sum)
})