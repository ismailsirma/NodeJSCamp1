// enhancement for callback
// make it easier to manage async code

//callback
const doWorkCallback = (callback) => {
    setTimeout(() => {
        //callback('This is my error!', undefined)
        callback(undefined, [1, 4, 7])
    }, 2000)
}

doWorkCallback((error, result) => {
    if(error){
        return console.log(error)
    }

    console.log(result)
})

//promise
// one input as a function or array function
// function is called by Promise API
// we have access tp twp arguments
// we call resolve if we are expecting happend, it went well
// we call reject if things are not expected
// promise is an object that has methods we can access
const doWorkPromise = new Promise((resolve, reject) => {
    setTimeout(() => {
        //resolve([7,4,1])
        reject('Things went wrong!')
    }, 2000)
})

// then function is called when things went well (when resolve is called)
doWorkPromise.then((result) => {
    console.log('Success!', result)
})
// then function is called when things went wrong (when reject is called)
.catch((error) => {
    console.log('Error!', error)
})