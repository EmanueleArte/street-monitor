import mongoose, { Schema, Model } from 'mongoose'

export interface INotificationType {
    name: string,
    icon_address: string
}

export const notificationTypeSchema: Schema<INotificationType> = new Schema<INotificationType>({
    name: { type: String, required: true, unique: true, index: true, dropDups: true },
    icon_address: { type: String, required: false }
})

const notificationTypeModel: Model<INotificationType> = mongoose.model<INotificationType>('NotificationType', notificationTypeSchema)

export default notificationTypeModel