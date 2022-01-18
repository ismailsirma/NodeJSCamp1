const { calculateTip } = require('../src/math')

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

//test('This should fail', () =>{
//    throw new Error('Failure!')
//})