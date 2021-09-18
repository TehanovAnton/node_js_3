var http = require('http')
var url = require('url')
var fs = require('fs')
port = 5000

function factorial(k) {
    var rval=1;
    for (var i = 2; i <= k; i++)
        rval = rval * i;
    return rval;
}

http.createServer(function(request, response) {
    urlParse = url.parse(request.url, true)
    params = urlParse.query

    if (urlParse.pathname.endsWith('/factorials')) {
        html = fs.readFileSync('./03_03.html')
        response.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' })
        response.end(html)
    }
    if (urlParse.pathname.endsWith('/fact'))
    {
        response.writeHead(200, { 'Content-Type': 'application/json' })
        resObject = { k: params['k'], fact: factorial(params['k']) }
        response.end(JSON.stringify(resObject))
    }
}).listen(port)

console.log(`server start: http://localhost:${port}`)