// regular function syntax
//const square = function(x){
//    return x * x
//}

// an arrow function
//const square = (x) => {
    //return x * x
//}

// shorter, simpler arrow function (without for loop or anything)
//const square = (x) => x * x

//console.log(square(3))

// create an object with a function
//const event = {
//    name : 'Birthday Party',
//    printGuestList : function () {
//        console.log('Guest list for ' + this.name)
//    }
//}

// create an object with an arrow function 
// Arrow functions don’t bind their own this value. 
// Do not have access to this keyword as an object. 
// alternative syntax for method (not an arrow function)
const event = {
    name : 'Birthday Party',
    guestList : ['Erdem', 'Jen', 'Mike'],
    printGuestList () {
        //not ideal solution for this reference undefined issue
        //const that = this

        console.log('Guest list for ' + this.name)

        // function provided as inout getting called for each element of array
        // normal functions have their own this binding and it creates problem if it is inside another function
        //this.guestList.forEach(function(guest){
            //console.log(guest + ' is attending ' + this.name)
        //})
        
        // arrow functions don't bind their own this value
        // they access this value in the context in which they are created
        this.guestList.forEach((guest) => {
            console.log(guest + ' is attending ' + this.name)
        })
    }
}

event.printGuestList()