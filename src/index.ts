import 'module-alias/register'

import { wsServer } from '@src/websocket'
import express from 'express'
import { router } from '@src/modules/json/json.routes.js'
import { config } from '@src/config.js'

const app = express()

app.use('/api/json', router)

const server = app.listen(config.port, () => {
    console.log(`Example app listening on port ${config.port}`)
})

server.on('upgrade', (request, socket, head) => {
    wsServer.handleUpgrade(request, socket, head, (socket) => {
        wsServer.emit('connection', socket, request)
    })
})
