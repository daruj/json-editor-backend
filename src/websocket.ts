import { WebSocketServer, WebSocket } from 'ws'

//A headless websocket server is set up that also prints any events that come in.
const wsServer = new WebSocketServer({ noServer: true })

wsServer.on('connection', function connection(ws) {
    ws.on('error', console.error)

    ws.on('message', function message(data) {
        console.log('received: %s', data)
    })

    ws.send('Welcome!')
})

export const sendMessageToAllClients = (event: string, payload: string) => {
    wsServer.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify({ event, payload }))
        }
    })
}

export { wsServer }
