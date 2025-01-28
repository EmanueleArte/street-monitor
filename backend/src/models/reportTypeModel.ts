import mongoose, { Document, Schema, Model, ObjectId } from 'mongoose'

export interface IReportType extends Document {
    name: string,
}

const reportTypeSchema: Schema<IReportType> = new Schema<IReportType>({
    name: { type: String, required: true, unique: true, index: true, dropDups: true },
}, { collection: 'reportTypes' })

const reportTypeModel: Model<IReportType> = mongoose.model<IReportType>('ReportType', reportTypeSchema)

export default reportTypeModel