import { Request, Response } from 'express'
import reportTypeModel, { IReportType } from '../models/reportTypeModel'
import { Types } from 'mongoose';

export const listReportTypes = (req: Request, res: Response) => {
    reportTypeModel.find()
        .then((docs) => {
            if (!docs || docs.length === 0) {
                return res.status(404).send('No report types found');
            }
            res.json(docs)
        })
        .catch((err: Error) => {
            res.status(500).send(err.message)
        });
}

export const getReportTypeByName = (req: Request, res: Response) => {
    reportTypeModel.findOne({ name: req.params.name })
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