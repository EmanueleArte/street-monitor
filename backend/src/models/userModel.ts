import mongoose, { Document, Schema, Model } from 'mongoose'
import { IFavoriteSpot, favoriteSpotSchema } from './favoriteSpotModel'
import { INotification, notificationSchema } from './notificationModel'

export interface IUser {
    name: string
    surname: string
    email: string
    password: string
    username: string
    reputation: number
    admin?: boolean
    favorite_spots?: IFavoriteSpot[]
    notifications?: INotification[]
}

const userSchema: Schema<IUser> = new Schema<IUser>({
    name: { type: String, required: true },
    surname: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    username: { type: String, required: true, unique: true, index: true, dropDups: true },
    reputation: { type: Number, required: true },
    admin: { type: Boolean, required: false },
    favorite_spots: { type: [favoriteSpotSchema], required: false },
    notifications: { type: [notificationSchema], required: false }
})

const userModel: Model<IUser> = mongoose.model<IUser>('User', userSchema)

export default userModel