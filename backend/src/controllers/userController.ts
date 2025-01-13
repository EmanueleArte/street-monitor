import { Request, Response } from 'express'
import userModel from '../models/usersModel'
import { Document } from 'mongoose'

export const getUserByUsername = (req: Request, res: Response) => {
    const username: string = req.params.id
    userModel.findOne()
        .where('username').equals(username)
        .then((doc: Document | null) => {
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
        .then((doc: Document) => {
            res.json(doc)
        })
        .catch((err: Error) => {
            res.status(500).send(err)
        })
}

export const updateUser = (req: Request, res: Response) => {
    const username: string = req.params.id
    userModel.findOneAndUpdate({ username: username }, req.body, { new: true })
        .then((doc: Document | null) => {
            if (!doc) {
                return res.status(404).send('User not found');
            }
            res.json(doc);
        })
        .catch((err: Error) => {
            res.status(500).send(err)
        })
}