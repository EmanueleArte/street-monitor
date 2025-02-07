import { Request, Response } from 'express'
import userModel, { IUser } from '../models/userModel'
import favoriteSpotModel, { IFavoriteSpot } from '../models/favoriteSpotModel'
import notificationModel, { INotification } from '../models/notificationModel'
import mongoose, { Error } from 'mongoose'
import { MongoServerError } from 'mongodb'

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
        .catch((err: MongoServerError) => {
            if (err.code == 11000) {
                res.status(409).send(err.keyValue)
                return
            }
            res.status(500).send(err)
        })
        .catch((err: Error) => {
            console.log(err)
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
    const notificationData: INotification = new notificationModel(req.body)
    notificationData._id = new mongoose.Types.ObjectId()
    const notification = new notificationModel(notificationData)
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
    const favoriteSpotData: IFavoriteSpot = req.body
    favoriteSpotData._id = new mongoose.Types.ObjectId()
    const favoriteSpot = new favoriteSpotModel(favoriteSpotData)
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
            username: req.params.id
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

export const getUsersWithSpotNearNewReport = (req: Request, res: Response) => {
    const latitude = parseFloat(req.params.latitude)
    const longitude = parseFloat(req.params.longitude)
    const radius = parseFloat(req.params.radius)

    console.log({
        lat: latitude,
        lon: longitude,
        rad: radius
    })

    userModel.find({
        favorite_spots: {
            $elemMatch: {
                coordinates: {
                    $geoWithin: {
                        $centerSphere: [[latitude, longitude], radius / 6378.1],
                    }
                }
            }
        }
    }).then((users: IUser[]) => {
            if (!users || users.length === 0) {
                return res.status(404).send('No users found')
            }
            
            res.json(users)
        })
        .catch((err: Error) => {
            res.status(500).send(err)
        })
}