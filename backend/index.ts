import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import { Application } from 'express'
import userRoutes from './src/routes/userRoutes'
import notificationTypeRoutes from './src/routes/notificationTypeRoutes'
import reportTypeRoutes from './src/routes/reportTypeRoutes'
import reportRoutes from './src/routes/reportRoutes'
import { Server } from 'socket.io'
import { IReport } from './src/models/reportModel'
import { INotification } from './src/models/notificationModel'
import { createNotification } from './src/lib/notificationUtility'
import { NotificationTypes } from './src/lib/vars'

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

const io = new Server(server, {
    cors: {
        origin: "http://localhost:5173"
    }
})

interface IConnectedUser {
    id: string,
    username?: string,
    gps?: [number, number]
}

let connectedUsers: IConnectedUser[] = []

io.on('connection', (socket) => {
    console.log('a user connected', socket.id)
    connectedUsers.push({id: socket.id})
    console.log('total connected users', connectedUsers.length)
    
    socket.on('disconnect', () => {
        console.log('user disconnected', socket.id)
        const userToDisconnect: IConnectedUser | undefined = connectedUsers.find(user => user.id == socket.id)
        if (!userToDisconnect) return
        const index: number = connectedUsers.indexOf(userToDisconnect)
        if (index <= -1) return
        connectedUsers.splice(index, 1)
        console.log('total connected users', connectedUsers.length)
    })

    socket.on('update-user', (user) => {
        connectedUsers = connectedUsers.map(u => {
            if (u.id == socket.id) return {id: socket.id, ...user}
            return u
        })
    })

    // notify each user that has a spot within a radius value to the report
    socket.on('new-report-spot', (report: IReport, radius: number) => {

    })

    // notify each user within a radius value to the report
    socket.on('new-report', async (report: IReport, radius: number) => {
        // get ids of active users, using gps
        const notifiyIds: string[] = connectedUsers
            .filter((user: IConnectedUser) => user.gps && haversineDistance(user.gps, report.coordinates) <= radius)
            .filter((user: IConnectedUser) => user.id != socket.id)
            .map((user: IConnectedUser) => user.id)

        console.log('users', connectedUsers)
        console.log('ids', notifiyIds)

        // get ids of active users, using spots
        const notification: INotification | undefined = (await createNotification())
            .ofType(NotificationTypes.NEW_REPORT_GPS)
            ?.forReport(report._id.toString())
            .build()

        console.log('emitting notification', notification)
        io.emit('notify', notifiyIds, notification)
    })
})


function haversineDistance(point1: [number, number], point2: [number, number]) {
    const [lat1, lon1]: [number, number] = point1
    const [lat2, lon2]: [number, number] = point2
  
    const R: number = 6371 // Raggio della Terra in km
    const toRad = (deg: number) => (deg * Math.PI) / 180
  
    const dLat: number = toRad(lat2 - lat1)
    const dLon: number = toRad(lon2 - lon1)
  
    const a: number = Math.sin(dLat / 2) ** 2 +
      Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
      Math.sin(dLon / 2) ** 2;
  
    const c: number = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; // Distanza in km
  }