import mongoose, { Document, Schema, Model, ObjectId } from "mongoose"

export interface IReportType extends Document {
    //_id: ObjectId,
    name: string,
    icon: string,
    icon_address: string
}

const reportTypeSchema: Schema<IReportType> = new Schema<IReportType>({
    //_id: { type: mongoose.Schema.Types.ObjectId, required: true },
    name: { type: String, required: true },
    icon: { type: String, required: false },
    icon_address: { type: String, required: false }
}, { collection: 'reportTypes' })

const reportTypeModel: Model<IReportType> = mongoose.model<IReportType>('ReportType', reportTypeSchema)

export default reportTypeModel