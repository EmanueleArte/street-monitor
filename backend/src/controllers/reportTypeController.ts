import { Request, Response } from 'express'
import reportTypeModel, { IReportType } from '../models/reportTypeModel'

export const getReportTypeById = (req: Request, res: Response) => {
    reportTypeModel.findOne()
        .where('_id').equals(req.params.id)
        .then((doc: IReportType | null) => {
            if (!doc) {
                return res.status(404).send('Report type not found');
            }
            res.json(doc)
        })
        .catch((err: Error) => {
            res.status(500).send(err)
        })
}