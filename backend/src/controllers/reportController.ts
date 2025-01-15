import { Request, Response } from 'express'
import reportModel, { IReport } from '../models/reportModel'

export const listReports = (req: Request, res: Response) => {
    reportModel.find()
        .then((docs: IReport[]) => {
            if (!docs || docs.length === 0) {
                return res.status(404).send('No reports found');
            }
            res.json(docs)
        })
        .catch((err: Error) => {
            res.status(500).send(err)
        })
}

export const createReport = (req: Request, res: Response) => {
    const report = new reportModel(req.body)
    report.save()
        .then((doc: IReport) => {
            res.json(doc)
        })
        .catch((err: Error) => {
            res.status(500).send(err)
        })
}

export const updateReport = (req: Request, res: Response) => {
    reportModel.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true })
        .then((doc: IReport | null) => {
            if (!doc) {
                return res.status(404).send('Report not found');
            }
            res.json(doc);
        })
        .catch((err: Error) => {
            res.status(500).send(err)
        })
}

export const getReportById = (req: Request, res: Response) => {
    reportModel.findById(req.params.id)
        .then((doc: IReport | null) => {
            if (!doc) {
                return res.status(404).send('Report not found');
            }
            res.json(doc)
        })
        .catch((err: Error) => {
            res.status(500).send(err)
        })
}

export const getReportsByType = (req: Request, res: Response) => {
    reportModel.find()
        .where('type').equals(req.params.type)
        .then((docs: IReport[]) => {
            if (!docs || docs.length === 0) {
                return res.status(404).send('No reports found');
            }
            res.json(docs)
        })
        .catch((err: Error) => {
            res.status(500).send(err)
        })
}

export const getReportsByUser = (req: Request, res: Response) => {
    reportModel.find()
        .where('user').equals(req.params.user)
        .then((docs: IReport[]) => {
            if (!docs || docs.length === 0) {
                return res.status(404).send('No reports found');
            }
            res.json(docs)
        })
        .catch((err: Error) => {
            res.status(500).send(err)
        })
}

export const getReportsByCoordinates = (req: Request, res: Response) => {
    const latitude = parseFloat(req.params.latitude)
    const longitude = parseFloat(req.params.longitude)
    const radius = parseFloat(req.params.radius)

    reportModel.find()
        .where({
            coordinates: {
                $geoWithin: {
                    $centerSphere: [[latitude, longitude], radius],
                }
            }
        })
        .then((docs: IReport[]) => {
            if (!docs || docs.length === 0) {
                return res.status(404).send('No reports found')
            }
            res.json(docs)
        })
        .catch((err: Error) => {
            res.status(500).send(err)
        })
}