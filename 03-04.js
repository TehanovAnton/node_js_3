var http = require('http')
var url = require('url')
var fs = require('fs')
port = 5000

function factorial(k) {
    r = 1

    if (k == 0) 
        return r
    else
        r = k * factorial(k - 1)
    
    return r
}

function Factorial(k, cb) {
    this.fk = k
    this.ffact = factorial
    this.fcb = cb
    this.calc = () => { 
        process.nextTick(() => { 
            this.fcb(null, this.ffact(this.fk))
        })
    }
}

http.createServer(function(request, response) {
    urlParse = url.parse(request.url, true)
    params = urlParse.query

    if (urlParse.pathname.endsWith('/fact'))
    {
        response.writeHead(200, { 'Content-Type': 'application/json' })
        let fact = new  Factorial(params['k'], (err, result) => {
            resObject = { k: params['k'], fact: result }
            response.end(JSON.stringify(resObject))
        })
        fact.calc()
    }

}).listen(port)

console.log(`server start: http://localhost:${port}`)