// const { message } = require('./myModule')  Using the standard require method for Node applications
import location, { message, name, greeting } from './myModule' // Using the babel preset for ES6 importing
import add, { subtract } from './math' 


console.log( message )
console.log( name )
console.log( location )
console.log( greeting('Thomas') )
console.log('/-------------------------/')
console.log(add(3,5))
console.log(subtract(3,5))
console.log('/-------------------------/')