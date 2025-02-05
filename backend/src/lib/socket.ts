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
    username?: string,
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
        const currentUser: string = "" // TODO: pass the current user

        // get favorite spots
        axios.get<IUser[]>(`http://localhost:3000/users/favorites/${lat}&${long}&${radius}`)
            .then(users => users.data.filter((user: IUser) => user.username != currentUser))
            .then(users => users.forEach(user => sendNotificationToUser(user, NotificationTypes.NEW_REPORT_SPOT, report)))
            .catch()

        // axios.get<IUser[]>(url)
        //   .then(res => {
        //     res.data
        //       .filter((user: IUser) => !useAuthStore().isLoggedIn(user.username))
        //       .forEach(async (user: IUser) => {
        //         const notificationUrl: string = `http://localhost:3000/users/${user.username}/notifications/`
        //         user.favorite_spots
        //           ?.filter((spot: IFavoriteSpot) => haversineDistance(spot, [lat, long]) <= RADIUS)
        //           .forEach(async (spot: IFavoriteSpot) => {
        //             const postBody = (await createNotification())
        //               .ofType(NotificationTypes.NEW_REPORT_SPOT)
        //               ?.toUser(user.username)
        //               .forReport(reportPost.data._id.toString())
        //               .nearTo(spot)
        //               .parseToPostBody()

        //             axios.post(notificationUrl, postBody, {
        //               headers: {
        //                 'Content-Type': 'application/json',
        //               }
        //             })
        //               .then(res => {
        //                 console.log(res)
        //                 socket.emit('new-report-spot')
        //             })
        //               .catch(err => console.error(err))
        //           })
        //       })
        //   })
        //   .catch(err => console.error(err))
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
}

/**
 * Send a notification, stored in the db
 * @param user to send the notification
 * @param notificationType of the notification
 * @param report to which the notification is relative to
 */
function sendNotificationToUser(user: IUser, notificationType: NotificationTypes, report: IReport) {
    console.log('ready to send notification for type', notificationType)
    const promises: Promise<AxiosResponse>[] = []

    switch (notificationType) {
        case NotificationTypes.NEW_REPORT_SPOT: {
            sendReportNearSpotNotification(user, report, 5).then(res => console.log(res))
            break
        }

        case NotificationTypes.NEW_REPORT_SPOT: {
            promises.push(sendReportNearGpsNotification(user, report))
            break
        }

        case NotificationTypes.REPORT_UPDATE: {
            promises.push(sendReportUpdateNotification(user, report))
            break
        }
    }
    Promise.all(promises).then(res => console.log('done'))
}

async function sendReportNearSpotNotification(user: IUser, report: IReport, radius: number): Promise<AxiosResponse[]> {
    const spots: IFavoriteSpot[] = user.favorite_spots
        .filter((spot: IFavoriteSpot) => haversineDistance(spot.coordinates, report.coordinates) < radius)
    const postBodies = await Promise.all(spots.map(async (spot: IFavoriteSpot) =>
        (await createNotification())
            .ofType(NotificationTypes.NEW_REPORT_SPOT)
            .toUser(user.username)
            .forReport(report._id.toString())
            .nearTo(spot)
            .build()))
    const promises: Promise<AxiosResponse<INotification, any>>[] = postBodies.map(body => {
        return axios.post<INotification>(
            `http://localhost:3000/users/${user.username}/notifications/`,
            body,
            { headers: { 'Content-Type': 'application/json' } }
        )
    })

    return Promise.all(promises)
    // return Promise.resolve<AxiosResponse>(promises[0])


    // return user.favorite_spots
    //     .filter((spot: IFavoriteSpot) => haversineDistance(spot.coordinates, report.coordinates))
    //     .map(async (spot: IFavoriteSpot) => {
    //         return (await createNotification())
    //             .ofType(NotificationTypes.NEW_REPORT_SPOT)
    //             .toUser(user.username)
    //             .forReport(report._id.toString())
    //             .nearTo(spot)
    //             .parseToPostBody()
    //     })
    //     .map(notificationBody => {
    //         console.log('body ==>', notificationBody)
    //         return Promise.reject<AxiosResponse>()
    //         // axios.post(
    //         //     `http://localhost:3000/users/${user.username}/notifications/`,
    //         //     notificationBody,
    //         //     { headers: { 'Content-Type': 'application/json' } }
    //         // )
    //     }
    //     )
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

