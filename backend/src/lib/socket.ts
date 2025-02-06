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

export enum SocketEvents {
    NEW_REPORT_SPOT = 'new-report-spot',
    NEW_REPORT_GPS = 'new-report-gps',
    UPDATE_USER = 'update-user',
    NOTIFY = 'notify'
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

    socket.on(SocketEvents.UPDATE_USER, (user) => {
        connectedUsers = connectedUsers.map(u => {
            if (u.id == socket.id) return { id: socket.id, ...user }
            return u
        })
    })

    // notify each user that has a spot within a radius value to the report
    socket.on(SocketEvents.NEW_REPORT_SPOT, (report: IReport, radius: number) => {
        const [lat, long]: [number, number] = report.coordinates
        const currentUser: string | undefined = connectedUsers
            .find((user: IConnectedUser) => user.id == socket.id)
            .user
            ?.username

        if (currentUser == undefined) {
            console.error('user is undefined', connectedUsers)
            return
        }

        // get favorite spots
        axios.get<IUser[]>(`http://localhost:3000/users/favorites/${lat}&${long}&${radius}`)
            .then(users => users.data.filter((user: IUser) => user.username != currentUser))
            .then(async users => {

                const notifiyIds: string[] = connectedUsers
                    .filter((user: IConnectedUser) => users.map(_ => _.username).includes(user.user?.username))
                    .map((user: IConnectedUser) => user.id)
                const notifyUsers: IUser[] = notifiyIds.map(id => connectedUsers.find(user => user.id == id).user)

                await sendNotifications(notifyUsers, NotificationTypes.NEW_REPORT_SPOT, report, radius)
                emitNotify(io, notifiyIds)
            })
            .catch(err => console.log('user doesnt have spot in the area'))
    })

    // notify each user within a radius value to the report
    socket.on(SocketEvents.NEW_REPORT_GPS, async (report: IReport, radius: number) => {
        // get ids of active users, using gps
        const notifiyIds: string[] = connectedUsers
            .filter((user: IConnectedUser) => user.gps && haversineDistance(user.gps, report.coordinates) <= radius)
            .filter((user: IConnectedUser) => user.id != socket.id)
            .map((user: IConnectedUser) => user.id)
        const notifyUsers: IUser[] = notifiyIds.map(id => connectedUsers.find(user => user.id == id).user)

        await sendNotifications(notifyUsers, NotificationTypes.NEW_REPORT_GPS, report)
        emitNotify(io, notifiyIds)
    })
}

/**
 * Emits a notify event if there are some ids
 * @param io socket.io server
 * @param ids array with the ids to notify
 * @returns `true` if the events is triggered, `false` otherwise
 */
function emitNotify(io: Server, ids: string[]): boolean {
    if (ids.length > 0) {
        io.emit(SocketEvents.NOTIFY, ids)
        return true
    }

    return false
}

/**
 * Send a notification to each user in users array, waiting for all the notifications to be sent
 * @param users to send the notification to
 * @param type of the notification
 * @param report to which the notification refers
 * @param radius of search area (optional)
 */
async function sendNotifications(users: IUser[], type: NotificationTypes, report: IReport, radius?: number) {
    console.log(type)
    const promises = users.map(async (user: IUser) => await sendNotification(user, type, report, radius))
    await Promise.all(promises)

    console.log('promises resolved')
}

/**
 * Send a notification, stored in the db
 * @param user to send the notification
 * @param type of the notification
 * @param report to which the notification is relative to
 */
async function sendNotification(user: IUser, type: NotificationTypes, report: IReport, radius?: number): Promise<AxiosResponse[]> {
    if (type == NotificationTypes.NEW_REPORT_SPOT) {
        if (!radius) throw new Error('missing radius argument')
        const spots: IFavoriteSpot[] = user.favorite_spots.filter(_ => haversineDistance(_.coordinates, report.coordinates) < radius)
        console.log(user.username, spots.length, user.favorite_spots.map(spot => spot.coordinates), report.coordinates, radius)
        const postRequestBodies = await Promise.all(spots.map(async (spot: IFavoriteSpot) =>
            (await createNotification())
                .ofType(NotificationTypes.NEW_REPORT_SPOT)
                .toUser(user.username)
                .forReport(report._id.toString())
                .nearTo(spot)
                .build()))

        console.log('request body', postRequestBodies)
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
        .ofType(type)
        .toUser(user.username)
        .forReport(report._id.toString())
        .build()

    return Promise.all([axios.post<INotification>(
        `http://localhost:3000/users/${user.username}/notifications/`,
        notification,
        { headers: { 'Content-Type': 'application/json' } }
    )])
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

