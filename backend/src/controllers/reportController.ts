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

export const createReport = (req: Request, res: Response) => {}

export const updateReport = (req: Request, res: Response) => {}

export const getReportByType = (req: Request, res: Response) => {
    reportModel.find()
        .where('type').equals(req.params.type)
        .then((docs: IReport[]) => {
            res.json(docs)
        })
        .catch((err: Error) => {
            res.status(500).send(err)
        })
}

export const getReportByUser = (req: Request, res: Response) => {
    reportModel.find()
        .where('user').equals(req.params.user)
        .then((docs: IReport[]) => {
            res.json(docs)
        })
        .catch((err: Error) => {
            res.status(500).send(err)
        })
}