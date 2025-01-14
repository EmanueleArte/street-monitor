import mongoose, { Document, Schema, Model, ObjectId } from "mongoose"
import reportTypeModel from "./reportTypeModel"
import userModel from "./userModel"

export interface IReport extends Document {
    type: string,
    user: string,
    coordinates: [Number, Number],
    open_datetime: Date,
    close_datetime: Date,
    description: string//,
    //picture: ???
}

const reportSchema: Schema<IReport> = new Schema<IReport>({
    type: { type: String, ref: 'ReportType', required: true },
    user: { type: String, ref: 'User', required: true },
    coordinates: { type: [Number, Number], required: true },
    open_datetime: { type: Date, required: true },
    close_datetime: { type: Date, required: false },
    description: { type: String, required: false }//,
    //picture: { type: ???, required: false }
})

const reportModel: Model<IReport> = mongoose.model<IReport>('Report', reportSchema)

export default reportModel