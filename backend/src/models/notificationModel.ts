import mongoose, { Schema, Model } from 'mongoose'
import { notificationTypeSchema, type INotificationType } from './notificationTypeModel'
import type { IFavoriteSpot } from './favoriteSpotModel'
import { favoriteSpotSchema } from './favoriteSpotModel'

export interface INotification {
    _id: mongoose.Types.ObjectId,
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
        type: notificationTypeSchema,
        required: true,
    },
    send_datetime: { type: Date, required: true },
    report: { type: mongoose.Schema.ObjectId, ref: 'Report', required: false },
    favorite_spot: { type: favoriteSpotSchema, required: false },
    read: { type: Boolean, required: false }
})

const notificationModel: Model<INotification> = mongoose.model<INotification>('Notification', notificationSchema)

export default notificationModel