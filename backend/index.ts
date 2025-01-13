import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import { Application } from "express"
import userRoutes from './src/routes/userRoutes'

mongoose.connect('mongodb://localhost:27017/dbStreetMonitor')

const app: Application = express()
app.use(cors())
    .use(express.json())
    .use(express.static('public'))

app.use('/users', userRoutes)

app.listen(3000, () => {
    console.log('Server listening on port 3000')
})
