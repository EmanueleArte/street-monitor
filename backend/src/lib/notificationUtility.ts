import { IFavoriteSpot } from "@/models/favoriteSpotModel"
import { INotificationType } from "@/models/notificationTypeModel"
import { NotificationContents, NotificationTypes } from "./vars"
import notificationModel, { INotification } from '../models/notificationModel'
import axios from "axios"
import { IReport } from "@/models/reportModel"
import mongoose from "mongoose"


class Notification {
    private readonly date: Date
    private content: string | undefined
    private type: INotificationType | undefined
    private report: mongoose.Types.ObjectId | undefined
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
        this.report = new mongoose.Types.ObjectId(reportId)
        return this
    }

    nearTo(spotSchema: IFavoriteSpot): Notification {
        this.spot = spotSchema
        return this
    }

    build(): INotification {
        const body = this.parseToPostBody()
        const notification: INotification = new notificationModel({
            ...body
        })
        return notification
    }

    parseToPostBody() {
        if (this.type == undefined ||
            this.content == undefined) {
            return undefined
        }

        if (this.type.name == NotificationTypes.NEW_REPORT_GPS && !this.report) {
            return undefined
        }

        if (this.type.name == NotificationTypes.NEW_REPORT_SPOT && (!this.report || !this.spot)) {
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
