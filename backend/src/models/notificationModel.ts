import mongoose, { Schema, Model } from 'mongoose'
import type { INotificationType } from './notificationTypeModel'
import type { IFavoriteSpot } from './favoriteSpotModel'
import { favoriteSpotSchema } from './favoriteSpotModel'
import type { IReport } from './reportModel'

export interface INotification {
    content: string,
    type: INotificationType,
    send_datetime: Date,
    report: IReport,
    favorite_spot: IFavoriteSpot,
    read: boolean
}

export const notificationSchema: Schema<INotification> = new Schema<INotification>({
    content: { type: String, required: true },
    type: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'NotificationType',
        required: true,
    },
    send_datetime: { type: Date, required: true },
    report: { type: mongoose.Schema.ObjectId, ref: 'Report', required: false },
    favorite_spot: { type: favoriteSpotSchema, required: false },
    read: { type: Boolean, required: false }
})

const notificationModel: Model<INotification> = mongoose.model<INotification>('Notification', notificationSchema)

export default notificationModel