import { Request, Response } from "express"
import notificationTypeModel, { INotificationType } from "@/models/notificationTypeModel"

export const getNotificationTypes = (req: Request, res: Response) => {
    notificationTypeModel.find()
        .then((docs: INotificationType[] | null) => {
            res.json(docs)
        })
        .catch((err: Error) => {
            res.status(500).send(err)
        })
}

export const getNotificationTypeByName = (req: Request, res: Response) => {
    notificationTypeModel.findOne()
        .where('name').equals(req.params.name)
        .then((doc: INotificationType | null) => {
            console.log(doc)
            if (!doc) {
                return res.status(404).send('Notification type not found')
            }
            res.json(doc)
        })
        .catch((err: Error) => {
            res.status(500).send(err)
        })
}