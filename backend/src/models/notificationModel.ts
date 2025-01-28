import mongoose, { Document, Schema, Model } from 'mongoose'
import { INotificationType, notificationTypeSchema } from './notificationTypeModel'
import { favoriteSpotSchema, IFavoriteSpot } from './favoriteSpotModel'
import type { IReport } from './reportModel'

export interface INotification extends Document {
    content: String,
    type: INotificationType,
    send_datetime: Date,
    report: IReport,
    favorite_spot: IFavoriteSpot,
    read: Boolean
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