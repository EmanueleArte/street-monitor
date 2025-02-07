import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import { Application } from 'express'
import userRoutes from './src/routes/userRoutes'
import notificationTypeRoutes from './src/routes/notificationTypeRoutes'
import reportTypeRoutes from './src/routes/reportTypeRoutes'
import reportRoutes from './src/routes/reportRoutes'
import { Server } from 'socket.io'
import { onConnection } from './src/lib/socket'

mongoose.connect('mongodb://localhost:27017/dbStreetMonitor')

const app: Application = express()
app.use(express.json({ limit: '16mb' }))
    .use(express.urlencoded({ limit: '16mb', extended: true }))
    .use(cors())
    .use(express.json())
    .use(express.static('public'))

app.use('/users', userRoutes)
app.use('/report-types', reportTypeRoutes)
app.use('/notification-types', notificationTypeRoutes)
app.use('/reports', reportRoutes)

const server = app.listen(3000, () => {
    console.log('Server listening on port 3000')
})

const io: Server = new Server(server, {
    cors: {
        origin: "http://localhost:5173"
    }
})

io.on('connection', (socket) => onConnection(socket, io))


