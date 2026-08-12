import express from 'express'
import cors from 'cors'
import mongoose, { mongo } from 'mongoose'
import customerRouter from './routes/CustomerRoute.js'

import menuRouter from './routes/MenuRoute.js'
import orderRouter from './routes/OrderRoute.js'

import adminRouter from './routes/AdminRoutes.js'

import deliveryRouter from './routes/DeliveryDashboardRoutes.js'
import paymentRouter from './routes/paymentRoute.js'

import connectDB from './config/db.js'
import 'dotenv/config';


const app = express()

app.use(express.json())
app.use(cors())

app.use(express.urlencoded({ extended: true }));

app.use('/uploads', express.static('uploads'));


app.use('/api/auth', customerRouter)

app.use('/api/menu', menuRouter)

app.use('/api', orderRouter)

app.use('/api',adminRouter)


app.use('/api/delivery',deliveryRouter)

app.use('/api/payment',paymentRouter)

connectDB()

const PORT = process.env.PORT
app.listen(PORT , () => {
    console.log("server running");

})