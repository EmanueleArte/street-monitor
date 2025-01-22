import mongoose, { Document, Schema, Model } from 'mongoose'
import type { IReportType } from '@/models/reportTypeModel'
import type { IUser } from '@/models/userModel'

export interface IReport extends Document {
    _id: mongoose.Types.ObjectId,
    type: IReportType,
    user: IUser,
    coordinates: [number, number],
    open_datetime: Date,
    status: string,
    close_datetime: Date,
    description: string,
    picture: { data: string, contentType: string }
}

const reportSchema: Schema<IReport> = new Schema<IReport>({
    _id: { type: Schema.Types.ObjectId, required: true },
    type: { type: String, ref: 'ReportType', required: true },
    user: { type: String, ref: 'User', required: true },
    coordinates: { type: [Number, Number], required: true },
    open_datetime: { type: Date, required: true, default: Date.now },
    status: { type: String, required: true, enum: ['open', 'solving', 'closed'], default: 'open' },
    close_datetime: { type: Date, required: false },
    description: { type: String, required: false },
    picture: {
        type: {
            data: { type: String, required: true },
            contentType: { type: String, required: true }
        },
        required: false
    }
})

reportSchema.index({ coordinates: '2dsphere' })

const reportModel: Model<IReport> = mongoose.model<IReport>('Report', reportSchema)

export default reportModel