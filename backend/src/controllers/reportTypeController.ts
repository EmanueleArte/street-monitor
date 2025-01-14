import { Request, Response } from 'express'
import reportTypeModel, { IReportType } from '../models/reportTypeModel'

export const getReportTypeByName = (req: Request, res: Response) => {
    reportTypeModel.findOne()
        .where('name').equals(req.params.name)
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