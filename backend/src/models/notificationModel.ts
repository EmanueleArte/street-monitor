import mongoose, { Schema, Model } from 'mongoose'
import { INotificationType } from './notificationTypeModel'
import { favoriteSpotSchema, IFavoriteSpot } from './favoriteSpotModel'
import type { IReport } from './reportModel'
import { IUser } from './userModel'

export interface INotification {
    content: string,
    type: INotificationType,
    send_datetime: Date,
    report: mongoose.Types.ObjectId,
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