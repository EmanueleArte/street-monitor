import { Request, Response } from 'express'
import userModel, { IUser } from '../models/usersModel'

// Users
export const getUserByUsername = (req: Request, res: Response) => {
    userModel.findOne()
        .where('username').equals(req.params.id)
        .then((doc: IUser | null) => {
            if (!doc) {
                return res.status(404).send('User not found');
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
                return res.status(404).send('User not found');
            }
            res.json(doc);
        })
        .catch((err: Error) => {
            res.status(500).send(err)
        })
}

// Notifications
export const addNotification = (req: Request, res: Response) => {
    userModel.findOneAndUpdate({ username: req.params.id }, { $push: { notifications: req.body } }, { new: true })
        .then((doc: IUser | null) => {
            if (!doc) {
                return res.status(404).send('User not found');
            }
            res.json(doc);
        })
        .catch((err: Error) => {
            res.status(500).send(err);
        })
}

export const listNotifications = (req: Request, res: Response) => {
    userModel.findOne()
        .where('username').equals(req.params.id)
        .then((doc: IUser | null) => {
            if (!doc) {
                return res.status(404).send('User not found');
            }
            res.json(doc.notifications);
        })
        .catch((err: Error) => {
            res.status(500).send(err);
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
                return res.status(404).send('User not found');
            }
            res.json(doc.notifications);
        })
        .catch((err: Error) => {
            res.status(500).send(err);
        })
}

// Favorite spots
export const addFavoriteSpot = (req: Request, res: Response) => {
    userModel.findOneAndUpdate({ username: req.params.id }, { $push: { favorite_spots: req.body } }, { new: true })
        .then((doc: IUser | null) => {
            if (!doc) {
                return res.status(404).send('User not found');
            }
            res.json(doc);
        })
        .catch((err: Error) => {
            res.status(500).send(err);
        })
}

export const listFavoriteSpots = (req: Request, res: Response) => {
    userModel.findOne()
        .where('username').equals(req.params.id)
        .then((doc: IUser | null) => {
            if (!doc) {
                return res.status(404).send('User not found');
            }
            res.json(doc.favorite_spots);
        })
        .catch((err: Error) => {
            res.status(500).send(err);
        })
}