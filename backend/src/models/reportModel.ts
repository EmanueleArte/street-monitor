import mongoose, { Document, Schema, Model } from "mongoose"

export interface IReport extends Document {
    type: Object, //TODO
    user: string,
    open_datetime: Date,
    close_datetime: Date,
    description: string//,
    //picture: ???
}

const reportSchema: Schema<IReport> = new Schema<IReport>({
    type: { type: Object, required: true },
    user: { type: String, required: true },
    open_datetime: { type: Date, required: true },
    close_datetime: { type: Date, required: false },
    description: { type: String, required: false }//,
    //picture: { type: ???, required: false }
})

const reportModel: Model<IReport> = mongoose.model<IReport>('Report', reportSchema)

export default reportModel