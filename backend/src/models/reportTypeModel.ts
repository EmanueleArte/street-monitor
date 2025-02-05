import mongoose, { Schema, Model } from 'mongoose'

export interface IReportType {
    name: string,
}

const reportTypeSchema: Schema<IReportType> = new Schema<IReportType>({
    name: { type: String, required: true, unique: true, index: true, dropDups: true },
}, { collection: 'reportTypes' })

const reportTypeModel: Model<IReportType> = mongoose.model<IReportType>('ReportType', reportTypeSchema)

export default reportTypeModel