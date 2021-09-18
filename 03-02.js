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

http.createServer(function(request, response) {
    urlParse = url.parse(request.url, true)
    params = urlParse.query

    if (urlParse.pathname.endsWith('/fact'))
    {
        response.writeHead(200, { 'Content-Type': 'application/json' })
        resObject = { k: params['k'], fact: factorial(params['k']) }
        response.end(JSON.stringify(resObject))
    }

}).listen(port)

console.log(`server start: http://localhost:${port}`)