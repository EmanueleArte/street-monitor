import mongoose, { Document, Schema, Model } from 'mongoose'

export interface IFavoriteSpot {
    label: string
    coordinates: [number, number]
}

export const favoriteSpotSchema: Schema<IFavoriteSpot> = new Schema<IFavoriteSpot>({
    label: { type: String, required: true },
    coordinates: { type: [Number, Number], required: true }
})

const favoriteSpotModel: Model<IFavoriteSpot> = mongoose.model<IFavoriteSpot>('FavoriteSpot', favoriteSpotSchema)

export default favoriteSpotModel