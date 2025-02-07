import mongoose, { Schema, Model } from 'mongoose'

export interface INotificationType {
    _id: mongoose.Types.ObjectId,
    name: string,
    icon_address: string
}

export const notificationTypeSchema: Schema<INotificationType> = new Schema<INotificationType>({
    _id: { type: Schema.Types.ObjectId, required: true },
    name: { type: String, required: true, unique: true, index: true, dropDups: true },
    icon_address: { type: String, required: false }
})

const notificationTypeModel: Model<INotificationType> = mongoose.model<INotificationType>('NotificationType', notificationTypeSchema)

export default notificationTypeModel