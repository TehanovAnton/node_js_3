var http = require('http')
var fs = require('fs')
var port = 5000
var getCurrentAppStateUrl = 'get_current_app_state'
var appStates = ['norm', 'stop', 'test', 'idle']
var textPlainHeaderOptions = { 'Content-Type': 'text/plain' }
var textHtmlHeaderOptions = { 'Content-Type': 'text/html; charset=utf-8' }
var htmlPath = './03_01.html'
var currentAppState = appStates[0]

http.createServer(function(request, response) {
    var headerOptions = null
    var responseEnd = null

    if (request.url.endsWith(getCurrentAppStateUrl)) {
        headerOptions = textPlainHeaderOptions
        responseEnd = currentAppState
        console.log('return currentAppState')
    }
    else {
        headerOptions = textHtmlHeaderOptions
        responseEnd = fs.readFileSync(htmlPath)  
        console.log('return html')      
    }

    response.writeHeader(200, headerOptions)
    response.end(responseEnd)
}).listen(port)

console.log(`Server running at http//localhost:${port}`)