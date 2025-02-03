import type { INotification } from "@models/notificationModel"
import { NotificationContents, NotificationTypes } from "./vars"
import type { INotificationType } from "@models/notificationTypeModel"
import axios, { type AxiosResponse } from "axios"
import type { IFavoriteSpot } from "@models/favoriteSpotModel"

class Notification {
    private readonly date: Date
    private content: string | undefined
    private type: INotificationType | undefined
    private report: string | undefined
    private spot: IFavoriteSpot | undefined
    private username: string | undefined

    private types: INotificationType[] = []

    constructor() {
        this.date = new Date()
    }

    async getNotificationTypes() {
        this.types = (await axios.get<INotificationType[]>('http://localhost:3000/notification-types/')).data
    }

    ofType(type: NotificationTypes): Notification | undefined {
        if (!this.types || this.types.length == 0) return undefined

        this.type = this.types.filter(t => t.name == type)[0]
        
        if (type == NotificationTypes.NEW_REPORT_GPS) {
            this.content = NotificationContents.NEW_REPORT_GPS
        } else if (type == NotificationTypes.NEW_REPORT_SPOT) {
            this.content = NotificationContents.NEW_REPORT_SPOT
        } else {
            this.content = NotificationContents.REPORT_UPDATE
        }
        return this
    }

    toUser(username: string): Notification {
        this.username = username
        return this
    }

    forReport(reportId: string): Notification {
        this.report = reportId
        return this
    }

    nearTo(spotSchema: IFavoriteSpot): Notification {
        this.spot = spotSchema
        return this
    }

    parseToPostBody() {
        if (this.type == undefined ||
            this.content == undefined ||
            this.username == undefined) {
            return undefined
        }

        if (this.type.name == NotificationTypes.NEW_REPORT_GPS && !this.report) {
            return undefined
        }

        if (this.type.name == NotificationTypes.NEW_REPORT_SPOT && !this.report || !this.spot) {
            return undefined
        }

        if (this.type.name == NotificationTypes.REPORT_UPDATE && !this.report) {
            return undefined
        }

        return {
            content: this.content,
            type: this.type._id,
            send_datetime: this.date,
            report: this.report || undefined,
            favorite_spot: this.spot || undefined
        }
    }
}

export async function createNotification(): Promise<Notification> {
    const notification: Notification = new Notification()
    await notification.getNotificationTypes()
    return notification
}

// class ReportUpdateNotification extends Notification {
//     content: string = NotificationContents.REPORT_UPDATE
//     type: string = "report_update"

//     constructor(private _type: INotificationType) {
//         super()
        
//         const notificationType: AxiosResponse<INotificationType> =
//             await axios.get<INotificationType>('http://localhost:3000/notification-types/' + this.type)
//     }

// }

// class ReportNearSpotNotification extends Notification {
//     content: string = "asfd"
// }

