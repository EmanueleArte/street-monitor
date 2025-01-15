import { Request, Response } from 'express'
import userModel, { IUser } from '../models/userModel'
import favoriteSpotModel from '../models/favoriteSpotModel'
import notificationModel, { INotification } from '../models/notificationModel'

// Users
export const getUserByUsername = (req: Request, res: Response) => {
    userModel.findOne()
        .where('username').equals(req.params.id)
        .then((doc: IUser | null) => {
            if (!doc) {
                return res.status(404).send('User not found')
            }
            res.json(doc)
        })
        .catch((err: Error) => {
            res.status(500).send(err)
        })
}

export const createUser = (req: Request, res: Response) => {
    const user = new userModel(req.body)
    user.save()
        .then((doc: IUser) => {
            res.json(doc)
        })
        .catch((err: Error) => {
            res.status(500).send(err)
        })
}

export const updateUser = (req: Request, res: Response) => {
    userModel.findOneAndUpdate({ username: req.params.id }, req.body, { new: true })
        .then((doc: IUser | null) => {
            if (!doc) {
                return res.status(404).send('User not found')
            }
            res.json(doc)
        })
        .catch((err: Error) => {
            res.status(500).send(err)
        })
}


// Notifications
export const addNotification = (req: Request, res: Response) => {
    const notification: INotification = new notificationModel(req.body)
    const validationError = notification.validateSync()

    if (validationError) {
        res.status(400).send(validationError.message)
        return
    }

    userModel.findOneAndUpdate({ username: req.params.id }, { $push: { notifications: req.body } }, { new: true })
        .then((doc: IUser | null) => {
            if (!doc) {
                return res.status(404).send('User not found')
            }
            res.json(doc)
        })
        .catch((err: Error) => {
            res.status(500).send(err)
        })
}

export const listNotifications = (req: Request, res: Response) => {
    userModel.findOne()
        .where('username').equals(req.params.id)
        .then((doc: IUser | null) => {
            if (!doc) {
                return res.status(404).send('User not found')
            }
            res.json(doc.notifications)
        })
        .catch((err: Error) => {
            res.status(500).send(err)
        })
}

export const deleteNotification = (req: Request, res: Response) => {
    userModel.findOneAndUpdate(
        {
            username: req.params.id,
            'notifications._id': req.params.nid
        },
        { $set: { 'notifications.$.read': true } },
        { new: true })
        .then((doc: IUser | null) => {
            if (!doc) {
                return res.status(404).send('User not found')
            }
            res.json(doc.notifications)
        })
        .catch((err: Error) => {
            res.status(500).send(err)
        })
}


// Favorite spots
export const addFavoriteSpot = (req: Request, res: Response) => {
    const favoriteSpot = new favoriteSpotModel(req.body)
    const validationError = favoriteSpot.validateSync()

    if (validationError) {
        res.status(400).send(validationError.message)
        return
    }

    userModel.findOneAndUpdate({ username: req.params.id }, { $push: { favorite_spots: req.body } }, { new: true })
        .then((doc: IUser | null) => {
            if (!doc) {
                return res.status(404).send('User not found')
            }
            res.json(doc)
        })
        .catch((err: Error) => {
            res.status(500).send(err)
        })
}

export const listFavoriteSpots = (req: Request, res: Response) => {
    userModel.findOne()
        .where('username').equals(req.params.id)
        .then((doc: IUser | null) => {
            if (!doc) {
                return res.status(404).send('User not found')
            }
            res.json(doc.favorite_spots)
        })
        .catch((err: Error) => {
            res.status(500).send(err)
        })
}

export const deleteFavoriteSpot = (req: Request, res: Response) => {
    userModel.findOneAndUpdate(
        {
            username: req.params.id,
            'favorite_spots._id': req.params.fid
        },
        { $pull: { favorite_spots: { _id: req.params.fid } } },
        { new: true })
        .then((doc: IUser | null) => {
            if (!doc) {
                return res.status(404).send('User not found')
            }
            res.json(doc.favorite_spots)
        })
        .catch((err: Error) => {
            res.status(500).send(err)
        })
}