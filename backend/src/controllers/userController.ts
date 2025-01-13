import { Request, Response } from 'express'
import userModel from '../models/usersModel'
import { Document } from 'mongoose'

export const getUserByUsername = (req: Request, res: Response) => {
    const username: string = req.query.username as string
    userModel.findOne()
        .where('username').equals(username)
        .then((doc: Document | null) => {
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
            console.log(doc)
            res.json(doc)
        })
        .catch((err: Error) => {
            res.status(500).send(err)
        })
}