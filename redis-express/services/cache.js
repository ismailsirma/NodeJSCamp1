const mongoose = require('mongoose')

// Get reference to original default exec function defined inside mongoose library
const exec = mongoose.Query.prototype.exec

// overwrite exec function with additional logic being applied

 // we don't want to change value of exec so we didn’t use arrow function
// Runs before any query is executed by mongoose
mongoose.Query.prototype.exec = function (){
	console.log('IM ABOUT TO RUN A QUERY')
	// runs original copy of exec function (with any arguments that pass into exec)
	return exec.apply(this, arguments)
}