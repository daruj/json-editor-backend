import 'module-alias/register'

import express from 'express'
import bodyParser from 'body-parser'

import { wsServer } from '@src/websocket'
import { router } from '@src/modules/json/json.routes.js'
import { config } from '@src/config.js'

const app = express()

// Middleware to parse JSON in the request body
app.use(bodyParser.json())

app.use('/api/json', router)

const server = app.listen(config.port, () => {
    console.log(`App running on port ${config.port}`)
})

server.on('upgrade', (request, socket, head) => {
    wsServer.handleUpgrade(request, socket, head, (socket) => {
        wsServer.emit('connection', socket, request)
    })
})
