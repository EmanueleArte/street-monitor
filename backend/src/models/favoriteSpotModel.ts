import mongoose, { Document, Schema, Model, ObjectId } from 'mongoose'

export interface IFavoriteSpot {
    _id: ObjectId
    label: string
    coordinates: [number, number]
}

export const favoriteSpotSchema: Schema<IFavoriteSpot> = new Schema<IFavoriteSpot>({
    _id: { type: Schema.Types.ObjectId, required: true },
    label: { type: String, required: true },
    coordinates: { type: [Number, Number], required: true }
})

const favoriteSpotModel: Model<IFavoriteSpot> = mongoose.model<IFavoriteSpot>('FavoriteSpot', favoriteSpotSchema)

export default favoriteSpotModel