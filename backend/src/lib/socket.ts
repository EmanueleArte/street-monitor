import { IReport } from '../models/reportModel'
import { INotification } from '../models/notificationModel'
import { createNotification } from './notificationUtility'
import { NotificationTypes } from './vars'
import { Server, Socket } from 'socket.io'
import axios, { Axios, AxiosResponse } from 'axios'
import { IUser } from '../models/userModel'
import { IFavoriteSpot } from '@/models/favoriteSpotModel'

interface IConnectedUser {
    id: string,
    user?: IUser,
    gps?: [number, number]
}

let connectedUsers: IConnectedUser[] = []

export function onConnection(socket: Socket, io: Server) {
    console.log('a user connected', socket.id)
    connectedUsers.push({ id: socket.id })
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
            if (u.id == socket.id) return { id: socket.id, ...user }
            return u
        })
    })

    // notify each user that has a spot within a radius value to the report
    socket.on('new-report-spot', (report: IReport, radius: number) => {
        const [lat, long]: [number, number] = report.coordinates
        const currentUser: string = connectedUsers
            .find((user: IConnectedUser) => user.id == socket.id)
            .user
            .username

        // get favorite spots
        axios.get<IUser[]>(`http://localhost:3000/users/favorites/${lat}&${long}&${radius}`)
            .then(users => users.data.filter((user: IUser) => user.username != currentUser))
            .then(users => {
                users.forEach(user => sendNotificationToUser(user, NotificationTypes.NEW_REPORT_SPOT, report, radius))

                const notifiyIds: string[] = connectedUsers
                    .filter((user: IConnectedUser) => users.map(_ => _.username).includes(user.user?.username))
                    .map((user: IConnectedUser) => user.id)
                io.emit('notify', notifiyIds)
            })
            .catch()
    })

    // notify each user within a radius value to the report
    socket.on('new-report', async (report: IReport, radius: number) => {
        // get ids of active users, using gps
        const notifiyIds: string[] = connectedUsers
            .filter((user: IConnectedUser) => user.gps && haversineDistance(user.gps, report.coordinates) <= radius)
            .filter((user: IConnectedUser) => user.id != socket.id)
            .map((user: IConnectedUser) => user.id)

        notifiyIds
            .map(id => connectedUsers.find(user => user.id == id).user)
            .forEach(user => sendNotificationToUser(user, NotificationTypes.NEW_REPORT_GPS, report))

        io.emit('notify', notifiyIds)
    })
}

/**
 * Send a notification, stored in the db
 * @param user to send the notification
 * @param notificationType of the notification
 * @param report to which the notification is relative to
 */
async function sendNotificationToUser(user: IUser, notificationType: NotificationTypes, report: IReport, radius?: number) {
    if (notificationType == NotificationTypes.NEW_REPORT_SPOT) {
        if (!radius) throw new Error('missing radius argument')
        const spots: IFavoriteSpot[] = user.favorite_spots.filter(_ => haversineDistance(_.coordinates, report.coordinates) < radius)
        const postRequestBodies = await Promise.all(spots.map(async (spot: IFavoriteSpot) =>
            (await createNotification())
                .ofType(NotificationTypes.NEW_REPORT_SPOT)
                .toUser(user.username)
                .forReport(report._id.toString())
                .nearTo(spot)
                .build()))
        return Promise.all(
            postRequestBodies.map(body => {
                return axios.post<INotification>(
                    `http://localhost:3000/users/${user.username}/notifications/`,
                    body,
                    { headers: { 'Content-Type': 'application/json' } }
                )
            })
        )
    }

    const notification = (await createNotification())
        .ofType(notificationType)
        .toUser(user.username)
        .forReport(report._id.toString())
        .build()

    console.log('new notification of type', notificationType)
    console.log(notification)

    return axios.post(
        `http://localhost:3000/users/${user.username}/notifications/`,
        notification,
        { headers: { 'Content-Type': 'application/json' } }
    )
}

async function sendReportNearGpsNotification(user: IUser, report: IReport): Promise<AxiosResponse> {
    const notification = (await createNotification())
        .ofType(NotificationTypes.NEW_REPORT_GPS)
        .toUser(user.username)
        .forReport(report._id.toString())
        .build()

    return axios.post(
        `http://localhost:3000/users/${user.username}/notifications/`,
        notification,
        { headers: { 'Content-Type': 'application/json' } }
    )
}

async function sendReportUpdateNotification(user: IUser, report: IReport): Promise<AxiosResponse> {
    const notification = (await createNotification())
        .ofType(NotificationTypes.REPORT_UPDATE)
        .toUser(user.username)
        .forReport(report._id.toString())
        .build()

    return axios.post(
        `http://localhost:3000/users/${user.username}/notifications/`,
        notification,
        { headers: { 'Content-Type': 'application/json' } }
    )
}

/**
 * Compute the distance between two points on the globe, expressed in coordinates.
 * @param point1 
 * @param point2
 * @returns distance between two point, in kilometers
 */
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

