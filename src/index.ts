import express from 'express'
import wsServer from './websocket.js'
import JSONRoutes from './modules/json/json.routes.js'
import { config } from '../config.js'

const app = express()

app.use('/api/json', JSONRoutes)

const server = app.listen(config.port, () => {
    console.log(`Example app listening on port ${config.port}`)
})

server.on('upgrade', (request, socket, head) => {
    wsServer.handleUpgrade(request, socket, head, (socket) => {
        wsServer.emit('connection', socket, request)
    })
})
