import mongoose, { Document, Schema, Model } from "mongoose"

interface INotificationType extends Document {
    name: String,
    description: String,
    icon_path: String
}

const notificationTypeSchema: Schema<INotificationType> = new Schema<INotificationType>({
    name: {type: String, required: true},
    description: {type: String, required: true},
    icon_path: {type: String, required: false}
})

const notificationTypeModel: Model<INotificationType> = mongoose.model<INotificationType>('NotificationType', notificationTypeSchema)

export default notificationTypeModel