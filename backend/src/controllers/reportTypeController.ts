import { Request, Response } from 'express'
import reportTypeModel, { IReportType } from '../models/reportTypeModel'

export const listReportTypes = (req: Request, res: Response) => {
    reportTypeModel.find()
        .then((docs) => {
            if (!docs || docs.length === 0) {
                return res.status(404).send('No report types found')
            }
            res.json(docs)
        })
        .catch((err: Error) => {
            res.status(500).send(err.message)
        })
}

export const getReportTypeByName = (req: Request, res: Response) => {
    reportTypeModel.findOne({ name: req.params.name })
        .then((doc: IReportType | null) => {
            if (!doc) {
                return res.status(404).send('Report type not found')
            }
            res.json(doc)
        })
        .catch((err: Error) => {
            res.status(500).send(err)
        })
}

export const createReportType = (req: Request, res: Response) => {
    const reportType = new reportTypeModel(req.body)
    reportType.save()
        .then((doc: IReportType) => {
            res.json(doc)
        })
        .catch((err: Error) => {
            res.status(500).send(err)
        })
}

export const updateReportType = (req: Request, res: Response) => {
    reportTypeModel.findOneAndUpdate({ name: req.params.name }, req.body, { new: true })
        .then((doc: IReportType | null) => {
            if (!doc) {
                return res.status(404).send('Report type not found')
            }
            res.json(doc)
        })
        .catch((err: Error) => {
            res.status(500).send(err)
        })
}

export const deleteReportType = (req: Request, res: Response) => {
    reportTypeModel.findOneAndDelete({ name: req.params.name })
        .then((doc: IReportType | null) => {
            if (!doc) {
                return res.status(404).send('Report type not found')
            }
            res.json(doc)
        })
        .catch((err: Error) => {
            res.status(500).send(err)
        })
}