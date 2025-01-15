import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import { Application } from "express"
import userRoutes from './src/routes/userRoutes'
import notificationTypeRoutes from './src/routes/notificationTypeRoutes'
import reportTypeRoutes from './src/routes/reportTypeRoutes'
import reportRoutes from './src/routes/reportRoutes'

mongoose.connect('mongodb://localhost:27017/dbStreetMonitor')

const app: Application = express()
app.use(cors())
    .use(express.json())
    .use(express.static('public'))

app.use('/users', userRoutes)
app.use('/notifications/types', notificationTypeRoutes)
app.use('/reportTypes', reportTypeRoutes)
app.use('/reports', reportRoutes)

app.listen(3000, () => {
    console.log('Server listening on port 3000')
})
