import 'module-alias/register'

import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import { wsServer } from '@src/websocket'
import { router } from '@src/modules/json/json.routes'
import { config } from '@src/config'

const app = express()

app.use(
    cors({
        origin: 'http://localhost:3000',
    }),
)

// Middleware to parse JSON in the request body
app.use(bodyParser.json())

// Routes
app.use('/api/json', router)

const server = app.listen(config.port, () => {
    console.log(`App running on port ${config.port}`)
})

server.on('upgrade', (request, socket, head) => {
    wsServer.handleUpgrade(request, socket, head, (socket) => {
        wsServer.emit('connection', socket, request)
    })
})
