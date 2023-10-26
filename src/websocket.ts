import { WebSocketServer } from 'ws'

//A headless websocket server is set up that also prints any events that come in.
const wsServer = new WebSocketServer({ noServer: true })

wsServer.on('connection', (socket) => {
    socket.on('message', (message) => console.log('hey', message.toString()))
})

wsServer.on('open', () => {
    //the server would now print "Hello"
    wsServer.send('Hello')
})

export default wsServer
