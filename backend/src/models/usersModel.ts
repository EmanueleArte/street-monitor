import mongoose, { Document, Schema, Model } from "mongoose"

interface IFavoriteSpot {
    label: string
    coordinates: [number, number]
}

export interface IUser extends Document {
    name: string
    surname: string
    email: string
    password: string
    username: string
    favorite_spots: IFavoriteSpot[]
    notifications: any[] // Replace with actual notification type if available
}

const userSchema: Schema<IUser> = new Schema<IUser>({
    name: { type: String, required: true },
    surname: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    username: { type: String, required: true },
    favorite_spots: [
        {
            label: { type: String, required: true },
            coordinates: { type: [Number, Number], required: true }
        }
    ],
    notifications: [
        // notification schema
    ]
})

const userModel: Model<IUser> = mongoose.model<IUser>('User', userSchema)

export default userModel