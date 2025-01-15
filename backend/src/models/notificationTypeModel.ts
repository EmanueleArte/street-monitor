import mongoose, { Document, Schema, Model } from "mongoose"

export interface INotificationType extends Document {
    name: String,
    icon_address: String
}

export const notificationTypeSchema: Schema<INotificationType> = new Schema<INotificationType>({
    name: {type: String, required: true},
    icon_address: {type: String, required: false}
})

const notificationTypeModel: Model<INotificationType> = mongoose.model<INotificationType>('NotificationType', notificationTypeSchema)

export default notificationTypeModel