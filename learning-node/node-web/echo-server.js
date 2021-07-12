const http = require('http')
const server = http.createServer()

server.on('request', (req, res) => {
    // res.statusCode = 200
    // res.setHeader('Content-Type', 'text/plain')
    if (req.method === 'POST' && req.url == "/echo") {
        let body = []

        res.on('data', chunk => {
            body.push(chunk)
        })
        .on('end', () => {
            res.writeHead(200, {'Content-Type': 'text/plain'})
            body = Buffer.concat(body).toString()
            res.end(body)
        })
        res.writeHead(200, {'Content-Type': 'text/plain'})
        res.end('hello world\n')
    } else {
        res.statusCode = 404
        res.end()
    }
})

server.listen(8001)
console.log('Servidor en la url http://localhost:8001')