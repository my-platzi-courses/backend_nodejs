// %s -> string
// %d -> numero
// %j -> json

// console.log('Un %s y un %s', 'perrito', 'gatito')

// console.info('hello world')

// console.warn('hello error')

// console.assert(42 == "42")

// console.assert(42 === "42")

// console.trace("hello")

const util = require('util')
const debuglog = util.debuglog('foo')

debuglog('hello from foo')

// Para ejecutar NODE_DEBUG=foo node console-utils.js