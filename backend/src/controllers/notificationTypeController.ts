import { Request, Response } from "express"
import notificationTypeModel from "@/models/notificationTypeModel"

export const getNotificationTypes = (req: Request, res: Response) => {
    notificationTypeModel.find()
        .then(docs => {
            console.log(docs)
        })
}

export const getNotificationTypeByName = (req: Request, res: Response) => {
    notificationTypeModel.findOne()
        .where('name').equals(req.params.name)
        .then(doc => {
            if (!doc) {
                return res.status(404).send('Notification type not found')
            }
            res.json(doc)
        })
        .catch((err: Error) => {
            res.status(500).send(err)
        })
}