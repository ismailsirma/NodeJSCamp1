const { calculateTip, add, fahrenheitToCelcius, celciusToFahrenheit } = require('../src/math')

// first argument is name of the test (also error message)
// second argument is a function
test('Should caculate total with tip', () => {
    const total = calculateTip(10, .3)
    expect(total).toBe(13)

    // if(total !== 13){
    //     throw Error('Total tip should be 13. Got ' + total)
    // }
})

test('Should calculate total with default tip', () => {
    const total = calculateTip(10)
    expect(total).toBe(12.5)
})

test('Should convert 32 F to 0 C', () =>{
    const degree = fahrenheitToCelcius(32)
    expect(degree).toBe(0)
})

test('Should convert 0 C to 32 F', () =>{
    const degree = celciusToFahrenheit(0)
    expect(degree).toBe(32)
})

test('Async test demo', (done) => {
    setTimeout(() => {
        expect(1).toBe(1)
        done()
    }, 2000)

})

// Async
test('Should add two numbers', (done) => {
    add(2, 3).then((sum) => {
        expect(sum).toBe(5)
        done()
    })
})

// Async with await testing
test('Should add two numbers async/await', async () => {
    const sum = await add(2, 3)
    expect(sum).toBe(5)
})

//test('This should fail', () =>{
//    throw new Error('Failure!')
//})