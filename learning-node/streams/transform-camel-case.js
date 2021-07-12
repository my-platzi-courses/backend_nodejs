const { Transform } = require('stream')

String.prototype.capitalize = function () {
    return this.replace(/(?:^|\s)\S/g, input => { return input.toUpperCase() })
}

const transformStream = new Transform({
    transform(chunk, enconding, callback) {
        this.push(chunk.toString().capitalize())
        callback()
    }
})

process.stdin.pipe(transformStream).pipe(process.stdout);
