import mongoose, { Document, Schema, Model } from "mongoose"
import { IReportType } from "@/models/reportTypeModel"
import { IUser } from "@/models/userModel"

export interface IReport extends Document {
    type: IReportType,
    user: IUser,
    coordinates: [number, number],
    open_datetime: Date,
    close_datetime: Date,
    description: string//,
    picture: string
}

const reportSchema: Schema<IReport> = new Schema<IReport>({
    type: { type: String, ref: 'ReportType', required: true },
    user: { type: String, ref: 'User', required: true },
    coordinates: { type: [Number, Number], /*type: [Number], index: '2dsphere',*/ required: true },
    open_datetime: { type: Date, required: true },
    close_datetime: { type: Date, required: false },
    description: { type: String, required: false },
    picture: { type: String, required: false }
})

const reportModel: Model<IReport> = mongoose.model<IReport>('Report', reportSchema)

export default reportModel