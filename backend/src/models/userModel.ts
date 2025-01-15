import mongoose, { Document, Schema, Model } from "mongoose"
import { IFavoriteSpot, favoriteSpotSchema } from "./favoriteSpotModel"
import { INotification, notificationSchema } from "./notificationModel"

export interface IUser extends Document {
    name: string
    surname: string
    email: string
    password: string
    username: string
    reputation: number
    favorite_spots: IFavoriteSpot[]
    notifications: INotification[]
    // favorite_spots: Array<IFavoriteSpot>
    // notifications: Array<never> // TODO: Replace with actual notification type if available
}

const userSchema: Schema<IUser> = new Schema<IUser>({
    name: { type: String, required: true },
    surname: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    username: { type: String, required: true },
    reputation: { type: Number, required: true },
    favorite_spots: [favoriteSpotSchema],
    notifications: [notificationSchema]
})

const userModel: Model<IUser> = mongoose.model<IUser>('User', userSchema)

export default userModel