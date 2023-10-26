import express from 'express'
import wsServer from './websocket.js'
import JSONRoutes from './modules/json/json.routes.js'

const app = express()

app.use('/api/json', JSONRoutes)

const port = 5001

const server = app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

server.on('upgrade', (request, socket, head) => {
    wsServer.handleUpgrade(request, socket, head, (socket) => {
        wsServer.emit('connection', socket, request)
    })
})
