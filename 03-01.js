var http = require('http')
var fs = require('fs')
var readLine = require('readline')
var port = 5000
var getCurrentAppStateUrl = 'get_current_app_state'
var appStates = ['norm', 'test', 'idle']
var appCommands = ['getState', 'stop']
var textPlainHeaderOptions = { 'Content-Type': 'text/plain' }
var textHtmlHeaderOptions = { 'Content-Type': 'text/html; charset=utf-8' }
var htmlPath = './03_01.html'
var currentAppState = appStates[0]

function isCommand(inData) {
    return appCommands.includes(inData)
}

function isState(inData) {
    return appStates.includes(inData)
}

function executeCommand(inData) {
    if (inData == appCommands[0]) {
        console.log(`app: ${currentAppState}`)
    }
    else if (inData == appCommands[1]) {
        return appCommands[1]
    }

    return 'run'
}

function changeState(inData) {
    currentAppState = inData
    console.log('state changed to: ' + currentAppState)
}

commandLine = () => {
    var rl = readLine.createInterface({
        input: process.stdin,
        output: process.stdout
    })

    rl.question('command/state: ', inData => {             
        rl.close()
        var will_run = 'run'

        if (isCommand(inData)) {
            will_run = executeCommand(inData)
        }
        else if (isState(inData))
            changeState(inData)
        else {
            commandLine()
            return
        }

        if (will_run == 'run')
            commandLine()
        else
            console.log('Goodbye console')
    })
} 

server = http.createServer(function(request, response) {
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
})
server.listen(port)

console.log(`Server running at http//localhost:${port}`)
commandLine()