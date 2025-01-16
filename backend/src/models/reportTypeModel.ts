import mongoose, { Document, Schema, Model, ObjectId } from 'mongoose'

export interface IReportType extends Document {
    name: string,
    icon_address: string
}

const reportTypeSchema: Schema<IReportType> = new Schema<IReportType>({
    name: { type: String, required: true, unique: true, index: true, dropDups: true },
    icon_address: { type: String, required: false }
}, { collection: 'reportTypes' })

const reportTypeModel: Model<IReportType> = mongoose.model<IReportType>('ReportType', reportTypeSchema)

export default reportTypeModel