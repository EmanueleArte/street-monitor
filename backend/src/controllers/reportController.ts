import { Request, Response } from 'express'
import reportModel, { IReport } from '../models/reportModel'

export const listReports = (req: Request, res: Response) => {
    reportModel.find()
        .then((docs: IReport[]) => {
            res.json(docs)
        })
        .catch((err: Error) => {
            res.status(500).send(err)
        })
}